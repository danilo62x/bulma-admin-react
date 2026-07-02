import { useState, useMemo } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import CardComponent from '@/components/ui/CardComponent'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Switch from '@/components/ui/Switch'

interface Palette {
  name: string
  vars: Record<string, string>
}

const PALETTES: Palette[] = [
  { name: 'Azul Clássico',     vars: { '--tx-primary': '#485fc7', '--tx-sidebar-bg': '#2c3e50' } },
  { name: 'Verde Esmeralda',   vars: { '--tx-primary': '#00a878', '--tx-sidebar-bg': '#1a3a2a' } },
  { name: 'Roxo Profissional', vars: { '--tx-primary': '#7c3aed', '--tx-sidebar-bg': '#1e1b4b' } },
  { name: 'Laranja Vibrante',  vars: { '--tx-primary': '#ea580c', '--tx-sidebar-bg': '#1c1917' } },
  { name: 'Rosa Elegante',     vars: { '--tx-primary': '#db2777', '--tx-sidebar-bg': '#2d1b35' } },
  { name: 'Teal Moderno',      vars: { '--tx-primary': '#0d9488', '--tx-sidebar-bg': '#134e4a' } },
]

type ThemeVarDef = { key: string; label: string; group: string }

const THEME_VAR_DEFS: ThemeVarDef[] = [
  { key: '--tx-primary',            label: 'Cor Principal',   group: 'Cores Principais' },
  { key: '--tx-success',            label: 'Sucesso',          group: 'Cores Principais' },
  { key: '--tx-warning',            label: 'Aviso',            group: 'Cores Principais' },
  { key: '--tx-danger',             label: 'Perigo',           group: 'Cores Principais' },
  { key: '--tx-info',               label: 'Informação',       group: 'Cores Principais' },
  { key: '--tx-sidebar-bg',         label: 'Fundo',            group: 'Sidebar' },
  { key: '--tx-sidebar-text',       label: 'Texto',            group: 'Sidebar' },
  { key: '--tx-sidebar-text-muted', label: 'Texto Secundário', group: 'Sidebar' },
  { key: '--tx-body-bg',            label: 'Fundo da Página',  group: 'Layout' },
  { key: '--tx-header-bg',          label: 'Header',           group: 'Layout' },
  { key: '--tx-card-bg',            label: 'Cards',            group: 'Layout' },
  { key: '--tx-header-border',      label: 'Borda do Header',  group: 'Layout' },
  { key: '--tx-border',             label: 'Bordas',           group: 'Layout' },
  { key: '--tx-text-heading',       label: 'Títulos',          group: 'Tipografia' },
  { key: '--tx-text',               label: 'Texto Principal',  group: 'Tipografia' },
  { key: '--tx-text-muted',         label: 'Texto Secundário', group: 'Tipografia' },
]

const THEME_DEFAULTS: Record<string, string> = {
  '--tx-primary':            '#485fc7',
  '--tx-success':            '#48c774',
  '--tx-warning':            '#f59e0b',
  '--tx-danger':             '#f14668',
  '--tx-info':               '#3273dc',
  '--tx-sidebar-bg':         '#2c3e50',
  '--tx-sidebar-text':       '#ecf0f1',
  '--tx-sidebar-text-muted': '#95a5a6',
  '--tx-body-bg':            '#f5f5f5',
  '--tx-header-bg':          '#ffffff',
  '--tx-card-bg':            '#ffffff',
  '--tx-header-border':      '#e0e0e0',
  '--tx-border':             '#dbdbdb',
  '--tx-text-heading':       '#1a1a2a',
  '--tx-text':               '#363636',
  '--tx-text-muted':         '#7a7a7a',
}

