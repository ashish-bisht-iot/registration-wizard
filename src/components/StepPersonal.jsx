import { useState, useRef } from 'react'
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

  function handleBlur(field) {
    updateFormData({ [field]: local[field] })
  }

  function handleFirstNameKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      lastNameRef.current?.focus()
    }
  }
  
  function handleLastNameKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      dobRef.current?.focus()
    }
  }

  function handleDobKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()

      updateFormData({ dateOfBirth: local.dateOfBirth })
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
        {/* name row */}
        <div className="field-row">
          <FormField
            label="First Name"
            id="firstName"
            value={local.firstName}
            placeholder="Ashish"
            onChange={e => handleChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
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
            onBlur={() => handleBlur('lastName')}
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
          onBlur={() => handleBlur('dateOfBirth')}
          onKeyDown={handleDobKeyDown}
          error={touched.dateOfBirth ? errors.dateOfBirth : ''}
        />
      </div>

      <div className="step-actions">
        {/* button stays disabled until all 3 fields pass */}
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            updateFormData(local)
            onNext()
          }}
          disabled={!isValid}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
