import type { ReactNode } from 'react'

interface RadioProps {
  modelValue?: string
  onChange?: (v: string) => void
  nativeValue: string
  name?: string
  type?: 'is-success' | 'is-info' | 'is-warning' | 'is-danger' | ''
  disabled?: boolean
  children?: ReactNode
}

export default function Radio({
  modelValue,
  onChange,
  nativeValue,
  name,
  type = '',
  disabled = false,
  children,
}: RadioProps) {
  return (
    <label
      className={`radio ${type} ${disabled ? 'is-disabled' : ''}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
    >
      <input
        type="radio"
        value={nativeValue}
        name={name}
        checked={modelValue === nativeValue}
        disabled={disabled}
        onChange={() => onChange?.(nativeValue)}
      />
      {children && <span>{children}</span>}
    </label>
  )
}
