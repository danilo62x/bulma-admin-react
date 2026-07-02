import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { TextField } from '@/components/ui/FormikField'
import Button from '@/components/ui/Button'

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Informe seu e-mail'),
})

export default function ForgotPassword() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  return (
    <div className="tx-login-page">
      <div className="tx-login-card">
        <div className="tx-login-header">
          <div className="tx-login-logo" style={logoStyle}>
            <span className="mdi mdi-lock" />
          </div>
          <h1 className="title is-5 has-text-white mb-1">{t('auth.forgotPassword')}</h1>
          <p className="is-size-7" style={{ opacity: 0.8 }}>
            Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        <div className="tx-login-body">
          {sentTo ? (
            <div className="has-text-centered">
              <span className="icon is-large has-text-success">
                <span className="mdi mdi-check-circle mdi-48px" />
              </span>
              <h2 className="title is-6 mt-3">Link enviado para seu e-mail</h2>
              <p className="is-size-7 has-text-grey">
                Enviamos um link de redefinição para{' '}
                <span className="has-text-weight-medium has-text-dark">{sentTo}</span>. Verifique sua caixa de entrada e o
                spam.
              </p>
              <div className="notification is-light mt-4 is-size-7">
                Não recebeu?{' '}
                <a className="has-text-weight-medium" onClick={() => setSentTo(null)}>
                  Tentar outro e-mail
                </a>
              </div>
            </div>
          ) : (
            <Formik
              initialValues={{ email: '' }}
              validationSchema={schema}
              onSubmit={async (values) => {
                setLoading(true)
                await new Promise((r) => setTimeout(r, 700))
                setLoading(false)
                setSentTo(values.email)
              }}
            >
              <Form>
                <TextField name="email" label={t('auth.email')} type="email" placeholder="seu@email.com" icon="mdi-email" />
                <Button nativeType="submit" type="is-primary" expanded loading={loading} className="mt-2">
                  {loading ? 'Enviando...' : t('auth.sendResetLink')}
                </Button>
              </Form>
            </Formik>
          )}

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
