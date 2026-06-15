import './Steps.css'
import './StepReview.css'

// Mask the password so it shows as dots in the summary
function maskPassword(pwd) {
  return '•'.repeat(pwd.length)
}

function ReviewRow({ label, value }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className="review-value">{value}</span>
    </div>
  )
}

export default function StepReview({ formData, onBack, onSubmit }) {
  const { firstName, lastName, dateOfBirth, email, password } = formData

  return (
    <div className="step-wrapper">
      <div className="step-heading">
        <h2 className="step-title">Review & Confirm</h2>
        <p className="step-desc">Everything look right? Submitting will log your payload to the console.</p>
      </div>

      <div className="review-card">
        <div className="review-section">
          <p className="review-section-title">Personal Info</p>
          <ReviewRow label="First Name"    value={firstName} />
          <ReviewRow label="Last Name"     value={lastName} />
          <ReviewRow label="Date of Birth" value={dateOfBirth} />
        </div>

        <div className="review-divider" />

        <div className="review-section">
          <p className="review-section-title">Account Details</p>
          <ReviewRow label="Email"    value={email} />
          <ReviewRow label="Password" value={maskPassword(password)} />
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
