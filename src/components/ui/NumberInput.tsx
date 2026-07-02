interface NumberInputProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  controls?: boolean
  controlsPosition?: 'compact'
  type?: 'is-primary' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger' | ''
  disabled?: boolean
  placeholder?: string
}

export default function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  controls = true,
  type = '',
  disabled = false,
  placeholder,
}: NumberInputProps) {
  function clamp(v: number) {
    if (min != null && v < min) return min
    if (max != null && v > max) return max
    return v
  }

  return (
    <div className={`tx-numberinput ${type}`}>
      {controls && (
        <button
          type="button"
          disabled={disabled || (min != null && value <= min)}
          onClick={() => onChange(clamp(value - step))}
        >
          −
        </button>
      )}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
      />
      {controls && (
        <button
          type="button"
          disabled={disabled || (max != null && value >= max)}
          onClick={() => onChange(clamp(value + step))}
        >
          +
        </button>
      )}
    </div>
  )
}
