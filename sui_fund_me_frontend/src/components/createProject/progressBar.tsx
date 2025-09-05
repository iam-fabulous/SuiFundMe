interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-white">{Math.round(progress)}% Complete</span>
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` } as React.CSSProperties}
        />
      </div>
    </div>
  )
}
