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
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-text-muted text-[0.85rem] font-semibold">
        {label}
      </label>
      <Tag
        id={fieldId}
        name={name}
        type={as === "input" ? type : undefined}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`bg-bg text-text font-body focus:border-accent-pink rounded-sm border px-4 py-3 text-[0.95rem] resize-y focus:outline-none ${
          error ? "border-[#e08a8a]" : "border-border"
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${fieldId}-error`} className="text-[0.8rem] text-[#f0a8a8]">
          {error}
        </p>
      )}
    </div>
  );
}
