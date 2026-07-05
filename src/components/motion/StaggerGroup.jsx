import { createContext, useContext, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { STAGGER } from './motionTokens.js';
import useBelowFold from './useBelowFold.js';

/**
 * Orchestration context: `Reveal` children detect it and switch from
 * self-triggered reveals to parent-driven variants, so the group controls
 * the 60–80ms stagger (plan §7.1). Reveal resets the context below itself,
 * so only DIRECT Reveal children participate — deeper Reveals keep their
 * own scroll trigger.
 */
export const StaggerContext = createContext(false);

/** @returns {boolean} true when rendered as a direct child of <StaggerGroup>. */
export function useStaggerContext() {
  return useContext(StaggerContext);
}

/**
 * StaggerGroup — parent that staggers the entrance of its **direct**
 * `Reveal` children by 60–80ms when scrolled into view (once).
 *
 * Children must be `Reveal` components (or any motion element defining
 * `hidden`/`visible` variants) — the group propagates the variant labels
 * and its `staggerChildren` transition to them.
 *
 * Hydration/flash safety: the group ALWAYS renders the motion element
 * (element type never changes), mounts in the visible state
 * (`initial={false}`), and only arms the hidden→staggered entrance when it
 * mounted fully below the fold and the user does not prefer reduced motion.
 * Content already on screen (prerendered HTML, above-fold sections) is never
 * re-hidden. SSG output is always the final state.
 *
 * @param {object} props
 * @param {keyof JSX.IntrinsicElements} [props.as='div'] Rendered element/tag.
 * @param {number} [props.stagger=0.07] Seconds between children (keep 0.06–0.08).
 * @param {number} [props.delay=0] Seconds before the first child starts.
 * @param {number} [props.amount=0.2] Portion of the group that must be visible to trigger.
 * @param {string} [props.className]
 */
export default function StaggerGroup({
  as = 'div',
  stagger = STAGGER,
  delay = 0,
  amount = 0.2,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const belowFold = useBelowFold(ref);
  const inView = useInView(ref, { once: true, amount });

  const MotionTag = motion[as] ?? motion.div;
  const groupVariants = {
    // Entered only pre-paint while off-screen; children snap hidden via
    // their own duration-0 hidden transitions.
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const armed = belowFold && !reduced;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={groupVariants}
      initial={false}
      animate={armed && !inView ? 'hidden' : 'visible'}
      {...rest}
    >
      <StaggerContext.Provider value={true}>{children}</StaggerContext.Provider>
    </MotionTag>
  );
}
