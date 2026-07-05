import { useSyncExternalStore } from 'react';

/**
 * SSR-safe `prefers-reduced-motion` hook (build plan §7.5).
 *
 * - Client: reads `matchMedia('(prefers-reduced-motion: reduce)')` and
 *   re-renders live when the OS setting changes.
 * - Server/SSG: returns `true`, so the prerendered static HTML always shows
 *   final animation states (fully visible, numbers at their end value,
 *   lines fully drawn). On hydration the first client render matches the
 *   server snapshot, then flips to the real media-query value.
 *
 * EVERY anime.js call site (and every manually scroll-bound Motion value)
 * must consume this hook — `<MotionConfig reducedMotion="user">` only
 * covers declarative Motion animations. Under reduce: no autoplay, no
 * parallax, no line-draw; render final state; only ≤200ms opacity fades.
 *
 * @returns {boolean} true when the user prefers reduced motion (and during SSG).
 */

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onStoreChange) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onStoreChange);
  return () => mql.removeEventListener('change', onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  // During SSG/prerender there is no user preference — render final states.
  return true;
}

export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
