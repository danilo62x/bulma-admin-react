import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Formik, Form, useFormikContext } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { TextField } from '@/components/ui/FormikField'
import Button from '@/components/ui/Button'
import { useUiStore } from '@/stores/ui'

const STRENGTH = [
  { label: 'Muito fraca', color: 'is-danger', text: 'has-text-danger' },
  { label: 'Fraca', color: 'is-danger', text: 'has-text-danger' },
  { label: 'Razoável', color: 'is-warning', text: 'has-text-warning-dark' },
  { label: 'Boa', color: 'is-success', text: 'has-text-success' },
  { label: 'Forte', color: 'is-success', text: 'has-text-success' },
]

function passwordScore(pw: string): number {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/\d/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

const schema = yup.object({
  password: yup.string().min(8, 'A senha deve ter ao menos 8 caracteres').required('Informe uma senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirme sua senha'),
})

function StrengthMeter() {
  const { values } = useFormikContext<{ password: string }>()
  const password = values.password
  if (!password) return null
  const score = passwordScore(password)
  const strength = STRENGTH[score]
  return (
    <div className="mb-4">
      <div className="tx-strength-bars">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`tx-strength-bar ${i < score ? strength.color : ''}`} />
        ))}
      </div>
      <p className={`is-size-7 has-text-weight-medium ${strength.text}`}>Força da senha: {strength.label}</p>
    </div>
  )
}

export default function ResetPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const ui = useUiStore()
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [loading, setLoading] = useState(false)

  return (
    <div className="tx-login-page">
      <div className="tx-login-card">
        <div className="tx-login-header">
          <div className="tx-login-logo" style={logoStyle}>
            <span className="mdi mdi-lock" />
          </div>
          <h1 className="title is-5 has-text-white mb-1">{t('auth.resetPassword')}</h1>
          <p className="is-size-7" style={{ opacity: 0.8 }}>
            Defina uma nova senha para sua conta.
          </p>
        </div>

        <div className="tx-login-body">
          {!token && (
            <div className="notification is-warning is-light has-text-centered is-size-7">
              Link inválido ou expirado. Solicite um novo link de redefinição.
            </div>
          )}

          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={schema}
            onSubmit={async () => {
              setLoading(true)
              await new Promise((r) => setTimeout(r, 700))
              setLoading(false)
              void token
              ui.notifySuccess('Senha redefinida com sucesso! Faça login com a nova senha.')
              navigate('/login')
            }}
          >
            <Form>
              <TextField
                name="password"
                label="Nova senha"
                type="password"
                placeholder="••••••••"
                icon="mdi-lock"
                hint="Use 8+ caracteres, com letras, números e símbolos"
              />
              <StrengthMeter />
              <TextField
                name="confirmPassword"
                label={t('auth.confirmPassword')}
                type="password"
                placeholder="••••••••"
                icon="mdi-lock-check"
              />
              <Button nativeType="submit" type="is-primary" expanded loading={loading} className="mt-2">
                {loading ? 'Salvando...' : t('auth.resetPassword')}
              </Button>
            </Form>
          </Formik>

          <p className="has-text-centered is-size-7 has-text-grey mt-5">
            <Link to="/login" className="has-text-weight-medium">
              {t('common.back')} — {t('auth.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const logoStyle = {
  width: 56,
  height: 56,
  borderRadius: 14,
  background: 'rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1rem',
  fontSize: '1.8rem',
} as const
