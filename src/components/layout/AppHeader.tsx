import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import Dropdown, { DropdownItem, DropdownDivider } from '@/components/ui/Dropdown'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const mockNotifications = [
  { id: 1, title: 'Novo usuário cadastrado', icon: 'mdi-account-plus', color: '#48c774', time: '2 min atrás' },
  { id: 2, title: 'Relatório mensal disponível', icon: 'mdi-file-chart', color: '#3273dc', time: '1 hora atrás' },
  { id: 3, title: 'Atualização do sistema', icon: 'mdi-update', color: '#f59e0b', time: '3 horas atrás' },
]

export default function AppHeader() {
  const ui = useUiStore()
  const auth = useAuthStore()
  const navigate = useNavigate()
  const [showClearDataModal, setShowClearDataModal] = useState(false)

  const userInitials = useMemo(() => {
    if (!auth.user?.name) return '?'
    return auth.user.name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
  }, [auth.user])

  const unreadCount = 3

  function handleLogout() {
    auth.logout()
    navigate('/login')
  }

  function handleClearData() {
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch {
      /* ignora bloqueios de storage */
    }
    setShowClearDataModal(false)
    window.location.href = '/login'
  }

  return (
    <header className="tx-header">
      <div className="tx-header-left">
        <button
          className="button is-ghost tx-icon-btn is-hidden-desktop"
          onClick={() => ui.toggleSidebarMobile()}
        >
          <span className="mdi mdi-menu" />
        </button>

        <button
          className="button is-ghost tx-icon-btn is-hidden-touch"
          onClick={() => ui.toggleSidebar()}
        >
          <span
            className={`mdi ${ui.sidebarCollapsed ? 'mdi-menu-open' : 'mdi-menu'}`}
          />
        </button>

        <span className="tx-page-title">{ui.pageTitle}</span>
      </div>

      <div className="tx-header-right">
        <LanguageSwitcher />

        <button
          className="button is-ghost tx-icon-btn"
          title={ui.darkMode ? 'Modo claro' : 'Modo escuro'}
          onClick={() => ui.toggleDarkMode()}
        >
          <span
            className={`mdi ${ui.darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'}`}
          />
        </button>

        <Dropdown
          align="right"
          menuStyle={{ minWidth: 300 }}
          trigger={() => (
            <button className="button is-ghost tx-icon-btn tx-icon-btn-notif">
              <span className="mdi mdi-bell" />
              {unreadCount > 0 && (
                <span className="tag is-danger is-rounded tx-notif-badge">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}
        >
          <div className="tx-dropdown-header">Notificações</div>
          {mockNotifications.map((n) => (
            <DropdownItem key={n.id}>
              <div className="tx-notif-item">
                <span
                  className={`mdi tx-notif-icon ${n.icon}`}
                  style={{ color: n.color }}
                />
                <div>
                  <div className="tx-notif-title">{n.title}</div>
                  <div className="tx-notif-time">{n.time}</div>
                </div>
              </div>
            </DropdownItem>
          ))}
          <div className="tx-dropdown-footer">
            <a>Ver todas as notificações</a>
          </div>
        </Dropdown>

        <Dropdown
          align="right"
          menuStyle={{ minWidth: 220 }}
          trigger={() => (
            <button className="tx-user-trigger">
              <div className="tx-user-avatar">{userInitials}</div>
              <span className="tx-user-name-text is-hidden-touch">
                {auth.user?.name}
              </span>
              <span
                className="mdi mdi-chevron-down is-hidden-touch"
                style={{ fontSize: '1rem', color: 'var(--tx-text-muted)' }}
              />
            </button>
          )}
        >
          <div className="tx-user-info">
            <div className="tx-user-name">{auth.user?.name}</div>
            <div className="tx-user-email">{auth.user?.email}</div>
            <span className="tag is-light is-small tx-user-role">{auth.user?.role}</span>
          </div>

          <DropdownItem onClick={() => navigate('/settings')}>
            <span className="mdi mdi-cog" style={{ marginRight: '0.5rem' }} />
            Configurações
          </DropdownItem>

          <DropdownItem onClick={() => ui.openCookieBanner()}>
            <span className="mdi mdi-cookie" style={{ marginRight: '0.5rem' }} />
            Política de Cookies
          </DropdownItem>

          <DropdownItem onClick={() => setShowClearDataModal(true)}>
            <span className="mdi mdi-broom" style={{ marginRight: '0.5rem' }} />
            Limpar dados do navegador
          </DropdownItem>

          <DropdownDivider />

          <DropdownItem className="has-text-danger" onClick={handleLogout}>
            <span className="mdi mdi-logout" style={{ marginRight: '0.5rem' }} />
            Sair
          </DropdownItem>
        </Dropdown>
      </div>

      <Modal open={showClearDataModal} onClose={() => setShowClearDataModal(false)}>
        <div className="modal-card" style={{ width: 440, maxWidth: '100%' }}>
          <header className="modal-card-head">
            <p className="modal-card-title">Limpar dados do navegador</p>
          </header>
          <section className="modal-card-body">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span
                className="mdi mdi-alert-circle"
                style={{ fontSize: '2rem', color: 'var(--tx-warning)', flexShrink: 0 }}
              />
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--tx-text-heading)' }}>
                  Esta ação não pode ser desfeita.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--tx-text-muted)', marginTop: '0.5rem' }}>
                  Todos os dados salvos localmente serão removidos: sessão, tema, preferências de
                  layout, paletas customizadas e aceite de cookies. Você será desconectado e a
                  página será recarregada.
                </p>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot tx-modal-foot">
            <Button onClick={() => setShowClearDataModal(false)}>Cancelar</Button>
            <Button type="is-danger" iconLeft="broom" onClick={handleClearData}>
              Limpar tudo
            </Button>
          </footer>
        </div>
      </Modal>
    </header>
  )
}
