import { useUiStore } from '@/stores/ui'
import Button from '@/components/ui/Button'

const ITEMS = [
  { desc: 'Plano Pro — assinatura anual', detail: '01/06/2026 a 31/05/2027', qty: 1, unit: 1548.0 },
  { desc: 'Usuários adicionais', detail: '5 assentos extras', qty: 5, unit: 29.0 },
  { desc: 'Armazenamento extra', detail: 'Pacote de 250 GB', qty: 2, unit: 49.0 },
  { desc: 'Suporte prioritário 24/7', detail: 'Add-on mensal', qty: 1, unit: 199.0 },
]

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Invoice() {
  const ui = useUiStore()

  const subtotal = ITEMS.reduce((sum, i) => sum + i.qty * i.unit, 0)
  const discount = 90.0
  const taxBase = subtotal - discount
  const tax = taxBase * 0.05
  const total = taxBase + tax
  const paid = false

  return (
    <div>
      <div className="tx-invoice-topbar">
        <div>
          <h1 className="title is-4" style={{ marginBottom: '0.25rem' }}>
            Fatura
          </h1>
          <p className="subtitle is-6 has-text-grey">Detalhamento da cobrança e itens do pedido.</p>
        </div>
        <div className="buttons">
          <Button type="is-primary" iconLeft="download" onClick={() => ui.notifySuccess('Download da fatura iniciado!')}>
            Baixar PDF
          </Button>
          <Button type="is-light" iconLeft="printer" onClick={() => ui.notifySuccess('Enviando para a impressora...')}>
            Imprimir
          </Button>
          <Button type="is-light" iconLeft="email-outline" onClick={() => ui.notifySuccess('Fatura enviada por email!')}>
            Enviar
          </Button>
        </div>
      </div>

      <div className="box tx-invoice">
        <div className="tx-invoice-header">
          <div className="tx-invoice-brand">
            <div className="tx-invoice-logo">
              <span className="mdi mdi-flash" />
            </div>
            <div>
              <p className="tx-invoice-company">Acme Tecnologia Ltda.</p>
              <p className="has-text-grey is-size-7">contato@acme.com.br</p>
            </div>
          </div>
          <div className="tx-invoice-meta">
            <h2 className="title is-5" style={{ marginBottom: '0.25rem' }}>
              FATURA #2026-0042
            </h2>
            <p className="has-text-grey is-size-7">Emissão: 28/05/2026</p>
            <p className="has-text-grey is-size-7">Vencimento: 12/06/2026</p>
            <span className={`tag mt-2 ${paid ? 'is-success is-light' : 'is-warning is-light'}`}>{paid ? 'Pago' : 'Pendente'}</span>
          </div>
        </div>

        <div className="columns tx-invoice-parties">
          <div className="column">
            <p className="tx-invoice-label">De</p>
            <p className="tx-invoice-party-name">Acme Tecnologia Ltda.</p>
            <p className="tx-invoice-party-line">CNPJ: 12.345.678/0001-90</p>
            <p className="tx-invoice-party-line">Av. Paulista, 1000 — Sala 142</p>
            <p className="tx-invoice-party-line">São Paulo, SP — 01310-100</p>
          </div>
          <div className="column has-text-right-tablet">
            <p className="tx-invoice-label">Para</p>
            <p className="tx-invoice-party-name">Marina Costa — Studio MC</p>
            <p className="tx-invoice-party-line">CNPJ: 98.765.432/0001-21</p>
            <p className="tx-invoice-party-line">Rua das Flores, 250 — Conj. 8</p>
            <p className="tx-invoice-party-line">Belo Horizonte, MG — 30140-071</p>
          </div>
        </div>

        <div className="table-container">
          <table className="table is-fullwidth tx-invoice-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th className="has-text-centered">Qtd.</th>
                <th className="has-text-right">Preço unit.</th>
                <th className="has-text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((item) => (
                <tr key={item.desc}>
                  <td>
                    <p className="tx-invoice-item-desc">{item.desc}</p>
                    <p className="has-text-grey is-size-7">{item.detail}</p>
                  </td>
                  <td className="has-text-centered">{item.qty}</td>
                  <td className="has-text-right">{BRL.format(item.unit)}</td>
                  <td className="has-text-right tx-invoice-item-total">{BRL.format(item.qty * item.unit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tx-invoice-summary-wrap">
          <div className="tx-invoice-summary">
            <div className="tx-invoice-summary-row">
              <span className="has-text-grey">Subtotal</span>
              <span className="has-text-weight-medium">{BRL.format(subtotal)}</span>
            </div>
            <div className="tx-invoice-summary-row">
              <span className="has-text-grey">Desconto</span>
              <span className="has-text-weight-medium has-text-success">− {BRL.format(discount)}</span>
            </div>
            <div className="tx-invoice-summary-row">
              <span className="has-text-grey">Impostos (5%)</span>
              <span className="has-text-weight-medium">{BRL.format(tax)}</span>
            </div>
            <div className="tx-invoice-summary-row tx-invoice-summary-total">
              <span className="has-text-weight-semibold">Total</span>
              <span className="tx-invoice-total-value">{BRL.format(total)}</span>
            </div>
          </div>
        </div>

        <div className="notification tx-invoice-note">
          <div className="tx-invoice-note-inner">
            <span className="mdi mdi-information-outline tx-invoice-note-icon" />
            <div>
              <p className="has-text-weight-medium">Observações</p>
              <p className="is-size-7" style={{ marginTop: '0.25rem' }}>
                Pagamento via PIX, boleto ou cartão de crédito. Em caso de atraso, será aplicada multa de 2% acrescida de
                juros de 1% ao mês. Obrigado pela preferência!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
