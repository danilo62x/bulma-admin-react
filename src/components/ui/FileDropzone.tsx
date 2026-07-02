import { useRef, useState } from 'react'

interface Props {
  accept?: string
  maxFiles?: number
  onFiles?: (files: File[]) => void
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function FileDropzone({ accept, maxFiles = 5, onFiles }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function add(list: FileList | null) {
    if (!list) return
    const next = [...files, ...Array.from(list)].slice(0, maxFiles)
    setFiles(next)
    onFiles?.(next)
  }

  function remove(idx: number) {
    const next = files.filter((_, i) => i !== idx)
    setFiles(next)
    onFiles?.(next)
  }

  return (
    <div>
      <label
        className={`tx-dropzone ${dragging ? 'is-active' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragging(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          add(e.dataTransfer?.files ?? null)
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '2rem',
          textAlign: 'center',
          border: `2px dashed ${dragging ? 'var(--tx-primary, #485fc7)' : 'var(--tx-border, #d0d5dd)'}`,
          borderRadius: 8,
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          style={{ display: 'none' }}
          accept={accept}
          multiple
          onChange={(e) => add(e.target.files)}
        />
        <span className="mdi mdi-cloud-upload" style={{ fontSize: '2rem', color: 'var(--tx-primary, #485fc7)' }} />
        <p className="has-text-weight-medium">
          {dragging ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para enviar'}
        </p>
        <p className="is-size-7 has-text-grey">Até {maxFiles} arquivos</p>
      </label>

      {files.length > 0 && (
        <ul style={{ marginTop: '0.75rem' }}>
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                border: '1px solid var(--tx-border, #e4e7ec)',
                borderRadius: 6,
                marginBottom: '0.5rem',
              }}
            >
              <span className="mdi mdi-file-outline" style={{ marginRight: '0.5rem' }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</span>
              <span className="is-size-7 has-text-grey" style={{ marginLeft: '0.5rem' }}>
                {formatSize(file.size)}
              </span>
              <button className="delete is-small" style={{ marginLeft: 'auto' }} onClick={() => remove(idx)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
