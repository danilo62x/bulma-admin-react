import { type ReactNode, type CSSProperties } from 'react'

interface CardComponentProps {
  title?: string
  icon?: string
  noPadding?: boolean
  toolbar?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export default function CardComponent({
  title,
  icon,
  noPadding = false,
  toolbar,
  footer,
  children,
  style,
  className,
}: CardComponentProps) {
  const hasHeader = title || toolbar
  return (
    <div className={`tx-card ${className ?? ''}`} style={style}>
      {hasHeader && (
        <div className="tx-card-header">
          {icon && <span className={`mdi tx-card-header-icon ${icon}`} />}
          <span className="tx-card-title">{title}</span>
          {toolbar}
        </div>
      )}
      <div className="tx-card-body" style={noPadding ? { padding: 0 } : undefined}>
        {children}
      </div>
      {footer && <div className="tx-card-footer">{footer}</div>}
    </div>
  )
}
