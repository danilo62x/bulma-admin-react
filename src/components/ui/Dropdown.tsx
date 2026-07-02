import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from 'react'

interface DropdownProps {
  trigger: (state: { active: boolean }) => ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
  menuStyle?: React.CSSProperties
}

export default function Dropdown({
  trigger,
  children,
  align = 'left',
  className,
  menuStyle,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  function handleTriggerClick(e: MouseEvent) {
    e.stopPropagation()
    setOpen((v) => !v)
  }

  function handleMenuClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (target.closest('.tx-dropdown-item')) {
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className={`tx-dropdown ${className ?? ''}`}>
      <div onClick={handleTriggerClick}>{trigger({ active: open })}</div>
      {open && (
        <div
          className={`tx-dropdown-menu ${align === 'left' ? 'is-left' : ''}`}
          style={menuStyle}
          onClick={handleMenuClick}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function DropdownItem({
  children,
  onClick,
  className,
  disabled,
}: DropdownItemProps) {
  return (
    <button
      type="button"
      className={`tx-dropdown-item ${className ?? ''} ${
        disabled ? 'is-disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function DropdownDivider() {
  return <hr className="tx-dropdown-divider" />
}
