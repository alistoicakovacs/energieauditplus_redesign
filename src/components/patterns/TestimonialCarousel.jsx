import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import { DUR_BASE, EASE_OUT } from '../motion/motionTokens.js';
import styles from './TestimonialCarousel.module.css';

const SWIPE_OFFSET = 60;
const SWIPE_VELOCITY = 400;

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -48 : 48, opacity: 0 }),
};

/**
 * TestimonialCarousel — quote cards with manual prev/next + indicators
 * (plan §5 Tier 2 item 10). NO autoplay, ever (plan §7.1: nothing loops
 * except hero + TrustStrip). Slide/fade via Motion; the x-slide is dropped
 * under reduced motion (`MotionConfig reducedMotion="user"`), leaving a
 * short opacity fade; swipe (drag) is disabled under reduced motion too.
 *
 * A11y — same carousel pattern family as the hero (plan §5 item 9):
 * `role="region"` + `aria-roledescription="Karussell"` on the root, each
 * slide `role="group"` + `aria-roledescription="Folie"` with a German
 * position label; slide changes announce via `aria-live="polite"` (safe:
 * changes are always user-initiated). Prev/next/indicator buttons are
 * 44px with German labels; ratings get a text alternative.
 *
 * @param {object} props
 * @param {{quote: string, name: string, rating?: number, date?: string}[]} props.items
 * @param {string} [props.label='Kundenstimmen'] German region label.
 * @param {string} [props.className]
 */
export default function TestimonialCarousel({
  items,
  label = 'Kundenstimmen',
  className = '',
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const [[index, direction], setState] = useState([0, 0]);
  const count = items.length;

  const goTo = (next, dir) => {
    setState([(next + count) % count, dir]);
  };
  const prev = () => goTo(index - 1, -1);
  const next = () => goTo(index + 1, 1);

  const onDragEnd = (_event, info) => {
    if (info.offset.x < -SWIPE_OFFSET || info.velocity.x < -SWIPE_VELOCITY) next();
    else if (info.offset.x > SWIPE_OFFSET || info.velocity.x > SWIPE_VELOCITY) prev();
  };

  const item = items[index];
  const transition = {
    duration: reduced ? 0.2 : DUR_BASE,
    ease: EASE_OUT,
  };
  const classes = [styles.carousel, className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="region"
      aria-roledescription="Karussell"
      aria-label={label}
      {...rest}
    >
      <div className={styles.viewport} aria-live="polite">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            className={styles.slide}
            role="group"
            aria-roledescription="Folie"
            aria-label={`Bewertung ${index + 1} von ${count}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            drag={reduced ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            <figure className={styles.figure}>
              <blockquote className={styles.quote}>„{item.quote}“</blockquote>
              <figcaption className={styles.caption}>
                {typeof item.rating === 'number' && (
                  <span
                    className={styles.stars}
                    role="img"
                    aria-label={`Bewertung: ${item.rating} von 5 Sternen`}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={n <= item.rating ? styles.starFilled : styles.star}
                        strokeWidth={1.85}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                )}
                <span className={styles.name}>{item.name}</span>
                {item.date && <span className={styles.date}>{item.date}</span>}
              </figcaption>
            </figure>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navButton}
          onClick={prev}
          aria-label="Vorherige Bewertung"
        >
          <ChevronLeft className={styles.navIcon} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className={styles.indicators}>
          {items.map((entry, i) => (
            <button
              key={entry.name + i}
              type="button"
              className={[styles.indicator, i === index ? styles.indicatorActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Bewertung ${i + 1} von ${count} anzeigen`}
              aria-current={i === index ? 'true' : undefined}
            >
              <span className={styles.dot} aria-hidden="true" />
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.navButton}
          onClick={next}
          aria-label="Nächste Bewertung"
        >
          <ChevronRight className={styles.navIcon} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
