import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import useBelowFold from '../motion/useBelowFold.js';
import styles from './KineticStatement.module.css';

/**
 * KineticStatement — the ONE theatrical typographic moment per page
 * (plan §13.3 / homepage §6.1.6): a full-width, oversized display-type
 * statement whose words color in one by one, linked to scroll position
 * (Motion `useScroll` + per-word opacity crossfade between the muted base
 * layer and the fully-colored overlay — transform/opacity only, §7.6).
 *
 * Restraint rule (binding): at most one per page — homepage and
 * (optionally) the QNG-flow page only.
 *
 * A11y pattern (same contract as SplitTextReveal): the split words live in
 * an `aria-hidden` container so screen readers hear the intact sentence
 * from a visually-hidden span, never a word-by-word stutter.
 *
 * Hydration/flash safety: the effect only arms when the element mounted
 * fully below the fold with motion allowed. Prerendered HTML and
 * reduced-motion render the statement fully colored and static.
 *
 * @param {object} props
 * @param {string} props.text The statement (plain string).
 * @param {keyof JSX.IntrinsicElements} [props.as='p'] Rendered element/tag.
 * @param {string} [props.className]
 */
export default function KineticStatement({ text, as = 'p', className = '', ...rest }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const belowFold = useBelowFold(ref);
  const Tag = as;

  // Word i colors in over [start, start + window] of the scroll progress.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  });

  const armed = belowFold && !reduced;
  const tokens = text.split(/(\s+)/);
  const words = tokens.filter((token) => /\S/.test(token));
  const classes = [styles.statement, className].filter(Boolean).join(' ');

  let wordIndex = -1;
  return (
    <Tag ref={ref} className={classes} {...rest}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true" className={styles.words}>
        {tokens.map((token, i) => {
          if (!/\S/.test(token)) return token;
          wordIndex += 1;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Word
              key={i}
              progress={scrollYProgress}
              index={wordIndex}
              count={words.length}
              armed={armed}
            >
              {token}
            </Word>
          );
        })}
      </span>
    </Tag>
  );
}

/**
 * One word, rendered twice: a muted base layer plus a colored overlay whose
 * opacity is scroll-driven. Only opacity animates — no layout, no color
 * interpolation (both layers use token colors from CSS).
 */
function Word({ progress, index, count, armed, children }) {
  // Stagger the per-word windows across the scroll range, with a window
  // wide enough that neighbouring words overlap softly. Starts spread over
  // [0, 0.75] so the LAST window ends at ≈0.95 — the statement finishes
  // coloring safely before the offset range runs out, even for near-bottom
  // placements (hardening for e.g. the future QNG page).
  const start = count > 1 ? (index / (count - 1)) * 0.75 : 0;
  const opacity = useTransform(progress, [start, start + 0.2], [0, 1]);

  return (
    <span className={styles.word}>
      <span className={styles.base}>{children}</span>
      <motion.span className={styles.fill} style={armed ? { opacity } : undefined}>
        {children}
      </motion.span>
    </span>
  );
}
