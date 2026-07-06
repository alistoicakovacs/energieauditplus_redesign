/**
 * Build-time static prerender.
 * Runs after `vite build` (client → dist/) and
 * `vite build --ssr src/entry-server.jsx` (server bundle → dist-server/).
 * Writes one crawlable HTML file per route into dist/.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const serverEntry = pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href;

// sitemap.xml config (§9). Canonical origin must match the <Seo> canonical in
// src/lib/seo.js (SITE_URL). SITEMAP_LASTMOD is a build-time constant, not
// Date.now() — the sandbox may restrict the clock, and a stable date keeps the
// sitemap deterministic across rebuilds. Bump it when route content changes.
const SITE_URL = 'https://ea-plus.de';
const SITEMAP_LASTMOD = '2026-07-06';

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * CSP guard (§8.2). The SSR path renders each route's ALREADY-RESOLVED
 * component (src/entry-server.jsx) and prerenders with an effectively infinite
 * progressiveChunkSize, so NOTHING suspends and Fizz never flushes an
 * out-of-order Suspense segment — meaning react-dom/static emits ZERO
 * executable inline scripts (no $RB/$RC/$RT/$RV reveal scripts). The production
 * CSP `script-src` is therefore just `'self'` (no hashes). This guard re-hashes
 * every inline script in the built HTML and FAILS the build if one is NOT in
 * the CSP allowlist. Because the allowlist is now empty, ANY inline executable
 * script that reappears (e.g. a regression that lets a boundary defer again)
 * fails the build loudly rather than shipping content the production CSP would
 * refuse. Single source of truth: the allowlist is read straight out of
 * vercel.json. `type="application/ld+json"` blocks are skipped — non-executable
 * data blocks, exempt from `script-src`.
 */
function extractInlineScriptHashes(html) {
  const hashes = [];
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc\s*=/.test(attrs)) continue; // external script → covered by 'self'
    if (/type\s*=\s*["']application\/ld\+json["']/.test(attrs)) continue; // data block
    if (body.trim() === '') continue;
    hashes.push(`sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`);
  }
  return hashes;
}

async function loadCspScriptHashes() {
  const vercel = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf-8'));
  const csp = vercel.headers
    ?.flatMap((h) => h.headers ?? [])
    .find((h) => h.key.toLowerCase() === 'content-security-policy')?.value;
  if (!csp) throw new Error('CSP guard: no Content-Security-Policy header found in vercel.json');
  const scriptSrc = csp.split(';').find((d) => d.trim().startsWith('script-src')) ?? '';
  return new Set(scriptSrc.match(/sha256-[A-Za-z0-9+/=]+/g)?.map((h) => h) ?? []);
}

/**
 * React 19 hoists metadata rendered by <Seo> (<title>/<meta>/<link>) to the
 * FRONT of the prerendered fragment (there is no <head> in the SSR tree).
 * Split that hoistable prefix off the body markup so it can be injected into
 * the template <head>.
 */
