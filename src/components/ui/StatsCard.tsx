import type { CSSProperties } from 'react'

interface StatsCardProps {
  value: string | number
  label: string
  icon: string
  color?: string
  trend?: string
  trendUp?: boolean
}

export default function StatsCard({
  value,
  label,
  icon,
  color = '#485fc7',
  trend,
  trendUp,
}: StatsCardProps) {
  const trendColor =
    trendUp === undefined
      ? 'var(--tx-text-muted)'
      : trendUp
      ? 'var(--tx-success)'
      : 'var(--tx-danger)'

  const trendIcon =
    trendUp === undefined
      ? 'mdi-minus'
      : trendUp
      ? 'mdi-trending-up'
      : 'mdi-trending-down'

  const iconStyle = { '--icon-color': color } as CSSProperties

  return (
    <div className="tx-stats-card">
      <div className="tx-stats-icon" style={iconStyle}>
        <span className={`mdi ${icon}`} />
      </div>
      <div className="tx-stats-info">
        <div className="tx-stats-value">{value}</div>
        <div className="tx-stats-label">{label}</div>
        {trend && (
          <div className="tx-stats-trend" style={{ color: trendColor }}>
            <span className={`mdi ${trendIcon}`} style={{ fontSize: '0.85rem' }} />
            {' '}{trend}
          </div>
        )}
      </div>
    </div>
  )
}
