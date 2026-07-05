import { useLayoutEffect, useState } from 'react';

/**
 * One-time mount measurement: is the element entirely below the viewport?
 *
 * Core of the "never re-hide what's already on screen" rule: entrance
 * animations (hide → reveal) may only be armed for elements that are below
 * the fold when they mount. Elements already visible — above the fold on a
 * fresh load, or anywhere in view after hydration of prerendered HTML —
 * stay in their final state and never flash.
 *
 * Purely geometric (independent of reduced-motion, which flips *after*
 * hydration and would otherwise race this measurement); callers combine it
 * with `usePrefersReducedMotion()` at render time. Runs in
 * `useLayoutEffect`, so the state flip happens before first paint.
 * Returns `false` during SSG (effects never run) → static HTML is final.
 *
 * @param {import('react').RefObject<Element>} ref The element to measure.
 * @returns {boolean} true when the element mounted fully below the viewport.
 */
export default function useBelowFold(ref) {
  const [belowFold, setBelowFold] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight) {
      setBelowFold(true);
    }
    // Mount-only by design: re-measuring later could re-hide visible content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return belowFold;
}
