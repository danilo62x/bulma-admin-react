import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface SidebarProps {
  open: boolean
  onClose: () => void
  right?: boolean
  overlay?: boolean
  children: ReactNode
}

export default function Sidebar({
  open,
  onClose,
  right = false,
  overlay = true,
  children,
}: SidebarProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <>
      {overlay && <div className="tx-offcanvas-overlay" onClick={onClose} />}
      <aside className={`tx-offcanvas ${right ? 'is-right' : 'is-left'}`}>
        {children}
      </aside>
    </>,
    document.body
  )
}
