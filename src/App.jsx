import { useState } from 'react'
import ProgressBar from './components/ProgressBar'
import StepPersonal from './components/StepPersonal'
import StepAccount from './components/StepAccount'
import StepReview from './components/StepReview'
import SuccessScreen from './components/SuccessScreen'
import './App.css'

export default function App() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function updateFormData(newFields) {
    setFormData(prev => ({ ...prev, ...newFields }))
  }

  function goNext() {
    setStep(s => s + 1)
  }

  function goBack() {
    setStep(s => s - 1)
  }

  function handleSubmit() {
    console.log('form submitted!')
    console.log(formData)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessScreen name={formData.firstName} />
  }

  return (
    <div className="app-wrapper">
      <div className="wizard-card">
        <div className="wizard-header">
          <span className="brand-logo">
            <span className="brand-icon">⬡</span>
            Registration Wizard
          </span>
          <p className="wizard-tagline">Create your account</p>
        </div>

        <ProgressBar currentStep={step} totalSteps={3} />

        <div className="wizard-body">
          {step === 1 && (
            <StepPersonal
              formData={formData}
              updateFormData={updateFormData}
              onNext={goNext}
            />
          )}
          {step === 2 && (
            <StepAccount
              formData={formData}
              updateFormData={updateFormData}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 3 && (
            <StepReview
              formData={formData}
              onBack={goBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}
