import { useMemo, useState } from 'react'
import { useUiStore } from '@/stores/ui'

const SECTIONS = [
  { id: 'introducao', label: 'Introdução', icon: 'mdi-information-outline' },
  { id: 'instalacao', label: 'Instalação', icon: 'mdi-download' },
  { id: 'configuracao', label: 'Configuração', icon: 'mdi-cog' },
  { id: 'componentes', label: 'Componentes', icon: 'mdi-view-grid-outline' },
  { id: 'api', label: 'API', icon: 'mdi-web' },
  { id: 'faq', label: 'FAQ', icon: 'mdi-help-circle-outline' },
]

const faq = [
  { q: 'Posso usar o template em projetos comerciais?', a: 'Sim. A licença permite uso em projetos comerciais ilimitados após a compra.' },
  { q: 'O template suporta modo escuro?', a: 'Sim, todo o template foi construído com suporte nativo a modo claro e escuro.' },
  { q: 'Como reporto um bug?', a: 'Abra uma issue no repositório do GitHub com passos para reproduzir o problema.' },
]

const installCode = `# Clonar o projeto
git clone https://github.com/acme/admin-template.git
cd admin-template

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev`

const envCode = `VITE_API_URL=https://api.acme.com.br
VITE_APP_NAME="Admin Template"
VITE_ENABLE_ANALYTICS=true`

const statsCardCode = `import StatsCard from '@/components/ui/StatsCard'

<StatsCard
  label="Receita"
  value="R$ 89.450"
  icon="mdi-cash"
  color="#485fc7"
  trend="11,01%"
  trendUp
/>`

const curlCode = `curl https://api.acme.com.br/v1/users \\
  -H "Authorization: Bearer SEU_TOKEN" \\
  -H "Content-Type: application/json"`

