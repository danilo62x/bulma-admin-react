import type { ReactNode } from 'react'

interface CheckboxProps {
  checked?: boolean
  onChange?: (v: boolean) => void
  indeterminate?: boolean
  disabled?: boolean
  type?: 'is-success' | 'is-info' | 'is-warning' | 'is-danger' | ''
  value?: string
  modelValue?: string[]
  onModelValueChange?: (v: string[]) => void
  children?: ReactNode
}

export default function Checkbox({
  checked,
  onChange,
  indeterminate,
  disabled,
  type = '',
  value,
  modelValue,
  onModelValueChange,
  children,
}: CheckboxProps) {
  // Array-mode for native-value
  if (modelValue !== undefined && value !== undefined) {
    const isChecked = modelValue.includes(value)
    return (
      <label className={`checkbox ${type} ${disabled ? 'is-disabled' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
        <input
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          ref={(el) => {
            if (el) el.indeterminate = !!indeterminate
          }}
          onChange={(e) => {
            if (e.target.checked) {
              onModelValueChange?.([...modelValue, value])
            } else {
              onModelValueChange?.(modelValue.filter((v) => v !== value))
            }
          }}
        />
        {children && <span>{children}</span>}
      </label>
    )
  }

  return (
    <label className={`checkbox ${type} ${disabled ? 'is-disabled' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
      <input
        type="checkbox"
        checked={checked ?? false}
        disabled={disabled}
        ref={(el) => {
          if (el) el.indeterminate = !!indeterminate
        }}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {children && <span>{children}</span>}
    </label>
  )
}
