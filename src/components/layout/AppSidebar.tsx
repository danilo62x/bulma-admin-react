import { useState, useEffect, useMemo, type MouseEvent } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { menuItems, footerMenuItems, type MenuItem } from '@/stores/menu'

export default function AppSidebar() {
  const ui = useUiStore()
  const auth = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const [isResizing, setIsResizing] = useState(false)

  const sidebarStyle = useMemo(() => {
    if (ui.sidebarCollapsed) return {}
    return {
      width: `${ui.sidebarWidth}px`,
      minWidth: `${ui.sidebarWidth}px`,
    }
  }, [ui.sidebarCollapsed, ui.sidebarWidth])

  function isActive(href?: string) {
    if (!href) return false
    return (
      location.pathname === href || location.pathname.startsWith(href + '/')
    )
  }

  function isGroupActive(item: MenuItem): boolean {
    if (!item.children) return false
    return item.children.some((c) => {
      if (c.children?.length) return isGroupActive(c)
      return isActive(c.href)
    })
  }

  function toggleGroup(label: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  function onNavClick() {
    if (window.innerWidth <= 768) {
      ui.toggleSidebarMobile(false)
    }
  }

  function handleFooterAction(item: MenuItem) {
    if (item.action === 'logout') {
      auth.logout()
      navigate('/login')
    } else if (item.href) {
      navigate(item.href)
      onNavClick()
    }
  }

  function startResize(e: MouseEvent) {
    setIsResizing(true)
    const startX = e.clientX
    const startWidth = ui.sidebarWidth

    function onMove(ev: globalThis.MouseEvent) {
      ui.setSidebarWidth(startWidth + (ev.clientX - startX))
    }

    function onUp() {
      setIsResizing(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // Auto-open active groups on mount
  useEffect(() => {
    const opens = new Set<string>()
    menuItems.forEach((item) => {
      if (item.children?.length) {
        const hasActive = item.children.some((c) => {
          if (c.children?.length) return c.children.some((g) => isActive(g.href))
          return isActive(c.href)
        })
        if (hasActive) opens.add(item.label)
        item.children.forEach((child) => {
          if (child.children?.length) {
            const childHasActive = child.children.some((g) => isActive(g.href))
            if (childHasActive) opens.add(child.label)
          }
        })
      }
    })
    setOpenGroups(opens)
    // Only on mount: deliberately empty deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <aside
      className={`tx-sidebar ${ui.sidebarCollapsed ? 'is-collapsed' : ''} ${
        ui.sidebarMobileOpen ? 'is-mobile-open' : ''
      }`}
      style={sidebarStyle}
    >
      <div className="tx-sidebar-brand">
        <div className="tx-sidebar-icon-box">A</div>
        <span className="tx-sidebar-brand-text">Admin Template</span>
      </div>

      <nav className="tx-sidebar-nav">
        {menuItems.map((item) => {
          if (item.children?.length) {
            return (
              <div key={item.label}>
                <div
                  className={`tx-nav-item ${isGroupActive(item) ? 'is-active' : ''}`}
                  onClick={() => toggleGroup(item.label)}
                >
                  <span className={`tx-nav-icon mdi ${item.icon}`} />
                  <span className="tx-nav-label">{item.label}</span>
                  <span
                    className={`tx-nav-chevron mdi mdi-chevron-down ${
                      openGroups.has(item.label) ? 'is-open' : ''
                    }`}
                  />
                </div>
                <div
                  className={`tx-nav-submenu ${
                    openGroups.has(item.label) && !ui.sidebarCollapsed ? 'is-open' : ''
                  }`}
                >
                  {item.children.map((child) => {
                    if (child.children?.length) {
                      return (
                        <div key={child.label}>
                          <div
                            className={`tx-nav-subgroup ${
                              isGroupActive(child) ? 'is-active' : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleGroup(child.label)
                            }}
                          >
                            <span
                              className={`mdi ${child.icon}`}
                              style={{ fontSize: '1rem' }}
                            />
                            {child.label}
                            <span
                              className={`tx-nav-subgroup-chevron mdi mdi-chevron-down ${
                                openGroups.has(child.label) ? 'is-open' : ''
                              }`}
                            />
                          </div>
                          <div
                            className={`tx-nav-subsubmenu ${
                              openGroups.has(child.label) ? 'is-open' : ''
                            }`}
                          >
                            {child.children.map((grandchild) => (
                              <NavLink
                                key={grandchild.label}
                                to={grandchild.href ?? '#'}
                                className={({ isActive: act }) =>
                                  `tx-nav-subsubitem ${act ? 'is-active' : ''}`
                                }
                                onClick={onNavClick}
                              >
                                <span
                                  className={`mdi ${grandchild.icon}`}
                                  style={{
                                    marginRight: '0.4rem',
                                    fontSize: '0.9rem',
                                  }}
                                />
                                {grandchild.label}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    return (
                      <NavLink
                        key={child.label}
                        to={child.href ?? '#'}
                        className={({ isActive: act }) =>
                          `tx-nav-subitem ${act ? 'is-active' : ''}`
                        }
                        onClick={onNavClick}
                      >
                        <span
                          className={`mdi ${child.icon}`}
                          style={{ marginRight: '0.5rem', fontSize: '1rem' }}
                        />
                        {child.label}
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            )
          }

          return (
            <NavLink
              key={item.label}
              to={item.href ?? '#'}
              className={({ isActive: act }) =>
                `tx-nav-item ${act ? 'is-active' : ''}`
              }
              onClick={onNavClick}
            >
              <span className={`tx-nav-icon mdi ${item.icon}`} />
              <span className="tx-nav-label">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="tx-sidebar-footer">
        {footerMenuItems.map((item) => (
          <div
            key={item.label}
            className="tx-nav-item"
            onClick={() => handleFooterAction(item)}
          >
            <span className={`tx-nav-icon mdi ${item.icon}`} />
            <span className="tx-nav-label">{item.label}</span>
          </div>
        ))}
      </div>

      {!ui.sidebarCollapsed && (
        <div
          className={`tx-resize-handle ${isResizing ? 'is-resizing' : ''}`}
          onMouseDown={startResize}
        />
      )}
    </aside>
  )
}