function CodeBlock({ code, onCopy }: { code: string; onCopy: () => void }) {
  return (
    <div className="tx-doc-codeblock">
      <button type="button" className="button is-small tx-doc-copy" onClick={onCopy}>
        <span className="mdi mdi-content-copy" /> Copiar
      </button>
      <pre className="tx-doc-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function Documentation() {
  const ui = useUiStore()
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('introducao')

  const filteredSections = useMemo(() => {
    if (!search.trim()) return SECTIONS
    return SECTIONS.filter((s) => s.label.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  const copy = () => ui.notifySuccess('Código copiado!')

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 className="title is-4" style={{ marginBottom: '0.25rem' }}>
          Documentação
        </h1>
        <p className="subtitle is-6 has-text-grey">Guia completo de uso do template e da API.</p>
      </div>

      <div className="columns">
        <div className="column is-3">
          <aside className="tx-doc-toc">
            <div className="box">
              <div className="field" style={{ marginBottom: '0.75rem' }}>
                <div className="control has-icons-left">
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="Buscar na documentação..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span className="icon is-left">
                    <i className="mdi mdi-magnify" />
                  </span>
                </div>
              </div>
              <p className="tx-doc-toc-title">Nesta página</p>
              <aside className="menu">
                <ul className="menu-list">
                  {filteredSections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} onClick={() => setActive(s.id)}>
                        <span className={`mdi ${s.icon}`} style={{ marginRight: '0.5rem' }} />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {filteredSections.length === 0 && (
                  <p className="has-text-grey is-size-7" style={{ padding: '0.5rem 0.75rem' }}>
                    Nenhuma seção encontrada.
                  </p>
                )}
              </aside>
            </div>
          </aside>
        </div>

        <div className="column is-9">
          <article className="box tx-doc-article">
            <section className="tx-doc-section">
              <h2 id="introducao" className="tx-doc-heading">
                Introdução
              </h2>
              <p className="tx-doc-text">
                Bem-vindo à documentação do <strong>Admin Template</strong>. Este guia cobre desde a instalação até o uso
                avançado dos componentes e da API. O template é construído com React 19, Vite, Bulma e TypeScript,
                priorizando performance e suporte completo a modo escuro.
              </p>
              <div className="notification is-info is-light tx-doc-callout">
                <span className="mdi mdi-information-outline tx-doc-callout-icon" />
                <div>
                  <p className="has-text-weight-semibold">Dica</p>
                  <p className="is-size-7" style={{ marginTop: '0.25rem' }}>
                    Recomendamos usar Node.js 20 ou superior para garantir compatibilidade total com o Vite.
                  </p>
                </div>
              </div>
            </section>

            <section className="tx-doc-section">
              <h2 id="instalacao" className="tx-doc-heading">
                Instalação
              </h2>
              <p className="tx-doc-text">Clone o repositório e instale as dependências usando seu gerenciador de pacotes preferido:</p>
              <CodeBlock code={installCode} onCopy={copy} />
              <p className="tx-doc-text">
                A aplicação ficará disponível em <code className="tx-doc-code">http://localhost:5173</code>.
              </p>
            </section>

            <section className="tx-doc-section">
              <h2 id="configuracao" className="tx-doc-heading">
                Configuração
              </h2>
              <p className="tx-doc-text">
                As variáveis de ambiente são definidas em um arquivo <code className="tx-doc-code">.env</code> na raiz do projeto:
              </p>
              <CodeBlock code={envCode} onCopy={copy} />
              <div className="notification is-warning is-light tx-doc-callout">
                <span className="mdi mdi-alert-outline tx-doc-callout-icon" />
                <div>
                  <p className="has-text-weight-semibold">Atenção</p>
                  <p className="is-size-7" style={{ marginTop: '0.25rem' }}>
                    Nunca faça commit do arquivo <code className="tx-doc-code">.env</code> em repositórios públicos. Adicione-o
                    ao <code className="tx-doc-code">.gitignore</code>.
                  </p>
                </div>
              </div>
            </section>

            <section className="tx-doc-section">
              <h2 id="componentes" className="tx-doc-heading">
                Componentes
              </h2>
              <p className="tx-doc-text">
                O template inclui um conjunto de componentes reutilizáveis. A tabela abaixo resume os principais:
              </p>
              <div className="table-container">
                <table className="table is-fullwidth tx-doc-table">
                  <thead>
                    <tr>
                      <th>Componente</th>
                      <th>Descrição</th>
                      <th>Props</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code className="tx-doc-code">CardComponent</code>
                      </td>
                      <td>Container de seção com cabeçalho e rodapé.</td>
                      <td className="has-text-grey">title, icon, footer</td>
                    </tr>
                    <tr>
                      <td>
                        <code className="tx-doc-code">StatsCard</code>
                      </td>
                      <td>Cartão de métrica com tendência.</td>
                      <td className="has-text-grey">value, color, trend</td>
                    </tr>
                    <tr>
                      <td>
                        <code className="tx-doc-code">DataTable</code>
                      </td>
                      <td>Tabela com ordenação e paginação.</td>
                      <td className="has-text-grey">columns, data</td>
                    </tr>
                    <tr>
                      <td>
                        <code className="tx-doc-code">Table</code>
                      </td>
                      <td>Tabela com seleção e detalhes.</td>
                      <td className="has-text-grey">data, columns</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="tx-doc-text">
                Exemplo de uso do <code className="tx-doc-code">StatsCard</code>:
              </p>
              <CodeBlock code={statsCardCode} onCopy={copy} />
            </section>

            <section className="tx-doc-section">
              <h2 id="api" className="tx-doc-heading">
                API
              </h2>
              <p className="tx-doc-text">
                A API REST utiliza autenticação via token Bearer. Inclua o cabeçalho{' '}
                <code className="tx-doc-code">Authorization</code> em todas as requisições autenticadas:
              </p>
              <CodeBlock code={curlCode} onCopy={copy} />
              <div className="table-container">
                <table className="table is-fullwidth tx-doc-table">
                  <thead>
                    <tr>
                      <th>Método</th>
                      <th>Endpoint</th>
                      <th>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="tag is-success is-light tx-doc-method">GET</span>
                      </td>
                      <td>
                        <code className="tx-doc-code">/v1/users</code>
                      </td>
                      <td className="has-text-grey">Lista todos os usuários.</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tag is-primary is-light tx-doc-method">POST</span>
                      </td>
                      <td>
                        <code className="tx-doc-code">/v1/users</code>
                      </td>
                      <td className="has-text-grey">Cria um novo usuário.</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tag is-danger is-light tx-doc-method">DELETE</span>
                      </td>
                      <td>
                        <code className="tx-doc-code">/v1/users/:id</code>
                      </td>
                      <td className="has-text-grey">Remove um usuário.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="tx-doc-section">
              <h2 id="faq" className="tx-doc-heading">
                FAQ
              </h2>
              <div className="tx-doc-faq-list">
                {faq.map((item) => (
                  <div key={item.q} className="tx-doc-faq-item">
                    <p className="tx-doc-faq-q">
                      <span className="mdi mdi-help-circle-outline" style={{ color: 'var(--tx-primary)', marginRight: '0.5rem' }} />
                      {item.q}
                    </p>
                    <p className="tx-doc-faq-a">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}
