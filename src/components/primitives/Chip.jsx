import styles from './Chip.module.css';

/**
 * Tag/filter chip. Interactive (renders a toggle `<button>` with
 * `aria-pressed`) only when `onClick` is provided; otherwise a static
 * tag — `selected` without `onClick` merely styles the static tag.
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
