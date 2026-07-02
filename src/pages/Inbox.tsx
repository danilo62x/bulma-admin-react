import { useMemo, useState } from 'react'
import { useUiStore } from '@/stores/ui'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Modal from '@/components/ui/Modal'

type FolderId = 'inbox' | 'sent' | 'drafts' | 'starred' | 'trash'

interface Folder {
  id: FolderId
  label: string
  icon: string
}

interface Email {
  id: string
  folder: FolderId
  sender: string
  initials: string
  email: string
  subject: string
  preview: string
  body: string
  time: string
  unread: boolean
  starred: boolean
  accent: string
}

const FOLDERS: Folder[] = [
  { id: 'inbox', label: 'Caixa de entrada', icon: 'mdi-email' },
  { id: 'sent', label: 'Enviados', icon: 'mdi-send' },
  { id: 'drafts', label: 'Rascunhos', icon: 'mdi-pencil' },
  { id: 'starred', label: 'Com estrela', icon: 'mdi-star' },
  { id: 'trash', label: 'Lixeira', icon: 'mdi-delete' },
]

const ACCENTS = ['#485fc7', '#48c774', '#f59e0b', '#f14668', '#3273dc']

const INITIAL_EMAILS: Email[] = [
  {
    id: '1',
    folder: 'inbox',
    sender: 'Marina Costa',
    initials: 'MC',
    email: 'marina.costa@empresa.com',
    subject: 'Proposta comercial atualizada',
    preview: 'Olá! Segue em anexo a versão revisada da proposta com os novos valores...',
    body: 'Olá!\n\nSegue em anexo a versão revisada da proposta comercial com os novos valores discutidos na reunião de ontem. Ajustei as condições de pagamento e incluí o desconto para contrato anual.\n\nPode revisar e me dizer se podemos seguir? Fico no aguardo.\n\nAbraços,\nMarina',
    time: '09:42',
    unread: true,
    starred: true,
    accent: ACCENTS[0],
  },
  {
    id: '2',
    folder: 'inbox',
    sender: 'Equipe Financeiro',
    initials: 'EF',
    email: 'financeiro@empresa.com',
    subject: 'Fatura de maio disponível',
    preview: 'Sua fatura referente ao mês de maio já está disponível para download...',
    body: 'Prezado cliente,\n\nSua fatura referente ao mês de maio já está disponível para download no portal. O vencimento é dia 10/06/2026.\n\nQualquer dúvida estamos à disposição.\n\nAtenciosamente,\nEquipe Financeiro',
    time: '08:15',
    unread: true,
    starred: false,
    accent: ACCENTS[1],
  },
  {
    id: '3',
    folder: 'inbox',
    sender: 'Lucas Pereira',
    initials: 'LP',
    email: 'lucas.p@parceiro.io',
    subject: 'Re: Integração da API',
    preview: 'Perfeito, consegui rodar os testes aqui e tudo passou. Vamos para produção?',
    body: 'Fala!\n\nPerfeito, consegui rodar os testes aqui no ambiente de homologação e tudo passou sem erros. As credenciais novas funcionaram normalmente.\n\nPodemos agendar o deploy para produção ainda esta semana?\n\nValeu,\nLucas',
    time: 'Ontem',
    unread: true,
    starred: false,
    accent: ACCENTS[2],
  },
  {
    id: '4',
    folder: 'inbox',
    sender: 'Aline Souza',
    initials: 'AS',
    email: 'aline.souza@design.co',
    subject: 'Mockups da nova landing page',
    preview: 'Terminei os mockups da home e da página de preços. Dá uma olhada...',
    body: 'Oi!\n\nTerminei os mockups da home e da página de preços. Tentei seguir o novo guia de marca com as cores atualizadas.\n\nDeixei os arquivos no Figma, o link está no canal do projeto. Aguardo seu feedback!\n\nAbraços,\nAline',
    time: 'Ontem',
    unread: false,
    starred: true,
    accent: ACCENTS[3],
  },
  {
    id: '5',
    folder: 'inbox',
    sender: 'Rafael Lima',
    initials: 'RL',
    email: 'rafael@enterprise.com',
    subject: 'Reunião de alinhamento - quinta',
    preview: 'Pessoal, vamos confirmar a reunião de alinhamento para quinta às 14h?',
    body: 'Pessoal,\n\nVamos confirmar a reunião de alinhamento para quinta-feira às 14h? Pauta:\n\n- Roadmap do trimestre\n- Métricas de retenção\n- Próximos contratos\n\nMandem confirmação de presença.\n\nObrigado,\nRafael',
    time: '23 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[4],
  },
  {
    id: '6',
    folder: 'sent',
    sender: 'Você',
    initials: 'EU',
    email: 'voce@empresa.com',
    subject: 'Re: Proposta comercial atualizada',
    preview: 'Recebido, Marina! Vou revisar hoje à tarde e te retorno até amanhã.',
    body: 'Recebido, Marina!\n\nVou revisar hoje à tarde e te retorno até amanhã com qualquer ajuste necessário. À primeira vista parece ótimo.\n\nObrigado,',
    time: '10:05',
    unread: false,
    starred: false,
    accent: ACCENTS[0],
  },
  {
    id: '7',
    folder: 'sent',
    sender: 'Você',
    initials: 'EU',
    email: 'voce@empresa.com',
    subject: 'Relatório semanal',
    preview: 'Segue o relatório semanal com os principais indicadores da equipe.',
    body: 'Time,\n\nSegue o relatório semanal com os principais indicadores. Crescemos 8% em conversões e reduzimos o tempo de resposta do suporte.\n\nDetalhes no anexo.',
    time: '22 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[1],
  },
  {
    id: '8',
    folder: 'drafts',
    sender: 'Rascunho',
    initials: 'RA',
    email: 'voce@empresa.com',
    subject: 'Ideias para o próximo evento',
    preview: 'Algumas ideias iniciais para o evento de lançamento do produto...',
    body: 'Algumas ideias iniciais para o evento de lançamento do produto:\n\n- Local: auditório principal\n- Formato híbrido (presencial + online)\n- Convidar parceiros estratégicos\n\n(rascunho não finalizado)',
    time: '20 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[2],
  },
]

