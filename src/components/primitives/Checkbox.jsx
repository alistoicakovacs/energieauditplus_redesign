import { forwardRef, useId } from 'react';
import { Check } from 'lucide-react';
import styles from './Checkbox.module.css';

/**
 * Checkbox — label to the right (supports rich children, e.g. DSGVO consent
 * text with a link), 44px touch target, error slot, aria wiring.
 * @param {object} props
 * @param {import('react').ReactNode} props.label
 * @param {string} [props.error]
 */
const Checkbox = forwardRef(function Checkbox(
  { label, id, error, required = false, disabled = false, className = '', ...rest },
  ref
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={[styles.row, disabled ? styles.disabled : ''].filter(Boolean).join(' ')} htmlFor={fieldId}>
        <span className={styles.control}>
          <input
            ref={ref}
            type="checkbox"
            id={fieldId}
            className={styles.input}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            required={required || undefined}
            disabled={disabled}
            {...rest}
          />
          <span className={[styles.box, error ? styles.invalid : ''].filter(Boolean).join(' ')} aria-hidden="true">
            <Check className={styles.check} strokeWidth={3} />
          </span>
        </span>
        <span className={styles.label}>
          {label}
          {required && (
            <span className={styles.requiredMark} aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </span>
      </label>
      {error && (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
