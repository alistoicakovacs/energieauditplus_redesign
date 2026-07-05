import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { routes } from './routes.jsx';

export { routes };

/**
 * Build-time static render of a single route.
 * Uses react-dom/static `prerender`, which waits for Suspense (lazy routes)
 * to resolve — so the emitted HTML contains the real page content.
 */
export async function render(url) {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  html += decoder.decode();
  return html;
}
