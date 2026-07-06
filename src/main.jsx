import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import { routesWithResolved } from './routes.jsx';

const container = document.getElementById('root');

// Prod pages ship prerendered HTML → hydrate; dev serves an empty root
// (only the <!--app-html--> comment node) → render.
if (container.firstElementChild) {
  // The server rendered the matched route's content INLINE (no Suspense). If we
  // hydrated with React.lazy for that route, the client's first render would be
  // null (fallback) until the chunk loads → hydration mismatch (#418) / flash.
  // So resolve the initial route's chunk BEFORE hydrateRoot and hand App the
  // resolved route tree — the client's first render then matches the server
  // markup exactly. Every OTHER route stays lazy, preserving code-splitting for
  // subsequent client-side navigations.
  routesWithResolved(window.location.pathname).then((routes) => {
    hydrateRoot(
      container,
      <StrictMode>
        <BrowserRouter>
          <App routes={routes} />
        </BrowserRouter>
      </StrictMode>
    );
  });
} else {
  createRoot(container).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