const styles = `
.tx-palette-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.tx-palette-card { border: 2px solid var(--tx-border); border-radius: 10px; overflow: hidden; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s; background: var(--tx-card-bg); }
.tx-palette-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); }
.tx-palette-card.is-active { border-color: var(--tx-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--tx-primary) 25%, transparent); }
.tx-palette-preview { display: flex; height: 64px; }
.tx-palette-body { flex: 1; display: flex; align-items: center; justify-content: center; }
.tx-palette-check { font-size: 1.5rem; color: white; font-weight: 700; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); }
.tx-palette-sidebar-strip { width: 22px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; padding: 8px 0; }
.tx-palette-line { display: block; width: 12px; height: 3px; background: rgba(255, 255, 255, 0.35); border-radius: 2px; }
.tx-palette-name { padding: 0.35rem 0.5rem; font-size: 0.76rem; font-weight: 600; color: var(--tx-text); text-align: center; background: var(--tx-card-bg); }
.tx-color-group-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--tx-text-muted); padding: 0.75rem 0 0.3rem; border-bottom: 1px solid var(--tx-border-subtle); margin-bottom: 0.2rem; }
.tx-color-row { display: flex; align-items: center; gap: 0.6rem; padding: 0.35rem 0; border-bottom: 1px solid var(--tx-border-subtle); }
.tx-color-row:last-child { border-bottom: none; }
.tx-color-label { flex: 1; font-size: 0.83rem; color: var(--tx-text); }
.tx-color-swatch { width: 18px; height: 18px; border-radius: 4px; border: 1px solid var(--tx-border); flex-shrink: 0; }
.tx-color-picker { width: 32px; height: 26px; border: 1px solid var(--tx-border); border-radius: 5px; cursor: pointer; padding: 2px; background: transparent; flex-shrink: 0; }
.tx-color-hex { font-size: 0.73rem; color: var(--tx-text-muted); font-family: 'Courier New', monospace; min-width: 5em; flex-shrink: 0; }
.tx-reset-bar { display: flex; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--tx-border); }
.tx-reset-hint { font-size: 0.78rem; color: var(--tx-text-muted); margin-left: 0.75rem; }
.tx-theme-preview { display: flex; height: 80px; border-radius: 6px; overflow: hidden; border: 1px solid var(--tx-border); }
.tx-theme-preview-sidebar { width: 28px; display: flex; flex-direction: column; align-items: center; padding: 8px 0; gap: 5px; }
.tx-theme-preview-dot { width: 14px; height: 5px; border-radius: 3px; }
.tx-theme-preview-body { flex: 1; display: flex; flex-direction: column; }
.tx-theme-preview-header { height: 16px; border-bottom-width: 1px; border-bottom-style: solid; }
.tx-theme-preview-content { flex: 1; display: flex; align-items: center; gap: 4px; padding: 4px 6px; }
.tx-theme-preview-card { flex: 1; height: 26px; border-radius: 3px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); }
.tx-theme-preview-btn { width: 22px; height: 10px; border-radius: 3px; flex-shrink: 0; }
`

