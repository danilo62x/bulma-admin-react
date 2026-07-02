import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?:
    | 'is-primary'
    | 'is-link'
    | 'is-info'
    | 'is-success'
    | 'is-warning'
    | 'is-danger'
    | 'is-light'
    | 'is-dark'
    | 'is-text'
    | 'is-ghost'
    | 'is-white'
    | ''
  size?: 'is-small' | 'is-normal' | 'is-medium' | 'is-large'
  outlined?: boolean
  inverted?: boolean
  rounded?: boolean
  loading?: boolean
  iconLeft?: string
  iconRight?: string
  expanded?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  children?: ReactNode
}

export default function Button({
  type = '',
  size,
  outlined,
  inverted,
  rounded,
  loading,
  iconLeft,
  iconRight,
  expanded,
  nativeType = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    'button',
    type,
    size,
    outlined && 'is-outlined',
    inverted && 'is-inverted',
    rounded && 'is-rounded',
    loading && 'is-loading',
    expanded && 'is-fullwidth',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={nativeType} className={cls} {...rest}>
      {iconLeft && (
        <span className="icon">
          <i className={`mdi mdi-${iconLeft}`} />
        </span>
      )}
      {children && <span>{children}</span>}
      {iconRight && (
        <span className="icon">
          <i className={`mdi mdi-${iconRight}`} />
        </span>
      )}
    </button>
  )
}
