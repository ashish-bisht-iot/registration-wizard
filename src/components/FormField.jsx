import './FormField.css'

// Reusable field: renders label, input, and inline error message.
// error prop is a string — empty/undefined means no error shown.
export default function FormField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  suffix, // optional node rendered inside the field (e.g. show/hide toggle)
}) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className={`field-input-wrap ${error ? 'has-error' : ''}`}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="field-input"
          autoComplete="off"
        />
        {suffix && <div className="field-suffix">{suffix}</div>}
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  )
}
