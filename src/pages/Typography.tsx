import { usePageTitle } from '@/hooks/usePageTitle'
import CardComponent from '@/components/ui/CardComponent'

const textColors = [
  { class: 'has-text-primary', label: 'Primary' },
  { class: 'has-text-link', label: 'Link' },
  { class: 'has-text-info', label: 'Info' },
  { class: 'has-text-success', label: 'Success' },
  { class: 'has-text-warning', label: 'Warning' },
  { class: 'has-text-danger', label: 'Danger' },
  { class: 'has-text-dark', label: 'Dark' },
  { class: 'has-text-grey', label: 'Grey' },
  { class: 'has-text-grey-light', label: 'Grey Light' },
]

const scaleItems = [
  { label: 'Display', size: '2rem', usage: 'Títulos de página', bold: true },
  { label: 'H1', size: '1.6rem', usage: 'Seção principal', bold: true },
  { label: 'H2', size: '1.3rem', usage: 'Seção secundária', bold: true },
  { label: 'H3', size: '1.1rem', usage: 'Card title', bold: true },
  { label: 'Body', size: '1rem', usage: 'Texto corrido', bold: false },
  { label: 'Small', size: '0.875rem', usage: 'Labels, meta', bold: false },
  { label: 'Caption', size: '0.75rem', usage: 'Badges, timestamps', bold: false },
]

const styles = `
.tx-typo-section { display: flex; flex-direction: column; gap: 0.5rem; }
.tx-typo-badge {
  font-size: 0.68rem;
  font-family: 'Cascadia Code', 'Consolas', monospace;
  background: var(--tx-border-subtle);
  color: var(--tx-text-muted);
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  margin-left: 0.5rem;
  vertical-align: middle;
  font-weight: 400;
}
.tx-typo-weight-list { display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.95rem; }
.tx-typo-colors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.75rem; }
.tx-typo-color-item { padding: 0.5rem; border: 1px solid var(--tx-border-subtle); border-radius: var(--tx-radius-small); background: var(--tx-body-bg); }
.tx-typo-align-list { display: flex; flex-direction: column; gap: 0.75rem; }
.tx-typo-align-item { font-size: 0.9rem; padding: 0.5rem; background: var(--tx-body-bg); border-radius: var(--tx-radius-small); border: 1px solid var(--tx-border-subtle); display: block; width: 100%; }
.tx-typo-scale-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem; }
.tx-typo-scale-item { display: flex; flex-direction: column; align-items: center; padding: 1rem; border: 1px solid var(--tx-border); border-radius: var(--tx-radius); text-align: center; background: var(--tx-body-bg); }
.tx-typo-scale-meta { margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.72rem; color: var(--tx-text-muted); text-align: center; }
.tx-typo-scale-meta strong { font-size: 0.8rem; color: var(--tx-text); }
.tx-typo-font-item { padding: var(--tx-space-3) var(--tx-space-4); border: 1px solid var(--tx-border-subtle); border-radius: var(--tx-radius); background: var(--tx-body-bg); }
`

