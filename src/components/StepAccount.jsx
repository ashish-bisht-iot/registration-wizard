import { useState, useEffect, useRef } from 'react'
import FormField from './FormField'
import './Steps.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function StepAccount({ formData, updateFormData, onNext, onBack }) {
  const [local, setLocal] = useState({
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  })

  const [touched, setTouched] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const passwordRef = useRef(null)
  const confirmRef = useRef(null)

  useEffect(() => {
    updateFormData(local)
  }, [local])

  function handleChange(field, value) {
    setLocal(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const errors = {}

  if (!EMAIL_REGEX.test(local.email)) {
    errors.email = 'Enter a valid email — needs an @ symbol'
  }
  if (local.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }
  if (local.confirmPassword !== local.password) {
    errors.confirmPassword = 'Passwords do not match'
  }

  const isValid = Object.keys(errors).length === 0

  // password strength
  function getStrength(pwd) {
    if (pwd.length === 0) return null
    if (pwd.length < 6) return { label: 'Weak', color: '#F43F5E', pct: 25 }
    if (pwd.length < 8) return { label: 'Fair', color: '#F59E0B', pct: 55 }
    if (pwd.length < 12) return { label: 'Good', color: '#6366F1', pct: 75 }
    return { label: 'Strong', color: '#10B981', pct: 100 }
  }

  const strength = getStrength(local.password)

  function handleEmailKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      passwordRef.current?.focus()
    }
  }

  function handlePasswordKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      confirmRef.current?.focus()
    }
  }

  function handleConfirmKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      if (isValid) onNext()
    }
  }

  return (
    <div className="step-wrapper">
      <div className="step-heading">
        <h2 className="step-title">Account Details</h2>
        <p className="step-desc">Set up your login credentials.</p>
      </div>

      <div className="fields-stack">
        <FormField
          label="Email Address"
          id="email"
          type="email"
          value={local.email}
          placeholder="ashish@example.com"
          onChange={e => handleChange('email', e.target.value)}
          onKeyDown={handleEmailKeyDown}
          error={touched.email ? errors.email : ''}
        />

        <div>
          <FormField
            ref={passwordRef}
            label="Password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={local.password}
            placeholder="Min. 8 characters"
            onChange={e => handleChange('password', e.target.value)}
            onKeyDown={handlePasswordKeyDown}
            error={touched.password ? errors.password : ''}
            suffix={
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword(s => !s)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            }
          />
          {/* strength bar only shows after typing */}
          {strength && (
            <div className="strength-bar-wrap">
              <div className="strength-track">
                <div
                  className="strength-fill"
                  style={{ width: `${strength.pct}%`, background: strength.color }}
                />
              </div>
              <span className="strength-label" style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
          )}
        </div>

        <FormField
          ref={confirmRef}
          label="Confirm Password"
          id="confirmPassword"
          type={showConfirm ? 'text' : 'password'}
          value={local.confirmPassword}
          placeholder="Re-enter your password"
          onChange={e => handleChange('confirmPassword', e.target.value)}
          onKeyDown={handleConfirmKeyDown}
          error={touched.confirmPassword ? errors.confirmPassword : ''}
          suffix={
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowConfirm(s => !s)}
            >
              {showConfirm ? 'Hide' : 'Show'}
            </button>
          }
        />
      </div>

      <div className="step-actions two-buttons">
        <button type="button" className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={onNext}
          disabled={!isValid}
        >
          Review →
        </button>
      </div>
    </div>
  )
}
