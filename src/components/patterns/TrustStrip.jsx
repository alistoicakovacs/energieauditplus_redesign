import { useEffect, useRef, useState } from 'react';
import styles from './TrustStrip.module.css';

/**
 * TODO: replace these text-based wordmark placeholders with the real
 * partner/certifier SVG logos once licensing/assets are cleared.
 * Tones alternate blue/green purely as placeholder styling.
 */
const DEFAULT_PARTNERS = [
  { name: 'dena', tone: 'blue' },
  { name: 'DGNB', tone: 'green' },
  { name: 'KfW', tone: 'blue' },
  { name: 'BAFA', tone: 'green' },
  { name: 'QNG', tone: 'blue' },
  { name: 'IHK', tone: 'green' },
];

/**
 * TrustStrip — partner/certifier logo marquee (plan §5 Tier 2 item 10;
 * style guide §5.7): `--ink-100` strip, grayscale→color on hover,
 * continuous CSS marquee.
 *
 * Behavior contract:
 * - Pauses on hover and focus-within (CSS `animation-play-state`).
 * - Pauses while off-screen (IntersectionObserver toggles a class — the
 *   loop does zero work outside the viewport, plan §7.6).
 * - Reduced motion: the marquee is DISABLED via a pure CSS media query
 *   (static wrapping row, duplicate track hidden) — no JS branch, so SSG
 *   markup and hydration are identical and nothing flashes.
 *
 * The second track is an `aria-hidden` duplicate that makes the loop
 * seamless; screen readers hear each partner exactly once.
 *
 * @param {object} props
 * @param {{name: string, tone?: 'blue'|'green'}[]} [props.partners]
 * @param {string} [props.label='Partner und Zertifizierungen'] German group label.
 * @param {string} [props.className]
 */
export default function TrustStrip({
  partners = DEFAULT_PARTNERS,
  label = 'Partner und Zertifizierungen',
  className = '',
  ...rest
}) {
  const rootRef = useRef(null);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setOffscreen(!entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = [styles.strip, offscreen ? styles.offscreen : '', className]
    .filter(Boolean)
    .join(' ');

  const renderItems = () =>
    partners.map((partner) => (
      <li key={partner.name} className={styles.item}>
        {/* TODO: swap for the real SVG logo (see DEFAULT_PARTNERS note). */}
        <span
          className={[
            styles.wordmark,
            partner.tone === 'green' ? styles.green : styles.blue,
          ].join(' ')}
          data-placeholder="logo"
        >
          {partner.name}
        </span>
      </li>
    ));

  return (
    <div ref={rootRef} className={classes} role="group" aria-label={label} {...rest}>
      <div className={styles.viewport}>
        <ul className={styles.track}>{renderItems()}</ul>
        <ul className={styles.track} aria-hidden="true">
          {renderItems()}
        </ul>
      </div>
    </div>
  );
}
