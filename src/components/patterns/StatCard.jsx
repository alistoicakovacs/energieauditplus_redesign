import { IconChip } from '../primitives/index.js';
import CountUp from '../motion/CountUp.jsx';
import Card from './Card.jsx';
import styles from './StatCard.module.css';

/**
 * StatCard — big count-up number + label (style guide §5.3), reusing
 * motion/CountUp (de-DE formatting, below-fold armed, reduced-motion safe:
 * the final value is always in the markup). Eco-gradient accent rule under
 * the number. Non-interactive — no hover lift.
 *
 * Long prefixes („bis zu ") render as their own smaller line ABOVE the
 * number: CountUp is intentionally nowrap (layout-shift-free), so packing
 * prose into the stat-sized line would overflow narrow cards.
 *
 * @param {object} props
 * @param {number} props.value Target number (e.g. 150000).
 * @param {string} [props.prefix] Small qualifier line above the number („bis zu").
 * @param {string} [props.suffix] Text after the number („ €") — keep short.
 * @param {number} [props.decimals=0] Fraction digits (de-DE formatted).
 * @param {string} props.label German label under the number.
 * @param {import('react').ComponentType} [props.icon] Optional Lucide icon.
 * @param {'light'|'dark'} [props.tone='light'] Dark = for StatBand sections.
 * @param {string} [props.className]
 */
export default function StatCard({
  value,
  prefix,
  suffix,
  decimals,
  label,
  icon,
  tone = 'light',
  className = '',
  ...rest
}) {
  const classes = [styles.stat, tone === 'dark' ? styles.dark : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <Card as="div" interactive={false} className={classes} {...rest}>
      {icon && (
        <IconChip
          icon={icon}
          tone={tone === 'dark' ? 'gradient' : 'blue'}
          size="sm"
          className={styles.icon}
        />
      )}
      <p className={styles.number}>
        {prefix && <span className={styles.prefix}>{prefix.trim()}</span>}
        <CountUp value={value} suffix={suffix} decimals={decimals} />
      </p>
      <span className={styles.rule} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </Card>
  );
}
