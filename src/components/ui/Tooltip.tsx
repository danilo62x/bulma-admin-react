import type { ReactNode } from 'react'

interface TooltipProps {
  label: string
  position?: 'is-top' | 'is-bottom' | 'is-left' | 'is-right'
  type?: 'is-dark' | 'is-success' | 'is-warning' | 'is-danger' | 'is-info' | ''
  children: ReactNode
}

export default function Tooltip({
  label,
  position = 'is-top',
  type = 'is-dark',
  children,
}: TooltipProps) {
  return (
    <span className={`tx-tooltip ${position} ${type}`}>
      {children}
      <span className="tx-tooltip-text">{label}</span>
    </span>
  )
}
