import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type NotificationType = 'is-success' | 'is-danger' | 'is-warning' | 'is-info'

export interface Notification {
  id: number
  message: string
  type: NotificationType
  duration: number
}

let notifId = 0

interface UiState {
  darkMode: boolean
  sidebarCollapsed: boolean
  sidebarWidth: number
  sidebarMobileOpen: boolean
  pageTitle: string
  notifications: Notification[]
  isLoading: boolean
  customTheme: Record<string, string>
  cookiesAccepted: boolean
  showCookieBanner: boolean

  toggleDarkMode: () => void
  setDarkMode: (val: boolean) => void
  applyTheme: () => void
  setThemeVar: (key: string, val: string) => void
  resetThemeVars: () => void
  toggleSidebar: () => void
  setSidebarWidth: (w: number) => void
  toggleSidebarMobile: (val?: boolean) => void
  setPageTitle: (title: string) => void
  notify: (message: string, type?: NotificationType, duration?: number) => void
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
  notifyWarning: (message: string) => void
  dismissNotification: (id: number) => void
  acceptCookies: () => void
  declineCookies: () => void
  openCookieBanner: () => void
  closeCookieBanner: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      sidebarCollapsed: false,
      sidebarWidth: 260,
      sidebarMobileOpen: false,
      pageTitle: 'Dashboard',
      notifications: [],
      isLoading: false,
      customTheme: {},
      cookiesAccepted: false,
      showCookieBanner: false,

      acceptCookies() {
        set({ cookiesAccepted: true, showCookieBanner: false })
      },

      declineCookies() {
        set({ cookiesAccepted: false, showCookieBanner: false })
      },

      openCookieBanner() {
        set({ showCookieBanner: true })
      },

      closeCookieBanner() {
        set({ showCookieBanner: false })
      },

      toggleDarkMode() {
        set({ darkMode: !get().darkMode })
        get().applyTheme()
      },

      setDarkMode(val) {
        set({ darkMode: val })
        get().applyTheme()
      },

      applyTheme() {
        document.documentElement.setAttribute(
          'data-theme',
          get().darkMode ? 'dark' : 'light'
        )
        Object.entries(get().customTheme).forEach(([key, val]) => {
          document.documentElement.style.setProperty(key, val)
        })
      },

      setThemeVar(key, val) {
        set({ customTheme: { ...get().customTheme, [key]: val } })
        document.documentElement.style.setProperty(key, val)
      },

      resetThemeVars() {
        Object.keys(get().customTheme).forEach((key) => {
          document.documentElement.style.removeProperty(key)
        })
        set({ customTheme: {} })
      },

      toggleSidebar() {
        set({ sidebarCollapsed: !get().sidebarCollapsed })
      },

      setSidebarWidth(w) {
        set({ sidebarWidth: Math.min(400, Math.max(160, w)) })
      },

      toggleSidebarMobile(val) {
        set({
          sidebarMobileOpen: val !== undefined ? val : !get().sidebarMobileOpen,
        })
      },

      setPageTitle(title) {
        set({ pageTitle: title })
        document.title = title ? `${title} — Admin Template` : 'Admin Template'
      },

      notify(message, type = 'is-info', duration = 4000) {
        const id = ++notifId
        set({
          notifications: [...get().notifications, { id, message, type, duration }],
        })
        setTimeout(() => get().dismissNotification(id), duration)
      },

      notifySuccess(message) {
        get().notify(message, 'is-success')
      },

      notifyError(message) {
        get().notify(message, 'is-danger')
      },

      notifyWarning(message) {
        get().notify(message, 'is-warning')
      },

      dismissNotification(id) {
        set({
          notifications: get().notifications.filter((n) => n.id !== id),
        })
      },
    }),
    {
      name: 'ui',
      partialize: (s) => ({
        darkMode: s.darkMode,
        sidebarCollapsed: s.sidebarCollapsed,
        sidebarWidth: s.sidebarWidth,
        customTheme: s.customTheme,
        cookiesAccepted: s.cookiesAccepted,
      }),
    }
  )
)
