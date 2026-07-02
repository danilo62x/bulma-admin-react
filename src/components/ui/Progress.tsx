interface ProgressProps {
  value?: number
  max?: number
  type?: 'is-primary' | 'is-success' | 'is-warning' | 'is-danger' | 'is-info' | ''
  size?: 'is-small' | ''
}

export default function Progress({
  value,
  max = 100,
  type = '',
  size = '',
}: ProgressProps) {
  const indeterminate = value === undefined

  return (
    <div className={`tx-progress ${type} ${size} ${indeterminate ? 'is-indeterminate' : ''}`}>
      <div
        className="tx-progress-bar"
        style={{ width: indeterminate ? '40%' : `${(value / max) * 100}%` }}
      />
    </div>
  )
}
