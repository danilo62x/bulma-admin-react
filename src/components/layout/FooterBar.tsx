export default function FooterBar() {
  const year = new Date().getFullYear()
  return (
    <footer
      style={{
        padding: '0.75rem 1.25rem',
        borderTop: '1px solid var(--tx-border)',
        textAlign: 'center',
        fontSize: '0.78rem',
        color: 'var(--tx-text-muted)',
        background: 'var(--tx-card-bg)',
        transition: 'background-color var(--tx-transition)',
      }}
    >
      &copy; {year} Admin Template — React + Bulma
    </footer>
  )
}
