import styles from './Badge.module.css';

/**
 * Small tinted status/label pill (non-interactive).
 * @param {object} props
 * @param {'blue'|'green'|'amber'|'neutral'} [props.tone]
 */
const toneClass = {
  blue: styles.blue,
  green: styles.green,
  amber: styles.amber,
  neutral: styles.neutral,
};

export default function Badge({ tone = 'blue', className = '', children, ...rest }) {
  const classes = [styles.badge, toneClass[tone] ?? styles.blue, className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
