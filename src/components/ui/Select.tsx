import type { ReactNode, SelectHTMLAttributes } from 'react'

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange' | 'size'> {
  value?: string | number | string[]
  onChange?: (val: string | string[]) => void
  icon?: string
  size?: number | 'is-small' | 'is-normal' | 'is-medium' | 'is-large'
  status?: '' | 'is-success' | 'is-danger' | 'is-warning' | 'is-info'
  expanded?: boolean
  multiple?: boolean
  placeholder?: string
  children: ReactNode
}

export default function Select({
  value,
  onChange,
  icon,
  size,
  status = '',
  expanded = true,
  multiple,
  placeholder,
  children,
  ...rest
}: SelectProps) {
  const sizeClass =
    typeof size === 'string' ? size : ''
  const sizeAttr = typeof size === 'number' ? size : undefined

  return (
    <div
      className={`control ${expanded ? 'is-expanded' : ''} ${
        icon ? 'has-icons-left' : ''
      }`}
    >
      <div
        className={`select ${sizeClass} ${status} ${
          expanded ? 'is-fullwidth' : ''
        } ${multiple ? 'is-multiple' : ''}`}
      >
        <select
          value={value as any}
          multiple={multiple}
          size={sizeAttr}
          onChange={(e) => {
            if (multiple) {
              const opts = Array.from(e.target.selectedOptions).map((o) => o.value)
              onChange?.(opts)
            } else {
              onChange?.(e.target.value)
            }
          }}
          {...rest}
        >
          {placeholder !== undefined && !multiple && (
            <option value="" disabled hidden={value !== ''}>
              {placeholder}
            </option>
          )}
          {children}
        </select>
      </div>
      {icon && (
        <span className="icon is-small is-left">
          <i className={`mdi mdi-${icon}`} />
        </span>
      )}
    </div>
  )
}
