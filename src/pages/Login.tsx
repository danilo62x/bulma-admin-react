import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)

  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({ email: '', password: '', global: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function validate() {
    const next = { email: '', password: '', global: '' }
    if (!form.email) next.email = 'E-mail é obrigatório'
    if (!form.password) next.password = 'Senha é obrigatória'
    setErrors(next)
    return !next.email && !next.password
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const ok = await login(form.email, form.password)
      if (!ok) {
        setErrors({ email: '', password: '', global: 'E-mail ou senha inválidos' })
        return
      }
      const state = location.state as { from?: { pathname?: string } } | null
      navigate(state?.from?.pathname ?? '/dashboard', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tx-login-page">
      <div className="tx-login-card">
        <div className="tx-login-header">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.8rem',
              fontWeight: 900,
            }}
          >
            A
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Admin Template
          </h1>
          <p style={{ opacity: 0.8, fontSize: '0.875rem' }}>Faça login para continuar</p>
        </div>

        <div className="tx-login-body">
          <form onSubmit={handleSubmit}>
            <Field
              label="E-mail"
              type={errors.email ? 'is-danger' : ''}
              message={errors.email}
            >
              <Input
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                type="email"
                placeholder="seu@email.com"
                icon="email"
              />
            </Field>

            <Field
              label="Senha"
              type={errors.password || errors.global ? 'is-danger' : ''}
              message={errors.password || errors.global}
            >
              <Input
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                icon="lock"
                iconRight={showPassword ? 'eye-off' : 'eye'}
                iconRightClickable
                onIconRightClick={() => setShowPassword(!showPassword)}
              />
            </Field>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
              }}
            >
              <Checkbox
                checked={form.remember}
                onChange={(v) => setForm({ ...form, remember: v })}
              >
                Lembrar-me
              </Checkbox>
              <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--tx-primary)' }}>
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              nativeType="submit"
              type="is-primary"
              expanded
              loading={loading}
            >
              Entrar
            </Button>
          </form>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem',
              background: '#f0f4ff',
              borderRadius: 6,
              fontSize: '0.78rem',
              color: '#555',
            }}
          >
            <strong>Credenciais de demonstração:</strong>
            <br />
            admin@template.com / admin123
            <br />
            user@template.com / user123
          </div>

          <p className="has-text-centered is-size-7 has-text-grey mt-5">
            Não tem uma conta?{' '}
            <Link to="/register" className="has-text-weight-medium">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
