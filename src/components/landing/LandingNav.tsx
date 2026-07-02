import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUiStore } from '@/stores/ui'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const LINKS = [
  { id: 'features', label: 'Recursos' },
  { id: 'pricing', label: 'Preços' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contato' },
]

export default function LandingNav() {
  const ui = useUiStore()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`tx-lp-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container tx-lp-nav-inner">
        <button type="button" className="tx-lp-brand" onClick={() => scrollTo('hero')}>
          <span className="tx-lp-brand-logo">A</span>
          <span className="tx-lp-brand-name">Admin Template</span>
        </button>

        <nav className="tx-lp-nav-links is-hidden-touch">
          {LINKS.map((link) => (
            <button key={link.id} type="button" className="tx-lp-nav-link" onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="tx-lp-nav-actions">
          <button type="button" className="button is-ghost tx-lp-icon-btn" aria-label="Alternar tema" onClick={() => ui.toggleDarkMode()}>
            <span className={`mdi ${ui.darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'}`} />
          </button>

          <LanguageSwitcher />

          <Link to="/login" className="button is-ghost is-hidden-mobile tx-lp-login">
            Entrar
          </Link>
          <Link to="/register" className="button is-primary is-hidden-mobile">
            Começar agora
          </Link>

          <button
            type="button"
            className="button is-ghost tx-lp-icon-btn is-hidden-desktop"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`mdi ${open ? 'mdi-close' : 'mdi-menu'}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="tx-lp-mobile-menu is-hidden-desktop">
          <div className="container">
            {LINKS.map((link) => (
              <button key={link.id} type="button" className="tx-lp-mobile-link" onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            ))}
            <div className="tx-lp-mobile-cta">
              <Link to="/login" className="button is-light is-fullwidth" onClick={() => setOpen(false)}>
                Entrar
              </Link>
              <Link to="/register" className="button is-primary is-fullwidth" onClick={() => setOpen(false)}>
                Começar agora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
