interface SliderProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  type?: 'is-primary' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger' | ''
}

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  type = '',
}: SliderProps) {
  return (
    <div className={`tx-slider ${type}`}>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}
