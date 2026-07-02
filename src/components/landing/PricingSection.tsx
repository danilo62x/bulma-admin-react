import { useState } from 'react'
import { Link } from 'react-router-dom'

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    desc: 'Ideal para começar com o pé direito',
    icon: 'mdi-rocket-launch',
    color: '#3273dc',
    priceMonthly: 49,
    priceAnnual: 39,
    cta: 'Começar grátis',
    featured: false,
    features: ['Até 3 usuários', '5 GB de armazenamento', 'Suporte por email', 'Relatórios básicos'],
  },
  {
    key: 'pro',
    name: 'Pro',
    desc: 'Para times em crescimento',
    icon: 'mdi-rocket-launch',
    color: '#485fc7',
    priceMonthly: 129,
    priceAnnual: 103,
    cta: 'Assinar Pro',
    featured: true,
    features: ['Até 15 usuários', '100 GB de armazenamento', 'Suporte prioritário 24/5', 'Relatórios avançados', 'API access completo'],
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    desc: 'Para grandes organizações',
    icon: 'mdi-shield-check',
    color: '#7c3aed',
    priceMonthly: 399,
    priceAnnual: 319,
    cta: 'Falar com vendas',
    featured: false,
    features: ['Usuários ilimitados', 'Armazenamento ilimitado', 'Suporte dedicado 24/7', 'SSO e audit logs', 'SLA 99,99%'],
  },
]

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="section tx-lp-section tx-lp-section-alt">
      <div className="container">
        <div className="tx-lp-head">
          <span className="tx-lp-eyebrow">Preços</span>
          <h2 className="title tx-lp-head-title">Planos para cada estágio</h2>
          <p className="subtitle tx-lp-head-sub">Sem taxas ocultas. Cancele quando quiser.</p>

          <div className="tx-lp-toggle">
            <button type="button" className={`tx-lp-toggle-btn ${!annual ? 'is-active' : ''}`} onClick={() => setAnnual(false)}>
              Mensal
            </button>
            <button type="button" className={`tx-lp-toggle-btn ${annual ? 'is-active' : ''}`} onClick={() => setAnnual(true)}>
              Anual
              <span className="tag is-success is-light tx-lp-toggle-badge">-20%</span>
            </button>
          </div>
        </div>

        <div className="columns is-multiline is-centered is-variable is-5 tx-lp-grid">
          {PLANS.map((plan) => (
            <div key={plan.key} className="column is-4">
              <div className={`card tx-lp-plan ${plan.featured ? 'is-featured' : ''}`}>
                {plan.featured && <div className="tx-lp-plan-badge">Popular</div>}

                <div
                  className="tx-lp-plan-icon"
                  style={{ background: `color-mix(in srgb, ${plan.color} 14%, transparent)`, color: plan.color }}
                >
                  <span className={`mdi ${plan.icon}`} />
                </div>

                <h3 className="tx-lp-plan-name">{plan.name}</h3>
                <p className="tx-lp-plan-desc">{plan.desc}</p>

                <div className="tx-lp-plan-price">
                  <span className="tx-lp-plan-cur">R$</span>
                  <span className="tx-lp-plan-amount">{annual ? plan.priceAnnual : plan.priceMonthly}</span>
                  <span className="tx-lp-plan-period">/mês</span>
                </div>
                <p className="tx-lp-plan-note">
                  {annual ? `Cobrado anualmente (R$ ${plan.priceAnnual * 12}/ano)` : 'Pagamento mensal'}
                </p>

                <Link to="/register" className={`button is-fullwidth tx-lp-plan-cta ${plan.featured ? 'is-primary' : 'is-light'}`}>
                  {plan.cta}
                </Link>

                <ul className="tx-lp-plan-features">
                  {plan.features.map((feat) => (
                    <li key={feat} className="tx-lp-plan-feat">
                      <span className="mdi mdi-check tx-lp-plan-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
