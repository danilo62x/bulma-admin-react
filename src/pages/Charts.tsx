import { useState, useMemo } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import CardComponent from '@/components/ui/CardComponent'
import Button from '@/components/ui/Button'
import Dropdown, { DropdownItem } from '@/components/ui/Dropdown'

const chartStatsRaw = [
  { key: 'rev', label: 'Receita Total', value: 'R$ 665k', trend: '+23.4% no ano', trendUp: true, icon: 'mdi-currency-brl', color: '#485fc7', vals: [42, 38, 51, 45, 67, 58, 72, 65, 78, 83, 71, 95] },
  { key: 'ord', label: 'Pedidos', value: '1.284', trend: '+8.2% no mês', trendUp: true, icon: 'mdi-cart', color: '#48c774', vals: [120, 135, 128, 142, 158, 165, 172, 168, 180, 192, 185, 198] },
  { key: 'cus', label: 'Clientes', value: '1.480', trend: '+31.2% no ano', trendUp: true, icon: 'mdi-account-group', color: '#3273dc', vals: [820, 910, 880, 950, 1020, 1150, 1230, 1290, 1310, 1380, 1420, 1480] },
  { key: 'cvr', label: 'Conversão', value: '6.2%', trend: '+0.8pp no mês', trendUp: true, icon: 'mdi-percent', color: '#f59e0b', vals: [3.2, 3.8, 3.5, 4.1, 4.4, 4.2, 4.8, 5.1, 4.9, 5.4, 5.8, 6.2] },
]

const topProducts = [
  { name: 'Monitor 27" 4K', revenue: 'R$ 147.2k', units: 67, pct: 100, icon: 'mdi-monitor', color: '#3273dc' },
  { name: 'Licença Office 365', revenue: 'R$ 121.8k', units: 445, pct: 83, icon: 'mdi-microsoft-office', color: '#e67e22' },
  { name: 'Teclado Mecânico', revenue: 'R$ 65.3k', units: 142, pct: 44, icon: 'mdi-keyboard', color: '#485fc7' },
  { name: 'Hub USB-C 7 em 1', revenue: 'R$ 58.8k', units: 327, pct: 40, icon: 'mdi-usb-port', color: '#1abc9c' },
  { name: 'SSD NVMe 1TB', revenue: 'R$ 54.2k', units: 198, pct: 37, icon: 'mdi-harddisk', color: '#f59e0b' },
]

const funnel = [
  { label: 'Visitantes', count: 24800, pct: 100, color: '#485fc7', rate: '' },
  { label: 'Leads', count: 8920, pct: 36, color: '#3273dc', rate: '36.0%' },
  { label: 'Prospects', count: 3140, pct: 12.7, color: '#48c774', rate: '35.2%' },
  { label: 'Oportunidades', count: 1290, pct: 5.2, color: '#f59e0b', rate: '41.1%' },
  { label: 'Clientes', count: 312, pct: 1.3, color: '#48c774', rate: '24.2%' },
]

