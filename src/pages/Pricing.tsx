import { Fragment, useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Tooltip from '@/components/ui/Tooltip'
import Collapse from '@/components/ui/Collapse'

interface PlanFeature {
  text: string
  included: boolean
  tip?: string
}
interface Plan {
  key: 'basic' | 'pro' | 'enterprise'
  name: string
  desc: string
  priceMonthly: number
  priceAnnual: number
  cta: string
  featured: boolean
  color: string
  icon: string
  features: PlanFeature[]
}

const plans: Plan[] = [
  {
    key: 'basic', name: 'Básico',
    desc: 'Ideal para pequenas equipes iniciando sua jornada.',
    priceMonthly: 99, priceAnnual: 79, cta: 'Começar grátis',
    featured: false, color: '#48c774', icon: 'mdi-leaf',
    features: [
      { text: 'Até 3 usuários', included: true },
      { text: '5 GB de armazenamento', included: true },
      { text: 'Relatórios básicos', included: true },
      { text: 'Suporte por e-mail', included: true },
      { text: 'API de integração', included: false },
      { text: 'White-label', included: false },
      { text: 'Suporte prioritário', included: false },
      { text: 'SLA garantido', included: false },
    ],
  },
  {
    key: 'pro', name: 'Profissional',
    desc: 'Para equipes em crescimento que precisam de mais poder.',
    priceMonthly: 249, priceAnnual: 199, cta: 'Assinar agora',
    featured: true, color: '#485fc7', icon: 'mdi-rocket-launch',
    features: [
      { text: 'Até 15 usuários', included: true },
      { text: '50 GB de armazenamento', included: true },
      { text: 'Relatórios avançados + gráficos', included: true, tip: 'Inclui exportação para PDF e Excel' },
      { text: 'Suporte por chat 8h-18h', included: true },
      { text: 'API de integração completa', included: true },
      { text: 'White-label (parcial)', included: true },
      { text: 'Suporte prioritário', included: false },
      { text: 'SLA garantido', included: false },
    ],
  },
  {
    key: 'enterprise', name: 'Empresarial',
    desc: 'Solução completa para grandes organizações.',
    priceMonthly: 699, priceAnnual: 559, cta: 'Falar com vendas',
    featured: false, color: '#f59e0b', icon: 'mdi-office-building',
    features: [
      { text: 'Usuários ilimitados', included: true },
      { text: 'Armazenamento ilimitado', included: true },
      { text: 'Analytics em tempo real', included: true, tip: 'Dashboard dedicado com alertas automáticos' },
      { text: 'Suporte 24/7 dedicado', included: true },
      { text: 'API + Webhooks avançados', included: true },
      { text: 'White-label completo', included: true },
      { text: 'Gerente de conta exclusivo', included: true },
      { text: 'SLA 99.9% garantido', included: true },
    ],
  },
]

interface CompareRow {
  feature: string
  tip?: string
  basic: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

const compareTable: { section: string; rows: CompareRow[] }[] = [
  {
    section: 'Usuários & Capacidade',
    rows: [
      { feature: 'Usuários', basic: '3', pro: '15', enterprise: 'Ilimitados' },
      { feature: 'Armazenamento', basic: '5 GB', pro: '50 GB', enterprise: 'Ilimitado' },
      { feature: 'Projetos ativos', basic: '5', pro: '30', enterprise: 'Ilimitados' },
    ],
  },
  {
    section: 'Relatórios & Analytics',
    rows: [
      { feature: 'Relatórios básicos', basic: true, pro: true, enterprise: true },
      { feature: 'Dashboards customizáveis', basic: false, pro: true, enterprise: true },
      { feature: 'Analytics em tempo real', tip: 'Dados atualizados a cada 30 segundos', basic: false, pro: false, enterprise: true },
      { feature: 'Exportação PDF/Excel', basic: false, pro: true, enterprise: true },
    ],
  },
  {
    section: 'Integrações',
    rows: [
      { feature: 'API REST', basic: false, pro: true, enterprise: true },
      { feature: 'Webhooks', basic: false, pro: true, enterprise: true },
      { feature: 'SSO / SAML', basic: false, pro: false, enterprise: true },
      { feature: 'Integrações nativas (Slack, Jira...)', basic: false, pro: '3 apps', enterprise: 'Ilimitadas' },
    ],
  },
  {
    section: 'Suporte',
    rows: [
      { feature: 'Suporte por e-mail', basic: true, pro: true, enterprise: true },
      { feature: 'Chat em tempo real', basic: false, pro: true, enterprise: true },
      { feature: 'Suporte 24/7', basic: false, pro: false, enterprise: true },
      { feature: 'Gerente de conta', basic: false, pro: false, enterprise: true },
      { feature: 'SLA garantido', basic: false, pro: false, enterprise: true },
    ],
  },
]

const faqs = [
  { q: 'Posso trocar de plano a qualquer momento?', a: 'Sim! Você pode fazer upgrade ou downgrade a qualquer momento. No upgrade, o valor é calculado pro-rata. No downgrade, o crédito é aplicado no próximo ciclo.' },
  { q: 'Como funciona o período de teste?', a: 'Todos os planos possuem 14 dias de teste gratuito, sem necessidade de cartão de crédito. Você só paga quando decidir continuar.' },
  { q: 'Vocês oferecem desconto para startups ou ONGs?', a: 'Sim, oferecemos 40% de desconto para startups com menos de 2 anos e 60% para ONGs devidamente registradas.' },
  { q: 'Os dados ficam seguros?', a: 'Seus dados são criptografados em trânsito (TLS 1.3) e em repouso (AES-256). Fazemos backups diários automáticos e conformidade com LGPD e GDPR.' },
  { q: 'Posso cancelar sem multa?', a: 'Nos planos mensais, você pode cancelar a qualquer momento sem cobrança futura. Nos planos anuais, o cancelamento encerra o acesso no fim do período pago.' },
]

const styles = `
.tx-pricing-header { text-align: center; padding: 1.5rem 1rem 0.5rem; }
.tx-pricing-title { font-size: 1.8rem; font-weight: 800; color: var(--tx-text-heading); }
.tx-pricing-subtitle { font-size: 0.95rem; color: var(--tx-text-muted); margin-top: 0.5rem; margin-bottom: 1.25rem; }
.tx-billing-toggle { display: flex; align-items: center; justify-content: center; gap: 0.75rem; font-size: 0.9rem; color: var(--tx-text-muted); }
.tx-toggle-active { color: var(--tx-text); font-weight: 600; }
.tx-save-badge { font-size: 0.72rem !important; }
.tx-plan-card { background: var(--tx-card-bg); border: 2px solid var(--tx-border); border-radius: calc(var(--tx-radius) * 1.5); padding: 1.75rem 1.5rem; height: 100%; display: flex; flex-direction: column; gap: 1.25rem; position: relative; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
.tx-plan-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.tx-plan-featured { border-color: #485fc7; box-shadow: 0 4px 20px rgba(72,95,199,0.18); }
.tx-plan-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #485fc7; color: white; font-size: 0.72rem; font-weight: 700; padding: 0.25rem 0.9rem; border-radius: 99px; white-space: nowrap; }
.tx-plan-header { display: flex; flex-direction: column; gap: 0.4rem; }
.tx-plan-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
.tx-plan-name { font-size: 1.15rem; font-weight: 700; color: var(--tx-text-heading); }
.tx-plan-desc { font-size: 0.82rem; color: var(--tx-text-muted); }
.tx-plan-price { display: flex; align-items: baseline; gap: 0.25rem; }
.tx-price-currency { font-size: 1rem; font-weight: 600; color: var(--tx-text-muted); }
.tx-price-amount { font-size: 2.4rem; font-weight: 800; color: var(--tx-text-heading); line-height: 1; }
.tx-price-period { font-size: 0.85rem; color: var(--tx-text-muted); }
.tx-price-note { font-size: 0.75rem; color: var(--tx-text-muted); margin-top: -0.75rem; }
.tx-plan-cta { margin-top: 0.25rem; }
.tx-plan-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; flex: 1; }
.tx-feat-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--tx-text); }
.tx-feat-icon { font-size: 1rem; flex-shrink: 0; }
.tx-feat-disabled { color: var(--tx-text-muted); text-decoration: line-through; }
.tx-feat-tip { font-size: 0.8rem; color: var(--tx-text-muted); cursor: help; }
.tx-compare-wrap { overflow-x: auto; }
.tx-compare-section td { background: var(--tx-body-bg) !important; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--tx-text-muted); padding-top: 1rem !important; }
`

export default function Pricing() {
  usePageTitle('Planos & Preços')
  const ui = useUiStore()

  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div>
      <style>{styles}</style>

      <div className="tx-pricing-header">
        <h2 className="tx-pricing-title">Planos & Preços</h2>
        <p className="tx-pricing-subtitle">
          Escolha o plano ideal para sua empresa. Sem taxas ocultas. Cancele quando quiser.
        </p>
        <div className="tx-billing-toggle">
          <span className={!annual ? 'tx-toggle-active' : ''}>Mensal</span>
          <Switch checked={annual} onChange={setAnnual} type="" />
          <span className={annual ? 'tx-toggle-active' : ''}>Anual</span>
          {annual && <span className="tag is-success is-light tx-save-badge">Economize 20%</span>}
        </div>
      </div>

      <div className="columns is-centered" style={{ marginTop: '1.5rem' }}>
        {plans.map((plan) => (
          <div key={plan.key} className="column is-4-desktop is-6-tablet">
            <div className={`tx-plan-card ${plan.featured ? 'tx-plan-featured' : ''}`}>
              {plan.featured && <div className="tx-plan-badge">Mais Popular</div>}
              <div className="tx-plan-header">
                <div
                  className="tx-plan-icon"
                  style={{ background: `color-mix(in srgb, ${plan.color} 15%, transparent)`, color: plan.color }}
                >
                  <span className={`mdi ${plan.icon}`} />
                </div>
                <div className="tx-plan-name">{plan.name}</div>
                <div className="tx-plan-desc">{plan.desc}</div>
              </div>
              <div className="tx-plan-price">
                <span className="tx-price-currency">R$</span>
                <span className="tx-price-amount">{annual ? plan.priceAnnual : plan.priceMonthly}</span>
                <span className="tx-price-period">/mês</span>
              </div>
              {annual && (
                <div className="tx-price-note">
                  Cobrado anualmente (R$ {plan.priceAnnual * 12}/ano)
                </div>
              )}
              <Button
                type={plan.featured ? 'is-primary' : 'is-light'}
                expanded
                className="tx-plan-cta"
                onClick={() => ui.notifySuccess(`Plano ${plan.name} selecionado!`)}
              >
                {plan.cta}
              </Button>
              <ul className="tx-plan-features">
                {plan.features.map((feat) => (
                  <li key={feat.text} className="tx-feat-item">
                    <span
                      className={`mdi tx-feat-icon ${
                        feat.included ? 'mdi-check-circle' : 'mdi-close-circle'
                      }`}
                      style={{ color: feat.included ? '#48c774' : 'var(--tx-border)' }}
                    />
                    <span className={feat.included ? '' : 'tx-feat-disabled'}>{feat.text}</span>
                    {feat.tip && (
                      <Tooltip label={feat.tip}>
                        <span className="mdi mdi-information-outline tx-feat-tip" />
                      </Tooltip>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <CardComponent
        title="Comparação Completa de Recursos"
        icon="mdi-view-list"
        style={{ marginTop: '1rem' }}
        toolbar={
          <Button
            size="is-small"
            type="is-ghost"
            iconLeft="help-circle"
            onClick={() => ui.notify('Dúvidas? Fale com nosso time comercial.', 'is-info')}
          >
            Preciso de ajuda
          </Button>
        }
      >
        <div className="tx-compare-wrap">
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Recurso</th>
                {plans.map((plan) => (
                  <th key={plan.key} className="has-text-centered">
                    <span style={{ color: plan.color }}>{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareTable.map((section) => (
                <Fragment key={section.section}>
                  <tr className="tx-compare-section">
                    <td colSpan={4}><strong>{section.section}</strong></td>
                  </tr>
                  {section.rows.map((row) => (
                    <tr key={row.feature}>
                      <td>
                        {row.feature}
                        {row.tip && (
                          <Tooltip label={row.tip}>
                            <span className="mdi mdi-information-outline"
                              style={{ color: 'var(--tx-text-muted)', fontSize: '0.85rem', marginLeft: 4 }} />
                          </Tooltip>
                        )}
                      </td>
                      {plans.map((plan) => {
                        const v = row[plan.key]
                        return (
                          <td key={plan.key} className="has-text-centered">
                            {typeof v === 'boolean' ? (
                              <span
                                className={`mdi ${
                                  v ? 'mdi-check-circle has-text-success' : 'mdi-minus has-text-grey-light'
                                }`}
                              />
                            ) : (
                              <span style={{ fontSize: '0.85rem' }}>{v}</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </CardComponent>

      <CardComponent
        title="Perguntas Frequentes"
        icon="mdi-frequently-asked-questions"
        style={{ marginTop: '1rem' }}
      >
        <div className="tx-collapse-list">
          {faqs.map((faq, i) => (
            <Collapse
              key={i}
              open={openFaq === i}
              onToggle={(v) => setOpenFaq(v ? i : openFaq === i ? null : openFaq)}
              trigger={({ open }) => (
                <div className="tx-collapse-trigger">
                  <span className="tx-collapse-label">{faq.q}</span>
                  <span className={`mdi tx-collapse-chevron ${open ? 'mdi-chevron-up' : 'mdi-chevron-down'}`} />
                </div>
              )}
            >
              <div className="tx-collapse-body">{faq.a}</div>
            </Collapse>
          ))}
        </div>
      </CardComponent>
    </div>
  )
}
