import { useNavigate, Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          fontSize: '6rem',
          fontWeight: 900,
          color: 'var(--tx-primary)',
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--tx-text)',
          marginBottom: '0.5rem',
        }}
      >
        Página não encontrada
      </h1>
      <p
        style={{
          color: 'var(--tx-text-muted)',
          maxWidth: 400,
          marginBottom: '1.5rem',
        }}
      >
        A página que você está procurando não existe ou foi movida.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button type="is-primary" iconLeft="arrow-left" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        <Link to="/dashboard">
          <Button type="is-light" iconLeft="home">
            Ir para o início
          </Button>
        </Link>
      </div>
    </div>
  )
}
