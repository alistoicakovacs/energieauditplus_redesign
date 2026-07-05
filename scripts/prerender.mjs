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

  // Function replacements so "$&"-style patterns in the HTML are inert.
  let html = template.replace('<!--app-html-->', () => appHtml);
  if (route.title) {
    const titleTag = `<title>${escapeHtml(route.title)}</title>`;
    html = html.replace(/<title>.*?<\/title>/, () => titleTag);
  }

  let outFile;
  if (route.file) {
    outFile = path.join(distDir, route.file);
  } else if (url === '/') {
    outFile = path.join(distDir, 'index.html');
  } else {
    outFile = path.join(distDir, ...url.replace(/^\//, '').split('/'), 'index.html');
  }

  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, html, 'utf-8');
  written.push(path.relative(distDir, outFile).replaceAll(path.sep, '/'));
}

// The server bundle is a build artifact only — not deployed.
await rm(path.join(root, 'dist-server'), { recursive: true, force: true });

console.log(`Prerendered ${written.length} pages:`);
for (const f of written) console.log(`  dist/${f}`);
