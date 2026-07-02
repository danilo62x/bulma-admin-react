import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import StatsCard from '@/components/ui/StatsCard'
import Button from '@/components/ui/Button'
import Progress from '@/components/ui/Progress'
import Table, { type TableColumn } from '@/components/ui/Table'

interface Order {
  id: number
  customer: string
  product: string
  value: number
  status: string
  date: string
}

const stats = [
  { value: '2.841', label: 'Usuários', icon: 'mdi-account-group', color: '#485fc7', trend: '+12% este mês', trendUp: true },
  { value: '184', label: 'Pedidos', icon: 'mdi-cart', color: '#48c774', trend: '+5% este mês', trendUp: true },
  { value: 'R$ 48.2k', label: 'Receita', icon: 'mdi-currency-brl', color: '#3273dc', trend: '+18% este mês', trendUp: true },
  { value: '23', label: 'Pendentes', icon: 'mdi-clock-alert', color: '#f59e0b', trend: '-3 hoje', trendUp: false },
]

const recentActivities = [
  { id: 1, title: 'Novo pedido realizado', user: 'João Silva', time: '2 min', icon: 'mdi-cart-plus', color: '#48c774', type: 'Pedido' },
  { id: 2, title: 'Usuário cadastrado', user: 'Maria Santos', time: '15 min', icon: 'mdi-account-plus', color: '#3273dc', type: 'Usuário' },
  { id: 3, title: 'Pagamento aprovado', user: 'Sistema', time: '1h', icon: 'mdi-check-circle', color: '#48c774', type: 'Pagamento' },
  { id: 4, title: 'Relatório exportado', user: 'Carlos Lima', time: '2h', icon: 'mdi-file-export', color: '#485fc7', type: 'Relatório' },
  { id: 5, title: 'Estoque atualizado', user: 'Ana Costa', time: '3h', icon: 'mdi-package-variant', color: '#f59e0b', type: 'Estoque' },
]

const goals = [
  { label: 'Vendas mensais', value: 72, type: 'is-success' as const },
  { label: 'Novos clientes', value: 58, type: 'is-info' as const },
  { label: 'Satisfação', value: 91, type: 'is-primary' as const },
  { label: 'Metas de equipe', value: 44, type: 'is-warning' as const },
]

const quickActions = [
  { label: 'Novo Pedido', icon: 'mdi-plus-circle', color: '#485fc7' },
  { label: 'Relatório', icon: 'mdi-file-chart', color: '#3273dc' },
  { label: 'Usuários', icon: 'mdi-account-group', color: '#48c774' },
  { label: 'Configurar', icon: 'mdi-cog', color: '#f59e0b' },
]

const recentOrders: Order[] = [
  { id: 1001, customer: 'João Silva', product: 'Plano Pro', value: 299.9, status: 'Aprovado', date: '25/05/2026' },
  { id: 1002, customer: 'Maria Santos', product: 'Plano Basic', value: 99.9, status: 'Pendente', date: '25/05/2026' },
  { id: 1003, customer: 'Carlos Lima', product: 'Plano Enterprise', value: 899.9, status: 'Aprovado', date: '24/05/2026' },
  { id: 1004, customer: 'Ana Costa', product: 'Plano Pro', value: 299.9, status: 'Cancelado', date: '24/05/2026' },
  { id: 1005, customer: 'Pedro Oliveira', product: 'Plano Basic', value: 99.9, status: 'Aprovado', date: '23/05/2026' },
]

function statusClass(status: string) {
  const map: Record<string, string> = {
    Aprovado: 'is-success is-light',
    Pendente: 'is-warning is-light',
    Cancelado: 'is-danger is-light',
  }
  return map[status] ?? 'is-light'
}

const orderColumns: TableColumn<Order>[] = [
  {
    field: 'id',
    label: '#',
    width: 60,
    render: (r) => <strong>#{r.id}</strong>,
  },
  { field: 'customer', label: 'Cliente' },
  { field: 'product', label: 'Produto' },
  { field: 'value', label: 'Valor', render: (r) => `R$ ${r.value.toFixed(2)}` },
  {
    field: 'status',
    label: 'Status',
    render: (r) => <span className={`tag ${statusClass(r.status)}`}>{r.status}</span>,
  },
  { field: 'date', label: 'Data' },
]

export default function Dashboard() {
  usePageTitle('Dashboard')
  const ui = useUiStore()

  return (
    <div>
      <div className="columns is-multiline" style={{ marginBottom: '0.5rem' }}>
        {stats.map((s) => (
          <div key={s.label} className="column is-3-desktop is-6-tablet is-12-mobile">
            <StatsCard {...s} />
          </div>
        ))}
      </div>

      <div className="columns">
        <div className="column is-7">
          <CardComponent
            title="Atividades Recentes"
            icon="mdi-history"
            toolbar={
              <Button size="is-small" type="is-ghost" iconLeft="refresh">
                Atualizar
              </Button>
            }
          >
            <div>
              {recentActivities.map((a) => (
                <div key={a.id} className="tx-activity-item">
                  <div
                    className="tx-activity-icon"
                    style={{ ['--icon-color' as any]: a.color }}
                  >
                    <span className={`mdi ${a.icon}`} />
                  </div>
                  <div className="tx-activity-content">
                    <div className="tx-activity-title">{a.title}</div>
                    <div className="tx-activity-meta">
                      {a.user} · {a.time}
                    </div>
                  </div>
                  <span
                    className="tx-activity-tag"
                    style={{ ['--tag-color' as any]: a.color }}
                  >
                    {a.type}
                  </span>
                </div>
              ))}
            </div>
          </CardComponent>
        </div>

        <div className="column is-5">
          <CardComponent title="Metas do Mês" icon="mdi-target">
            <div>
              {goals.map((g) => (
                <div key={g.label} className="tx-goal-item">
                  <div className="tx-goal-row">
                    <span className="tx-goal-label">{g.label}</span>
                    <span className="tx-goal-value">{g.value}%</span>
                  </div>
                  <Progress value={g.value} type={g.type} size="is-small" />
                </div>
              ))}
            </div>
          </CardComponent>

          <CardComponent
            title="Ações Rápidas"
            icon="mdi-lightning-bolt"
            style={{ marginTop: '1rem' }}
          >
            <div className="tx-quick-actions-grid">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="tx-quick-action"
                  style={{ ['--action-color' as any]: a.color }}
                  onClick={() => ui.notify(`${a.label} clicado!`, 'is-info')}
                >
                  <span className={`mdi tx-quick-action-icon ${a.icon}`} />
                  <span className="tx-quick-action-label">{a.label}</span>
                </button>
              ))}
            </div>
          </CardComponent>
        </div>
      </div>

      <CardComponent
        title="Últimos Pedidos"
        icon="mdi-cart"
        toolbar={
          <Link to="/tables">
            <Button size="is-small" type="is-primary" outlined>
              Ver todos
            </Button>
          </Link>
        }
      >
        <Table
          data={recentOrders}
          columns={orderColumns}
          rowKey="id"
          striped
          hoverable
        />
      </CardComponent>
    </div>
  )
}