export default function Typography() {
  usePageTitle('Tipografia')

  return (
    <div>
      <style>{styles}</style>

      <CardComponent title="Títulos" icon="mdi-format-header-1">
        <div className="tx-typo-section">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <h1 key={n} className={`title is-${n}`}>
              Título Nível {n}{' '}
              <span className="tx-typo-badge">.title.is-{n}</span>
            </h1>
          ))}
        </div>
      </CardComponent>

      <CardComponent
        title="Subtítulos"
        icon="mdi-format-header-2"
        style={{ marginTop: '1rem' }}
      >
        <div className="tx-typo-section">
          {[3, 4, 5, 6].map((n) => (
            <p key={n} className={`subtitle is-${n}`}>
              Subtítulo tamanho {n}{' '}
              <span className="tx-typo-badge">.subtitle.is-{n}</span>
            </p>
          ))}
        </div>
      </CardComponent>

      <CardComponent
        title="Tamanhos de Texto"
        icon="mdi-format-size"
        style={{ marginTop: '1rem' }}
      >
        <div className="tx-typo-section">
          {[
            { n: 1, label: '3rem' },
            { n: 2, label: '2.5rem' },
            { n: 3, label: '2rem' },
            { n: 4, label: '1.5rem' },
            { n: 5, label: '1.25rem' },
            { n: 6, label: '1rem (padrão)' },
            { n: 7, label: '0.75rem' },
          ].map((s) => (
            <p key={s.n} className={`is-size-${s.n}`}>
              Tamanho {s.n} — {s.label}{' '}
              <span className="tx-typo-badge">.is-size-{s.n}</span>
            </p>
          ))}
        </div>
      </CardComponent>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-6">
          <CardComponent title="Pesos de Fonte" icon="mdi-format-bold">
            <div className="tx-typo-weight-list">
              <p className="has-text-weight-light">Light — 300 <span className="tx-typo-badge">.has-text-weight-light</span></p>
              <p className="has-text-weight-normal">Normal — 400 <span className="tx-typo-badge">.has-text-weight-normal</span></p>
              <p className="has-text-weight-medium">Medium — 500 <span className="tx-typo-badge">.has-text-weight-medium</span></p>
              <p className="has-text-weight-semibold">Semibold — 600 <span className="tx-typo-badge">.has-text-weight-semibold</span></p>
              <p className="has-text-weight-bold">Bold — 700 <span className="tx-typo-badge">.has-text-weight-bold</span></p>
            </div>
          </CardComponent>
        </div>
        <div className="column is-6">
          <CardComponent title="Transformações" icon="mdi-format-letter-case">
            <div className="tx-typo-weight-list">
              <p className="is-capitalized">capitalized text <span className="tx-typo-badge">.is-capitalized</span></p>
              <p className="is-lowercase">LOWERCASE TEXT <span className="tx-typo-badge">.is-lowercase</span></p>
              <p className="is-uppercase">uppercase text <span className="tx-typo-badge">.is-uppercase</span></p>
              <p className="is-italic">Texto em itálico <span className="tx-typo-badge">.is-italic</span></p>
              <p><del>Texto riscado</del> com <code>&lt;del&gt;</code></p>
              <p><u>Texto sublinhado</u> com <code>&lt;u&gt;</code></p>
            </div>
          </CardComponent>
        </div>
      </div>

      <CardComponent title="Cores de Texto" icon="mdi-palette" style={{ marginTop: '1rem' }}>
        <div className="tx-typo-colors-grid">
          {textColors.map((c) => (
            <div key={c.class} className="tx-typo-color-item">
              <p className={c.class} style={{ fontSize: '0.95rem', fontWeight: 600 }}>{c.label}</p>
              <code className="tx-typo-badge">{c.class}</code>
            </div>
          ))}
          <div className="tx-typo-color-item">
            <p style={{ color: 'var(--tx-primary)', fontSize: '0.95rem', fontWeight: 600 }}>Primary Token</p>
            <code className="tx-typo-badge">--tx-primary</code>
          </div>
          <div className="tx-typo-color-item">
            <p style={{ color: 'var(--tx-text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>Muted Token</p>
            <code className="tx-typo-badge">--tx-text-muted</code>
          </div>
          <div className="tx-typo-color-item">
            <p style={{ color: 'var(--tx-text-heading)', fontSize: '0.95rem', fontWeight: 600 }}>Heading Token</p>
            <code className="tx-typo-badge">--tx-text-heading</code>
          </div>
        </div>
      </CardComponent>

      <CardComponent
        title="Alinhamento de Texto"
        icon="mdi-format-align-left"
        style={{ marginTop: '1rem' }}
      >
        <div className="tx-typo-align-list">
          <p className="has-text-left tx-typo-align-item">Alinhado à esquerda <span className="tx-typo-badge">.has-text-left</span></p>
          <p className="has-text-centered tx-typo-align-item">Centralizado <span className="tx-typo-badge">.has-text-centered</span></p>
          <p className="has-text-right tx-typo-align-item">Alinhado à direita <span className="tx-typo-badge">.has-text-right</span></p>
          <p className="has-text-justified tx-typo-align-item">
            Justificado: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            <span className="tx-typo-badge">.has-text-justified</span>
          </p>
        </div>
      </CardComponent>

      <CardComponent
        title="Elementos Inline"
        icon="mdi-code-tags"
        style={{ marginTop: '1rem' }}
      >
        <div className="content" style={{ fontSize: '0.9rem' }}>
          <p>
            Use <strong>negrito</strong> com <code>&lt;strong&gt;</code>,
            {' '}<em>itálico</em> com <code>&lt;em&gt;</code>,
            {' '}<small>pequeno</small> com <code>&lt;small&gt;</code>,
            {' '}e <code>código inline</code> com <code>&lt;code&gt;</code>.
          </p>
          <p>
            Abreviação: <abbr title="HyperText Markup Language">HTML</abbr>.
            Referência: <cite>Design Systems</cite>.
            Tecla: <kbd>Ctrl</kbd> + <kbd>C</kbd>.
            Variável: <var>x</var> = <var>y</var> + 2.
          </p>
          <blockquote>
            "A boa tipografia cria harmonia entre forma e função."
            <footer>— Ellen Lupton</footer>
          </blockquote>
        </div>
      </CardComponent>

      <CardComponent
        title="Escala do Design System"
        icon="mdi-ruler"
        style={{ marginTop: '1rem' }}
      >
        <div className="tx-typo-scale-grid">
          {scaleItems.map((s) => (
            <div key={s.label} className="tx-typo-scale-item">
              <p style={{ fontSize: s.size, color: 'var(--tx-text-heading)', fontWeight: s.bold ? 700 : 400, lineHeight: 1.3 }}>
                Aa
              </p>
              <div className="tx-typo-scale-meta">
                <strong>{s.label}</strong>
                <span>{s.size} · {s.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </CardComponent>

      <CardComponent
        title="Stack de Fontes"
        icon="mdi-format-font"
        style={{ marginTop: '1rem' }}
      >
        <div>
          <div className="tx-typo-font-item">
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.5rem', fontWeight: 700 }}>
              Inter — Aa Bb Cc Dd Ee 0123456789
            </p>
            <code className="tx-typo-badge">font-family (primária)</code>
          </div>
          <div className="tx-typo-font-item" style={{ marginTop: '1rem' }}>
            <p style={{ fontFamily: "'Cascadia Code', 'Consolas', monospace", fontSize: '1.1rem' }}>
              Cascadia Code — const fn = (x) =&gt; x * 2;
            </p>
            <code className="tx-typo-badge">monospace (código)</code>
          </div>
        </div>
      </CardComponent>
    </div>
  )
}
