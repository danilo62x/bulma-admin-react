import { Link } from 'react-router-dom'

export default function Maintenance() {
  return (
    <div className="tx-state-page">
      <div className="tx-state-bg">
        <span className="tx-state-blob tx-state-blob--one" />
        <span className="tx-state-blob tx-state-blob--two" />
      </div>

      <div className="tx-state-content has-text-centered">
        <span className="tx-state-icon">
          <span className="mdi mdi-cog mdi-48px" />
        </span>

        <h1 className="title is-2 has-text-white mt-5">Estamos em manutenção</h1>

        <p className="subtitle is-6 tx-state-text mt-3">
          Nosso sistema está passando por uma atualização programada para melhorar sua experiência. Voltaremos em
          instantes. Agradecemos a sua paciência.
        </p>

        <div className="tag is-medium tx-state-badge mt-4">
          <span className="tx-state-pulse" />
          Tempo estimado: aproximadamente 2 horas
        </div>

        <div className="mt-5">
          <Link to="/" className="button is-primary is-medium">
            <span className="icon">
              <span className="mdi mdi-arrow-left" />
            </span>
            <span>Voltar ao início</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
