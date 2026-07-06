/**
 * Build-time static prerender.
 * Runs after `vite build` (client → dist/) and
 * `vite build --ssr src/entry-server.jsx` (server bundle → dist-server/).
 * Writes one crawlable HTML file per route into dist/.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
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

const { render, routes } = await import(serverEntry);
const template = await readFile(path.join(distDir, 'index.html'), 'utf-8');

if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-html--> placeholder.');
}

const targets = routes.filter((r) => r.prerender !== false);
const written = [];

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
