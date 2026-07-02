import { Link } from 'react-router-dom'

const STATS = [
  { label: 'Receita', value: 'R$ 84.2k', accent: 'primary' },
  { label: 'Usuários', value: '12.480', accent: 'success' },
  { label: 'Conversão', value: '4,8%', accent: 'warning' },
]

const BARS = [42, 68, 55, 80, 62, 95, 74]
const AVATARS = ['#485fc7', '#48c774', '#f59e0b', '#3273dc']

export default function HeroSection() {
  return (
    <section id="hero" className="hero tx-lp-hero">
      <div className="tx-lp-hero-blob tx-lp-blob-1" />
      <div className="tx-lp-hero-blob tx-lp-blob-2" />

      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered is-variable is-8">
            <div className="column is-6 tx-lp-hero-copy">
              <span className="tag is-primary is-light tx-lp-badge">
                <span className="mdi mdi-rocket-launch" />
                React 19 + Bulma
              </span>

              <h1 className="title tx-lp-hero-title">O template admin que acelera seu próximo produto</h1>
              <p className="subtitle tx-lp-hero-sub">
                Componentes prontos, dark mode, internacionalização e performance de primeira. Lance sua aplicação em
                dias, não meses.
              </p>

              <div className="tx-lp-hero-actions">
                <Link to="/register" className="button is-primary is-medium tx-lp-cta">
                  <span className="mdi mdi-rocket-launch" />
                  <span>Começar grátis</span>
                </Link>
                <Link to="/dashboard" className="button is-medium tx-lp-cta tx-lp-cta-ghost">
                  <span>Ver demo</span>
                  <span className="mdi mdi-chevron-right" />
                </Link>
              </div>

              <div className="tx-lp-social-proof">
                <div className="tx-lp-avatars">
                  {AVATARS.map((c) => (
                    <span key={c} className="tx-lp-avatar" style={{ background: c }}>
                      <span className="mdi mdi-account" />
                    </span>
                  ))}
                </div>
                <span className="tx-lp-proof-text">
                  <strong>+2.000 equipes</strong> já constroem com a gente
                </span>
              </div>
            </div>

            <div className="column is-6">
              <div className="tx-lp-mockup-wrap">
                <div className="box tx-lp-mockup">
                  <div className="tx-lp-mockup-bar">
                    <span className="tx-lp-dot" style={{ background: '#f14668' }} />
                    <span className="tx-lp-dot" style={{ background: '#f59e0b' }} />
                    <span className="tx-lp-dot" style={{ background: '#48c774' }} />
                    <span className="tx-lp-mockup-url">app.template.com</span>
                  </div>

                  <div className="columns is-mobile is-variable is-2 tx-lp-stats">
                    {STATS.map((s) => (
                      <div key={s.label} className="column">
                        <div className="tx-lp-stat">
                          <p className="tx-lp-stat-label">{s.label}</p>
                          <p className="tx-lp-stat-value">{s.value}</p>
                          <span className={`tx-lp-stat-trend is-${s.accent}`}>
                            <span className="mdi mdi-trending-up" /> +12%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="tx-lp-chart-card">
                    <div className="tx-lp-chart-head">
                      <p className="tx-lp-chart-title">Visão geral</p>
                      <span className="tag is-primary is-light tx-lp-chart-tag">7 dias</span>
                    </div>
                    <div className="tx-lp-bars">
                      {BARS.map((h, i) => (
                        <div key={i} className="tx-lp-bar" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="tx-lp-float-card is-hidden-mobile">
                  <span className="tx-lp-float-icon">
                    <span className="mdi mdi-check" />
                  </span>
                  <div>
                    <p className="tx-lp-float-title">Deploy pronto</p>
                    <p className="tx-lp-float-sub">build otimizado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
