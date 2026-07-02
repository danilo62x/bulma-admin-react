import { useState } from 'react'
import { useUiStore } from '@/stores/ui'

const INFO = [
  { icon: 'mdi-email', label: 'Email', value: 'contato@template.com' },
  { icon: 'mdi-phone', label: 'Telefone', value: '+55 (11) 4002-8922' },
  { icon: 'mdi-map-marker', label: 'Endereço', value: 'Av. Paulista, 1000 — São Paulo, SP' },
]

export default function ContactSection() {
  const ui = useUiStore()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    ui.notifySuccess('Mensagem enviada!')
    setNome('')
    setEmail('')
    setMensagem('')
  }

  return (
    <section id="contact" className="section tx-lp-section tx-lp-section-alt">
      <div className="container">
        <div className="tx-lp-head">
          <span className="tx-lp-eyebrow">Contato</span>
          <h2 className="title tx-lp-head-title">Fale com a gente</h2>
          <p className="subtitle tx-lp-head-sub">Tem dúvidas? Envie uma mensagem e nossa equipe responde rapidinho.</p>
        </div>

        <div className="columns is-variable is-6 tx-lp-grid">
          <div className="column is-5 tx-lp-contact-info">
            {INFO.map((item) => (
              <div key={item.label} className="tx-lp-info-item">
                <span className="tx-lp-info-icon">
                  <span className={`mdi ${item.icon}`} />
                </span>
                <div>
                  <p className="tx-lp-info-label">{item.label}</p>
                  <p className="tx-lp-info-value">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="card tx-lp-info-card">
              <div className="tx-lp-info-card-head">
                <span className="mdi mdi-check" />
                <p>Resposta em até 24h</p>
              </div>
              <p className="tx-lp-info-card-text">Atendimento de segunda a sexta, das 9h às 18h (horário de Brasília).</p>
            </div>
          </div>

          <div className="column is-7">
            <form className="card tx-lp-form" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Nome</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Seu nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" placeholder="seu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label className="label">Mensagem</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    rows={4}
                    placeholder="Como podemos ajudar?"
                    required
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="button is-primary is-fullwidth">
                <span className="icon">
                  <i className="mdi mdi-email" />
                </span>
                <span>Enviar mensagem</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
