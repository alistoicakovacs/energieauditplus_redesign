import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { EASE_OUT, DUR_BASE, DUR_SLOW } from './motionTokens.js';
import { StaggerContext, useStaggerContext } from './StaggerGroup.jsx';
import useBelowFold from './useBelowFold.js';

/**
 * Reveal — the global entrance default (plan §7.1): fade + 20px rise on
 * scroll-into-view, once, `--ease-out`, 300–600ms.
 *
 * Standalone it triggers itself (`useInView`, once). As a DIRECT child of a
 * `<StaggerGroup>` it hands the trigger to the parent and only contributes
 * its `hidden`/`visible` variants, so the group can stagger it. Reveal
 * resets StaggerContext below itself, so Reveals nested deeper inside its
 * subtree keep their own scroll trigger.
 *
 * Hydration/flash safety: the motion element is ALWAYS rendered (element
 * type never changes between reduced/animated), mounts in the visible state
 * (`initial={false}`), and the hidden→reveal entrance is only armed when the
 * element mounted fully below the fold with motion allowed. Content already
 * on screen — above-fold on load, or anything visible when prerendered HTML
 * hydrates — is never re-hidden. SSG output is always the final state.
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
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const inStaggerGroup = useStaggerContext();
  const belowFold = useBelowFold(ref);
  const inView = useInView(ref, { once: true, amount });
  const warnedRef = useRef(false);

  const dur = Math.min(Math.max(duration, DUR_BASE), DUR_SLOW);
  if (import.meta.env.DEV && dur !== duration && !warnedRef.current) {
    warnedRef.current = true;
    // eslint-disable-next-line no-console
    console.warn(
      `[Reveal] duration ${duration}s is outside the 0.3–0.6s window (plan §7.1) — clamped to ${dur}s.`
    );
  }

  const MotionTag = motion[as] ?? motion.div;
  const variants = {
    // hidden is only ever entered pre-paint while off-screen → snap, don't animate.
    hidden: { opacity: 0, y, transition: { duration: 0 } },
    visible: {
      opacity: 1,
      y: 0,
      // Inside a StaggerGroup the parent's staggerChildren owns the delay.
      transition: { duration: dur, ease: EASE_OUT, delay: inStaggerGroup ? 0 : delay },
    },
  };

  if (inStaggerGroup) {
    // Parent StaggerGroup owns initial/animate + stagger timing; this element
    // only contributes variants. Context resets so deeper Reveals self-trigger.
    return (
      <MotionTag ref={ref} className={className} variants={variants} {...rest}>
        <StaggerContext.Provider value={false}>{children}</StaggerContext.Provider>
      </MotionTag>
    );
  }

  const armed = belowFold && !reduced;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial={false}
      animate={armed && !inView ? 'hidden' : 'visible'}
      {...rest}
    >
      <StaggerContext.Provider value={false}>{children}</StaggerContext.Provider>
    </MotionTag>
  );
}
