import { useRef, type ReactNode } from 'react'

interface UploadProps {
  value: File | null
  onChange: (f: File | null) => void
  accept?: string
  children: ReactNode
}

export default function Upload({
  value: _value,
  onChange,
  accept,
  children,
}: UploadProps) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <label
      className="tx-upload-zone"
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) onChange(file)
      }}
    >
      <input
        ref={ref}
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {children}
    </label>
  )
}
