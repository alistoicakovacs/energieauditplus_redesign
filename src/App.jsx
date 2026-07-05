import { Suspense } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router';
import { MotionConfig } from 'motion/react';
import { routes } from './routes.jsx';
import { normalizePathname } from './lib/linkUtils.js';
import PageShell from './components/layout/PageShell.jsx';
import Seo from './components/layout/Seo.jsx';
import PageTransition from './components/motion/PageTransition.jsx';
import './styles/tokens.css';
import './styles/fonts.css';
import './styles/base.css';

/**
 * Routes wrapped in the page transition. The instant scroll-to-top runs
 * between exit and enter (PUSH/REPLACE only — POP keeps the browser's
 * back/forward scroll restoration). Per-route <title>/<meta>/<link> render
 * via <Seo>; React 19 hoists them into <head> (see src/lib/seo.js).
 * `location` is passed to <Routes> so AnimatePresence can keep rendering
 * the outgoing page during its exit animation.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const navigationType = useNavigationType();

  const resetScroll = () => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  return (
    // Suspense sits OUTSIDE the transition: lazy routes suspend inside the
    // router's startTransition, so React keeps the old page until the chunk
    // is ready — AnimatePresence then sees exactly one key change with fully
    // loaded content. (Suspense inside the animated child re-suspends the
    // exiting tree and deadlocks mode="wait".)
    <Suspense fallback={null}>
      <PageTransition
        transitionKey={normalizePathname(location.pathname)}
        onExitComplete={resetScroll}
      >
        <Routes location={location}>
          {routes.map(({ path, title, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  <Seo path={path} title={title} />
                  <Component />
                </>
              }
            />
          ))}
        </Routes>
      </PageTransition>
    </Suspense>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <PageShell>
        <AnimatedRoutes />
      </PageShell>
    </MotionConfig>
  );
}
