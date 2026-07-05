import styles from './Heading.module.css';

/**
 * Heading with decoupled semantics and visuals so heading order stays logical.
 * @param {object} props
 * @param {1|2|3|4|5|6} props.level    semantic heading level (h1..h6)
 * @param {'display'|'h1'|'h2'|'h3'|'h4'} [props.size]  visual size; defaults to matching level
 */
const sizeClass = {
  display: styles.display,
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
};

export default function Heading({ level = 2, size, className = '', children, ...rest }) {
  const Tag = `h${level}`;
  const visual = size ?? (level <= 4 ? `h${level}` : 'h4');
  const classes = [styles.heading, sizeClass[visual] ?? styles.h2, className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