function extractHeadTags(appHtml) {
  const tagPattern = /^\s*(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;
  let body = appHtml;
  const tags = [];
  for (;;) {
    const match = body.match(tagPattern);
    if (!match) break;
    tags.push(match[0].trim());
    body = body.slice(match[0].length);
  }

  return { headTags: tags.join('\n    '), body };
}

/**
 * Responsive image preload for a route's LCP (plan §9). Rendering the <link>
 * in the page is not an option: React 19 only hoists `rel="preload"` links
 * that carry an `href`, so an imageSrcSet-only preload stays inline in the
 * lazy route's Suspense segment — and stripping it out of the body breaks
 * hydration. Routes declare `preloadImage` in src/routes.jsx instead and the
 * tag is injected into the static <head> here, like the Seo head tags.
 */
function buildPreloadTag(preloadImage) {
  if (!preloadImage) return '';
  const { imageSrcSet, imageSizes = '100vw', type } = preloadImage;
  const typeAttr = type ? ` type="${escapeHtml(type)}"` : '';
  return (
    `<link rel="preload" as="image" imagesrcset="${escapeHtml(imageSrcSet)}" ` +
    `imagesizes="${escapeHtml(imageSizes)}"${typeAttr} fetchpriority="high">`
  );
}

/**
 * Regression guard for the SHELL-ONLY prerender defect. Every prerendered
 * route MUST render its content INLINE in <main>: no pending Suspense boundary
 * (`<!--$?-->`), a real <h1> present, and that route's <h1> text actually
 * inside <main> (not banished to a trailing `<div hidden>` reveal block). If
 * the SSR path ever regresses to draining only the shell prelude, this fails
 * the build instead of silently shipping empty <main>s.
 */
function assertMainHasInlineContent(html, routePath) {
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/);
  if (!mainMatch) throw new Error(`SSR guard: no <main> element in "${routePath}".`);
  const mainInner = mainMatch[1];
  if (mainInner.includes('<!--$?-->')) {
    throw new Error(
      `SSR guard: <main> for "${routePath}" contains a PENDING Suspense boundary ` +
        `(<!--$?-->) — the route content did not render inline (shell-only prerender).`
    );
  }
  const h1Match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1Match) throw new Error(`SSR guard: no <h1> found for "${routePath}".`);
  const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const h1Text = stripTags(h1Match[1]);
  const mainText = stripTags(mainInner);
  if (!mainText.includes('<h1') && !/<h1\b/.test(mainInner)) {
    throw new Error(`SSR guard: <main> for "${routePath}" has no <h1> inline.`);
  }
  if (h1Text && !mainText.includes(h1Text)) {
    throw new Error(
      `SSR guard: <main> for "${routePath}" does not contain its <h1> text ` +
        `("${h1Text.slice(0, 60)}") — shell-only prerender regression.`
    );
  }
}

const { render, routes } = await import(serverEntry);
const template = await readFile(path.join(distDir, 'index.html'), 'utf-8');

if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-html--> placeholder.');
}

const targets = routes.filter((r) => r.prerender !== false);
const written = [];

// CSP drift guard state: hashes the CSP allows, and every inline-script hash
// actually emitted (→ which route emitted it, for a useful failure message).
const allowedScriptHashes = await loadCspScriptHashes();
const emittedScriptHashes = new Map();

for (const route of targets) {
  const url = route.prerenderPath ?? route.path;

  let appHtml;
  try {
    appHtml = await render(url);
  } catch (cause) {
    throw new Error(`Prerender failed for route "${route.path}" (${url}): ${cause.message}`, {
      cause,
    });
  }

  if (!appHtml || appHtml.trim() === '') {
    throw new Error(`Prerender produced empty HTML for route "${route.path}" (${url})`);
  }

  // Move the React-hoisted <title>/<meta>/<link> prefix into <head>,
  // plus the route's LCP image preload (route.preloadImage), if any.
  const extracted = extractHeadTags(appHtml);
  const { body } = extracted;
  const headTags = [buildPreloadTag(route.preloadImage), extracted.headTags]
    .filter(Boolean)
    .join('\n    ');

  // Function replacements so "$&"-style patterns in the HTML are inert.
  let html = template.replace('<!--app-html-->', () => body);
  if (headTags) {
    html = html.replace('</head>', () => `    ${headTags}\n  </head>`);
  } else if (route.title) {
    // Fallback if a route renders no <Seo>: at least a correct title.
    html = html.replace('</head>', () => `    <title>${escapeHtml(route.title)}</title>\n  </head>`);
  }

  if (!/<head>[\s\S]*<title>[\s\S]*<\/title>[\s\S]*<\/head>/.test(html)) {
    throw new Error(`Prerender produced no <title> in <head> for route "${route.path}" (${url})`);
  }

  assertMainHasInlineContent(html, route.path);

  for (const hash of extractInlineScriptHashes(html)) {
    if (!emittedScriptHashes.has(hash)) emittedScriptHashes.set(hash, route.path);
  }

  const outFiles = [];
  if (route.file) {
    outFiles.push({ file: path.join(distDir, route.file), twin: false });
  } else if (url === '/') {
    outFiles.push({ file: path.join(distDir, 'index.html'), twin: false });
  } else {
    const segments = url.replace(/^\//, '').split('/');
    // Directory-style file serves the canonical trailing-slash URL (/foo/).
    outFiles.push({ file: path.join(distDir, ...segments, 'index.html'), twin: false });
    // Extensionless twin (/foo.html) serves the slash-less URL (/foo).
    // Vite-preview-shaped hosts resolve /foo → foo.html but NOT
    // foo/index.html — without the twin they SPA-fall back to the homepage
    // /index.html, and hydrating a non-home route against homepage markup
    // throws React #418 on every prerendered page except /.
    // NOTE (known, do not re-investigate): URLs that match NO prerendered
    // route (e.g. /gibt-es-nicht) still SPA-fall back to /index.html under
    // vite-preview-shaped hosts and will log the same #418 there — that is
    // a preview-only artifact; production hosts serve the prerendered
    // 404.html for unknown routes.
    outFiles.push({
      file: path.join(distDir, ...segments.slice(0, -1), `${segments.at(-1)}.html`),
      twin: true,
    });
  }

  for (const { file, twin } of outFiles) {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html, 'utf-8');
    written.push({ file: path.relative(distDir, file).replaceAll(path.sep, '/'), twin });
  }
}

