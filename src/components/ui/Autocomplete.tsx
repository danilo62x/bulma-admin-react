import { useState, useRef, useEffect } from 'react'

interface AutocompleteProps {
  value: string
  onChange: (v: string) => void
  data: string[]
  onSelect?: (v: string) => void
  placeholder?: string
  icon?: string
  expanded?: boolean
  clearable?: boolean
  openOnFocus?: boolean
}

export default function Autocomplete({
  value,
  onChange,
  data,
  onSelect,
  placeholder,
  icon,
  expanded = true,
  clearable = false,
  openOnFocus = false,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={ref} className={`tx-autocomplete ${expanded ? 'is-expanded' : ''}`}>
      <div
        className={`control ${expanded ? 'is-expanded' : ''} ${
          icon ? 'has-icons-left' : ''
        } ${clearable && value ? 'has-icons-right' : ''}`}
      >
        <input
          className="input"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => openOnFocus && setOpen(true)}
        />
        {icon && (
          <span className="icon is-small is-left">
            <i className={`mdi mdi-${icon}`} />
          </span>
        )}
        {clearable && value && (
          <span
            className="icon is-small is-right"
            style={{ cursor: 'pointer', pointerEvents: 'all' }}
            onClick={() => onChange('')}
          >
            <i className="mdi mdi-close" />
          </span>
        )}
      </div>
      {open && data.length > 0 && (
        <div className="tx-autocomplete-list">
          {data.map((opt) => (
            <div
              key={opt}
              className="tx-autocomplete-item"
              onMouseDown={(e) => {
                e.preventDefault()
                onChange(opt)
                onSelect?.(opt)
                setOpen(false)
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
