interface DatePickerProps {
  value: Date | null
  onChange: (v: Date | null) => void
  icon?: string
  placeholder?: string
  expanded?: boolean
  type?: 'date' | 'time' | 'datetime-local'
}

function toInputValue(d: Date | null, type: string): string {
  if (!d) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  const yyyy = d.getFullYear()
  const mm = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const mi = pad(d.getMinutes())
  if (type === 'time') return `${hh}:${mi}`
  if (type === 'datetime-local') return `${yyyy}-${mm}-${dd}T${hh}:${mi}`
  return `${yyyy}-${mm}-${dd}`
}

export default function DatePicker({
  value,
  onChange,
  icon = 'calendar',
  placeholder,
  expanded = true,
  type = 'date',
}: DatePickerProps) {
  return (
    <div
      className={`control ${expanded ? 'is-expanded' : ''} ${
        icon ? 'has-icons-left' : ''
      } tx-datepicker`}
    >
      <input
        className="input"
        type={type}
        value={toInputValue(value, type)}
        placeholder={placeholder}
        onChange={(e) => {
          const v = e.target.value
          if (!v) {
            onChange(null)
            return
          }
          if (type === 'time') {
            const [hh, mm] = v.split(':')
            const d = value ? new Date(value) : new Date()
            d.setHours(Number(hh), Number(mm), 0, 0)
            onChange(d)
          } else {
            onChange(new Date(v))
          }
        }}
      />
      {icon && (
        <span className="icon is-small is-left">
          <i className={`mdi mdi-${icon}`} />
        </span>
      )}
    </div>
  )
}
