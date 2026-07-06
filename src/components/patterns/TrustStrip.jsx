import { useEffect, useRef, useState } from 'react';
import styles from './TrustStrip.module.css';

/**
 * TODO: replace these text-based wordmark placeholders with the real
 * partner/certifier SVG logos once licensing/assets are cleared.
 * Tones alternate blue/green purely as placeholder styling.
 * NOTE: the CSS `:focus-within` pause is latent until the wordmarks become
 * real (focusable) links — the logo-swap task must verify it then.
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
 * @param {'marquee'|'static'} [props.variant='marquee'] `static` renders a
 *        quiet, centered, non-animated row (used for the relocated certifier
 *        credentials above the final CTA) — no loop, no duplicate track, no
 *        IntersectionObserver. `marquee` is the original scrolling band.
 * @param {boolean} [props.showLabel=false] Render the group label as a visible
 *        eyebrow (the `static` credential row wants a heading; the marquee
 *        keeps it as an aria-only group label).
 * @param {string} [props.className]
 */
export default function TrustStrip({
  partners = DEFAULT_PARTNERS,
  label = 'Partner und Zertifizierungen',
  variant = 'marquee',
  showLabel = false,
  className = '',
  ...rest
}) {
  const isStatic = variant === 'static';
  const rootRef = useRef(null);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    // The static row never animates, so it never needs the off-screen pause.
    if (isStatic) return undefined;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setOffscreen(!entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isStatic]);

  const classes = [
    styles.strip,
    isStatic ? styles.static : '',
    offscreen ? styles.offscreen : '',
    className,
  ]
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

  // Duration scales with item count so the px/s speed stays sane whether
  // 4 or 12 partners are passed (and on ultrawide viewports).
  const marqueeStyle = { '--marquee-duration': `${partners.length * 6}s` };

  // Static credential row: one centered, non-animated track — no duplicate,
  // no marquee timing. The label renders as a visible eyebrow when asked.
  if (isStatic) {
    return (
      <div ref={rootRef} className={classes} role="group" aria-label={label} {...rest}>
        {showLabel && <p className={styles.label}>{label}</p>}
        <ul className={styles.track}>{renderItems()}</ul>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={classes} role="group" aria-label={label} {...rest}>
      <div className={styles.viewport} style={marqueeStyle}>
        <ul className={styles.track}>{renderItems()}</ul>
        <ul className={styles.track} aria-hidden="true">
          {renderItems()}
        </ul>
      </div>
    </div>
  );
}
