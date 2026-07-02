import type { ReactNode, CSSProperties } from 'react'

interface FieldProps {
  label?: string
  message?: string
  type?: '' | 'is-success' | 'is-danger' | 'is-warning' | 'is-info'
  horizontal?: boolean
  grouped?: boolean
  expanded?: boolean
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export default function Field({
  label,
  message,
  type = '',
  horizontal = false,
  grouped = false,
  expanded = false,
  children,
  style,
  className,
}: FieldProps) {
  const cls = [
    'field',
    horizontal && 'is-horizontal',
    grouped && 'is-grouped',
    expanded && 'is-expanded',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (horizontal) {
    return (
      <div className={cls} style={style}>
        {label && (
          <div className="field-label is-normal">
            <label className="label">{label}</label>
          </div>
        )}
        <div className="field-body">
          <div className={`field ${type}`}>
            {children}
            {message && <p className={`help ${type}`}>{message}</p>}
          </div>
        </div>
      </div>
    )
  }

  if (grouped) {
    return (
      <div className={cls} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div className={`${cls} ${type}`} style={style}>
      {label && <label className="label">{label}</label>}
      {children}
      {message && <p className={`help ${type}`}>{message}</p>}
    </div>
  )
}
