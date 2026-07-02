import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
}

const MOCK_USERS = [
  { id: 1, email: 'admin@template.com', password: 'admin123', name: 'Admin Usuário', role: 'Administrador' },
  { id: 2, email: 'user@template.com', password: 'user123', name: 'Usuário Comum', role: 'Operador' },
]

interface AuthState {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (patch: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      async login(email, password) {
        await new Promise((r) => setTimeout(r, 600))
        const found = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        )
        if (!found) return false

        set({
          user: {
            id: found.id,
            name: found.name,
            email: found.email,
            role: found.role,
          },
        })
        return true
      },

      logout() {
        set({ user: null })
      },

      updateUser(patch) {
        const current = get().user
        if (!current) return
        set({ user: { ...current, ...patch } })
      },
    }),
    {
      name: 'auth',
      partialize: (s) => ({ user: s.user }),
    }
  )
)

export const isAuthenticated = () => useAuthStore.getState().user !== null
