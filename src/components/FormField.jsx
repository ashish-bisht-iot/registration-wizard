import { forwardRef } from 'react'
import './FormField.css'

const FormField = forwardRef(function FormField(
  { label, id, type = 'text', value, onChange, onKeyDown, error, placeholder, suffix },
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
})

export default FormField
