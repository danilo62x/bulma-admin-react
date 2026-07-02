import { useState, type ReactNode, type CSSProperties } from 'react'

interface MessageProps {
  type?: 'is-info' | 'is-success' | 'is-warning' | 'is-danger' | ''
  title?: string
  icon?: string
  closable?: boolean
  children: ReactNode
  style?: CSSProperties
}

export default function Message({
  type = 'is-info',
  title,
  icon,
  closable = false,
  children,
  style,
}: MessageProps) {
  const [open, setOpen] = useState(true)
  if (!open) return null

  const showHeader = title || icon || closable

  return (
    <article className={`tx-message ${type}`} style={style}>
      {showHeader && (
        <div className="tx-message-header">
          {icon && <span className={`mdi mdi-${icon}`} />}
          {title && <span>{title}</span>}
          {closable && (
            <button
              type="button"
              className="tx-message-close"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              ×
            </button>
          )}
        </div>
      )}
      <div className="tx-message-body">{children}</div>
    </article>
  )
}
