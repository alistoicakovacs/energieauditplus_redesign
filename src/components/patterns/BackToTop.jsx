import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { EASE_OUT } from '../motion/motionTokens.js';
import styles from './BackToTop.module.css';

/** Appear after ~1.5 viewport heights of scroll. */
const SHOW_AFTER_VIEWPORTS = 1.5;

/**
 * BackToTop — floating „nach oben" button (style guide §5.7). Appears after
 * ~1.5 viewport heights (Motion `useScroll` + `useMotionValueEvent` — no
 * manual scroll listeners), fades/scales in via AnimatePresence (the scale
 * is dropped under reduced motion by MotionConfig, leaving a ≤200ms fade).
 *
 * Scrolls smoothly to the top — instantly under reduced motion. While
 * hidden it is fully unmounted (not focusable, no tab stop). 44px+ target,
 * German label. Starts hidden → SSG markup contains no button; it only
 * appears after real scrolling, so hydration never flashes it.
 */
export default function BackToTop() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > window.innerHeight * SHOW_AFTER_VIEWPORTS);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={styles.button}
          onClick={scrollToTop}
          aria-label="Nach oben scrollen"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        >
          <ArrowUp className={styles.icon} strokeWidth={2} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
