import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import StatsCard from '@/components/ui/StatsCard'
import Button from '@/components/ui/Button'

const HISTORY = [
  { id: '2026-0042', date: '28/05/2026', desc: 'Plano Pro — assinatura anual', amount: '1.752,90', status: 'Pendente' },
  { id: '2026-0031', date: '28/04/2026', desc: 'Usuários adicionais (5 assentos)', amount: '145,00', status: 'Pago' },
  { id: '2026-0024', date: '28/03/2026', desc: 'Plano Pro — mensalidade', amount: '129,00', status: 'Pago' },
  { id: '2026-0018', date: '28/02/2026', desc: 'Armazenamento extra (250 GB)', amount: '98,00', status: 'Pago' },
  { id: '2026-0009', date: '28/01/2026', desc: 'Plano Pro — mensalidade', amount: '129,00', status: 'Pago' },
  { id: '2025-0312', date: '28/12/2025', desc: 'Plano Start — mensalidade', amount: '79,00', status: 'Reembolsado' },
]

function statusClass(status: string) {
  if (status === 'Pago') return 'is-success is-light'
  if (status === 'Pendente') return 'is-warning is-light'
  return 'is-danger is-light'
}

export default function Billing() {
  const ui = useUiStore()

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 className="title is-4" style={{ marginBottom: '0.25rem' }}>
          Cobrança
        </h1>
        <p className="subtitle is-6 has-text-grey">Gerencie seu plano, forma de pagamento e histórico de faturas.</p>
      </div>

      <div className="columns">
        <div className="column is-8">
          <CardComponent title="Plano atual" icon="mdi-rocket-launch">
            <div className="tx-plan-top">
              <div>
                <div className="tx-plan-name-row">
                  <h3 className="title is-5" style={{ marginBottom: 0 }}>
                    Plano Pro
                  </h3>
                  <span className="tag is-primary is-light">Ativo</span>
                </div>
                <p className="tx-plan-price">
                  <span className="has-text-grey is-size-7">R$</span>
                  <span className="tx-plan-price-amount">129</span>
                  <span className="has-text-grey is-size-7">/mês</span>
                </p>
                <p className="tx-plan-renew">
                  <span className="mdi mdi-information-outline" style={{ color: 'var(--tx-primary)' }} />
                  Renova em <span className="has-text-weight-medium">28/06/2026</span>
                </p>
              </div>
              <div className="tx-plan-actions">
                <Button type="is-primary" iconLeft="trending-up" onClick={() => ui.notifySuccess('Upgrade de plano iniciado!')}>
                  Fazer upgrade
                </Button>
                <Button type="is-light" iconLeft="cog" onClick={() => ui.notifySuccess('Abrindo gerenciamento do plano...')}>
                  Gerenciar
                </Button>
              </div>
            </div>

            <div className="tx-plan-stats">
              <div>
                <p className="tx-plan-stat-label">Usuários</p>
                <p className="tx-plan-stat-value">12 / 15</p>
              </div>
              <div>
                <p className="tx-plan-stat-label">Armazenamento</p>
                <p className="tx-plan-stat-value">68 / 100 GB</p>
              </div>
              <div>
                <p className="tx-plan-stat-label">Próx. cobrança</p>
                <p className="tx-plan-stat-value">R$ 129,00</p>
              </div>
            </div>
          </CardComponent>
        </div>

        <div className="column is-4">
          <CardComponent title="Forma de pagamento" icon="mdi-credit-card-outline">
            <div className="tx-card-credit">
              <div className="tx-card-credit-circle tx-card-credit-circle-1" />
              <div className="tx-card-credit-circle tx-card-credit-circle-2" />
              <div className="tx-card-credit-top">
                <span className="has-text-weight-medium">Acme Tecnologia</span>
                <span className="mdi mdi-credit-card" />
              </div>
              <div className="tx-card-credit-chip">
                <div className="tx-card-credit-chip-inner" />
              </div>
              <p className="tx-card-credit-number">•••• •••• •••• 4242</p>
              <div className="tx-card-credit-foot">
                <div>
                  <p className="tx-card-credit-cap">Titular</p>
                  <p className="has-text-weight-medium is-size-7">Marina Costa</p>
                </div>
                <div className="has-text-right">
                  <p className="tx-card-credit-cap">Validade</p>
                  <p className="has-text-weight-medium is-size-7">09/28</p>
                </div>
              </div>
            </div>

            <Button
              type="is-light"
              expanded
              iconLeft="pencil"
              style={{ marginTop: '1rem' }}
              onClick={() => ui.notifySuccess('Atualização da forma de pagamento iniciada!')}
            >
              Atualizar
            </Button>
          </CardComponent>
        </div>
      </div>

      <div className="columns is-multiline">
        <div className="column is-3-desktop is-6-tablet">
          <StatsCard label="Gasto este mês" value="R$ 1.752,90" icon="mdi-cash-multiple" color="#485fc7" trend="6,2%" trendUp />
        </div>
        <div className="column is-3-desktop is-6-tablet">
          <StatsCard label="Faturas pagas" value="18" icon="mdi-check-circle" color="#48c774" trend="2" trendUp />
        </div>
        <div className="column is-3-desktop is-6-tablet">
          <StatsCard label="Pendente" value="R$ 1.752,90" icon="mdi-tag-outline" color="#f59e0b" />
        </div>
        <div className="column is-3-desktop is-6-tablet">
          <StatsCard label="Créditos" value="R$ 90,00" icon="mdi-trending-up" color="#3273dc" trend="100%" trendUp />
        </div>
      </div>

      <CardComponent title="Histórico de cobrança" icon="mdi-table">
        <div className="table-container">
          <table className="table is-fullwidth is-hoverable tx-history-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Status</th>
                <th className="has-text-right">Fatura</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((row) => (
                <tr key={row.id}>
                  <td className="has-text-grey">{row.date}</td>
                  <td className="has-text-weight-medium">{row.desc}</td>
                  <td>R$ {row.amount}</td>
                  <td>
                    <span className={`tag ${statusClass(row.status)}`}>{row.status}</span>
                  </td>
                  <td className="has-text-right">
                    <Button
                      size="is-small"
                      type="is-primary"
                      inverted
                      iconLeft="download"
                      onClick={() => ui.notifySuccess(`Baixando fatura #${row.id}...`)}
                    >
                      #{row.id}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardComponent>
    </div>
  )
}
