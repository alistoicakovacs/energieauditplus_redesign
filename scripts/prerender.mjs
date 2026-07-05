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
    outFiles.push(path.join(distDir, route.file));
  } else if (url === '/') {
    outFiles.push(path.join(distDir, 'index.html'));
  } else {
    const segments = url.replace(/^\//, '').split('/');
    // Directory-style file serves the canonical trailing-slash URL (/foo/).
    outFiles.push(path.join(distDir, ...segments, 'index.html'));
    // Extensionless twin (/foo.html) serves the slash-less URL (/foo).
    // Vite-preview-shaped hosts resolve /foo → foo.html but NOT
    // foo/index.html — without the twin they SPA-fall back to the homepage
    // /index.html, and hydrating a non-home route against homepage markup
    // throws React #418 on every prerendered page except /.
    outFiles.push(path.join(distDir, ...segments.slice(0, -1), `${segments.at(-1)}.html`));
  }

  for (const outFile of outFiles) {
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, 'utf-8');
    written.push(path.relative(distDir, outFile).replaceAll(path.sep, '/'));
  }
}

// The server bundle is a build artifact only — not deployed.
await rm(path.join(root, 'dist-server'), { recursive: true, force: true });

console.log(`Prerendered ${written.length} pages:`);
for (const f of written) console.log(`  dist/${f}`);
