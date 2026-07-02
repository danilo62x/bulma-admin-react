import { useMemo, useState } from 'react'
import CardComponent from '@/components/ui/CardComponent'
import Button from '@/components/ui/Button'
import Tabs from '@/components/ui/Tabs'
import Collapse from '@/components/ui/Collapse'
import Tooltip from '@/components/ui/Tooltip'
import Steps from '@/components/ui/Steps'
import Rate from '@/components/ui/Rate'
import TagInput from '@/components/ui/TagInput'
import Skeleton from '@/components/ui/Skeleton'

const accordionPanels = [
  { title: 'O que está incluído?', icon: 'mdi-package-variant', content: 'Todos os componentes de UI, temas claro e escuro, e exemplos prontos para produção.' },
  { title: 'Posso personalizar as cores?', icon: 'mdi-palette', content: 'Sim, todas as cores usam tokens de design (CSS custom properties) configuráveis em tempo de execução.' },
  { title: 'Há suporte a TypeScript?', icon: 'mdi-language-typescript', content: 'Completo — todos os componentes possuem props tipadas.' },
]

const faqPanels = [
  { title: 'Entrega', content: 'Enviamos para todo o Brasil em até 5 dias úteis.' },
  { title: 'Trocas e devoluções', content: 'Você tem até 30 dias para solicitar a troca.' },
  { title: 'Garantia', content: 'Todos os produtos têm garantia de 12 meses.' },
]

const tagSuggestions = ['React', 'Bulma', 'Zustand', 'TypeScript', 'JavaScript', 'Vite', 'SCSS', 'ApexCharts']
const avatarColors = ['#485fc7', '#48c774', '#3273dc', '#f59e0b', '#9b59b6', '#e74c3c', '#1abc9c']

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
function avatarStyle(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  const color = avatarColors[Math.abs(h) % avatarColors.length]
  return { background: `color-mix(in srgb, ${color} 16%, transparent)`, color }
}

