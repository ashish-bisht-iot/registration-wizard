import './FormField.css'

// reusable input component that can be used for all form fields in the app
export default function FormField({ label, id, type = 'text', value, onChange, error, placeholder, suffix }) {
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

      {/* only render the error paragraph if there's actually an error */}
      {error && <p className="field-error">{error}</p>}
    </div>
  )
}
