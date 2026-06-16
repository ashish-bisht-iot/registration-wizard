import './Steps.css'
import './StepReview.css'

export default function StepReview({ formData, onBack, onSubmit }) {
  const { firstName, lastName, dateOfBirth, email, password } = formData

  // replace each character with a dot so password doesn't show in plaintext
  const maskedPassword = '•'.repeat(password.length)

  return (
    <div className="step-wrapper">
      <div className="step-heading">
        <h2 className="step-title">Review & Confirm</h2>
        <p className="step-desc">Double-check everything before submitting.</p>
      </div>

      <div className="review-card">
        <div className="review-section">
          <p className="review-section-title">Personal Info</p>

          <div className="review-row">
            <span className="review-label">First Name</span>
            <span className="review-value">{firstName}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Last Name</span>
            <span className="review-value">{lastName}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Date of Birth</span>
            <span className="review-value">{dateOfBirth}</span>
          </div>
        </div>

        <div className="review-divider" />

        <div className="review-section">
          <p className="review-section-title">Account Details</p>

          <div className="review-row">
            <span className="review-label">Email</span>
            <span className="review-value">{email}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Password</span>
            <span className="review-value">{maskedPassword}</span>
          </div>
        </div>
      </div>

      <div className="step-actions two-buttons">
        <button type="button" className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="btn-submit" onClick={onSubmit}>
          Submit ✓
        </button>
      </div>
    </div>
  )
}
