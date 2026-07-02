interface RateProps {
  value: number
  onChange?: (v: number) => void
  max?: number
  size?: 'is-small' | 'is-medium' | 'is-large' | ''
  disabled?: boolean
}

export default function Rate({
  value,
  onChange,
  max = 5,
  size = '',
  disabled = false,
}: RateProps) {
  return (
    <div className={`tx-rate ${size} ${disabled ? 'is-disabled' : ''}`}>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          className={`tx-rate-star ${n <= value ? 'is-active' : ''}`}
          onClick={() => !disabled && onChange?.(n)}
          disabled={disabled}
          aria-label={`${n} estrelas`}
        >
          <span className={`mdi ${n <= value ? 'mdi-star' : 'mdi-star-outline'}`} />
        </button>
      ))}
    </div>
  )
}
