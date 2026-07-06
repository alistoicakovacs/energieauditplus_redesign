import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { routes, routesWithResolved } from './routes.jsx';

export { routes };

/**
 * Build-time static render of a single route.
 *
 * We render the matched route's ALREADY-RESOLVED component (routesWithResolved)
 * rather than its React.lazy wrapper. That way <Suspense fallback={null}> never
 * suspends during prerender, so react-dom/static emits the full page content
 * INLINE inside <main> in document order — no pending boundary, no hidden-div
 * reveal, no $RC/$RT reveal scripts. (The client re-uses the same resolved
 * tree for the initial hydration; see src/main.jsx.)
 */
export async function render(url) {
  const ssrRoutes = await routesWithResolved(url);
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App routes={ssrRoutes} />
    </StaticRouter>,
    // Static build: we drain the whole document into one string anyway, so tell
    // Fizz never to flush the shell early. The default ~12 KB progressiveChunkSize
    // makes Fizz flush the shell (Header/nav chrome) once it crosses the
    // threshold, after which the <main> content — sitting inside App's
    // <Suspense fallback={null}> — is emitted as an OUT-OF-ORDER segment (a
    // trailing `<div hidden>` + $RC reveal script) even though nothing actually
    // suspended. A huge chunk size keeps everything in the shell, so the page
    // content renders INLINE inside <main> in document order.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER }
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
