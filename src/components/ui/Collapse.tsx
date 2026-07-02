import { type ReactNode } from 'react'

interface CollapseProps {
  open: boolean
  onToggle: (open: boolean) => void
  trigger: (state: { open: boolean }) => ReactNode
  children: ReactNode
}

export default function Collapse({ open, onToggle, trigger, children }: CollapseProps) {
  return (
    <div className="tx-collapse-item">
      <div onClick={() => onToggle(!open)}>{trigger({ open })}</div>
      {open && children}
    </div>
  )
}