export default function Inbox() {
  const ui = useUiStore()
  const [emails, setEmails] = useState<Email[]>(INITIAL_EMAILS)
  const [activeFolder, setActiveFolder] = useState<FolderId>('inbox')
  const [selectedId, setSelectedId] = useState<string | null>('1')
  const [search, setSearch] = useState('')
  const [composeOpen, setComposeOpen] = useState(false)
  const [composeForm, setComposeForm] = useState({ to: '', subject: '', body: '' })

  const folderCounts = useMemo<Record<FolderId, number>>(() => {
    const counts: Record<FolderId, number> = { inbox: 0, sent: 0, drafts: 0, starred: 0, trash: 0 }
    for (const e of emails) {
      if (e.folder === 'inbox' && e.unread) counts.inbox++
      if (e.folder === 'sent') counts.sent++
      if (e.folder === 'drafts') counts.drafts++
      if (e.starred) counts.starred++
      if (e.folder === 'trash') counts.trash++
    }
    return counts
  }, [emails])

  const list = useMemo(
    () =>
      emails.filter((e) => {
        const inFolder = activeFolder === 'starred' ? e.starred : e.folder === activeFolder
        if (!inFolder) return false
        if (search) {
          const q = search.toLowerCase()
          return (
            e.sender.toLowerCase().includes(q) ||
            e.subject.toLowerCase().includes(q) ||
            e.preview.toLowerCase().includes(q)
          )
        }
        return true
      }),
    [emails, activeFolder, search]
  )

  const selected = emails.find((e) => e.id === selectedId) ?? null

  function openEmail(id: string) {
    setSelectedId(id)
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, unread: false } : e)))
  }

  function toggleStar(id: string) {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)))
  }

  function changeFolder(id: FolderId) {
    setActiveFolder(id)
    setSelectedId(null)
  }

  function deleteEmail() {
    if (!selected) return
    setEmails((prev) => prev.map((e) => (e.id === selected.id ? { ...e, folder: 'trash' } : e)))
    setSelectedId(null)
    ui.notifySuccess('Mensagem movida para a lixeira')
  }

  function sendMessage() {
    setComposeOpen(false)
    setComposeForm({ to: '', subject: '', body: '' })
    ui.notifySuccess('Mensagem enviada com sucesso')
  }

  return (
    <div>
      <div className="tx-inbox-head">
        <div>
          <h1 className="title is-5" style={{ marginBottom: '0.15rem' }}>
            Caixa de entrada
          </h1>
          <p className="is-size-7 has-text-grey">Gerencie suas mensagens em um só lugar.</p>
        </div>
        <Button type="is-primary" iconLeft="email-plus" onClick={() => setComposeOpen(true)}>
          Escrever
        </Button>
      </div>

      <div className="columns">
        <aside className="column is-3-desktop is-2-widescreen is-hidden-touch">
          <div className="box" style={{ padding: '0.5rem' }}>
            <aside className="menu">
              <ul className="menu-list">
                {FOLDERS.map((f) => (
                  <li key={f.id}>
                    <a
                      className={`tx-folder-link ${activeFolder === f.id ? 'is-active' : ''}`}
                      onClick={() => changeFolder(f.id)}
                    >
                      <span className="tx-folder-label">
                        <span className={`mdi ${f.icon}`} />
                        {f.label}
                      </span>
                      {folderCounts[f.id] > 0 && (
                        <span className={`tag is-rounded ${activeFolder === f.id ? 'is-primary' : 'is-light'}`}>
                          {folderCounts[f.id]}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </aside>

        <div className="column is-12 is-hidden-desktop">
          <div className="field">
            <div className="control has-icons-left">
              <div className="select is-fullwidth">
                <select
                  value={activeFolder}
                  onChange={(e) => {
                    setActiveFolder(e.target.value as FolderId)
                    setSelectedId(null)
                  }}
                >
                  {FOLDERS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                      {folderCounts[f.id] > 0 ? ` (${folderCounts[f.id]})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <span className="icon is-left">
                <i className="mdi mdi-folder" />
              </span>
            </div>
          </div>
        </div>

        <section className={`column is-4-desktop is-4-widescreen ${selected ? 'is-hidden-touch' : ''}`}>
          <div className="box" style={{ padding: 0 }}>
            <div className="tx-inbox-search">
              <Input value={search} onChange={setSearch} placeholder="Buscar e-mails..." icon="magnify" size="is-small" />
            </div>
            <ul className="tx-email-list">
              {list.map((e) => (
                <li key={e.id}>
                  <a className={`tx-email-item ${selectedId === e.id ? 'is-selected' : ''}`} onClick={() => openEmail(e.id)}>
                    <span className="tx-email-avatar" style={{ ['--avatar-color' as any]: e.accent }}>
                      {e.initials}
                    </span>
                    <div className="tx-email-main">
                      <div className="tx-email-row">
                        <span className={`tx-email-sender ${e.unread ? 'is-unread' : ''}`}>{e.sender}</span>
                        <span className="is-size-7 has-text-grey">{e.time}</span>
                      </div>
                      <p className={`tx-email-subject ${e.unread ? 'is-unread' : ''}`}>{e.subject}</p>
                      <p className="tx-email-preview">{e.preview}</p>
                    </div>
                    <div className="tx-email-aside">
                      {e.unread && <span className="tx-email-dot" />}
                      <span
                        className={`tx-email-star ${e.starred ? 'is-starred' : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={(ev) => {
                          ev.stopPropagation()
                          toggleStar(e.id)
                        }}
                      >
                        <span className={`mdi ${e.starred ? 'mdi-star' : 'mdi-star-outline'}`} />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
              {list.length === 0 && (
                <li className="tx-email-empty">
                  <span className="mdi mdi-email-off-outline" style={{ fontSize: '1.6rem' }} />
                  <p className="is-size-7 has-text-grey">Nenhuma mensagem nesta pasta.</p>
                </li>
              )}
            </ul>
          </div>
        </section>

        <section className={`column ${!selected ? 'is-hidden-touch' : ''}`}>
          <div className="box tx-reading-pane">
            {selected ? (
              <>
                <header className="tx-reading-head">
                  <div className="tx-reading-from">
                    <Button
                      className="is-hidden-desktop"
                      size="is-small"
                      type="is-light"
                      iconLeft="arrow-left"
                      aria-label="Voltar"
                      onClick={() => setSelectedId(null)}
                    />
                    <span className="tx-email-avatar is-large" style={{ ['--avatar-color' as any]: selected.accent }}>
                      {selected.initials}
                    </span>
                    <div>
                      <h2 className="tx-reading-subject">{selected.subject}</h2>
                      <p className="is-size-7" style={{ color: 'var(--tx-text)' }}>
                        {selected.sender}
                      </p>
                      <p className="is-size-7 has-text-grey">{selected.email}</p>
                    </div>
                  </div>
                  <div className="tx-reading-actions">
                    <Tooltip label="Favoritar">
                      <Button
                        size="is-small"
                        type="is-light"
                        iconLeft={selected.starred ? 'star' : 'star-outline'}
                        className={selected.starred ? 'tx-star-active' : ''}
                        onClick={() => toggleStar(selected.id)}
                      />
                    </Tooltip>
                    <Tooltip label="Arquivar">
                      <Button
                        size="is-small"
                        type="is-light"
                        iconLeft="download"
                        onClick={() => ui.notifySuccess('Mensagem arquivada')}
                      />
                    </Tooltip>
                    <Tooltip label="Excluir">
                      <Button size="is-small" type="is-light" iconLeft="delete" onClick={deleteEmail} />
                    </Tooltip>
                  </div>
                </header>
                <div className="tx-reading-body">{selected.body}</div>
                <footer className="tx-reading-foot">
                  <Button type="is-light" iconLeft="reply" onClick={() => setComposeOpen(true)}>
                    Responder
                  </Button>
                </footer>
              </>
            ) : (
              <div className="tx-reading-empty">
                <span className="tx-reading-empty-icon">
                  <span className="mdi mdi-email-outline" />
                </span>
                <p className="has-text-weight-medium" style={{ color: 'var(--tx-text-heading)' }}>
                  Selecione uma mensagem
                </p>
                <p className="is-size-7 has-text-grey">Escolha um e-mail na lista para visualizar o conteúdo.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Modal open={composeOpen} onClose={() => setComposeOpen(false)}>
        <div className="modal-card" style={{ width: 560, maxWidth: '100%' }}>
          <header className="modal-card-head">
            <div>
              <p className="modal-card-title">Nova mensagem</p>
              <p className="is-size-7 has-text-grey">Escreva e envie um e-mail</p>
            </div>
            <button className="delete" onClick={() => setComposeOpen(false)} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Para</label>
              <Input
                value={composeForm.to}
                onChange={(v) => setComposeForm({ ...composeForm, to: v })}
                type="email"
                placeholder="destinatario@email.com"
                icon="account"
              />
            </div>
            <div className="field">
              <label className="label">Assunto</label>
              <Input
                value={composeForm.subject}
                onChange={(v) => setComposeForm({ ...composeForm, subject: v })}
                placeholder="Assunto da mensagem"
                icon="format-title"
              />
            </div>
            <div className="field">
              <label className="label">Mensagem</label>
              <Input
                value={composeForm.body}
                onChange={(v) => setComposeForm({ ...composeForm, body: v })}
                type="textarea"
                rows={6}
                placeholder="Escreva sua mensagem..."
              />
            </div>
          </section>
          <footer className="modal-card-foot tx-modal-foot" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => setComposeOpen(false)}>Cancelar</Button>
            <Button type="is-primary" iconLeft="send" onClick={sendMessage}>
              Enviar
            </Button>
          </footer>
        </div>
      </Modal>
    </div>
  )
}
