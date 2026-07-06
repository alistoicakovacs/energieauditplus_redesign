import { Star } from 'lucide-react';
import styles from './ReviewProof.module.css';

/**
 * Small inline Google „G" glyph (self-hosted SVG — no external request, so it
 * stays DSGVO-clean like the rest of the font/asset pipeline). Decorative:
 * the link's aria-label already names Google, so this is aria-hidden.
 */
function GoogleGlyph() {
  return (
    <svg className={styles.google} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.86-.08-1.68-.22-2.47H12v4.68h6.46a5.5 5.5 0 0 1-2.4 3.6v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29v-3.1H1.29A12 12 0 0 0 0 12c0 1.94.46 3.77 1.29 5.39l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.61l4 3.1C6.23 6.86 8.88 4.75 12 4.75Z"
      />
    </svg>
  );
}

/**
 * ReviewProof — compact Google-reviews social-proof band. Replaces the old
 * partner-logo marquee in the strip directly under the hero (plan §6.1 slot 2).
 *
 * Stacked, overlapping monogram avatars (reviewer initials — DSGVO-safe, no
 * photos) + aggregate star rating + review count, wrapped in a single link that
 * points at the full reviews. Static (no marquee/JS), so SSG markup is final and
 * there is no CLS. The whole band is ONE tab stop; the visual pieces are
 * decorative (`aria-hidden`) and the link's aria-label carries the meaning.
 *
 * @param {object} props
 * @param {{initial: string}[]} props.avatars  Reviewer initials, in display order.
 * @param {number} [props.rating=5]            Aggregate rating (0–5).
 * @param {string} [props.count='50+']         Review-count label (placeholder-friendly).
 * @param {string} [props.href='#kundenstimmen'] Link target (in-page anchor by
 *        default; swap for the Google Business review URL when available).
 * @param {number} [props.maxAvatars=5]        How many bubbles to show before the „+".
 * @param {string} [props.className]
 */
export default function ReviewProof({
  avatars = [],
  rating = 5,
  count = '50+',
  href = '#kundenstimmen',
  maxAvatars = 5,
  className = '',
  ...rest
}) {
  const shown = avatars.slice(0, maxAvatars);
  const overflow = avatars.length > maxAvatars;
  const ratingText = rating.toFixed(1).replace('.', ',');
  const filled = Math.round(rating);
  const ariaLabel = `${ratingText} von 5 Sternen aus ${count} Google-Bewertungen – Kundenstimmen ansehen`;

  const external = /^https?:\/\//.test(href);
  const linkRest = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  const classes = [styles.strip, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <a className={styles.proof} href={href} aria-label={ariaLabel} {...linkRest}>
        <ul className={styles.bubbles} aria-hidden="true">
          {shown.map((a, i) => (
            <li
              key={`${a.initial}-${i}`}
              className={styles.bubble}
              data-tone={i % 5}
              style={{ '--i': i }}
            >
              <span className={styles.initial}>{a.initial}</span>
            </li>
          ))}
          {overflow && (
            <li className={`${styles.bubble} ${styles.more}`} style={{ '--i': shown.length }}>
              <span className={styles.initial}>+</span>
            </li>
          )}
        </ul>

        <span className={styles.meta}>
          <span className={styles.stars} aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={18}
                className={n <= filled ? styles.starFilled : styles.star}
                aria-hidden="true"
              />
            ))}
          </span>
          <span className={styles.figures} aria-hidden="true">
            <strong className={styles.rating}>{ratingText}</strong>
            <span className={styles.count}>
              aus {count} <GoogleGlyph />{' '}
              <span className={styles.googleWord}>Google-Bewertungen</span>
            </span>
          </span>
        </span>
      </a>
    </div>
  );
}
