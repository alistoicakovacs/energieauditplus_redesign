import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import styles from './ParallaxMedia.module.css';

/**
 * ParallaxMedia — gentle scroll-linked translateY parallax (≤8%, style guide
 * §6.2) for hero media and decorative shapes.
 *
 * CLS-free: the frame owns a fixed `aspect-ratio` and `overflow: hidden`;
 * the media layer is oversized by the parallax strength on top/bottom so the
 * translation never reveals gaps. The oversizing insets are applied in BOTH
 * modes (reduced and animated), so the crop/geometry is identical across
 * SSG, hydration, and the post-hydration reduced-motion flip — only the
 * transform binding differs. Transform-only (plan §7.6).
 *
 * Reduced motion / SSG: the transform binding is dropped — the media renders
 * static at its resting position. `MotionConfig` does NOT cover manual
 * `useScroll` bindings, hence the explicit hook gate. (The `useScroll`
 * subscription itself cannot be conditionally skipped — hooks must run
 * unconditionally — but its value is simply never attached to the DOM.)
 *
 * @param {object} props
 * @param {number} [props.strength=6] Max offset in % of frame height (clamped to 8).
 * @param {string} [props.aspectRatio='16 / 9'] CSS aspect-ratio of the frame.
 * @param {boolean} [props.rounded=false] Card-radius frame (`--radius-lg`).
 * @param {string} [props.className] Extra class on the frame.
 * @param {import('react').ReactNode} props.children The media (img, video, div…).
 */
export default function ParallaxMedia({
  strength = 6,
  aspectRatio = '16 / 9',
  rounded = false,
  className,
  children,
  ...rest
}) {
  const frameRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const offset = Math.min(Math.max(strength, 0), 8);

  // Progress 0→1 while the frame crosses the viewport.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${offset}%`, `${offset}%`]);

  const classes = [styles.frame, rounded ? styles.rounded : '', className]
    .filter(Boolean)
    .join(' ');
  // Static in both modes → no re-crop when reduced-motion state flips.
  const insets = { top: `-${offset}%`, bottom: `-${offset}%` };

  return (
    <div ref={frameRef} className={classes} style={{ aspectRatio }} {...rest}>
      <motion.div
        className={styles.media}
        style={reduced ? insets : { ...insets, y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
