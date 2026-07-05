import { createContext, useContext } from 'react';
import { motion } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { STAGGER } from './motionTokens.js';

/**
 * Orchestration context: `Reveal` children detect it and switch from
 * self-triggered `whileInView` to parent-driven variants, so the group
 * controls the 60–80ms stagger (plan §7.1).
 */
export const StaggerContext = createContext(false);

/** @returns {boolean} true when rendered inside a <StaggerGroup>. */
export function useStaggerContext() {
  return useContext(StaggerContext);
}

/**
 * StaggerGroup — parent that staggers the entrance of its `Reveal`-style
 * children by 60–80ms when scrolled into view (once).
 *
 * Children must be `Reveal` components (or any motion element that defines
 * `hidden`/`visible` variants) — the group propagates the variant names and
 * its `staggerChildren` transition to them.
 *
 * SSG/reduced motion: renders a plain element; children render statically too
 * (they consume the same hook).
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
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] ?? motion.div;
  const groupVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      <StaggerContext.Provider value={true}>{children}</StaggerContext.Provider>
    </MotionTag>
  );
}
