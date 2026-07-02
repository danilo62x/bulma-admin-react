interface Step {
  label: string
  clickable?: boolean
}

interface StepsProps {
  steps: Step[]
  current: number
  onChange?: (idx: number) => void
}

export default function Steps({ steps, current, onChange }: StepsProps) {
  return (
    <div className="tx-steps">
      <div className="tx-step-line" />
      {steps.map((s, i) => {
        const status =
          i + 1 < current ? 'is-completed' : i + 1 === current ? 'is-active' : ''
        const disabled = s.clickable === false
        return (
          <div
            key={s.label}
            className={`tx-step ${status} ${disabled ? 'is-disabled' : ''}`}
            onClick={() => !disabled && onChange?.(i + 1)}
          >
            <div className="tx-step-marker">{i + 1}</div>
            <div className="tx-step-label">{s.label}</div>
          </div>
        )
      })}
    </div>
  )
}
