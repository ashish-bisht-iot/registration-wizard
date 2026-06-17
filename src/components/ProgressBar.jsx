import './ProgressBar.css'

const stepLabels = ['Personal Info', 'Account Details', 'Review']

export default function ProgressBar({ currentStep, totalSteps }) {
  // step 1 = 0%, step 2 = 50%, step 3 = 100%
  const fillPercent = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="progress-wrapper">
      <div className="step-track-container">
        {/* the grey line + filled indigo line sit behind the dots */}
        <div className="track-line">
          <div className="track-fill" style={{ width: `${fillPercent}%` }} />
        </div>

        <div className="step-dots">
          {stepLabels.map((label, i) => {
            const num = i + 1
            const isDone = num < currentStep
            const isActive = num === currentStep

            return (
              <div key={label} className="dot-group">
                <div className={`step-dot ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
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

      <p className="step-counter">Step {currentStep} of {totalSteps}</p>
    </div>
  )
}