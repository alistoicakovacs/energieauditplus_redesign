import { Lightbulb } from 'lucide-react';
import styles from './PraxistippCallout.module.css';

/**
 * PraxistippCallout — amber advisory callout (style guide §5.3):
 * `--amber-100` background, 4px amber left border, lightbulb icon,
 * „Praxistipp" overline, body slot. Text/icon use `--amber-700` (the
 * accessible amber step on light backgrounds, §4 color discipline).
 *
 * @param {object} props
 * @param {string} [props.title='Praxistipp'] Overline label.
 * @param {import('react').ReactNode} props.children Body content.
 * @param {string} [props.className]
 */
export default function PraxistippCallout({ title = 'Praxistipp', children, className = '', ...rest }) {
  const classes = [styles.callout, className].filter(Boolean).join(' ');
  return (
    <aside className={classes} role="note" aria-label={title} {...rest}>
      <span className={styles.icon} aria-hidden="true">
        <Lightbulb className={styles.iconSvg} strokeWidth={1.85} />
      </span>
      <div className={styles.content}>
        <p className={styles.overline}>{title}</p>
        <div className={styles.body}>{children}</div>
      </div>
    </aside>
  );
}
