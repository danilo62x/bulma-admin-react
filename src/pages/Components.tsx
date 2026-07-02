import { useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import Button from '@/components/ui/Button'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Switch from '@/components/ui/Switch'
import Checkbox from '@/components/ui/Checkbox'
import Modal from '@/components/ui/Modal'
import Progress from '@/components/ui/Progress'
import Dropdown, { DropdownItem, DropdownDivider } from '@/components/ui/Dropdown'
import Tooltip from '@/components/ui/Tooltip'
import Skeleton from '@/components/ui/Skeleton'
import Carousel from '@/components/ui/Carousel'
import Message from '@/components/ui/Message'
import Collapse from '@/components/ui/Collapse'
import Sidebar from '@/components/ui/Sidebar'
import DatePicker from '@/components/ui/DatePicker'
import Slider from '@/components/ui/Slider'

const progressBars = [
  { label: 'Primary', value: 65, type: 'is-primary' as const },
  { label: 'Sucesso', value: 80, type: 'is-success' as const },
  { label: 'Aviso', value: 45, type: 'is-warning' as const },
  { label: 'Erro', value: 30, type: 'is-danger' as const },
  { label: 'Info', value: 55, type: 'is-info' as const },
]

const carouselSlides = [
  { title: 'Design System', desc: 'Componentes consistentes, reutilizáveis e acessíveis.', icon: 'mdi-palette', color: 'linear-gradient(135deg, #485fc7 0%, #3a4fa3 100%)' },
  { title: 'React + Bulma', desc: 'Hooks e componentes prontos para produção.', icon: 'mdi-react', color: 'linear-gradient(135deg, #48c774 0%, #2d9e59 100%)' },
  { title: 'Dark Mode', desc: 'Suporte completo a tema claro e escuro com CSS variables.', icon: 'mdi-theme-light-dark', color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' },
  { title: 'Responsivo', desc: 'Layout adaptável para mobile, tablet e desktop.', icon: 'mdi-responsive', color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
]

const collapsePanels = [
  { title: 'O que é este template?', icon: 'mdi-information-outline', content: 'Template administrativo construído com React 19, Vite 6 e Bulma 1.x — sem bibliotecas de componentes externas. Todos os componentes (modais, tabs, switches, datepickers etc.) são implementados internamente.' },
  { title: 'Como funciona o Dark Mode?', icon: 'mdi-theme-light-dark', content: 'Implementado via CSS custom properties. Ao definir data-theme="dark" no <html>, os valores das variáveis CSS são substituídos. O Bulma 1.x usa --bulma-* que também é sobreposto.' },
  { title: 'Posso personalizar as cores?', icon: 'mdi-palette', content: 'Sim. As cores estão em src/assets/styles/variables.css como --tx-*. Para alterar a primária do Bulma, ajuste $primary antes do @use "bulma/bulma" no app.scss.' },
  { title: 'Estrutura de pastas', icon: 'mdi-folder-outline', content: 'src/assets/styles/ — SCSS/CSS globais. src/components/ — componentes reutilizáveis. src/pages/ — páginas. src/stores/ — estado global com Zustand. src/hooks/ — hooks customizados.' },
]

const styles = `
.tx-carousel-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 220px;
  border-radius: var(--tx-radius);
  color: white;
  text-align: center;
  padding: 2rem;
}
.tx-carousel-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
.tx-carousel-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.4rem; }
.tx-carousel-desc { font-size: 0.9rem; opacity: 0.85; max-width: 360px; }
.tx-message-list { display: flex; flex-direction: column; gap: 0.75rem; }
.tx-offcanvas-panel { display: flex; flex-direction: column; height: 100%; }
.tx-offcanvas-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; border-bottom: 1px solid var(--tx-border); }
.tx-offcanvas-title { font-size: 1rem; font-weight: 600; color: var(--tx-text-heading); }
.tx-offcanvas-body { flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
.tx-offcanvas-footer { padding: 1rem 1.25rem; border-top: 1px solid var(--tx-border); }
`

export default function Components() {
  usePageTitle('Componentes')
  const ui = useUiStore()

  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [modalInput, setModalInput] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  const [showSidebarRight, setShowSidebarRight] = useState(false)
  const [openPanel, setOpenPanel] = useState<number | null>(0)

  const [sidebarFilter, setSidebarFilter] = useState({
    status: '',
    date: null as Date | null,
    cats: [] as string[],
    price: 2500,
  })

  function handleModalSave() {
    setShowModal(false)
    ui.notifySuccess('Modal salvo com sucesso!')
  }

  function handleConfirm() {
    setShowConfirm(false)
    ui.notifySuccess('Ação confirmada!')
  }

  return (
    <div>
      <style>{styles}</style>

      <CardComponent title="Notificações & Toasts" icon="mdi-bell">
        <div className="tx-btn-group">
          <Button type="is-success" iconLeft="check-circle" onClick={() => ui.notifySuccess('Operação realizada com sucesso!')}>
            Sucesso
          </Button>
          <Button type="is-danger" iconLeft="close-circle" onClick={() => ui.notifyError('Ocorreu um erro. Tente novamente.')}>
            Erro
          </Button>
          <Button type="is-warning" iconLeft="alert" onClick={() => ui.notifyWarning('Atenção: verifique os dados.')}>
            Aviso
          </Button>
          <Button type="is-info" iconLeft="information" onClick={() => ui.notify('Informação importante.', 'is-info')}>
            Info
          </Button>
        </div>
      </CardComponent>

      <CardComponent title="Modais" icon="mdi-window-restore" style={{ marginTop: '1rem' }}>
        <div className="tx-btn-group">
          <Button type="is-primary" onClick={() => setShowModal(true)}>Abrir Modal</Button>
          <Button type="is-warning" onClick={() => setShowConfirm(true)}>Confirmar Ação</Button>
        </div>

        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className="modal-card" style={{ width: 500, maxWidth: '100%' }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Exemplo de Modal</p>
              <button className="delete" onClick={() => setShowModal(false)} />
            </header>
            <section className="modal-card-body">
              <Field label="Campo de exemplo">
                <Input value={modalInput} onChange={setModalInput} placeholder="Digite algo..." />
              </Field>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--tx-text-muted)' }}>
                Exemplo de modal usando o componente <code>Modal</code> nativo.
              </p>
            </section>
            <footer className="modal-card-foot tx-modal-foot">
              <Button onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button type="is-primary" onClick={handleModalSave}>Salvar</Button>
            </footer>
          </div>
        </Modal>

        <Modal open={showConfirm} onClose={() => setShowConfirm(false)}>
          <div className="modal-card" style={{ width: 400, maxWidth: '100%' }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Confirmar ação</p>
            </header>
            <section className="modal-card-body">
              <p style={{ fontSize: '0.875rem' }}>
                Você tem certeza que deseja executar esta ação? Ela não pode ser desfeita.
              </p>
            </section>
            <footer className="modal-card-foot tx-modal-foot">
              <Button onClick={() => setShowConfirm(false)}>Cancelar</Button>
              <Button type="is-danger" iconLeft="alert" onClick={handleConfirm}>Confirmar</Button>
            </footer>
          </div>
        </Modal>
      </CardComponent>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-4">
          <CardComponent title="Card Simples" icon="mdi-card-outline">
            <p style={{ fontSize: '0.875rem', color: 'var(--tx-text-muted)' }}>
              Card básico com título, ícone e conteúdo. Use slots para personalizar cabeçalho, corpo e rodapé.
            </p>
          </CardComponent>
        </div>
        <div className="column is-4">
          <CardComponent
            title="Card com Footer"
            icon="mdi-card-text"
            footer={
              <div className="tx-card-footer-actions">
                <Button size="is-small" type="is-primary">Ação primária</Button>
                <Button size="is-small" type="is-light">Cancelar</Button>
              </div>
            }
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--tx-text-muted)' }}>
              Este card tem uma prop <code>footer</code> com botões de ação.
            </p>
          </CardComponent>
        </div>
        <div className="column is-4">
          <CardComponent
            title="Card com Toolbar"
            icon="mdi-card-bulleted"
            toolbar={
              <Dropdown
                align="right"
                trigger={() => (
                  <Button size="is-small" type="is-ghost" iconRight="dots-vertical" />
                )}
              >
                <DropdownItem>Editar</DropdownItem>
                <DropdownItem>Duplicar</DropdownItem>
                <DropdownItem className="has-text-danger">Excluir</DropdownItem>
              </Dropdown>
            }
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--tx-text-muted)' }}>
              Card com prop <code>toolbar</code> — dropdown de ações no cabeçalho.
            </p>
          </CardComponent>
        </div>
      </div>

      <CardComponent title="Tags & Badges" icon="mdi-tag" style={{ marginTop: '1rem' }}>
        <div className="tx-tags-showcase">
          <span className="tag is-primary">Primary</span>
          <span className="tag is-success">Sucesso</span>
          <span className="tag is-warning">Aviso</span>
          <span className="tag is-danger">Erro</span>
          <span className="tag is-info">Info</span>
          <span className="tag is-dark">Dark</span>
          <span className="tag is-light">Light</span>
          <span className="tag is-primary is-light">Primary light</span>
          <span className="tag is-success is-light">Success light</span>
          <span className="tag is-danger is-light">Danger light</span>
          <span className="tag is-rounded is-primary">Rounded</span>
          <span className="tag is-medium is-info">Medium</span>
          <span className="tag is-large is-warning">Large</span>
        </div>
      </CardComponent>

      <CardComponent title="Barras de Progresso" icon="mdi-chart-bar" style={{ marginTop: '1rem' }}>
        <div className="tx-progress-list">
          {progressBars.map((b) => (
            <div key={b.label}>
              <div className="tx-progress-row">
                <span>{b.label}</span>
                <span>{b.value}%</span>
              </div>
              <Progress value={b.value} type={b.type} />
            </div>
          ))}
          <div>
            <div className="tx-progress-row">
              <span>Indeterminado</span>
              <span className="tag is-light is-small">Carregando</span>
            </div>
            <Progress type="is-primary" />
          </div>
        </div>
      </CardComponent>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-6">
          <CardComponent title="Tooltips" icon="mdi-tooltip">
            <div className="tx-btn-group">
              <Tooltip label="Tooltip padrão">
                <Button type="is-light">Dark</Button>
              </Tooltip>
              <Tooltip label="Tooltip de sucesso" type="is-success">
                <Button type="is-success" outlined>Top</Button>
              </Tooltip>
              <Tooltip label="Tooltip de aviso" type="is-warning" position="is-right">
                <Button type="is-warning" outlined>Right</Button>
              </Tooltip>
              <Tooltip label="Tooltip de erro" type="is-danger" position="is-bottom">
                <Button type="is-danger" outlined>Bottom</Button>
              </Tooltip>
            </div>
          </CardComponent>
        </div>
        <div className="column is-6">
          <CardComponent title="Dropdown" icon="mdi-chevron-down">
            <div className="tx-btn-group">
              <Dropdown
                align="left"
                trigger={({ active }) => (
                  <Button type="is-primary" iconRight={active ? 'menu-up' : 'menu-down'}>
                    Ações
                  </Button>
                )}
              >
                <DropdownItem>
                  <span className="mdi mdi-pencil" style={{ marginRight: '0.5rem' }} />Editar
                </DropdownItem>
                <DropdownItem>
                  <span className="mdi mdi-content-copy" style={{ marginRight: '0.5rem' }} />Duplicar
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem className="has-text-danger">
                  <span className="mdi mdi-delete" style={{ marginRight: '0.5rem' }} />Excluir
                </DropdownItem>
              </Dropdown>

              <Dropdown
                align="left"
                trigger={() => (
                  <Button type="is-light" iconRight="dots-vertical">Menu</Button>
                )}
              >
                <DropdownItem>Item 1</DropdownItem>
                <DropdownItem>Item 2</DropdownItem>
                <DropdownItem disabled>Desabilitado</DropdownItem>
              </Dropdown>
            </div>
          </CardComponent>
        </div>
      </div>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-6">
          <CardComponent title="Loading" icon="mdi-loading">
            <div className="tx-btn-group">
              <Button type="is-primary" loading>Carregando</Button>
              <Button type="is-success" outlined loading>Salvando</Button>
              <Button type="is-danger" loading>Excluindo</Button>
            </div>
          </CardComponent>
        </div>
        <div className="column is-6">
          <CardComponent title="Skeleton" icon="mdi-rectangle-outline">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Skeleton width="85%" />
              <Skeleton width="60%" />
              <Skeleton width="75%" />
              <Skeleton size="is-large" circle />
            </div>
          </CardComponent>
        </div>
      </div>

      <CardComponent title="Carousel" icon="mdi-view-carousel" style={{ marginTop: '1rem' }}>
        <Carousel
          slides={carouselSlides.map((s) => (
            <div key={s.title} className="tx-carousel-slide" style={{ background: s.color }}>
              <span className={`mdi tx-carousel-icon ${s.icon}`} />
              <h3 className="tx-carousel-title">{s.title}</h3>
              <p className="tx-carousel-desc">{s.desc}</p>
            </div>
          ))}
        />
      </CardComponent>

      <CardComponent title="Message — Blocos de Mensagem" icon="mdi-message-text" style={{ marginTop: '1rem' }}>
        <div className="tx-message-list">
          <Message type="is-info" title="Informação" icon="information">
            Esta é uma mensagem informativa. Use para orientações e dicas ao usuário.
          </Message>
          <Message type="is-success" title="Sucesso" icon="check-circle">
            Operação realizada com êxito! Os dados foram salvos corretamente.
          </Message>
          <Message type="is-warning" title="Atenção" icon="alert">
            Verifique os campos antes de continuar. Alguns dados podem estar incompletos.
          </Message>
          <Message type="is-danger" title="Erro" icon="close-circle">
            Falha ao processar a solicitação. Tente novamente ou contate o suporte.
          </Message>
          <Message title="Mensagem fechável" closable>
            Esta mensagem pode ser fechada pelo usuário clicando no botão de fechar.
          </Message>
        </div>
      </CardComponent>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-6">
          <CardComponent title="Breadcrumb — Navegação Hierárquica" icon="mdi-dots-horizontal">
            <p className="tx-component-label">Padrão</p>
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><a>Início</a></li>
                <li><a>Interface</a></li>
                <li className="is-active"><a aria-current="page">Componentes</a></li>
              </ul>
            </nav>

            <p className="tx-component-label" style={{ marginTop: '1rem' }}>Separador: Seta</p>
            <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
              <ul>
                <li><a>Dashboard</a></li>
                <li><a>Usuários</a></li>
                <li className="is-active"><a aria-current="page">Editar</a></li>
              </ul>
            </nav>

            <p className="tx-component-label" style={{ marginTop: '1rem' }}>Separador: Ponto</p>
            <nav className="breadcrumb has-dot-separator" aria-label="breadcrumbs">
              <ul>
                <li><a>Projetos</a></li>
                <li><a>Alpha</a></li>
                <li className="is-active"><a aria-current="page">Relatório</a></li>
              </ul>
            </nav>
          </CardComponent>
        </div>

        <div className="column is-6">
          <CardComponent title="Image — Imagem Responsiva" icon="mdi-image">
            <p className="tx-component-label">Proporção 16:9</p>
            <figure className="image is-16by9">
              <img
                src="https://placehold.co/640x360/485fc7/ffffff?text=16:9"
                alt="Imagem de exemplo 16:9"
                style={{ borderRadius: 'var(--tx-radius)' }}
              />
            </figure>

            <div className="columns" style={{ marginTop: '1rem' }}>
              <div className="column">
                <p className="tx-component-label">1:1 (quadrado)</p>
                <figure className="image is-1by1">
                  <img
                    src="https://placehold.co/200x200/48c774/ffffff?text=1:1"
                    alt="Quadrado"
                    style={{ borderRadius: 'var(--tx-radius)' }}
                  />
                </figure>
              </div>
              <div className="column">
                <p className="tx-component-label">4:3</p>
                <figure className="image is-4by3">
                  <img
                    src="https://placehold.co/200x150/3273dc/ffffff?text=4:3"
                    alt="4:3"
                    style={{ borderRadius: 'var(--tx-radius)' }}
                  />
                </figure>
              </div>
              <div className="column">
                <p className="tx-component-label">Lazy loading</p>
                <figure className="image is-4by3">
                  <img
                    src="https://placehold.co/200x150/f59e0b/ffffff?text=Lazy"
                    alt="Lazy"
                    loading="lazy"
                    style={{ borderRadius: 'var(--tx-radius)' }}
                  />
                </figure>
              </div>
            </div>
          </CardComponent>
        </div>
      </div>

      <CardComponent title="Sidebar Off-Canvas" icon="mdi-page-layout-sidebar-left" style={{ marginTop: '1rem' }}>
        <div className="tx-btn-group">
          <Button type="is-primary" iconLeft="dock-left" onClick={() => setShowSidebar(true)}>
            Abrir Sidebar Esquerda
          </Button>
          <Button type="is-info" iconLeft="dock-right" onClick={() => setShowSidebarRight(true)}>
            Abrir Sidebar Direita
          </Button>
        </div>
        <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--tx-text-muted)' }}>
          <code>Sidebar</code> cria um painel off-canvas com overlay. Diferente da sidebar de navegação do layout, este componente é para conteúdo contextual como filtros, detalhes e formulários.
        </p>

        <Sidebar open={showSidebar} onClose={() => setShowSidebar(false)}>
          <div className="tx-offcanvas-panel">
            <div className="tx-offcanvas-header">
              <h3 className="tx-offcanvas-title">Filtros Avançados</h3>
              <Button type="is-ghost" size="is-small" iconLeft="close" onClick={() => setShowSidebar(false)} />
            </div>
            <div className="tx-offcanvas-body">
              <Field label="Status">
                <Select value={sidebarFilter.status} onChange={(v) => setSidebarFilter({ ...sidebarFilter, status: v as string })}>
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </Select>
              </Field>
              <Field label="Período">
                <DatePicker value={sidebarFilter.date} onChange={(d) => setSidebarFilter({ ...sidebarFilter, date: d })} placeholder="Selecione..." />
              </Field>
              <Field label="Categoria">
                <div className="tx-check-group">
                  <Checkbox modelValue={sidebarFilter.cats} onModelValueChange={(v) => setSidebarFilter({ ...sidebarFilter, cats: v })} value="hw">Hardware</Checkbox>
                  <Checkbox modelValue={sidebarFilter.cats} onModelValueChange={(v) => setSidebarFilter({ ...sidebarFilter, cats: v })} value="sw">Software</Checkbox>
                  <Checkbox modelValue={sidebarFilter.cats} onModelValueChange={(v) => setSidebarFilter({ ...sidebarFilter, cats: v })} value="per">Periférico</Checkbox>
                </div>
              </Field>
              <Field label={`Faixa de preço: R$ ${sidebarFilter.price}`}>
                <Slider value={sidebarFilter.price} onChange={(v) => setSidebarFilter({ ...sidebarFilter, price: v })} min={0} max={5000} step={100} />
              </Field>
            </div>
            <div className="tx-offcanvas-footer">
              <Button type="is-primary" expanded iconLeft="filter" onClick={() => { setShowSidebar(false); ui.notifySuccess('Filtros aplicados!') }}>
                Aplicar Filtros
              </Button>
              <Button type="is-light" expanded style={{ marginTop: '0.5rem' }} onClick={() => { setSidebarFilter({ status: '', date: null, cats: [], price: 2500 }); setShowSidebar(false) }}>
                Limpar
              </Button>
            </div>
          </div>
        </Sidebar>

        <Sidebar open={showSidebarRight} onClose={() => setShowSidebarRight(false)} right>
          <div className="tx-offcanvas-panel">
            <div className="tx-offcanvas-header">
              <h3 className="tx-offcanvas-title">Detalhes do Item</h3>
              <Button type="is-ghost" size="is-small" iconLeft="close" onClick={() => setShowSidebarRight(false)} />
            </div>
            <div className="tx-offcanvas-body">
              <div className="tx-detail-grid" style={{ marginBottom: '1rem' }}>
                <div><p className="tx-detail-label">Nome</p><p className="tx-detail-value">Monitor 27" 4K</p></div>
                <div><p className="tx-detail-label">SKU</p><p className="tx-detail-value">MON-27-4K-002</p></div>
                <div><p className="tx-detail-label">Categoria</p><p className="tx-detail-value">Hardware</p></div>
                <div><p className="tx-detail-label">Estoque</p><p className="tx-detail-value">8 un.</p></div>
                <div><p className="tx-detail-label">Preço</p><p className="tx-detail-value">R$ 2.199,90</p></div>
                <div><p className="tx-detail-label">Status</p><p className="tx-detail-value"><span className="tag is-success is-light">Ativo</span></p></div>
              </div>
              <Message type="is-warning" style={{ fontSize: '0.82rem' }}>
                Estoque baixo — apenas 8 unidades disponíveis.
              </Message>
            </div>
            <div className="tx-offcanvas-footer">
              <Button type="is-info" expanded iconLeft="pencil" onClick={() => { setShowSidebarRight(false); ui.notify('Editando...', 'is-info') }}>
                Editar
              </Button>
            </div>
          </div>
        </Sidebar>
      </CardComponent>

      <CardComponent title="Collapse / Acordeão" icon="mdi-chevron-down" style={{ marginTop: '1rem' }}>
        <div className="tx-collapse-list">
          {collapsePanels.map((p, i) => (
            <Collapse
              key={i}
              open={openPanel === i}
              onToggle={(v) => setOpenPanel(v ? i : openPanel === i ? null : openPanel)}
              trigger={({ open }) => (
                <div className="tx-collapse-trigger">
                  <span className={`mdi ${p.icon}`} style={{ fontSize: '1.1rem', color: 'var(--tx-primary)' }} />
                  <span className="tx-collapse-label">{p.title}</span>
                  <span className={`mdi tx-collapse-chevron ${open ? 'mdi-chevron-up' : 'mdi-chevron-down'}`} />
                </div>
              )}
            >
              <div className="tx-collapse-body">{p.content}</div>
            </Collapse>
          ))}
        </div>
      </CardComponent>
    </div>
  )
}
