import { forwardRef } from 'react';
import { FieldShell, useFieldIds } from './formField.jsx';
import styles from './formField.module.css';

/**
 * Multiline text field — same contract as Input.
 */
const Textarea = forwardRef(function Textarea(
  { label, id, error, hint, required = false, rows = 5, className = '', ...rest },
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
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        className={[styles.control, error ? styles.invalid : '', className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        required={required || undefined}
        {...rest}
      />
    </FieldShell>
  );
});

export default Textarea;
