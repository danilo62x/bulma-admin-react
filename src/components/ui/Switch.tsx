import type { ReactNode } from 'react'

interface SwitchProps {
  checked?: boolean
  onChange?: (v: boolean) => void
  type?: 'is-success' | 'is-info' | 'is-warning' | 'is-danger' | ''
  size?: 'is-small' | 'is-large' | ''
  disabled?: boolean
  children?: ReactNode
}

export default function Switch({
  checked = false,
  onChange,
  type = '',
  size = '',
  disabled = false,
  children,
}: SwitchProps) {
  return (
    <label
      className={`tx-switch ${type} ${size} ${disabled ? 'is-disabled' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="tx-switch-track" />
      {children && <span>{children}</span>}
    </label>
  )
}
