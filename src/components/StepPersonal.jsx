import { useState, useEffect } from 'react'
import FormField from './FormField'
import './Steps.css'

// Very simple validation for step 1:
// Names must be at least 2 chars, DOB must exist.
function validate(data) {
  const errors = {}
  if (data.firstName.trim().length < 2) errors.firstName = 'First name must be at least 2 characters.'
  if (data.lastName.trim().length < 2)  errors.lastName  = 'Last name must be at least 2 characters.'
  if (!data.dateOfBirth)                errors.dateOfBirth = 'Date of birth is required.'
  return errors
}

export default function StepPersonal({ formData, updateFormData, onNext }) {
  // Local mirror of the three fields so we can run onChange validation
  const [local, setLocal] = useState({
    firstName:   formData.firstName,
    lastName:    formData.lastName,
    dateOfBirth: formData.dateOfBirth,
  })
  const [touched, setTouched] = useState({})

  // Push local changes up to the parent so state persists across step navigation
  useEffect(() => {
    updateFormData(local)
  }, [local])

  const errors = validate(local)
  const isValid = Object.keys(errors).length === 0

  function handleChange(field, value) {
    setLocal(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  return (
    <div className="step-wrapper">
      <div className="step-heading">
        <h2 className="step-title">Personal Information</h2>
        <p className="step-desc">Let's start with the basics. This helps us verify your identity.</p>
      </div>

      <div className="fields-stack">
        <div className="field-row">
          <FormField
            label="First Name"
            id="firstName"
            value={local.firstName}
            placeholder="Ashish"
            onChange={e => handleChange('firstName', e.target.value)}
            error={touched.firstName ? errors.firstName : ''}
          />
          <FormField
            label="Last Name"
            id="lastName"
            value={local.lastName}
            placeholder="Bisht"
            onChange={e => handleChange('lastName', e.target.value)}
            error={touched.lastName ? errors.lastName : ''}
          />
        </div>

        <FormField
          label="Date of Birth"
          id="dateOfBirth"
          type="date"
          value={local.dateOfBirth}
          onChange={e => handleChange('dateOfBirth', e.target.value)}
          error={touched.dateOfBirth ? errors.dateOfBirth : ''}
        />
      </div>

      <div className="step-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={onNext}
          disabled={!isValid}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
