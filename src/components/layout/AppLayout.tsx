import { type ReactNode, useMemo } from 'react'
import { useUiStore } from '@/stores/ui'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'
import FooterBar from './FooterBar'
import CookieBanner from '@/components/ui/CookieBanner'

export default function AppLayout({ children }: { children: ReactNode }) {
  const ui = useUiStore()

  const mainStyle = useMemo(() => {
    if (ui.sidebarCollapsed) return {}
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return {}
    return { marginLeft: `${ui.sidebarWidth}px` }
  }, [ui.sidebarCollapsed, ui.sidebarWidth])

  return (
    <div className="tx-layout">
      <AppSidebar />

      <div
        className={`tx-backdrop ${ui.sidebarMobileOpen ? 'is-active' : ''}`}
        onClick={() => ui.toggleSidebarMobile(false)}
      />

      <div
        className={`tx-main ${ui.sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
        style={mainStyle}
      >
        <AppHeader />
        <main className="tx-content">{children}</main>
        <FooterBar />
      </div>

      <div className="tx-notifications">
        {ui.notifications.map((notif) => (
          <div
            key={notif.id}
            className={`tx-notification notification ${notif.type}`}
          >
            <button
              className="delete"
              onClick={() => ui.dismissNotification(notif.id)}
            />
            {notif.message}
          </div>
        ))}
      </div>

      <CookieBanner />
    </div>
  )
}
