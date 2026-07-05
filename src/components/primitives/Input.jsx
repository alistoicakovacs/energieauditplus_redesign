import { forwardRef } from 'react';
import { FieldShell, useFieldIds } from './formField.jsx';
import styles from './formField.module.css';

/**
 * Text input — label above, ≥44px height, error + hint slots, aria wiring.
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.error]
 * @param {string} [props.hint]
 */
const Input = forwardRef(function Input(
  { label, id, error, hint, required = false, className = '', ...rest },
  ref
) {
  const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, { hint, error });
  return (
    <FieldShell
      fieldId={fieldId}
      label={label}
      required={required}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
    >
      <input
        ref={ref}
        id={fieldId}
        className={[styles.control, error ? styles.invalid : '', className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        required={required || undefined}
        {...rest}
      />
    </FieldShell>
  );
});

export default Input;
