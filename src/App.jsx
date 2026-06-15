import { useState } from 'react'
import ProgressBar from './components/ProgressBar'
import StepPersonal from './components/StepPersonal'
import StepAccount from './components/StepAccount'
import StepReview from './components/StepReview'
import SuccessScreen from './components/SuccessScreen'
import './App.css'

const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const TOTAL_STEPS = 3

export default function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [submitted, setSubmitted] = useState(false)

  
  function updateFormData(fields) {
    setFormData(prev => ({ ...prev, ...fields }))
  }

  function handleNext() {
    if (step < TOTAL_STEPS) setStep(s => s + 1)
  }

  function handleBack() {
    if (step > 1) setStep(s => s - 1)
  }

  function handleSubmit() {
    console.log('=== Registration Payload ===')
    console.log(formData)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessScreen name={formData.firstName} />
  }

  return (
    <div className="app-wrapper">
      <div className="wizard-card">
        {/* Brand header */}
        <div className="wizard-header">
          <span className="brand-logo">
            <span className="brand-icon">⬡</span>
            OnboardIQ
          </span>
          <p className="wizard-tagline">Create your account</p>
        </div>

        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

        <div className="wizard-body">
          {step === 1 && (
            <StepPersonal
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <StepAccount
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <StepReview
              formData={formData}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}
