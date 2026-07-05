import { motion } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { EASE_OUT, DUR_BASE, DUR_SLOW } from './motionTokens.js';
import { useStaggerContext } from './StaggerGroup.jsx';

/**
 * Reveal — the global entrance default (plan §7.1): fade + 20px rise on
 * scroll-into-view, once, `--ease-out`, 300–600ms.
 *
 * Standalone it triggers itself via `whileInView`. Inside a `<StaggerGroup>`
 * it hands the trigger to the parent and only contributes its
 * `hidden`/`visible` variants, so the group can stagger it.
 *
 * SSG/reduced motion: renders a plain element in final state (also the
 * server-rendered markup, so static HTML is always fully visible).
 *
 * @param {object} props
 * @param {keyof JSX.IntrinsicElements} [props.as='div'] Rendered element/tag.
 * @param {number} [props.delay=0] Seconds before the reveal starts (standalone only).
 * @param {number} [props.duration=0.5] Seconds — clamped to the 0.3–0.6 window.
 * @param {number} [props.y=20] Rise distance in px.
 * @param {number} [props.amount=0.25] Portion of the element that must be visible to trigger.
 * @param {string} [props.className]
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  duration = 0.5,
  y = 20,
  amount = 0.25,
  className,
  children,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const inStaggerGroup = useStaggerContext();

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] ?? motion.div;
  const dur = Math.min(Math.max(duration, DUR_BASE), DUR_SLOW);
  const variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      // Inside a StaggerGroup the parent's staggerChildren owns the delay.
      transition: { duration: dur, ease: EASE_OUT, delay: inStaggerGroup ? 0 : delay },
    },
  };

  if (inStaggerGroup) {
    // Parent StaggerGroup owns initial/whileInView + stagger timing.
    return (
      <MotionTag className={className} variants={variants} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
