import {
  type CSSProperties,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  useState,
} from 'react'

interface BaseInputProps {
  icon?: string
  iconRight?: string
  iconRightClickable?: boolean
  onIconRightClick?: () => void
  type?: string
  value?: string | number
  onChange?: (v: string) => void
  size?: 'is-small' | 'is-normal' | 'is-medium' | 'is-large'
  status?: '' | 'is-success' | 'is-danger' | 'is-warning' | 'is-info'
  expanded?: boolean
  passwordReveal?: boolean
  loading?: boolean
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  style?: CSSProperties
  maxLength?: number
  hasCounter?: boolean
  rows?: number
}

type InputProps = BaseInputProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'size' | 'type' | 'readOnly'
  >

export default function Input(props: InputProps) {
  const {
    icon,
    iconRight,
    iconRightClickable,
    onIconRightClick,
    type = 'text',
    value,
    onChange,
    size,
    status,
    expanded = true,
    passwordReveal,
    loading,
    placeholder,
    disabled,
    readOnly,
    style,
    maxLength,
    hasCounter,
    rows,
    ...rest
  } = props

  const [reveal, setReveal] = useState(false)
  const actualType = passwordReveal && reveal ? 'text' : type

  const isTextarea = type === 'textarea'

  if (isTextarea) {
    return (
      <div
        className={`control ${expanded ? 'is-expanded' : ''} ${loading ? 'is-loading' : ''}`}
        style={style}
      >
        <textarea
          className={`textarea ${size ?? ''} ${status ?? ''}`}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          rows={rows ?? 3}
          {...rest}
        />
        {hasCounter && maxLength != null && (
          <p className="help" style={{ textAlign: 'right' }}>
            {String(value ?? '').length} / {maxLength}
          </p>
        )}
      </div>
    )
  }

  const showRightIcon = iconRight || (passwordReveal && type === 'password')
  const rightIconName =
    passwordReveal && type === 'password'
      ? reveal
        ? 'mdi-eye-off'
        : 'mdi-eye'
      : iconRight
      ? `mdi-${iconRight}`
      : ''

  function handleRightClick() {
    if (passwordReveal && type === 'password') {
      setReveal((v) => !v)
    } else if (iconRightClickable) {
      onIconRightClick?.()
    }
  }

  return (
    <div
      className={`control ${expanded ? 'is-expanded' : ''} ${
        icon ? 'has-icons-left' : ''
      } ${showRightIcon ? 'has-icons-right' : ''} ${loading ? 'is-loading' : ''}`}
      style={style}
    >
      <input
        className={`input ${size ?? ''} ${status ?? ''}`}
        type={actualType}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        {...rest}
      />
      {icon && (
        <span className="icon is-small is-left">
          <i className={`mdi mdi-${icon}`} />
        </span>
      )}
      {showRightIcon && (
        <span
          className="icon is-small is-right"
          style={
            (passwordReveal && type === 'password') || iconRightClickable
              ? { cursor: 'pointer', pointerEvents: 'all' }
              : undefined
          }
          onClick={handleRightClick}
        >
          <i className={`mdi ${rightIconName}`} />
        </span>
      )}
    </div>
  )
}
