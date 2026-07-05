import { motion, useScroll } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import styles from './ScrollProgress.module.css';

/**
 * ScrollProgress — thin eco-gradient page-scroll bar fixed to the top edge
 * (style guide §5.7; §4: the eco gradient IS the scroll progress use case).
 * Motion `useScroll` → `scaleX` binding, transform-only (plan §7.6).
 *
 * Purely decorative → `aria-hidden`.
 *
 * Reduced motion: renders nothing (scroll-linked transforms are not covered
 * by MotionConfig — explicit hook gate, same rationale as ParallaxMedia).
 * Hydration parity: SSG renders null too (server snapshot = reduced), and
 * on a motion-enabled client the bar appears with `scaleX(0)` — invisible —
 * so nothing flashes. The `useScroll` subscription runs unconditionally
 * (hooks rule); its value is simply never attached under reduce.
 */
export default function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduced) return null;

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
