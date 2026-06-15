import './ProgressBar.css'

const STEP_LABELS = ['Personal Info', 'Account Details', 'Review']

export default function ProgressBar({ currentStep, totalSteps }) {
  const pct = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="progress-wrapper">
      {/* Step dots with connecting track */}
      <div className="step-track-container">
        <div className="track-line">
          <div className="track-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="step-dots">
          {STEP_LABELS.map((label, i) => {
            const num = i + 1
            const isDone = num < currentStep
            const isActive = num === currentStep
            return (
              <div key={label} className="dot-group">
                <div
                  className={`step-dot ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
                >
                  {isDone ? '✓' : num}
                </div>
                <span className={`dot-label ${isActive ? 'label-active' : ''}`}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Counter text */}
      <p className="step-counter">Step {currentStep} of {totalSteps}</p>
    </div>
  )
}
