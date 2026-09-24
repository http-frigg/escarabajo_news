import styles from "./FormField.module.css";

export function FormField({
  label,
  name,
  as = "input",
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  ...rest
}) {
  const Tag = as;
  const fieldId = `field-${name}`;

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId}>{label}</label>
      <Tag
        id={fieldId}
        name={name}
        type={as === "input" ? type : undefined}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${styles.control} ${error ? styles.controlError : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${fieldId}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
