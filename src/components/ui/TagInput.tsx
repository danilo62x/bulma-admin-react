import { useState, useRef, useEffect, type KeyboardEvent } from 'react'

interface TagInputProps {
  value: string[]
  onChange: (v: string[]) => void
  data?: string[]
  onTyping?: (text: string) => void
  allowNew?: boolean
  autocomplete?: boolean
  openOnFocus?: boolean
  icon?: string
  placeholder?: string
  type?: 'is-primary' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger' | ''
}

export default function TagInput({
  value,
  onChange,
  data = [],
  onTyping,
  allowNew = false,
  autocomplete = false,
  openOnFocus = false,
  icon: _icon,
  placeholder,
}: TagInputProps) {
  const [text, setText] = useState('')
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

  function addTag(t: string) {
    const trimmed = t.trim()
    if (!trimmed || value.includes(trimmed)) return
    onChange([...value, trimmed])
    setText('')
  }

  function removeTag(t: string) {
    onChange(value.filter((v) => v !== t))
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && (allowNew || data.includes(text))) {
      e.preventDefault()
      addTag(text)
    } else if (e.key === 'Backspace' && text === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const suggestions = autocomplete
    ? data.filter((d) => !value.includes(d) && d.toLowerCase().includes(text.toLowerCase()))
    : []

  return (
    <div ref={ref} className="tx-taginput">
      {value.map((t) => (
        <span key={t} className="tx-tag-pill">
          {t}
          <button type="button" onClick={() => removeTag(t)} aria-label="Remover">
            ×
          </button>
        </span>
      ))}
      <input
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value)
          onTyping?.(e.target.value)
          setOpen(true)
        }}
        onFocus={() => openOnFocus && setOpen(true)}
        onKeyDown={handleKey}
      />
      {open && autocomplete && suggestions.length > 0 && (
        <div className="tx-taginput-suggestions">
          {suggestions.map((s) => (
            <div
              key={s}
              className="tx-autocomplete-item"
              onMouseDown={(e) => {
                e.preventDefault()
                addTag(s)
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
