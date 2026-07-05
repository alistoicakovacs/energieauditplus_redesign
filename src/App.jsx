import { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { MotionConfig } from 'motion/react';
import { routes } from './routes.jsx';
import './styles/tokens.css';
import './styles/fonts.css';
import './styles/base.css';

/** Scroll restoration + document title on client-side navigation. */
function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Normalize trailing slashes (static hosts serve /foo/ for /foo).
    const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const match =
      routes.find((r) => r.path === normalized) ??
      routes.find((r) => r.path === '*');
    if (match?.title) {
      document.title = match.title;
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouteEffects />
      <Suspense fallback={null}>
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
