import styles from './Chip.module.css';

/**
 * Tag/filter chip. Interactive when `onClick` or `selected` is provided
 * (renders a toggle button), otherwise a static tag.
 * @param {object} props
 * @param {boolean} [props.selected]
 * @param {Function} [props.onClick]
 */
export default function Chip({ selected = false, onClick, disabled = false, className = '', children, ...rest }) {
  const interactive = typeof onClick === 'function';
  const classes = [
    styles.chip,
    interactive ? styles.interactive : '',
    selected ? styles.selected : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (interactive) {
    return (
      <button
        type="button"
        className={classes}
        aria-pressed={selected}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