function spark(vals: number[]) {
  const W = 60, H = 30, p = 2
  const mn = Math.min(...vals), mx = Math.max(...vals), rng = mx - mn || 1
  const pts = vals.map((v, i) => ({
    x: p + (i / (vals.length - 1)) * (W - 2 * p),
    y: H - p - ((v - mn) / rng) * (H - 2 * p - 3),
  }))
  const line = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x},${pt.y}`).join(' ')
  return {
    line,
    area: `${line} L${W - p},${H} L${p},${H} Z`,
  }
}

const styles = `
.tx-chart-wrap { width: 100%; overflow: hidden; }
.tx-chart-svg { width: 100%; display: block; }
.tx-bar-rect { cursor: pointer; transition: opacity 0.15s; }
.tx-sparkline { flex-shrink: 0; }
.tx-legend-row { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--tx-text-muted); }
.tx-legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
.tx-area-legend { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.5rem; }
.tx-donut-wrap { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.tx-donut-legend { width: 100%; display: flex; flex-direction: column; gap: 0.45rem; }
.tx-donut-leg-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; }
.tx-leg-label { flex: 1; color: var(--tx-text); }
.tx-leg-val { font-weight: 600; color: var(--tx-text-heading); }
.tx-tab-switcher { display: flex; background: var(--tx-body-bg); border: 1px solid var(--tx-border); border-radius: var(--tx-radius); padding: 2px; gap: 2px; }
.tx-tab-btn { padding: 0.2rem 0.65rem; font-size: 0.78rem; border: none; background: transparent; border-radius: calc(var(--tx-radius) - 2px); cursor: pointer; color: var(--tx-text-muted); transition: background 0.15s, color 0.15s; }
.tx-tab-btn.is-active { background: var(--tx-card-bg); color: var(--tx-text); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.tx-top-row { display: flex; align-items: center; gap: 0.65rem; padding: 0.55rem 0; border-bottom: 1px solid var(--tx-border-subtle); }
.tx-top-row:last-child { border-bottom: none; }
.tx-top-rank { width: 18px; font-size: 0.75rem; font-weight: 700; color: var(--tx-text-muted); text-align: center; flex-shrink: 0; }
.tx-top-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.tx-top-info { flex: 1; min-width: 0; }
.tx-top-name { font-size: 0.85rem; font-weight: 500; color: var(--tx-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tx-bar-track { height: 4px; background: var(--tx-border); border-radius: 2px; margin-top: 5px; overflow: hidden; }
.tx-bar-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
.tx-top-vals { text-align: right; flex-shrink: 0; }
.tx-top-revenue { font-size: 0.84rem; font-weight: 600; color: var(--tx-text-heading); }
.tx-top-units { font-size: 0.74rem; color: var(--tx-text-muted); }
.tx-funnel { display: flex; flex-direction: column; gap: 0.7rem; }
.tx-funnel-step { display: flex; flex-direction: column; gap: 0.25rem; }
.tx-funnel-header { display: flex; justify-content: space-between; font-size: 0.83rem; }
.tx-funnel-label { font-weight: 500; color: var(--tx-text); }
.tx-funnel-count { color: var(--tx-text-muted); }
.tx-funnel-track { height: 7px; background: var(--tx-border); border-radius: 4px; overflow: hidden; }
.tx-funnel-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
.tx-funnel-rate { font-size: 0.72rem; color: var(--tx-text-muted); text-align: right; }
`

export default function Charts() {
  usePageTitle('Gráficos & Analytics')

  const [barHover, setBarHover] = useState(-1)
  const [areaTab, setAreaTab] = useState('Novos')

  const chartStats = useMemo(
    () =>
      chartStatsRaw.map((r) => {
        const s = spark(r.vals)
        return { ...r, sparkLine: s.line, sparkArea: s.area }
      }),
    []
  )

  const barChart = useMemo(() => {
    const W = 700, H = 260, pl = 46, pr = 10, pt = 20, pb = 28
    const cW = W - pl - pr, cH = H - pt - pb
    const months = [
      { month: 'Jan', value: 42 }, { month: 'Fev', value: 38 }, { month: 'Mar', value: 51 },
      { month: 'Abr', value: 45 }, { month: 'Mai', value: 67 }, { month: 'Jun', value: 58 },
      { month: 'Jul', value: 72 }, { month: 'Ago', value: 65 }, { month: 'Set', value: 78 },
      { month: 'Out', value: 83 }, { month: 'Nov', value: 71 }, { month: 'Dez', value: 95 },
    ]
    const max = 100
    const slot = cW / months.length
    const bw = Math.max(slot * 0.58, 18)
    const bp = (slot - bw) / 2
    const bars = months.map((d, i) => {
      const h = (d.value / max) * cH
      return { x: pl + i * slot + bp, y: pt + cH - h, w: bw, h, ...d }
    })
    const gridVals = [0, 20, 40, 60, 80, 100]
    const grid = gridVals.map((v) => ({
      y: pt + cH - (v / max) * cH,
      label: v === 0 ? '0' : `${v}k`,
    }))
    return { pl, bars, grid }
  }, [])

  const donut = useMemo(() => {
    const r = 65
    const C = 2 * Math.PI * r
    const raw = [
      { label: 'Orgânico', pct: 38, color: '#485fc7' },
      { label: 'Social', pct: 27, color: '#48c774' },
      { label: 'Direto', pct: 20, color: '#3273dc' },
      { label: 'E-mail', pct: 15, color: '#f59e0b' },
    ]
    let cum = 0
    const segments = raw.map((d) => {
      const dash = (d.pct / 100) * C
      const rot = -90 + cum * 3.6
      cum += d.pct
      return { ...d, dash, rot }
    })
    return { segments, C, total: '24.8' }
  }, [])

  const area = useMemo(() => {
    const W = 860, H = 220, pl = 48, pr = 15, pt = 14, pb = 26
    const cW = W - pl - pr, cH = H - pt - pb
    const d1 = [820, 940, 880, 1020, 1150, 1080, 1230, 1180, 1350, 1290, 1420, 1380, 1510, 1460, 1620, 1580, 1740, 1690, 1820, 1760, 1950, 1880, 2040, 2120]
    const d2 = [510, 590, 540, 620, 700, 660, 730, 720, 810, 790, 850, 830, 910, 880, 960, 940, 1010, 990, 1060, 1030, 1120, 1080, 1150, 1200]
    const mx = 2200
    const n = d1.length

    function pts(data: number[]) {
      return data.map((v, i) => ({
        x: pl + (i / (n - 1)) * cW,
        y: pt + cH - (v / mx) * cH,
      }))
    }

    function smooth(p: { x: number; y: number }[], closed = false) {
      let d = `M${p[0].x},${p[0].y}`
      for (let i = 0; i < p.length - 1; i++) {
        const dx = (p[i + 1].x - p[i].x) * 0.38
        d += ` C${p[i].x + dx},${p[i].y} ${p[i + 1].x - dx},${p[i + 1].y} ${p[i + 1].x},${p[i + 1].y}`
      }
      if (closed) d += ` L${p[p.length - 1].x},${pt + cH} L${p[0].x},${pt + cH} Z`
      return d
    }

    const p1 = pts(d1), p2 = pts(d2)
    const grid = [0, 500, 1000, 1500, 2000].map((v) => ({
      y: pt + cH - (v / mx) * cH,
      label: v === 0 ? '0' : `${v / 1000}k`,
    }))
    const xLabels = [0, 4, 8, 12, 16, 20, 23].map((i) => ({
      x: pl + (i / (n - 1)) * cW,
      text: `S${i + 1}`,
    }))

    return {
      W, H, pl,
      line1: smooth(p1), area1: smooth(p1, true),
      line2: smooth(p2), area2: smooth(p2, true),
      grid, xLabels,
    }
  }, [])

  return (
    <div>
      <style>{styles}</style>

      <div className="columns is-multiline" style={{ marginBottom: '0.5rem' }}>
        {chartStats.map((stat) => (
          <div key={stat.key} className="column is-3-desktop is-6-tablet is-12-mobile">
            <div className="tx-stats-card">
              <div className="tx-stats-icon" style={{ ['--icon-color' as any]: stat.color }}>
                <span className={`mdi ${stat.icon}`} />
              </div>
              <div className="tx-stats-info">
                <div className="tx-stats-value">{stat.value}</div>
                <div className="tx-stats-label">{stat.label}</div>
                <div
                  className={`tx-stats-trend ${stat.trendUp ? 'has-text-success' : 'has-text-danger'}`}
                >
                  <span className={`mdi ${stat.trendUp ? 'mdi-trending-up' : 'mdi-trending-down'}`} />
                  {' '}{stat.trend}
                </div>
              </div>
              <div className="tx-sparkline">
                <svg width="60" height="30" viewBox="0 0 60 30">
                  <defs>
                    <linearGradient id={`sg-${stat.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={stat.color} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={stat.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={stat.sparkArea} fill={`url(#sg-${stat.key})`} />
                  <path d={stat.sparkLine} fill="none" stroke={stat.color} strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="columns">
        <div className="column is-8">
          <CardComponent
            title="Receita Mensal 2025"
            icon="mdi-chart-bar"
            toolbar={
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="tx-legend-row">
                  <span className="tx-legend-dot" style={{ background: '#485fc7' }} />
                  <span>R$ (mil)</span>
                </div>
                <Dropdown
                  align="right"
                  trigger={() => <Button size="is-small" type="is-ghost" iconRight="dots-vertical" />}
                >
                  <DropdownItem>Exportar PNG</DropdownItem>
                  <DropdownItem>Exportar CSV</DropdownItem>
                </Dropdown>
              </div>
            }
          >
            <div className="tx-chart-wrap">
              <svg width="100%" viewBox="0 0 700 260" className="tx-chart-svg">
                {barChart.grid.map((g) => (
                  <g key={g.y}>
                    <line x1={barChart.pl} y1={g.y} x2={690} y2={g.y}
                      stroke="var(--tx-border)" strokeWidth="1" strokeDasharray="4 4" />
                    <text x={barChart.pl - 6} y={g.y + 4} textAnchor="end"
                      fontSize="9.5" fill="var(--tx-text-muted)">{g.label}</text>
                  </g>
                ))}
                {barChart.bars.map((b, i) => (
                  <g key={i}>
                    <rect x={b.x} y={b.y} width={b.w} height={b.h}
                      fill="#485fc7" rx="4" ry="4"
                      opacity={barHover === -1 || barHover === i ? 0.85 : 0.3}
                      className="tx-bar-rect"
                      onMouseEnter={() => setBarHover(i)}
                      onMouseLeave={() => setBarHover(-1)}
                    />
                    {barHover === i && (
                      <text x={b.x + b.w / 2} y={b.y - 6}
                        textAnchor="middle" fontSize="10" fontWeight="600" fill="#485fc7">
                        {b.value}k
                      </text>
                    )}
                    <text x={b.x + b.w / 2} y="255" textAnchor="middle"
                      fontSize="9" fill="var(--tx-text-muted)">{b.month}</text>
                  </g>
                ))}
              </svg>
            </div>
          </CardComponent>
        </div>

        <div className="column is-4">
          <CardComponent title="Fontes de Tráfego" icon="mdi-chart-donut">
            <div className="tx-donut-wrap">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="65" fill="none"
                  stroke="var(--tx-border)" strokeWidth="24" />
                {donut.segments.map((seg) => (
                  <circle key={seg.label} cx="90" cy="90" r="65" fill="none"
                    stroke={seg.color} strokeWidth="24"
                    strokeDasharray={`${seg.dash} ${donut.C - seg.dash}`}
                    transform={`rotate(${seg.rot}, 90, 90)`}
                    strokeLinecap="butt"
                  />
                ))}
                <text x="90" y="86" textAnchor="middle" fontSize="20" fontWeight="700"
                  fill="var(--tx-text-heading)">{donut.total}k</text>
                <text x="90" y="103" textAnchor="middle" fontSize="10"
                  fill="var(--tx-text-muted)">Visitantes</text>
              </svg>
              <div className="tx-donut-legend">
                {donut.segments.map((seg) => (
                  <div key={seg.label} className="tx-donut-leg-item">
                    <span className="tx-legend-dot" style={{ background: seg.color }} />
                    <span className="tx-leg-label">{seg.label}</span>
                    <span className="tx-leg-val">{seg.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardComponent>
        </div>
      </div>

      <CardComponent
        title="Usuários Ativos — Últimas 24 Semanas"
        icon="mdi-chart-areaspline"
        toolbar={
          <div className="tx-tab-switcher">
            {['Novos', 'Recorrentes', 'Total'].map((t) => (
              <button
                key={t}
                className={`tx-tab-btn ${areaTab === t ? 'is-active' : ''}`}
                onClick={() => setAreaTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        }
      >
        <div className="tx-chart-wrap">
          <svg width="100%" viewBox={`0 0 ${area.W} ${area.H}`} className="tx-chart-svg">
            <defs>
              <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#485fc7" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#485fc7" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#48c774" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#48c774" stopOpacity="0" />
              </linearGradient>
            </defs>
            {area.grid.map((g) => (
              <g key={g.y}>
                <line x1={area.pl} y1={g.y} x2={area.W - 10} y2={g.y}
                  stroke="var(--tx-border)" strokeWidth="1" strokeDasharray="4 4" />
                <text x={area.pl - 6} y={g.y + 4} textAnchor="end"
                  fontSize="9" fill="var(--tx-text-muted)">{g.label}</text>
              </g>
            ))}
            {area.xLabels.map((lbl) => (
              <text key={lbl.x} x={lbl.x} y={area.H - 4} textAnchor="middle"
                fontSize="9" fill="var(--tx-text-muted)">{lbl.text}</text>
            ))}
            <path d={area.area2} fill="url(#ag2)" />
            <path d={area.area1} fill="url(#ag1)" />
            <path d={area.line2} fill="none" stroke="#48c774" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
            <path d={area.line1} fill="none" stroke="#485fc7" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="tx-area-legend">
          <span className="tx-legend-dot" style={{ background: '#485fc7' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--tx-text-muted)', marginRight: '1rem' }}>Novos usuários</span>
          <span className="tx-legend-dot" style={{ background: '#48c774' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--tx-text-muted)' }}>Recorrentes</span>
        </div>
      </CardComponent>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-7">
          <CardComponent title="Produtos Mais Vendidos" icon="mdi-package-variant">
            <div>
              {topProducts.map((p, i) => (
                <div key={p.name} className="tx-top-row">
                  <div className="tx-top-rank">{i + 1}</div>
                  <div
                    className="tx-top-icon"
                    style={{
                      background: `color-mix(in srgb, ${p.color} 13%, transparent)`,
                      color: p.color,
                    }}
                  >
                    <span className={`mdi ${p.icon}`} />
                  </div>
                  <div className="tx-top-info">
                    <div className="tx-top-name">{p.name}</div>
                    <div className="tx-bar-track">
                      <div className="tx-bar-fill" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                  </div>
                  <div className="tx-top-vals">
                    <div className="tx-top-revenue">{p.revenue}</div>
                    <div className="tx-top-units">{p.units} un.</div>
                  </div>
                </div>
              ))}
            </div>
          </CardComponent>
        </div>

        <div className="column is-5">
          <CardComponent title="Funil de Conversão" icon="mdi-filter-variant">
            <div className="tx-funnel">
              {funnel.map((stage) => (
                <div key={stage.label} className="tx-funnel-step">
                  <div className="tx-funnel-header">
                    <span className="tx-funnel-label">{stage.label}</span>
                    <span className="tx-funnel-count">{stage.count.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="tx-funnel-track">
                    <div className="tx-funnel-fill" style={{ width: `${stage.pct}%`, background: stage.color }} />
                  </div>
                  {stage.rate && <div className="tx-funnel-rate">↳ {stage.rate} conversão</div>}
                </div>
              ))}
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  )
}
