import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import styles from './ParallaxMedia.module.css';

/**
 * ParallaxMedia — gentle scroll-linked translateY parallax (≤8%, style guide
 * §6.2) for hero media and decorative shapes.
 *
 * CLS-free: the frame owns a fixed `aspect-ratio` and `overflow: hidden`;
 * the media layer is oversized by the parallax amount on top/bottom so the
 * translation never reveals gaps. Transform-only (plan §7.6).
 *
 * Reduced motion / SSG: the transform binding is dropped entirely — the
 * media renders static at its resting position (`MotionConfig` does NOT
 * cover manual `useScroll` bindings, hence the explicit hook gate).
 *
 * @param {object} props
 * @param {number} [props.amount=6] Max offset in % of frame height (clamped to 8).
 * @param {string} [props.aspectRatio='16 / 9'] CSS aspect-ratio of the frame.
 * @param {string} [props.className] Extra class on the frame.
 * @param {import('react').ReactNode} props.children The media (img, video, div…).
 */
export default function ParallaxMedia({
  amount = 6,
  aspectRatio = '16 / 9',
  className,
  children,
  ...rest
}) {
  const frameRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const offset = Math.min(Math.max(amount, 0), 8);

  // Progress 0→1 while the frame crosses the viewport.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${offset}%`, `${offset}%`]);

  const classes = [styles.frame, className].filter(Boolean).join(' ');

  return (
    <div ref={frameRef} className={classes} style={{ aspectRatio }} {...rest}>
      <motion.div
        className={styles.media}
        style={
          reduced
            ? undefined
            : { y, top: `-${offset}%`, bottom: `-${offset}%` }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
