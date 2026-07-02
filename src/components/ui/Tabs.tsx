import { type ReactNode } from 'react'

export interface TabItem {
  label: string
  icon?: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  value: number
  onChange: (idx: number) => void
}

export default function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="tx-tabs">
      <div className="tx-tabs-nav">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            className={`tx-tab ${value === i ? 'is-active' : ''}`}
            onClick={() => onChange(i)}
          >
            {t.icon && <span className={`mdi mdi-${t.icon}`} />}
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      <div className="tx-tabs-content">{tabs[value]?.content}</div>
    </div>
  )
}
