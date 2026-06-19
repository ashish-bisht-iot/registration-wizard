import { forwardRef } from 'react'
import './FormField.css'

const FormField = forwardRef(function FormField(
  { label, id, type = 'text', value, onChange, onKeyDown, onBlur, error, placeholder, suffix },
  ref
) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>

      <div className={`field-input-wrap ${error ? 'has-error' : ''}`}>
        <input
          ref={ref}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          placeholder={placeholder}
          className="field-input"
          autoComplete="off"
        />
        {suffix && <div className="field-suffix">{suffix}</div>}
      </div>

      {/* error message */}
      {error && <p className="field-error">{error}</p>}
    </div>
  )
})

export default FormField
