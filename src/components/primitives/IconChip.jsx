import styles from './IconChip.module.css';

/**
 * Tinted square icon tile (service icons etc.), per style guide §4.1.
 * @param {object} props
 * @param {import('react').ComponentType} props.icon  Lucide icon component
 * @param {'blue'|'green'|'gradient'} [props.tone]
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {string} [props.label]  German aria-label if the icon conveys meaning
 */
const toneClass = { blue: styles.blue, green: styles.green, gradient: styles.gradient };
const sizeClass = { sm: styles.sm, md: styles.md, lg: styles.lg };

export default function IconChip({ icon: Icon, tone = 'blue', size = 'md', label, className = '', ...rest }) {
  const classes = [styles.chip, toneClass[tone] ?? styles.blue, sizeClass[size] ?? styles.md, className]
    .filter(Boolean)
    .join(' ');
  return (
    <span
      className={classes}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
      {...rest}
    >
      <Icon className={styles.icon} strokeWidth={1.75} />
    </span>
  );
}
