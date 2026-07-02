import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { TextField, CheckboxField } from '@/components/ui/FormikField'
import Button from '@/components/ui/Button'
import { useUiStore } from '@/stores/ui'

const schema = yup.object({
  name: yup.string().trim().required('Informe seu nome'),
  email: yup.string().email('E-mail inválido').required('Informe seu e-mail'),
  password: yup.string().min(8, 'A senha deve ter ao menos 8 caracteres').required('Informe uma senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirme sua senha'),
  acceptTerms: yup.boolean().oneOf([true], 'Você precisa aceitar os termos'),
})

export default function Register() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const ui = useUiStore()
  const [loading, setLoading] = useState(false)

  return (
    <div className="tx-login-page">
      <div className="tx-login-card">
        <div className="tx-login-header">
          <div className="tx-login-logo" style={logoStyle}>
            A
          </div>
          <h1 className="title is-5 has-text-white mb-1">{t('auth.register')}</h1>
          <p className="is-size-7" style={{ opacity: 0.8 }}>
            Preencha os dados para começar
          </p>
        </div>

        <div className="tx-login-body">
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '', acceptTerms: false }}
            validationSchema={schema}
            onSubmit={async () => {
              setLoading(true)
              await new Promise((r) => setTimeout(r, 700))
              setLoading(false)
              ui.notifySuccess('Conta criada com sucesso! Faça login para continuar.')
              navigate('/login')
            }}
          >
            <Form>
              <TextField name="name" label={t('auth.name')} type="text" placeholder="Seu nome completo" icon="mdi-account" />
              <TextField name="email" label={t('auth.email')} type="email" placeholder="seu@email.com" icon="mdi-email" />
              <TextField
                name="password"
                label={t('auth.password')}
                type="password"
                placeholder="••••••••"
                icon="mdi-lock"
                hint="Mínimo de 8 caracteres"
              />
              <TextField
                name="confirmPassword"
                label={t('auth.confirmPassword')}
                type="password"
                placeholder="••••••••"
                icon="mdi-lock-check"
              />
              <CheckboxField name="acceptTerms" label="Li e aceito os termos de uso e a política de privacidade" />

              <Button nativeType="submit" type="is-primary" expanded loading={loading} className="mt-4">
                {loading ? 'Criando conta...' : t('auth.register')}
              </Button>
            </Form>
          </Formik>

          <p className="has-text-centered is-size-7 has-text-grey mt-5">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="has-text-weight-medium">
              {t('auth.login')}
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
  fontWeight: 900,
} as const