// CSP drift guard: every emitted inline script must be allowlisted in the
// production CSP (vercel.json). A mismatch means the CSP would refuse that
// script in the browser (React #419, hidden content) — fail the build loudly.
const unlistedScripts = [...emittedScriptHashes].filter(([h]) => !allowedScriptHashes.has(h));
if (unlistedScripts.length > 0) {
  const lines = unlistedScripts.map(([h, route]) => `  ${h}  (first seen on ${route})`).join('\n');
  throw new Error(
    `CSP guard: ${unlistedScripts.length} executable inline script(s) appeared in the build ` +
      `but are NOT allowlisted in vercel.json script-src. The production CSP would refuse them.\n${lines}\n` +
      `The SSR path is expected to emit ZERO inline scripts — if one reappeared, a Suspense ` +
      `boundary is deferring content again (check entry-server.jsx progressiveChunkSize and that ` +
      `the matched route renders a resolved, non-lazy component). Fix the SSR path rather than ` +
      `allowlisting the hash.`
  );
}
console.log(
  `CSP guard: ${emittedScriptHashes.size} distinct inline script hash(es), all allowlisted.`
);

// sitemap.xml (§9): canonical URLs only — one entry per PUBLIC route.
// Excludes dev routes (prerender === false, not in the prod route table
// anyway), the 404 (path '*'), and the extensionless twins (twins are file
// outputs for a single canonical URL, not distinct URLs). The canonical form
// mirrors <Seo>: SITE_URL + path, trailing-slash-less except the homepage.
const sitemapRoutes = routes.filter((r) => r.prerender !== false && r.path !== '*');
const sitemapXml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapRoutes
    .map((r) => {
      const loc = `${SITE_URL}${r.path === '/' ? '/' : r.path}`;
      return `  <url>\n    <loc>${escapeHtml(loc)}</loc>\n    <lastmod>${SITEMAP_LASTMOD}</lastmod>\n  </url>`;
    })
    .join('\n') +
  '\n</urlset>\n';
await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

// The server bundle is a build artifact only — not deployed.
await rm(path.join(root, 'dist-server'), { recursive: true, force: true });

const pages = written.filter((w) => !w.twin);
const twins = written.filter((w) => w.twin);
console.log(`Prerendered ${pages.length} pages + ${twins.length} extensionless twins:`);
for (const { file } of pages) console.log(`  dist/${file}`);
console.log('  twins (slash-less URL fallback for vite-preview-shaped hosts):');
for (const { file } of twins) console.log(`    dist/${file}`);
console.log(`Wrote dist/sitemap.xml (${sitemapRoutes.length} canonical URLs).`);
