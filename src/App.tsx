import { useEffect, lazy, Suspense, type ReactElement } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from 'react-router-dom'
import { useAuthStore } from './stores/auth'
import { useUiStore } from './stores/ui'
import AppLayout from './components/layout/AppLayout'

// Lazy pages — public / standalone
const Landing = lazy(() => import('./pages/Landing'))
const LoginView = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const Maintenance = lazy(() => import('./pages/Maintenance'))
const ComingSoon = lazy(() => import('./pages/ComingSoon'))
const NotFoundView = lazy(() => import('./pages/NotFound'))

// Lazy pages — authenticated admin
const DashboardView = lazy(() => import('./pages/Dashboard'))
const ChartsView = lazy(() => import('./pages/Charts'))
const FormsView = lazy(() => import('./pages/Forms'))
const TablesView = lazy(() => import('./pages/Tables'))
const ProfileView = lazy(() => import('./pages/Profile'))
const PricingView = lazy(() => import('./pages/Pricing'))
const SettingsView = lazy(() => import('./pages/Settings'))
const ComponentsView = lazy(() => import('./pages/Components'))
const TypographyView = lazy(() => import('./pages/Typography'))
const UiAdvanced = lazy(() => import('./pages/UiAdvanced'))
const Integrations = lazy(() => import('./pages/Integrations'))
const Inbox = lazy(() => import('./pages/Inbox'))
const FileManager = lazy(() => import('./pages/FileManager'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Invoice = lazy(() => import('./pages/Invoice'))
const Billing = lazy(() => import('./pages/Billing'))
const Documentation = lazy(() => import('./pages/Documentation'))

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/charts': 'Gráficos & Analytics',
  '/forms': 'Formulários',
  '/tables': 'Tabelas',
  '/profile': 'Meu Perfil',
  '/pricing': 'Planos & Preços',
  '/settings': 'Configurações',
  '/typography': 'Tipografia',
  '/ui-advanced': 'Componentes avançados',
  '/integrations': 'Integrações & Bibliotecas',
  '/inbox': 'Caixa de entrada',
  '/files': 'Arquivos',
  '/gallery': 'Galeria',
  '/invoice': 'Fatura',
  '/billing': 'Cobrança',
  '/docs': 'Documentação',
}

function RequireAuth({ children }: { children: ReactElement }) {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

function ProtectedLayout() {
  const setPageTitle = useUiStore((s) => s.setPageTitle)
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    const key =
      Object.keys(routeTitles).find((k) => path.startsWith(k)) ?? null
    if (path.startsWith('/components')) {
      setPageTitle('Componentes')
    } else if (key) {
      setPageTitle(routeTitles[key])
    }
  }, [location.pathname, setPageTitle])

  return (
    <RequireAuth>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </RequireAuth>
  )
}

function PageFallback() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--tx-text-muted)' }}>
      Carregando...
    </div>
  )
}

export default function App() {
  const applyTheme = useUiStore((s) => s.applyTheme)
  const isAuth = useAuthStore((s) => s.user !== null)

  useEffect(() => {
    applyTheme()
    document.title = 'Admin Template'
  }, [applyTheme])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public / standalone */}
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/dashboard" replace /> : <LoginView />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/coming-soon" element={<ComingSoon />} />

          {/* Authenticated admin */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/charts" element={<ChartsView />} />
            <Route path="/forms" element={<FormsView />} />
            <Route path="/tables" element={<TablesView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/pricing" element={<PricingView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/components" element={<ComponentsView />} />
            <Route path="/components/:section" element={<ComponentsView />} />
            <Route path="/typography" element={<TypographyView />} />
            <Route path="/ui-advanced" element={<UiAdvanced />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/files" element={<FileManager />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/docs" element={<Documentation />} />
          </Route>

          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