export default function UiAdvanced() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeTab2, setActiveTab2] = useState(0)
  const [openPanel, setOpenPanel] = useState<number | null>(0)
  const [multiOpen, setMultiOpen] = useState<boolean[]>([true, true, false])
  const [activeStep, setActiveStep] = useState(2)
  const [rating, setRating] = useState(3)
  const [ratingHalf, setRatingHalf] = useState(4)
  const [tags, setTags] = useState<string[]>(['React', 'Bulma', 'TypeScript'])
  const [tagTyping, setTagTyping] = useState('')
  const [loadingSkeleton, setLoadingSkeleton] = useState(true)

  const filteredTagSuggestions = useMemo(
    () => tagSuggestions.filter((t) => !tags.includes(t) && t.toLowerCase().includes(tagTyping.toLowerCase())),
    [tags, tagTyping]
  )

  const stepContents = [
    'Itens selecionados — revise o seu carrinho de compras.',
    'Informe o endereço de entrega do pedido.',
    'Escolha a forma de pagamento: cartão ou Pix.',
    'Pedido realizado com sucesso!',
  ]

  return (
    <div className="ui-advanced">
      <CardComponent title="Breadcrumb — Trilha de navegação" icon="mdi-chevron-right">
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <a href="#">
                <span className="icon is-small">
                  <i className="mdi mdi-view-dashboard" />
                </span>
                <span>Início</span>
              </a>
            </li>
            <li>
              <a href="#">Componentes</a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                Avançados
              </a>
            </li>
          </ul>
        </nav>

        <p className="tx-component-label" style={{ marginTop: '1rem' }}>
          Separador: seta
        </p>
        <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Usuários</a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                Editar
              </a>
            </li>
          </ul>
        </nav>
      </CardComponent>

      <CardComponent title="Abas" icon="mdi-tab" style={{ marginTop: '1rem' }}>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          tabs={[
            {
              label: 'Visão geral',
              icon: 'view-dashboard',
              content: <p style={{ fontSize: '0.9rem', color: 'var(--tx-text-muted)' }}>Resumo geral do projeto, métricas e indicadores principais em um só lugar.</p>,
            },
            {
              label: 'Atividade',
              icon: 'bell',
              content: <p style={{ fontSize: '0.9rem', color: 'var(--tx-text-muted)' }}>Histórico de eventos recentes, notificações e ações realizadas pela equipe.</p>,
            },
            {
              label: 'Configurações',
              icon: 'cog',
              content: <p style={{ fontSize: '0.9rem', color: 'var(--tx-text-muted)' }}>Ajuste preferências, integrações e permissões da sua conta.</p>,
            },
          ]}
        />

        <p className="tx-component-label" style={{ marginTop: '1rem' }}>
          Períodos
        </p>
        <Tabs
          value={activeTab2}
          onChange={setActiveTab2}
          tabs={[
            { label: 'Mensal', content: null },
            { label: 'Trimestral', content: null },
            { label: 'Anual', content: null },
          ]}
        />
      </CardComponent>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-6">
          <CardComponent title="Acordeão — apenas um aberto" icon="mdi-chevron-down">
            <div className="tx-collapse-list">
              {accordionPanels.map((p, i) => (
                <Collapse
                  key={i}
                  open={openPanel === i}
                  onToggle={(v) => setOpenPanel(v ? i : null)}
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
        <div className="column is-6">
          <CardComponent title="Acordeão — múltiplos abertos" icon="mdi-chevron-down">
            <div className="tx-collapse-list">
              {faqPanels.map((p, i) => (
                <Collapse
                  key={i}
                  open={multiOpen[i]}
                  onToggle={(v) => setMultiOpen((prev) => prev.map((o, idx) => (idx === i ? v : o)))}
                  trigger={({ open }) => (
                    <div className="tx-collapse-trigger">
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
      </div>

      <CardComponent title="Tooltips" icon="mdi-tooltip" style={{ marginTop: '1rem' }}>
        <div className="tx-btn-group">
          <Tooltip label="Dica no topo" position="is-top" type="is-dark">
            <Button type="is-light">Topo</Button>
          </Tooltip>
          <Tooltip label="Dica embaixo" position="is-bottom" type="is-info">
            <Button type="is-light">Abaixo</Button>
          </Tooltip>
          <Tooltip label="Dica à esquerda" position="is-left" type="is-success">
            <Button type="is-light">Esquerda</Button>
          </Tooltip>
          <Tooltip label="Dica à direita" position="is-right" type="is-warning">
            <Button type="is-light">Direita</Button>
          </Tooltip>
          <Tooltip label="Mais informações sobre este recurso" position="is-top">
            <span className="icon has-text-grey">
              <i className="mdi mdi-help-circle-outline" style={{ fontSize: '1.4rem' }} />
            </span>
          </Tooltip>
        </div>
      </CardComponent>

      <CardComponent title="Etapas" icon="mdi-format-list-numbered" style={{ marginTop: '1rem' }}>
        <Steps
          current={activeStep}
          onChange={setActiveStep}
          steps={[{ label: 'Carrinho' }, { label: 'Endereço' }, { label: 'Pagamento' }, { label: 'Confirmação' }]}
        />
        <p className="tx-step-content">{stepContents[activeStep - 1]}</p>
        <div className="tx-btn-group" style={{ justifyContent: 'center', marginTop: '1rem' }}>
          <Button disabled={activeStep === 1} iconLeft="chevron-left" onClick={() => setActiveStep((s) => Math.max(1, s - 1))}>
            Anterior
          </Button>
          <Button type="is-primary" disabled={activeStep === 4} iconRight="chevron-right" onClick={() => setActiveStep((s) => Math.min(4, s + 1))}>
            Próximo
          </Button>
        </div>
      </CardComponent>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-6">
          <CardComponent title="Avaliação" icon="mdi-star">
            <div className="tx-rate-row">
              <Rate value={rating} onChange={setRating} max={5} />
              <span style={{ fontSize: '0.875rem', color: 'var(--tx-text-muted)' }}>{rating} de 5</span>
            </div>
            <div className="tx-rate-row" style={{ borderTop: '1px solid var(--tx-border)', paddingTop: '1rem', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.875rem' }}>Somente leitura:</span>
              <Rate value={4} disabled />
            </div>
            <div className="tx-rate-row" style={{ marginTop: '1rem' }}>
              <span style={{ fontSize: '0.875rem' }}>Curtidas:</span>
              <Rate value={ratingHalf} onChange={setRatingHalf} max={5} />
            </div>
          </CardComponent>
        </div>

        <div className="column is-6">
          <CardComponent title="Entrada de tags" icon="mdi-tag-multiple">
            <TagInput
              value={tags}
              onChange={setTags}
              data={filteredTagSuggestions}
              autocomplete
              allowNew
              icon="label"
              placeholder="Adicionar tecnologia..."
              onTyping={setTagTyping}
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--tx-text-muted)' }}>
              {tags.length} tag(s) — pressione Enter para adicionar, Backspace para remover.
            </p>
          </CardComponent>
        </div>
      </div>

      <CardComponent title="Badges (.tag)" icon="mdi-label" style={{ marginTop: '1rem' }}>
        <p className="tx-component-label">Soft / light</p>
        <div className="tx-tags-showcase">
          <span className="tag is-primary is-light">Primário</span>
          <span className="tag is-success is-light">Sucesso</span>
          <span className="tag is-warning is-light">Aviso</span>
          <span className="tag is-danger is-light">Erro</span>
          <span className="tag is-light">Neutro</span>
        </div>
        <p className="tx-component-label" style={{ marginTop: '1rem' }}>
          Solid
        </p>
        <div className="tx-tags-showcase">
          <span className="tag is-primary">Primário</span>
          <span className="tag is-success">Sucesso</span>
          <span className="tag is-warning">Aviso</span>
          <span className="tag is-danger">Erro</span>
          <span className="tag is-dark">Neutro</span>
        </div>
        <p className="tx-component-label" style={{ marginTop: '1rem' }}>
          Com ponto de status e ícone
        </p>
        <div className="tx-tags-showcase">
          <span className="tag is-success is-light">
            <span className="tx-badge-dot" style={{ background: 'var(--tx-success)' }} />
            Online
          </span>
          <span className="tag is-warning is-light">
            <span className="tx-badge-dot" style={{ background: 'var(--tx-warning)' }} />
            Pendente
          </span>
          <span className="tag is-light">
            <span className="tx-badge-dot" style={{ background: 'var(--tx-text-muted)' }} />
            Offline
          </span>
          <span className="tag is-primary">
            <span className="icon is-small">
              <i className="mdi mdi-star" />
            </span>
            <span>Premium</span>
          </span>
          <span className="tag is-success">
            <span className="icon is-small">
              <i className="mdi mdi-check" />
            </span>
            <span>Verificado</span>
          </span>
        </div>
      </CardComponent>

      <CardComponent title="Avatares" icon="mdi-account-circle" style={{ marginTop: '1rem' }}>
        <p className="tx-component-label">Tamanhos (iniciais)</p>
        <div className="tx-avatar-row">
          {[
            ['Ana Silva', 'tx-avatar-xs'],
            ['Bruno Costa', 'tx-avatar-sm'],
            ['Carla Dias', 'tx-avatar-md'],
            ['Diego Luz', 'tx-avatar-lg'],
            ['Erica Melo', 'tx-avatar-xl'],
          ].map(([name, size]) => (
            <span key={name} className={`tx-avatar ${size}`} style={avatarStyle(name)}>
              {initials(name)}
            </span>
          ))}
        </div>

        <p className="tx-component-label" style={{ marginTop: '1.25rem' }}>
          Iniciais + status
        </p>
        <div className="tx-avatar-row">
          <span className="tx-avatar tx-avatar-md" style={avatarStyle('Marina Reis')}>
            {initials('Marina Reis')}
            <span className="tx-avatar-status" style={{ background: 'var(--tx-success)' }} />
          </span>
          <span className="tx-avatar tx-avatar-md" style={avatarStyle('João Pedro')}>
            {initials('João Pedro')}
            <span className="tx-avatar-status" style={{ background: 'var(--tx-warning)' }} />
          </span>
          <span className="tx-avatar tx-avatar-md" style={avatarStyle('Lia Souza')}>
            {initials('Lia Souza')}
            <span className="tx-avatar-status" style={{ background: 'var(--tx-text-muted)' }} />
          </span>
        </div>

        <p className="tx-component-label" style={{ marginTop: '1.25rem' }}>
          Grupo empilhado
        </p>
        <div className="tx-avatar-group">
          {['Marina Costa', 'Lucas Pinto', 'André Sá', 'Rafa Lima'].map((n) => (
            <span key={n} className="tx-avatar tx-avatar-md tx-avatar-stacked" style={avatarStyle(n)}>
              {initials(n)}
            </span>
          ))}
          <span className="tx-avatar tx-avatar-md tx-avatar-stacked tx-avatar-extra">+5</span>
        </div>
      </CardComponent>

      <CardComponent
        title="Skeleton"
        icon="mdi-rectangle-outline"
        style={{ marginTop: '1rem' }}
        toolbar={
          <Button size="is-small" iconLeft="refresh" onClick={() => setLoadingSkeleton((v) => !v)}>
            {loadingSkeleton ? 'Mostrar conteúdo' : 'Mostrar loading'}
          </Button>
        }
      >
        {loadingSkeleton ? (
          <div className="tx-skeleton-block">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Skeleton circle size="is-large" />
              <div style={{ flex: 1 }}>
                <Skeleton width="40%" />
                <Skeleton width="25%" />
              </div>
            </div>
            <div style={{ height: 120 }}>
              <Skeleton width="100%" />
            </div>
            <Skeleton />
            <Skeleton width="90%" />
            <Skeleton width="75%" />
          </div>
        ) : (
          <div className="tx-skeleton-block">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="tx-avatar tx-avatar-lg" style={avatarStyle('Time Produto')}>
                {initials('Time Produto')}
              </span>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--tx-text-heading)' }}>Equipe de Produto</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--tx-text-muted)' }}>12 membros ativos</p>
              </div>
            </div>
            <div className="tx-skeleton-loaded">Conteúdo carregado</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--tx-text-muted)' }}>
              O conteúdo real substitui os placeholders assim que os dados terminam de carregar, evitando saltos de layout.
            </p>
          </div>
        )}
      </CardComponent>
    </div>
  )
}
