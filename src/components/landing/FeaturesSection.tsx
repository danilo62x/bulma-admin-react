const FEATURES = [
  { icon: 'mdi-rocket-launch', color: '#485fc7', title: 'Performance de ponta', desc: 'Build com Vite e React 19. Code-splitting automático e carregamento instantâneo.' },
  { icon: 'mdi-view-grid', color: '#3273dc', title: 'Componentes prontos', desc: 'Dezenas de componentes acessíveis e reutilizáveis para montar telas em minutos.' },
  { icon: 'mdi-web', color: '#48c774', title: 'Internacionalização', desc: 'Suporte a múltiplos idiomas com i18next. Troque a língua sem recarregar a página.' },
  { icon: 'mdi-weather-night', color: '#7c3aed', title: 'Dark mode nativo', desc: 'Tema claro e escuro com tokens de design consistentes em toda a interface.' },
  { icon: 'mdi-shield-check', color: '#f59e0b', title: 'Segurança em primeiro lugar', desc: 'Autenticação, rotas protegidas e boas práticas de segurança já configuradas.' },
  { icon: 'mdi-package-variant-closed', color: '#f14668', title: 'PWA pronto', desc: 'Instalável, com suporte offline e cache inteligente para uma experiência de app.' },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="section tx-lp-section">
      <div className="container">
        <div className="tx-lp-head">
          <span className="tx-lp-eyebrow">Recursos</span>
          <h2 className="title tx-lp-head-title">Tudo que você precisa para construir</h2>
          <p className="subtitle tx-lp-head-sub">Uma base sólida e moderna para o seu próximo painel administrativo ou SaaS.</p>
        </div>

        <div className="columns is-multiline is-variable is-5 tx-lp-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="column is-4">
              <div className="card tx-lp-feature">
                <div
                  className="tx-lp-feature-icon"
                  style={{ background: `color-mix(in srgb, ${f.color} 14%, transparent)`, color: f.color }}
                >
                  <span className={`mdi ${f.icon}`} />
                </div>
                <h3 className="tx-lp-feature-title">{f.title}</h3>
                <p className="tx-lp-feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
