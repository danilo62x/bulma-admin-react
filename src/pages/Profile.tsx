import { useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import CardComponent from '@/components/ui/CardComponent'
import Button from '@/components/ui/Button'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Progress from '@/components/ui/Progress'

const profileStats = [
  { label: 'Tarefas concluídas', value: '248', trend: '+12 este mês', up: true },
  { label: 'Relatórios emitidos', value: '64', trend: '+5 este mês', up: true },
  { label: 'Projetos ativos', value: '7', trend: '+2 novos', up: true },
  { label: 'Avaliação da equipe', value: '4.8★', trend: '+0.2 no trimestre', up: true },
]

const contactInfo = [
  { value: 'admin@empresa.com', icon: 'mdi-email-outline' },
  { value: '(11) 99999-9999', icon: 'mdi-phone-outline' },
  { value: 'São Paulo, SP', icon: 'mdi-map-marker-outline' },
  { value: 'Tecnologia', icon: 'mdi-domain' },
  { value: 'Administrador Sênior', icon: 'mdi-badge-account' },
]

const skills = [
  { name: 'Gestão de Projetos', pct: 92, type: 'is-primary' as const },
  { name: 'Análise de Dados', pct: 85, type: 'is-info' as const },
  { name: 'Liderança de Equipe', pct: 88, type: 'is-success' as const },
  { name: 'Desenvolvimento React', pct: 78, type: 'is-warning' as const },
  { name: 'Comunicação', pct: 95, type: 'is-primary' as const },
]

const interests = ['React', 'TypeScript', 'Bulma', 'UX Design', 'Analytics', 'Agile', 'Node.js', 'Docker']

const timeline = [
  { title: 'Relatório mensal publicado', desc: 'Análise de KPIs de Abril 2025 disponível no painel.', time: 'Há 2 horas', icon: 'mdi-file-chart', color: '#485fc7' },
  { title: 'Novo membro adicionado à equipe', desc: 'Fernanda Ramos entrou no projeto Alpha.', time: 'Há 5 horas', icon: 'mdi-account-plus', color: '#48c774' },
  { title: 'Meta de vendas atingida', desc: 'Superamos a meta de R$ 50k em Abril.', time: 'Ontem', icon: 'mdi-trophy', color: '#f59e0b' },
  { title: 'Atualização de sistema aplicada', desc: 'Versão 2.4.1 implantada em produção.', time: '2 dias atrás', icon: 'mdi-update', color: '#3273dc' },
  { title: 'Reunião com stakeholders', desc: 'Apresentação do roadmap Q2 aprovada.', time: '3 dias atrás', icon: 'mdi-presentation', color: '#9b59b6' },
  { title: 'Backup automático concluído', desc: 'Snapshot de banco de dados salvo com sucesso.', time: '1 semana atrás', icon: 'mdi-database-check', color: '#1abc9c' },
]

const projects = [
  { name: 'Dashboard Analytics', desc: 'Painel de BI com métricas em tempo real.', pct: 78, status: 'Ativo', statusClass: 'is-primary is-light', icon: 'mdi-chart-line', color: '#485fc7', team: [{ initials: 'J', color: '#485fc7' }, { initials: 'M', color: '#48c774' }, { initials: 'C', color: '#f59e0b' }] },
  { name: 'App Mobile', desc: 'Aplicativo React Native para gestão em campo.', pct: 42, status: 'Em andamento', statusClass: 'is-warning is-light', icon: 'mdi-cellphone', color: '#f59e0b', team: [{ initials: 'A', color: '#3273dc' }, { initials: 'R', color: '#9b59b6' }] },
  { name: 'Portal do Cliente', desc: 'Self-service para clientes visualizarem pedidos.', pct: 95, status: 'Revisão', statusClass: 'is-info is-light', icon: 'mdi-web', color: '#3273dc', team: [{ initials: 'F', color: '#1abc9c' }, { initials: 'T', color: '#e67e22' }, { initials: 'B', color: '#485fc7' }] },
  { name: 'Migração de Dados', desc: 'Migração do legado para novo banco PostgreSQL.', pct: 60, status: 'Ativo', statusClass: 'is-success is-light', icon: 'mdi-database-arrow-right', color: '#48c774', team: [{ initials: 'D', color: '#f14668' }, { initials: 'L', color: '#485fc7' }] },
]

const styles = `
.tx-profile-hero { background: var(--tx-card-bg); border: 1px solid var(--tx-border); border-radius: var(--tx-radius); margin-bottom: 1rem; overflow: hidden; }
.tx-profile-cover { height: 120px; background: linear-gradient(135deg, #485fc7 0%, #3273dc 40%, #48c774 100%); }
.tx-profile-identity { display: flex; align-items: flex-end; gap: 1.25rem; padding: 0 1.5rem 1.25rem; flex-wrap: wrap; }
.tx-avatar-lg { width: 88px; height: 88px; border-radius: 50%; background: var(--tx-primary); border: 4px solid var(--tx-card-bg); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: white; flex-shrink: 0; margin-top: -44px; position: relative; }
.tx-avatar-edit { position: absolute; bottom: 0; right: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--tx-primary); border: 2px solid var(--tx-card-bg); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; cursor: pointer; }
.tx-profile-meta { flex: 1; }
.tx-profile-name { font-size: 1.3rem; font-weight: 700; color: var(--tx-text-heading); margin-bottom: 0.25rem; }
.tx-profile-role { margin-bottom: 0.2rem; }
.tx-profile-since { font-size: 0.78rem; color: var(--tx-text-muted); }
.tx-profile-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
.tx-profile-stats { margin-bottom: 0 !important; }
.tx-pstat { background: var(--tx-card-bg); border: 1px solid var(--tx-border); border-radius: var(--tx-radius); padding: 1rem 1.25rem; margin-bottom: 1rem; }
.tx-pstat-val { font-size: 1.5rem; font-weight: 700; color: var(--tx-text-heading); }
.tx-pstat-label { font-size: 0.8rem; color: var(--tx-text-muted); margin-top: 0.2rem; }
.tx-pstat-trend { font-size: 0.75rem; margin-top: 0.25rem; display: flex; align-items: center; gap: 0.2rem; }
.tx-info-list { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1rem; }
.tx-info-row { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: var(--tx-text); }
.tx-info-icon { font-size: 1rem; color: var(--tx-primary); width: 20px; }
.tx-skills { display: flex; flex-direction: column; gap: 0.75rem; }
.tx-skill-header { display: flex; justify-content: space-between; margin-bottom: 0.3rem; }
.tx-skill-name { font-size: 0.83rem; color: var(--tx-text); }
.tx-skill-pct { font-size: 0.8rem; font-weight: 600; color: var(--tx-text-muted); }
.tx-timeline { display: flex; flex-direction: column; gap: 0; }
.tx-tl-item { display: flex; gap: 0.85rem; padding-bottom: 1.2rem; position: relative; }
.tx-tl-item:last-child { padding-bottom: 0; }
.tx-tl-item:last-child .tx-tl-line { display: none; }
.tx-tl-line { position: absolute; left: 15px; top: 28px; bottom: 0; width: 2px; background: var(--tx-border); }
.tx-tl-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.9rem; flex-shrink: 0; z-index: 1; }
.tx-tl-content { flex: 1; }
.tx-tl-title { font-size: 0.875rem; font-weight: 500; color: var(--tx-text); }
.tx-tl-desc { font-size: 0.8rem; color: var(--tx-text-muted); margin-top: 0.2rem; }
.tx-tl-time { font-size: 0.75rem; color: var(--tx-text-muted); margin-top: 0.3rem; }
.tx-project-card { background: var(--tx-body-bg); border: 1px solid var(--tx-border); border-radius: var(--tx-radius); padding: 1rem; height: 100%; display: flex; flex-direction: column; gap: 0.5rem; }
.tx-project-header { display: flex; justify-content: space-between; align-items: center; }
.tx-project-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
.tx-project-name { font-size: 0.875rem; font-weight: 600; color: var(--tx-text-heading); }
.tx-project-desc { font-size: 0.8rem; color: var(--tx-text-muted); flex: 1; }
.tx-project-footer { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; }
.tx-project-progress { flex: 1; display: flex; align-items: center; gap: 0.4rem; }
.tx-project-pct { font-size: 0.72rem; color: var(--tx-text-muted); white-space: nowrap; }
.tx-project-team { display: flex; }
.tx-team-avatar { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; color: white; border: 2px solid var(--tx-card-bg); position: relative; }
`

export default function Profile() {
  usePageTitle('Meu Perfil')
  const ui = useUiStore()
  const auth = useAuthStore()

  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: auth.user?.name ?? 'Administrador',
    email: auth.user?.email ?? 'admin@empresa.com',
    phone: '(11) 99999-9999',
    dept: 'Tecnologia',
    bio: 'Administrador sênior focado em operações e gestão.',
  })

  function saveProfile() {
    setEditing(false)
    ui.notifySuccess('Perfil atualizado com sucesso!')
  }

  return (
    <div>
      <style>{styles}</style>

      <div className="tx-profile-hero">
        <div className="tx-profile-cover" />
        <div className="tx-profile-identity">
          <div className="tx-avatar-lg">
            <span>{auth.user?.name?.[0] ?? 'A'}</span>
            <button className="tx-avatar-edit" onClick={() => ui.notify('Upload de foto', 'is-info')}>
              <span className="mdi mdi-camera" />
            </button>
          </div>
          <div className="tx-profile-meta">
            <h2 className="tx-profile-name">{auth.user?.name ?? 'Administrador'}</h2>
            <p className="tx-profile-role">
              <span className="tag is-primary is-light">Administrador</span>
            </p>
            <p className="tx-profile-since">Membro desde Janeiro de 2024</p>
          </div>
          <div className="tx-profile-actions">
            <Button type="is-primary" iconLeft="pencil" onClick={() => setEditing(!editing)}>
              {editing ? 'Cancelar' : 'Editar Perfil'}
            </Button>
            <Button type="is-light" iconLeft="share-variant" onClick={() => ui.notifySuccess('Link copiado!')}>
              Compartilhar
            </Button>
          </div>
        </div>
      </div>

      <div className="columns is-multiline tx-profile-stats">
        {profileStats.map((s) => (
          <div key={s.label} className="column is-3-desktop is-6-tablet">
            <div className="tx-pstat">
              <div className="tx-pstat-val">{s.value}</div>
              <div className="tx-pstat-label">{s.label}</div>
              <div className={`tx-pstat-trend ${s.up ? 'has-text-success' : 'has-text-warning'}`}>
                <span className={`mdi ${s.up ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'}`} />
                {s.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="columns">
        <div className="column is-4">
          <CardComponent title="Sobre" icon="mdi-account-circle">
            {!editing ? (
              <>
                <p style={{ fontSize: '0.875rem', color: 'var(--tx-text-muted)', lineHeight: 1.65 }}>
                  Administrador sênior com foco em operações, relatórios e gestão de equipes. Mais de 8 anos de experiência em sistemas de gestão empresarial.
                </p>
                <div className="tx-info-list">
                  {contactInfo.map((info) => (
                    <div key={info.value} className="tx-info-row">
                      <span className={`mdi tx-info-icon ${info.icon}`} />
                      <span>{info.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <Field label="Nome completo">
                  <Input value={editForm.name} onChange={(v) => setEditForm({ ...editForm, name: v })} icon="account" />
                </Field>
                <Field label="E-mail">
                  <Input value={editForm.email} onChange={(v) => setEditForm({ ...editForm, email: v })} type="email" icon="email" />
                </Field>
                <Field label="Telefone">
                  <Input value={editForm.phone} onChange={(v) => setEditForm({ ...editForm, phone: v })} icon="phone" />
                </Field>
                <Field label="Departamento">
                  <Select value={editForm.dept} onChange={(v) => setEditForm({ ...editForm, dept: v as string })}>
                    <option>Tecnologia</option>
                    <option>Comercial</option>
                    <option>Operações</option>
                    <option>Financeiro</option>
                  </Select>
                </Field>
                <Field label="Bio">
                  <Input value={editForm.bio} onChange={(v) => setEditForm({ ...editForm, bio: v })} type="textarea" rows={3} maxLength={240} hasCounter />
                </Field>
                <div className="tx-form-actions">
                  <Button type="is-primary" iconLeft="content-save" onClick={saveProfile}>Salvar</Button>
                  <Button type="is-light" onClick={() => setEditing(false)}>Cancelar</Button>
                </div>
              </>
            )}
          </CardComponent>

          <CardComponent title="Habilidades" icon="mdi-star-outline" style={{ marginTop: '1rem' }}>
            <div className="tx-skills">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="tx-skill-header">
                    <span className="tx-skill-name">{skill.name}</span>
                    <span className="tx-skill-pct">{skill.pct}%</span>
                  </div>
                  <Progress value={skill.pct} type={skill.type} size="is-small" />
                </div>
              ))}
            </div>
          </CardComponent>

          <CardComponent title="Interesses" icon="mdi-tag-multiple" style={{ marginTop: '1rem' }}>
            <div className="tx-tags-showcase">
              {interests.map((tag) => (
                <span key={tag} className="tag is-primary is-light">{tag}</span>
              ))}
            </div>
          </CardComponent>
        </div>

        <div className="column is-8">
          <CardComponent
            title="Atividade Recente"
            icon="mdi-history"
            toolbar={
              <Button size="is-small" type="is-ghost" iconLeft="refresh" onClick={() => ui.notify('Atualizado!', 'is-info')}>
                Atualizar
              </Button>
            }
          >
            <div className="tx-timeline">
              {timeline.map((evt, i) => (
                <div key={i} className="tx-tl-item">
                  <div className="tx-tl-line" />
                  <div className="tx-tl-dot" style={{ background: evt.color }}>
                    <span className={`mdi ${evt.icon}`} />
                  </div>
                  <div className="tx-tl-content">
                    <div className="tx-tl-title">{evt.title}</div>
                    {evt.desc && <div className="tx-tl-desc">{evt.desc}</div>}
                    <div className="tx-tl-time">{evt.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardComponent>

          <CardComponent title="Projetos Recentes" icon="mdi-folder-multiple" style={{ marginTop: '1rem' }}>
            <div className="columns is-multiline">
              {projects.map((proj) => (
                <div key={proj.name} className="column is-6">
                  <div className="tx-project-card">
                    <div className="tx-project-header">
                      <div
                        className="tx-project-icon"
                        style={{
                          background: `color-mix(in srgb, ${proj.color} 15%, transparent)`,
                          color: proj.color,
                        }}
                      >
                        <span className={`mdi ${proj.icon}`} />
                      </div>
                      <span className={`tag is-small ${proj.statusClass}`}>{proj.status}</span>
                    </div>
                    <div className="tx-project-name">{proj.name}</div>
                    <div className="tx-project-desc">{proj.desc}</div>
                    <div className="tx-project-footer">
                      <div className="tx-project-progress">
                        <Progress
                          value={proj.pct}
                          type={proj.color === '#48c774' ? 'is-success' : 'is-primary'}
                          size="is-small"
                        />
                        <span className="tx-project-pct">{proj.pct}%</span>
                      </div>
                      <div className="tx-project-team">
                        {proj.team.map((m, mi) => (
                          <div
                            key={mi}
                            className="tx-team-avatar"
                            style={{
                              background: m.color,
                              marginLeft: mi > 0 ? '-6px' : '0',
                              zIndex: proj.team.length - mi,
                            }}
                          >
                            {m.initials}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  )
}
