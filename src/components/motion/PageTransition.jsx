import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// 160ms exit + 240ms enter = 400ms total, the plan §7.2 ceiling.
const pageMotion = {
  initial: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.16, ease: [0.65, 0, 0.35, 1] },
  },
};

/**
 * Route transition: exit-then-enter fade/slide (160ms + 240ms = 400ms,
 * plan §7.2 "≤400ms"). After the
 * enter animation of a client-side navigation, focus moves to the new page's
 * <h1> (a11y, plan §7.2). Transforms are dropped automatically under
 * prefers-reduced-motion via the app-level <MotionConfig reducedMotion="user">.
 *
 * @param {object} props
 * @param {string} props.transitionKey        location.pathname
 * @param {() => void} [props.onExitComplete] runs between pages (scroll reset)
 */
export default function PageTransition({ transitionKey, onExitComplete, children }) {
  // Only move focus after real client-side navigations — never on first load.
  const initialKey = useRef(transitionKey);
  const navigated = useRef(false);
  if (transitionKey !== initialKey.current) navigated.current = true;

  const focusHeading = () => {
    if (!navigated.current) return;
    let tries = 0;
    // The new page is lazy-loaded; retry briefly until its <h1> is mounted.
    const attempt = () => {
      // Never steal focus from an open modal (e.g. the mobile menu was
      // reopened while this transition was still finishing).
      if (document.activeElement?.closest('[aria-modal="true"]')) return;
      const heading = document.querySelector('main h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      } else if (tries < 30) {
        tries += 1;
        requestAnimationFrame(attempt);
      }
    };
    attempt();
  };

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
      <motion.div
        key={transitionKey}
        variants={pageMotion}
        initial="initial"
        animate="enter"
        exit="exit"
        onAnimationComplete={(definition) => {
          if (definition === 'enter') focusHeading();
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
