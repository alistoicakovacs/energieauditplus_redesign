import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { EASE_OUT, DUR_SLOW } from './motionTokens.js';
import useBelowFold from './useBelowFold.js';
import styles from './SplitTextReveal.module.css';

/**
 * SplitTextReveal — word-level staggered reveal (translate + opacity) for
 * hero headlines ONLY (plan §5 Tier 3 / §7.4 restraint: not for body copy).
 *
 * A11y pattern: the split words live in an `aria-hidden` container so screen
 * readers never hear a word-by-word stutter; the intact sentence is provided
 * in a visually-hidden span. Splitting preserves whitespace exactly.
 *
 * Hydration/flash safety: the split-span structure is ALWAYS rendered (SSG
 * and reduced motion included — words simply sit fully visible), so the DOM
 * shape never changes at hydration and an LCP headline is never remounted or
 * re-hidden. The word entrance only arms when the element mounted fully
 * below the fold with motion allowed; the Phase 3 hero first-load
 * choreography (plan §7.4a) is a separate anime.js timeline, not this
 * component's job.
 *
 * Intentionally ignores StaggerContext: a headline orchestrates its own
 * words and must never become a staggered child of a StaggerGroup.
 *
 * @param {object} props
 * @param {string} props.text The headline text (must be a plain string).
 * @param {keyof JSX.IntrinsicElements} [props.as='span'] Rendered element/tag
 *   (compose inside a Heading, or pass 'h1' directly).
 * @param {number} [props.delay=0] Seconds before the first word starts.
 * @param {number} [props.stagger=0.06] Seconds between words.
 * @param {number} [props.duration=0.6] Seconds per word.
 * @param {number} [props.amount=0.5] Portion visible before triggering.
 * @param {string} [props.className]
 */
export default function SplitTextReveal({
  text,
  as = 'span',
  delay = 0,
  stagger = 0.06,
  duration = DUR_SLOW,
  amount = 0.5,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const belowFold = useBelowFold(ref);
  const inView = useInView(ref, { once: true, amount });
  const Tag = as;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const wordVariants = {
    // hidden is only ever entered pre-paint while off-screen → snap.
    hidden: { opacity: 0, y: '0.5em', transition: { duration: 0 } },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE_OUT },
    },
  };

  // Split on whitespace runs, keeping them, so the sentence re-assembles 1:1.
  const tokens = text.split(/(\s+)/);
  const armed = belowFold && !reduced;

  return (
    <Tag ref={ref} className={className} {...rest}>
      <span className="visually-hidden">{text}</span>
      <motion.span
        aria-hidden="true"
        className={styles.words}
        variants={containerVariants}
        initial={false}
        animate={armed && !inView ? 'hidden' : 'visible'}
      >
        {tokens.map((token, i) =>
          /\S/.test(token) ? (
            // eslint-disable-next-line react/no-array-index-key
            <motion.span key={i} className={styles.word} variants={wordVariants}>
              {token}
            </motion.span>
          ) : (
            token
          )
        )}
      </motion.span>
    </Tag>
  );
}
