import './SuccessScreen.css'

export default function SuccessScreen({ name }) {
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2 className="success-title">You're in, {name}.</h2>
        <p className="success-body">
          Your registration payload has been logged to the console.
          In a real app this would trigger email verification.
        </p>
        <p className="success-hint">Open DevTools → Console to see your data object.</p>
      </div>
    </div>
  )
}
