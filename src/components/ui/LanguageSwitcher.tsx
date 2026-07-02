import { useTranslation } from 'react-i18next'
import { LANGUAGES, type LanguageCode } from '@/i18n'
import Dropdown, { DropdownItem } from './Dropdown'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0]

  function choose(code: LanguageCode) {
    i18n.changeLanguage(code)
    document.documentElement.lang = code
  }

  return (
    <Dropdown
      align="right"
      menuStyle={{ minWidth: 180 }}
      trigger={() => (
        <button className="button is-ghost tx-icon-btn" title={current.label} aria-label="Idioma">
          <span style={{ fontSize: '1.1rem' }}>{current.flag}</span>
        </button>
      )}
    >
      {LANGUAGES.map((lang) => (
        <DropdownItem
          key={lang.code}
          className={lang.code === current.code ? 'has-text-weight-semibold' : ''}
          onClick={() => choose(lang.code)}
        >
          <span style={{ marginRight: '0.5rem' }}>{lang.flag}</span>
          {lang.label}
          {lang.code === current.code && <span className="mdi mdi-check" style={{ marginLeft: 'auto' }} />}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}
