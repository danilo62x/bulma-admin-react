import { useField } from 'formik'
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from 'react'

interface WrapProps {
  label?: string
  name: string
  hint?: string
  icon?: string
  children: (id: string, hasError: boolean) => ReactNode
}

function FieldWrap({ label, name, hint, icon, children }: WrapProps) {
  const [, meta] = useField(name)
  const hasError = Boolean(meta.touched && meta.error)
  const id = `f-${name}`
  return (
    <div className="field">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <div className={`control ${icon ? 'has-icons-left' : ''}`}>
        {icon && (
          <span className="icon is-left">
            <i className={`mdi ${icon}`} />
          </span>
        )}
        {children(id, hasError)}
      </div>
      {hasError ? (
        <p className="help is-danger">{meta.error}</p>
      ) : hint ? (
        <p className="help">{hint}</p>
      ) : null}
    </div>
  )
}

type TextFieldProps = { label?: string; name: string; hint?: string; icon?: string } & InputHTMLAttributes<HTMLInputElement>

export function TextField({ label, name, hint, icon, ...rest }: TextFieldProps) {
  const [field] = useField(name)
  return (
    <FieldWrap label={label} name={name} hint={hint} icon={icon}>
      {(id, hasError) => (
        <input id={id} {...field} {...rest} className={`input ${hasError ? 'is-danger' : ''}`} />
      )}
    </FieldWrap>
  )
}

type SelectFieldProps = {
  label?: string
  name: string
  hint?: string
  icon?: string
  children: ReactNode
} & SelectHTMLAttributes<HTMLSelectElement>

export function SelectField({ label, name, hint, icon, children, ...rest }: SelectFieldProps) {
  const [field] = useField(name)
  return (
    <FieldWrap label={label} name={name} hint={hint} icon={icon}>
      {(id, hasError) => (
        <span className={`select is-fullwidth ${hasError ? 'is-danger' : ''}`}>
          <select id={id} {...field} {...rest}>
            {children}
          </select>
        </span>
      )}
    </FieldWrap>
  )
}

type TextAreaFieldProps = { label?: string; name: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextAreaField({ label, name, hint, ...rest }: TextAreaFieldProps) {
  const [field] = useField(name)
  return (
    <FieldWrap label={label} name={name} hint={hint}>
      {(id, hasError) => (
        <textarea id={id} {...field} {...rest} className={`textarea ${hasError ? 'is-danger' : ''}`} />
      )}
    </FieldWrap>
  )
}

interface CheckboxFieldProps {
  label: string
  name: string
}

export function CheckboxField({ label, name }: CheckboxFieldProps) {
  const [field, meta] = useField({ name, type: 'checkbox' })
  const hasError = Boolean(meta.touched && meta.error)
  return (
    <div className="field">
      <label className="checkbox">
        <input type="checkbox" {...field} /> {label}
      </label>
      {hasError && <p className="help is-danger">{meta.error}</p>}
    </div>
  )
}
