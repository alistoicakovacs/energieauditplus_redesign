import styles from './Overline.module.css';

/**
 * Eyebrow label above section headings — signature element.
 * @param {object} props
 * @param {'blue'|'green'} [props.color]
 */
export default function Overline({ color = 'blue', as: Tag = 'p', className = '', children, ...rest }) {
  const classes = [styles.overline, color === 'green' ? styles.green : styles.blue, className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
