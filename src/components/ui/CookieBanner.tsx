import { useEffect } from 'react'
import { useUiStore } from '@/stores/ui'
import Button from '@/components/ui/Button'

const styles = `
.tx-cookie-banner {
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  max-width: 720px;
  margin: 0 auto;
  background: var(--tx-card-bg);
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.18);
  z-index: 9998;
  animation: cookieSlideIn 0.25s ease;
}
@keyframes cookieSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tx-cookie-icon {
  font-size: 2rem;
  color: var(--tx-warning);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tx-cookie-content { flex: 1; min-width: 0; }
.tx-cookie-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--tx-text-heading);
  margin-bottom: 0.2rem;
}
.tx-cookie-text {
  font-size: 0.82rem;
  color: var(--tx-text-muted);
  line-height: 1.45;
  margin: 0;
}
.tx-cookie-text a { color: var(--tx-primary); text-decoration: underline; cursor: pointer; }
.tx-cookie-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.tx-cookie-close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--tx-text-muted);
  font-size: 1.1rem;
  padding: 0.25rem;
  border-radius: var(--tx-radius-small);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25rem;
}
.tx-cookie-close:hover { background: var(--tx-border-subtle); color: var(--tx-text); }
@media (max-width: 640px) {
  .tx-cookie-banner { flex-direction: column; align-items: stretch; text-align: center; }
  .tx-cookie-actions { justify-content: center; }
}
`

export default function CookieBanner() {
  const showCookieBanner = useUiStore((s) => s.showCookieBanner)
  const openCookieBanner = useUiStore((s) => s.openCookieBanner)
  const closeCookieBanner = useUiStore((s) => s.closeCookieBanner)
  const acceptCookies = useUiStore((s) => s.acceptCookies)
  const declineCookies = useUiStore((s) => s.declineCookies)
  const notify = useUiStore((s) => s.notify)

  useEffect(() => {
    if (!useUiStore.getState().cookiesAccepted) {
      openCookieBanner()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!showCookieBanner) return null

  return (
    <>
      <style>{styles}</style>
      <div className="tx-cookie-banner">
        <div className="tx-cookie-icon">
          <span className="mdi mdi-cookie" />
        </div>
        <div className="tx-cookie-content">
          <div className="tx-cookie-title">Aviso de Cookies</div>
          <p className="tx-cookie-text">
            Este site utiliza cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego.
            Ao continuar navegando, você concorda com a nossa{' '}
            <a
              onClick={(e) => {
                e.preventDefault()
                notify('Abrindo política de privacidade...', 'is-info')
              }}
            >
              Política de Privacidade
            </a>.
          </p>
        </div>
        <div className="tx-cookie-actions">
          <Button type="is-light" size="is-small" onClick={() => declineCookies()}>
            Recusar
          </Button>
          <Button type="is-primary" size="is-small" iconLeft="check" onClick={() => acceptCookies()}>
            Aceitar
          </Button>
          <button
            className="tx-cookie-close"
            aria-label="Fechar"
            onClick={() => closeCookieBanner()}
          >
            <span className="mdi mdi-close" />
          </button>
        </div>
      </div>
    </>
  )
}
