const COLUMNS = [
  { title: 'Produto', links: ['Recursos', 'Preços', 'Integrações', 'Changelog'] },
  { title: 'Empresa', links: ['Sobre', 'Blog', 'Carreiras', 'Contato'] },
  { title: 'Legal', links: ['Privacidade', 'Termos', 'Cookies', 'Licença'] },
]

const SOCIAL = [
  { icon: 'mdi-web', label: 'Site' },
  { icon: 'mdi-email', label: 'Email' },
  { icon: 'mdi-account-group', label: 'Comunidade' },
  { icon: 'mdi-star', label: 'Avaliações' },
]

export default function LandingFooter() {
  return (
    <footer className="tx-lp-footer">
      <div className="container">
        <div className="columns is-variable is-6">
          <div className="column is-4">
            <div className="tx-lp-footer-brand">
              <span className="tx-lp-footer-logo">A</span>
              <span className="tx-lp-footer-name">Admin Template</span>
            </div>
            <p className="tx-lp-footer-about">O template admin moderno para acelerar o desenvolvimento do seu próximo produto.</p>
            <div className="tx-lp-footer-social">
              {SOCIAL.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="tx-lp-social-link">
                  <span className={`mdi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="column">
              <h3 className="tx-lp-footer-col-title">{col.title}</h3>
              <ul className="tx-lp-footer-links">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="tx-lp-footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="tx-lp-footer-bottom">
          <p>© 2026 Admin Template. Todos os direitos reservados.</p>
          <p className="tx-lp-footer-made">
            Feito com <span className="mdi mdi-rocket-launch" /> em React 19 + Bulma
          </p>
        </div>
      </div>
    </footer>
  )
}
