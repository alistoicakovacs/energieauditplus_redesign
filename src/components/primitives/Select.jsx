import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { FieldShell, useFieldIds } from './formField.jsx';
import fieldStyles from './formField.module.css';
import styles from './Select.module.css';

/**
 * Native select with custom chevron — same contract as Input.
 * @param {object} props
 * @param {Array<{value:string,label:string,disabled?:boolean}>} [props.options]
 */
const Select = forwardRef(function Select(
  { label, id, error, hint, required = false, options, className = '', children, ...rest },
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
      <span className={styles.wrapper}>
        <select
          ref={ref}
          id={fieldId}
          className={[
            fieldStyles.control,
            styles.select,
            error ? fieldStyles.invalid : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={required || undefined}
          {...rest}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown className={styles.chevron} strokeWidth={2} aria-hidden="true" />
      </span>
    </FieldShell>
  );
});

export default Select;
