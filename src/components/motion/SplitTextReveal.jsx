import { motion } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { EASE_OUT, DUR_SLOW } from './motionTokens.js';
import styles from './SplitTextReveal.module.css';

/**
 * SplitTextReveal — word-level staggered reveal (translate + opacity) for
 * hero headlines ONLY (plan §5 Tier 3 / §7.4 restraint: not for body copy).
 *
 * A11y pattern: the split words live in an `aria-hidden` container so screen
 * readers never hear a word-by-word stutter; the intact sentence is provided
 * in a visually-hidden span. Splitting preserves whitespace exactly.
 *
 * SSG/reduced motion: renders the plain intact text — no spans, no animation.
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
  const reduced = usePrefersReducedMotion();
  const Tag = as;

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {text}
      </Tag>
    );
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: '0.5em' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE_OUT },
    },
  };

  // Split on whitespace runs, keeping them, so the sentence re-assembles 1:1.
  const tokens = text.split(/(\s+)/);

  return (
    <Tag className={className} {...rest}>
      <span className="visually-hidden">{text}</span>
      <motion.span
        aria-hidden="true"
        className={styles.words}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
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