export default function Settings() {
  usePageTitle('Configurações')
  const ui = useUiStore()
  const auth = useAuthStore()

  const [saving, setSaving] = useState(false)
  const [fontSize, setFontSize] = useState('14px')
  const [activePaletteIdx, setActivePaletteIdx] = useState(-1)

  const [accountForm, setAccountForm] = useState({
    name: auth.user?.name ?? '',
    email: auth.user?.email ?? '',
    newPassword: '',
    confirmPassword: '',
  })

  const themeGroups = useMemo(() => {
    const groups: Record<string, ThemeVarDef[]> = {}
    for (const def of THEME_VAR_DEFS) {
      if (!groups[def.group]) groups[def.group] = []
      groups[def.group].push(def)
    }
    return groups
  }, [])

  function applyPalette(idx: number) {
    setActivePaletteIdx(idx)
    for (const [key, val] of Object.entries(PALETTES[idx].vars)) {
      ui.setThemeVar(key, val)
    }
  }

  function getThemeVar(key: string): string {
    return ui.customTheme[key] ?? THEME_DEFAULTS[key] ?? '#000000'
  }

  function onColorChange(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    setActivePaletteIdx(-1)
    ui.setThemeVar(key, e.target.value)
  }

  function resetTheme() {
    ui.resetThemeVars()
    setActivePaletteIdx(-1)
  }

  function applyFontSize(v: string) {
    setFontSize(v)
    document.documentElement.style.fontSize = v
  }

  const userInitials = useMemo(() => {
    if (!auth.user?.name) return '?'
    return auth.user.name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
  }, [auth.user])

  async function saveAccount(e: React.FormEvent) {
    e.preventDefault()
    if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
      ui.notifyError('As senhas não coincidem!')
      return
    }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    auth.updateUser({ name: accountForm.name, email: accountForm.email })
    setAccountForm({ ...accountForm, newPassword: '', confirmPassword: '' })
    setSaving(false)
    ui.notifySuccess('Configurações salvas com sucesso!')
  }

  return (
    <div>
      <style>{styles}</style>

      <div className="columns">
        <div className="column is-8">
          <CardComponent title="Aparência" icon="mdi-palette">
            <Field label="Tema">
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '0.25rem' }}>
                <Button
                  type={!ui.darkMode ? 'is-primary' : 'is-light'}
                  iconLeft="weather-sunny"
                  onClick={() => ui.setDarkMode(false)}
                >
                  Claro
                </Button>
                <Button
                  type={ui.darkMode ? 'is-primary' : 'is-light'}
                  iconLeft="weather-night"
                  onClick={() => ui.setDarkMode(true)}
                >
                  Escuro
                </Button>
              </div>
            </Field>
            <hr />
            <Field label="Tamanho da fonte">
              <Select value={fontSize} onChange={(v) => applyFontSize(v as string)} expanded={false}>
                <option value="13px">Pequena (13px)</option>
                <option value="14px">Normal (14px)</option>
                <option value="15px">Grande (15px)</option>
                <option value="16px">Extra grande (16px)</option>
              </Select>
            </Field>
          </CardComponent>

          <CardComponent
            title="Paletas de Cores"
            icon="mdi-palette-swatch"
            style={{ marginTop: '1rem' }}
          >
            <p style={{ fontSize: '0.85rem', color: 'var(--tx-text-muted)', marginBottom: '1rem' }}>
              Aplique um conjunto de cores ao layout com um clique. Você pode ajustar individualmente depois.
            </p>
            <div className="tx-palette-grid">
              {PALETTES.map((p, idx) => (
                <div
                  key={p.name}
                  className={`tx-palette-card ${activePaletteIdx === idx ? 'is-active' : ''}`}
                  onClick={() => applyPalette(idx)}
                >
                  <div className="tx-palette-preview">
                    <div
                      className="tx-palette-body"
                      style={{ background: p.vars['--tx-primary'] }}
                    >
                      {activePaletteIdx === idx && <span className="tx-palette-check">✓</span>}
                    </div>
                    <div
                      className="tx-palette-sidebar-strip"
                      style={{ background: p.vars['--tx-sidebar-bg'] }}
                    >
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span key={i} className="tx-palette-line" />
                      ))}
                    </div>
                  </div>
                  <div className="tx-palette-name">{p.name}</div>
                </div>
              ))}
            </div>
          </CardComponent>

          <CardComponent
            title="Personalização Avançada"
            icon="mdi-tune"
            style={{ marginTop: '1rem' }}
          >
            <p style={{ fontSize: '0.85rem', color: 'var(--tx-text-muted)', marginBottom: '0.5rem' }}>
              Ajuste cada variável de cor individualmente para criar seu tema exclusivo.
            </p>
            {Object.entries(themeGroups).map(([groupName, defs]) => (
              <div key={groupName}>
                <div className="tx-color-group-label">{groupName}</div>
                {defs.map((def) => (
                  <div key={def.key} className="tx-color-row">
                    <span className="tx-color-label">{def.label}</span>
                    <div className="tx-color-swatch" style={{ background: getThemeVar(def.key) }} />
                    <input
                      type="color"
                      value={getThemeVar(def.key)}
                      className="tx-color-picker"
                      onChange={(e) => onColorChange(def.key, e)}
                    />
                    <code className="tx-color-hex">{getThemeVar(def.key)}</code>
                  </div>
                ))}
              </div>
            ))}
            <div className="tx-reset-bar">
              <Button type="is-light" iconLeft="restore" size="is-small" onClick={resetTheme}>
                Restaurar padrões
              </Button>
              <span className="tx-reset-hint">
                Remove todas as customizações e restaura as cores originais
              </span>
            </div>
          </CardComponent>

          <CardComponent
            title="Layout"
            icon="mdi-view-dashboard-edit"
            style={{ marginTop: '1rem' }}
          >
            <Field label="Largura do menu lateral">
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--tx-text-muted)',
                  }}
                >
                  <span>160px</span>
                  <span style={{ fontWeight: 600, color: 'var(--tx-text)' }}>{ui.sidebarWidth}px</span>
                  <span>400px</span>
                </div>
                <input
                  type="range"
                  min={160}
                  max={400}
                  step={5}
                  value={ui.sidebarWidth}
                  style={{ width: '100%', accentColor: 'var(--tx-primary)' }}
                  onChange={(e) => ui.setSidebarWidth(Number(e.target.value))}
                />
                <div style={{ fontSize: '0.78rem', color: 'var(--tx-text-muted)', marginTop: '0.5rem' }}>
                  O ajuste é aplicado em tempo real no menu lateral.
                </div>
              </div>
            </Field>
            <hr />
            <Field label="Menu lateral">
              <Switch
                checked={ui.sidebarCollapsed}
                onChange={() => ui.toggleSidebar()}
                type=""
              >
                {ui.sidebarCollapsed ? 'Compactado (apenas ícones)' : 'Expandido'}
              </Switch>
            </Field>
          </CardComponent>

          <CardComponent title="Conta" icon="mdi-account-cog" style={{ marginTop: '1rem' }}>
            <form onSubmit={saveAccount}>
              <div className="columns is-multiline">
                <div className="column is-6">
                  <Field label="Nome">
                    <Input
                      value={accountForm.name}
                      onChange={(v) => setAccountForm({ ...accountForm, name: v })}
                      icon="account"
                    />
                  </Field>
                </div>
                <div className="column is-6">
                  <Field label="E-mail">
                    <Input
                      value={accountForm.email}
                      onChange={(v) => setAccountForm({ ...accountForm, email: v })}
                      type="email"
                      icon="email"
                    />
                  </Field>
                </div>
                <div className="column is-6">
                  <Field label="Nova senha">
                    <Input
                      value={accountForm.newPassword}
                      onChange={(v) => setAccountForm({ ...accountForm, newPassword: v })}
                      type="password"
                      icon="lock"
                      passwordReveal
                      placeholder="Deixe em branco para manter"
                    />
                  </Field>
                </div>
                <div className="column is-6">
                  <Field label="Confirmar senha">
                    <Input
                      value={accountForm.confirmPassword}
                      onChange={(v) => setAccountForm({ ...accountForm, confirmPassword: v })}
                      type="password"
                      icon="lock"
                      passwordReveal
                      placeholder="Confirme a nova senha"
                    />
                  </Field>
                </div>
              </div>
              <Button
                nativeType="submit"
                type="is-primary"
                iconLeft="content-save"
                loading={saving}
              >
                Salvar configurações
              </Button>
            </form>
          </CardComponent>
        </div>

        <div className="column is-4">
          <CardComponent title="Perfil" icon="mdi-account">
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'var(--tx-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {userInitials}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--tx-text)' }}>
                {auth.user?.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--tx-text-muted)', marginTop: '0.25rem' }}>
                {auth.user?.email}
              </div>
              <span className="tag is-primary is-light" style={{ marginTop: '0.5rem' }}>
                {auth.user?.role}
              </span>
            </div>
          </CardComponent>

          <CardComponent title="Preview do Tema" icon="mdi-eye" style={{ marginTop: '1rem' }}>
            <div className="tx-theme-preview">
              <div
                className="tx-theme-preview-sidebar"
                style={{ background: getThemeVar('--tx-sidebar-bg') }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="tx-theme-preview-dot"
                    style={{
                      background:
                        i === 1 ? getThemeVar('--tx-primary') : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <div
                className="tx-theme-preview-body"
                style={{ background: getThemeVar('--tx-body-bg') }}
              >
                <div
                  className="tx-theme-preview-header"
                  style={{
                    background: getThemeVar('--tx-header-bg'),
                    borderBottomColor: getThemeVar('--tx-header-border'),
                  }}
                />
                <div className="tx-theme-preview-content">
                  <div
                    className="tx-theme-preview-card"
                    style={{ background: getThemeVar('--tx-card-bg') }}
                  />
                  <div
                    className="tx-theme-preview-card"
                    style={{ background: getThemeVar('--tx-card-bg') }}
                  />
                  <div
                    className="tx-theme-preview-btn"
                    style={{ background: getThemeVar('--tx-primary') }}
                  />
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--tx-text)', lineHeight: 1.8, marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--tx-text-muted)' }}>Largura do menu:</span>
                <strong>{ui.sidebarWidth}px</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--tx-text-muted)' }}>Estado:</span>
                <strong>{ui.sidebarCollapsed ? 'Compactado' : 'Expandido'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--tx-text-muted)' }}>Tema:</span>
                <strong>{ui.darkMode ? 'Escuro' : 'Claro'}</strong>
              </div>
            </div>
          </CardComponent>

          <CardComponent title="Sobre o Template" icon="mdi-information" style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--tx-text-muted)', lineHeight: 1.8 }}>
              <div><strong style={{ color: 'var(--tx-text)' }}>React 19</strong> + Hooks</div>
              <div><strong style={{ color: 'var(--tx-text)' }}>Bulma 1.0</strong> (sem libs externas)</div>
              <div><strong style={{ color: 'var(--tx-text)' }}>Zustand</strong> + React Router 7</div>
              <div><strong style={{ color: 'var(--tx-text)' }}>Vite 6</strong> + TypeScript 5</div>
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  )
}
