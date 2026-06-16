import { useState, useEffect } from 'react'
import FormField from './FormField'
import './Steps.css'

export default function StepPersonal({ formData, updateFormData, onNext }) {
  // this syncs up to the parent via useEffect below
  const [local, setLocal] = useState({
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
  })

  // touched tracks which fields the user has clicked into
  // without this, errors show on page load before user types anything
  const [touched, setTouched] = useState({})

  useEffect(() => {
    updateFormData(local)
  }, [local])

  // validation errors object — recomputed on every render
  const errors = {}
  if (local.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters'
  }
  if (local.lastName.trim().length < 2) {
    errors.lastName = 'Last name is too short'
  }
  if (!local.dateOfBirth) {
    errors.dateOfBirth = 'Please enter your date of birth'
  }

  const isValid = Object.keys(errors).length === 0

  function handleChange(field, value) {
    setLocal(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  return (
    <div className="step-wrapper">
      <div className="step-heading">
        <h2 className="step-title">Personal Information</h2>
        <p className="step-desc">Let's start with the basics.</p>
      </div>

      <div className="fields-stack">
        {/* name row — two columns side by side */}
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
        {/* button stays disabled until all 3 fields pass */}
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
