import { useState, useEffect, useRef } from 'react'
import FormField from './FormField'
import './Steps.css'

export default function StepPersonal({ formData, updateFormData, onNext }) {
  const [local, setLocal] = useState({
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
  })

  const [touched, setTouched] = useState({})

  const lastNameRef = useRef(null)
  const dobRef = useRef(null)

  useEffect(() => {
    updateFormData(local)
  }, [local])

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

  // Enter on First Name -> jump to Last Name
  function handleFirstNameKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      lastNameRef.current?.focus()
    }
  }

  // Enter on Last Name -> jump to Date of Birth
  function handleLastNameKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      dobRef.current?.focus()
    }
  }

  // Enter on Date of Birth -> submit step if everything is valid
  function handleDobKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (isValid) onNext()
    }
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
            onKeyDown={handleFirstNameKeyDown}
            error={touched.firstName ? errors.firstName : ''}
          />
          <FormField
            ref={lastNameRef}
            label="Last Name"
            id="lastName"
            value={local.lastName}
            placeholder="Bisht"
            onChange={e => handleChange('lastName', e.target.value)}
            onKeyDown={handleLastNameKeyDown}
            error={touched.lastName ? errors.lastName : ''}
          />
        </div>

        <FormField
          ref={dobRef}
          label="Date of Birth"
          id="dateOfBirth"
          type="date"
          value={local.dateOfBirth}
          onChange={e => handleChange('dateOfBirth', e.target.value)}
          onKeyDown={handleDobKeyDown}
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
