import { useState, useMemo } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Switch from '@/components/ui/Switch'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Rate from '@/components/ui/Rate'
import NumberInput from '@/components/ui/NumberInput'
import Slider from '@/components/ui/Slider'
import DatePicker from '@/components/ui/DatePicker'
import Autocomplete from '@/components/ui/Autocomplete'
import TagInput from '@/components/ui/TagInput'
import Upload from '@/components/ui/Upload'
import Tabs from '@/components/ui/Tabs'
import Steps from '@/components/ui/Steps'

const cities = ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Belo Horizonte', 'Porto Alegre', 'Salvador', 'Fortaleza', 'Manaus', 'Recife', 'Brasília']
const tagSuggestions = ['Vue.js', 'TypeScript', 'Bulma', 'Buefy', 'Pinia', 'Vite', 'Node.js', 'Python', 'Docker', 'React', 'Angular']

const buefyComponents = [
  'Input (text, email, password, number, textarea)',
  'Select (simples e múltiplo)',
  'Checkbox (com indeterminate)',
  'Radio',
  'Switch (todos os tipos)',
  'NumberInput (compact, steps)',
  'Slider (range)',
  'Rate (estrelas)',
  'DatePicker',
  'TimePicker',
  'DateTimePicker',
  'Autocomplete',
  'TagInput (allow-new)',
  'Upload (drag & drop)',
  'Tabs',
  'Steps',
  'Field (horizontal, grouped)',
]

export default function Forms() {
  usePageTitle('Formulários')
  const ui = useUiStore()

  const [activeTab, setActiveTab] = useState(0)
  const [activeStep, setActiveStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [citySearch, setCitySearch] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: null as Date | null,
    city: '',
    bio: '',
    password: '',
    profile: '',
    workTime: null as Date | null,
    tags: [] as string[],
    active: true,
    notifications: true,
    rating: 4,
    gender: 'M',
    permissions: ['read'] as string[],
    file: null as File | null,
  })

  const [errors, setErrors] = useState({ name: '', email: '', password: '', profile: '' })

  const filteredCities = useMemo(
    () =>
      citySearch
        ? cities.filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()))
        : cities,
    [citySearch]
  )

  function validate() {
    const next = {
      name: form.name ? '' : 'Nome é obrigatório',
      email: form.email ? '' : 'E-mail é obrigatório',
      password: form.password
        ? form.password.length < 8
          ? 'Mínimo 8 caracteres'
          : ''
        : 'Senha é obrigatória',
      profile: form.profile ? '' : 'Selecione um perfil',
    }
    setErrors(next)
    return !Object.values(next).some(Boolean)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    ui.notifySuccess('Cadastro salvo com sucesso!')
  }

  function handleReset() {
    setForm({
      name: '', email: '', phone: '', birthdate: null, city: '', bio: '',
      password: '', profile: '', workTime: null, tags: [], active: true,
      notifications: true, rating: 4, gender: 'M', permissions: ['read'], file: null,
    })
    setCitySearch('')
    setErrors({ name: '', email: '', password: '', profile: '' })
  }

  // ── Demo ─────────────────────────────────────────────────────
  const [demo, setDemo] = useState({
    text: '', password: '', select: '', select2: '', multiSelect: [] as string[],
    check1: true, check2: true, check3: false,
    radio: 'a', radio2: 's',
    switch1: true, switch2: true, switch3: false, switch4: false, switch5: false, switch6: true, switch7: true,
    number1: 42, number2: 10, number3: 50, number4: 0,
    slider1: 60, slider2: 2500,
    rate1: 3, rate2: 4, rate3: 7,
    date: null as Date | null, time: null as Date | null, datetime: null as Date | null,
    autoText: '',
    tags: ['Vue.js', 'TypeScript'] as string[],
  })
  const setDemoField = <K extends keyof typeof demo>(k: K, v: typeof demo[K]) =>
    setDemo((d) => ({ ...d, [k]: v }))

  const [autoCityText, setAutoCityText] = useState('')
  const filteredDemoCities = useMemo(
    () => cities.filter((c) => c.toLowerCase().includes(autoCityText.toLowerCase())),
    [autoCityText]
  )

  // ── Layouts ──────────────────────────────────────────────────
  const [layout, setLayout] = useState({
    name: '', email: '', role: 'admin', active: true,
    firstName: '', lastName: '',
    cep: '', city: '', state: '',
    cepSearch: '', coupon: '',
  })
  const setLayoutField = <K extends keyof typeof layout>(k: K, v: typeof layout[K]) =>
    setLayout((l) => ({ ...l, [k]: v }))

  // ── Wizard ───────────────────────────────────────────────────
  const [wizard, setWizard] = useState({ name: '', email: '', address: '', city: '' })

  const formPreview = useMemo(
    () => JSON.stringify({ ...form, file: form.file?.name ?? null }, null, 2),
    [form]
  )

  // ── Tab content ──────────────────────────────────────────────
  const cadastroContent = (
    <form onSubmit={handleSubmit}>
      <p className="tx-section-divider">Informações Pessoais</p>
      <div className="columns is-multiline">
        <div className="column is-6">
          <Field label="Nome completo *" type={errors.name ? 'is-danger' : ''} message={errors.name}>
            <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Digite o nome" icon="account" />
          </Field>
        </div>
        <div className="column is-6">
          <Field label="E-mail *" type={errors.email ? 'is-danger' : ''} message={errors.email}>
            <Input value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" placeholder="email@exemplo.com" icon="email" />
          </Field>
        </div>
        <div className="column is-4">
          <Field label="Telefone">
            <Input value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="(11) 99999-9999" icon="phone" />
          </Field>
        </div>
        <div className="column is-4">
          <Field label="Data de nascimento">
            <DatePicker value={form.birthdate} onChange={(d) => setForm({ ...form, birthdate: d })} placeholder="Selecione..." />
          </Field>
        </div>
        <div className="column is-4">
          <Field label="Cidade">
            <Autocomplete
              value={citySearch}
              onChange={setCitySearch}
              data={filteredCities}
              onSelect={(opt) => setForm({ ...form, city: opt })}
              placeholder="Digite uma cidade..."
              icon="map-marker"
              clearable
              openOnFocus
            />
          </Field>
        </div>
        <div className="column is-12">
          <Field label="Biografia">
            <Input
              value={form.bio}
              onChange={(v) => setForm({ ...form, bio: v })}
              type="textarea"
              placeholder="Fale um pouco sobre você..."
              rows={3}
              maxLength={300}
              hasCounter
            />
          </Field>
        </div>
      </div>

      <p className="tx-section-divider">Conta &amp; Acesso</p>
      <div className="columns is-multiline">
        <div className="column is-6">
          <Field label="Senha *" type={errors.password ? 'is-danger' : ''} message={errors.password}>
            <Input value={form.password} onChange={(v) => setForm({ ...form, password: v })} type="password" placeholder="Mínimo 8 caracteres" icon="lock" passwordReveal />
          </Field>
        </div>
        <div className="column is-6">
          <Field label="Perfil *" type={errors.profile ? 'is-danger' : ''} message={errors.profile}>
            <Select value={form.profile} onChange={(v) => setForm({ ...form, profile: v as string })} placeholder="Selecione um perfil" icon="account-cog">
              <option value="admin">Administrador</option>
              <option value="manager">Gerente</option>
              <option value="operator">Operador</option>
              <option value="viewer">Visualizador</option>
            </Select>
          </Field>
        </div>
        <div className="column is-6">
          <Field label="Horário de trabalho">
            <DatePicker value={form.workTime} onChange={(d) => setForm({ ...form, workTime: d })} type="time" icon="clock" placeholder="Selecione o horário" />
          </Field>
        </div>
        <div className="column is-6">
          <Field label="Tags de interesse">
            <TagInput
              value={form.tags}
              onChange={(t) => setForm({ ...form, tags: t })}
              data={tagSuggestions}
              autocomplete
              allowNew
              openOnFocus
              icon="label"
              placeholder="Adicione tags..."
            />
          </Field>
        </div>
      </div>

      <p className="tx-section-divider">Preferências</p>
      <div className="columns is-multiline">
        <div className="column is-4">
          <Field label="Status da conta">
            <Switch checked={form.active} onChange={(v) => setForm({ ...form, active: v })} type="is-success">
              {form.active ? 'Ativo' : 'Inativo'}
            </Switch>
          </Field>
        </div>
        <div className="column is-4">
          <Field label="Notificações por e-mail">
            <Switch checked={form.notifications} onChange={(v) => setForm({ ...form, notifications: v })} type="is-info">
              {form.notifications ? 'Habilitado' : 'Desabilitado'}
            </Switch>
          </Field>
        </div>
        <div className="column is-4">
          <Field label="Avaliação de satisfação">
            <Rate value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} max={5} size="is-medium" />
          </Field>
        </div>
        <div className="column is-6">
          <Field label="Gênero">
            <div className="tx-radio-group">
              <Radio modelValue={form.gender} onChange={(v) => setForm({ ...form, gender: v })} nativeValue="M">Masculino</Radio>
              <Radio modelValue={form.gender} onChange={(v) => setForm({ ...form, gender: v })} nativeValue="F">Feminino</Radio>
              <Radio modelValue={form.gender} onChange={(v) => setForm({ ...form, gender: v })} nativeValue="O">Outro</Radio>
            </div>
          </Field>
        </div>
        <div className="column is-6">
          <Field label="Permissões">
            <div className="tx-check-group">
              <Checkbox modelValue={form.permissions} onModelValueChange={(v) => setForm({ ...form, permissions: v })} value="read">Leitura</Checkbox>
              <Checkbox modelValue={form.permissions} onModelValueChange={(v) => setForm({ ...form, permissions: v })} value="write">Escrita</Checkbox>
              <Checkbox modelValue={form.permissions} onModelValueChange={(v) => setForm({ ...form, permissions: v })} value="delete">Exclusão</Checkbox>
              <Checkbox modelValue={form.permissions} onModelValueChange={(v) => setForm({ ...form, permissions: v })} value="admin">Admin</Checkbox>
            </div>
          </Field>
        </div>
        <div className="column is-12">
          <Field label="Foto de perfil">
            <Upload value={form.file} onChange={(f) => setForm({ ...form, file: f })} accept="image/*">
              <p><span className="mdi mdi-upload" style={{ fontSize: '2rem' }} /></p>
              <p className="tx-upload-hint">
                {form.file ? form.file.name : 'Arraste uma imagem ou clique para selecionar'}
              </p>
            </Upload>
          </Field>
        </div>
      </div>

      <div className="tx-form-actions">
        <Button nativeType="submit" type="is-primary" iconLeft="content-save" loading={saving}>
          Salvar cadastro
        </Button>
        <Button type="is-light" iconLeft="refresh" onClick={handleReset}>
          Limpar
        </Button>
      </div>
    </form>
  )

  const componentesContent = (
    <>
      <p className="tx-section-divider">Input — Variantes e Estados</p>
      <div className="tx-showcase-grid">
        <div className="tx-showcase-item">
          <p className="tx-component-label">Padrão com ícone</p>
          <Field><Input value={demo.text} onChange={(v) => setDemoField('text', v)} placeholder="Digite aqui..." icon="pencil" /></Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Sucesso</p>
          <Field type="is-success" message="Campo validado!">
            <Input value="valor válido" onChange={() => {}} icon="check" status="is-success" />
          </Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Erro</p>
          <Field type="is-danger" message="Campo obrigatório">
            <Input value="" onChange={() => {}} icon="alert-circle" status="is-danger" placeholder="Obrigatório" />
          </Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Aviso</p>
          <Field type="is-warning" message="Verifique o valor">
            <Input value="valor?" onChange={() => {}} icon="alert" status="is-warning" />
          </Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Carregando</p>
          <Field><Input value="buscando..." onChange={() => {}} loading /></Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Desabilitado</p>
          <Field><Input value="não editável" onChange={() => {}} disabled /></Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Somente leitura</p>
          <Field><Input value="somente leitura" onChange={() => {}} readOnly /></Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Senha com revelação</p>
          <Field><Input value={demo.password} onChange={(v) => setDemoField('password', v)} type="password" placeholder="Senha..." passwordReveal /></Field>
        </div>
      </div>

      <p className="tx-section-divider">Select</p>
      <div className="tx-showcase-grid">
        <div className="tx-showcase-item">
          <p className="tx-component-label">Padrão</p>
          <Field>
            <Select value={demo.select} onChange={(v) => setDemoField('select', v as string)} placeholder="Selecione...">
              <option value="a">Opção A</option>
              <option value="b">Opção B</option>
              <option value="c">Opção C</option>
            </Select>
          </Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Com ícone</p>
          <Field>
            <Select value={demo.select2} onChange={(v) => setDemoField('select2', v as string)} placeholder="Selecione um perfil" icon="account-cog">
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
            </Select>
          </Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Múltiplo</p>
          <Field>
            <Select value={demo.multiSelect} onChange={(v) => setDemoField('multiSelect', v as string[])} multiple size={3}>
              <option value="vue">Vue.js</option>
              <option value="react">React</option>
              <option value="angular">Angular</option>
              <option value="svelte">Svelte</option>
            </Select>
          </Field>
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Erro</p>
          <Field type="is-danger" message="Selecione uma opção">
            <Select value="" onChange={() => {}} placeholder="Obrigatório" status="is-danger">
              <option>Opção 1</option>
            </Select>
          </Field>
        </div>
      </div>

      <p className="tx-section-divider">Checkbox &amp; Radio</p>
      <div className="columns">
        <div className="column is-6">
          <p className="tx-component-label">Checkboxes</p>
          <div className="tx-check-group">
            <Checkbox checked={demo.check1} onChange={(v) => setDemoField('check1', v)}>Padrão marcado</Checkbox>
            <Checkbox checked={false} onChange={() => {}}>Desmarcado</Checkbox>
            <Checkbox indeterminate>Indeterminado</Checkbox>
            <Checkbox disabled>Desabilitado</Checkbox>
            <Checkbox checked={demo.check2} onChange={(v) => setDemoField('check2', v)} type="is-success">Sucesso</Checkbox>
            <Checkbox checked={demo.check3} onChange={(v) => setDemoField('check3', v)} type="is-danger">Danger</Checkbox>
          </div>
        </div>
        <div className="column is-6">
          <p className="tx-component-label">Radios</p>
          <div className="tx-radio-group">
            <Radio modelValue={demo.radio} onChange={(v) => setDemoField('radio', v)} nativeValue="a">Opção A</Radio>
            <Radio modelValue={demo.radio} onChange={(v) => setDemoField('radio', v)} nativeValue="b">Opção B</Radio>
            <Radio modelValue={demo.radio} onChange={(v) => setDemoField('radio', v)} nativeValue="c" disabled>Desabilitado</Radio>
          </div>
          <p className="tx-component-label" style={{ marginTop: '1rem' }}>Radios com tipo</p>
          <div className="tx-radio-group">
            <Radio modelValue={demo.radio2} onChange={(v) => setDemoField('radio2', v)} nativeValue="s" type="is-success">Sucesso</Radio>
            <Radio modelValue={demo.radio2} onChange={(v) => setDemoField('radio2', v)} nativeValue="w" type="is-warning">Aviso</Radio>
            <Radio modelValue={demo.radio2} onChange={(v) => setDemoField('radio2', v)} nativeValue="d" type="is-danger">Perigo</Radio>
          </div>
        </div>
      </div>

      <p className="tx-section-divider">Switch</p>
      <div className="tx-check-group">
        <Switch checked={demo.switch1} onChange={(v) => setDemoField('switch1', v)}>Padrão</Switch>
        <Switch checked={demo.switch2} onChange={(v) => setDemoField('switch2', v)} type="is-success">Sucesso</Switch>
        <Switch checked={demo.switch3} onChange={(v) => setDemoField('switch3', v)} type="is-info">Info</Switch>
        <Switch checked={demo.switch4} onChange={(v) => setDemoField('switch4', v)} type="is-warning">Aviso</Switch>
        <Switch checked={demo.switch5} onChange={(v) => setDemoField('switch5', v)} type="is-danger">Perigo</Switch>
        <Switch disabled>Desabilitado</Switch>
        <Switch checked={demo.switch6} onChange={(v) => setDemoField('switch6', v)} size="is-small">Pequeno</Switch>
        <Switch checked={demo.switch7} onChange={(v) => setDemoField('switch7', v)} size="is-large">Grande</Switch>
      </div>

      <p className="tx-section-divider">NumberInput — Campo Numérico</p>
      <div className="tx-showcase-grid">
        <div className="tx-showcase-item">
          <p className="tx-component-label">Padrão</p>
          <NumberInput value={demo.number1} onChange={(v) => setDemoField('number1', v)} min={0} max={100} />
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Com passo de 5</p>
          <NumberInput value={demo.number3} onChange={(v) => setDemoField('number3', v)} min={0} max={100} step={5} type="is-info" />
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Sem controles</p>
          <NumberInput value={demo.number4} onChange={(v) => setDemoField('number4', v)} controls={false} placeholder="0" />
        </div>
      </div>

      <p className="tx-section-divider">Slider — Controle Deslizante</p>
      <div className="columns">
        <div className="column is-6">
          <p className="tx-component-label">Volume (0–100)</p>
          <Slider value={demo.slider1} onChange={(v) => setDemoField('slider1', v)} min={0} max={100} />
          <p className="tx-component-label" style={{ marginTop: '0.5rem' }}>Valor: {demo.slider1}</p>
        </div>
        <div className="column is-6">
          <p className="tx-component-label">Orçamento</p>
          <Slider value={demo.slider2} onChange={(v) => setDemoField('slider2', v)} min={0} max={10000} step={500} type="is-success" />
          <p className="tx-component-label" style={{ marginTop: '0.5rem' }}>
            R$ {demo.slider2.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      <p className="tx-section-divider">Rate — Avaliação por Estrelas</p>
      <div className="tx-showcase-grid">
        <div className="tx-showcase-item">
          <p className="tx-component-label">Padrão (5 estrelas)</p>
          <Rate value={demo.rate1} onChange={(v) => setDemoField('rate1', v)} max={5} />
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Médio</p>
          <Rate value={demo.rate2} onChange={(v) => setDemoField('rate2', v)} max={5} size="is-medium" />
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">10 estrelas</p>
          <Rate value={demo.rate3} onChange={(v) => setDemoField('rate3', v)} max={10} size="is-small" />
        </div>
        <div className="tx-showcase-item">
          <p className="tx-component-label">Somente leitura</p>
          <Rate value={4} max={5} disabled />
        </div>
      </div>

      <p className="tx-section-divider">Date &amp; Time Pickers</p>
      <div className="columns">
        <div className="column is-4">
          <Field label="Data">
            <DatePicker value={demo.date} onChange={(d) => setDemoField('date', d)} placeholder="Selecione..." />
          </Field>
        </div>
        <div className="column is-4">
          <Field label="Hora">
            <DatePicker value={demo.time} onChange={(d) => setDemoField('time', d)} type="time" icon="clock" placeholder="Selecione..." />
          </Field>
        </div>
        <div className="column is-4">
          <Field label="Data e Hora">
            <DatePicker value={demo.datetime} onChange={(d) => setDemoField('datetime', d)} type="datetime-local" icon="calendar-clock" placeholder="Selecione..." />
          </Field>
        </div>
      </div>

      <p className="tx-section-divider">Autocomplete &amp; TagInput</p>
      <div className="columns">
        <div className="column is-6">
          <Field label="Autocomplete — Cidade">
            <Autocomplete
              value={autoCityText}
              onChange={setAutoCityText}
              data={filteredDemoCities}
              placeholder="Digite uma cidade..."
              icon="map-marker"
              clearable
              openOnFocus
            />
          </Field>
        </div>
        <div className="column is-6">
          <Field label="TagInput — Tecnologias">
            <TagInput
              value={demo.tags}
              onChange={(t) => setDemoField('tags', t)}
              data={tagSuggestions}
              autocomplete
              allowNew
              openOnFocus
              icon="tag"
              placeholder="Adicione..."
            />
          </Field>
        </div>
      </div>
    </>
  )

  const layoutsContent = (
    <>
      <p className="tx-section-divider">Formulário Horizontal</p>
      <div className="tx-layout-demo">
        <p className="tx-layout-label">Ideal para formulários de configuração e edição compactos</p>
        <Field horizontal label="Nome">
          <Input value={layout.name} onChange={(v) => setLayoutField('name', v)} placeholder="Nome completo" />
        </Field>
        <Field horizontal label="E-mail">
          <Input value={layout.email} onChange={(v) => setLayoutField('email', v)} type="email" placeholder="email@exemplo.com" />
        </Field>
        <Field horizontal label="Perfil">
          <Select value={layout.role} onChange={(v) => setLayoutField('role', v as string)}>
            <option value="admin">Administrador</option>
            <option value="user">Usuário</option>
          </Select>
        </Field>
        <Field horizontal label="Ativo">
          <Switch checked={layout.active} onChange={(v) => setLayoutField('active', v)} type="is-success" />
        </Field>
        <Field horizontal>
          <div className="tx-form-actions" style={{ border: 'none', margin: 0, padding: 0 }}>
            <Button type="is-primary" iconLeft="content-save">Salvar</Button>
            <Button type="is-light">Cancelar</Button>
          </div>
        </Field>
      </div>

      <p className="tx-section-divider">Campos Agrupados</p>
      <div className="tx-layout-demo">
        <p className="tx-layout-label">Campos lado a lado com tamanhos proporcionais</p>
        <Field grouped>
          <Field label="Nome" expanded>
            <Input value={layout.firstName} onChange={(v) => setLayoutField('firstName', v)} placeholder="Nome" />
          </Field>
          <Field label="Sobrenome" expanded>
            <Input value={layout.lastName} onChange={(v) => setLayoutField('lastName', v)} placeholder="Sobrenome" />
          </Field>
        </Field>
        <Field grouped>
          <Field label="CEP" style={{ minWidth: 160 }}>
            <Input value={layout.cep} onChange={(v) => setLayoutField('cep', v)} placeholder="00000-000" />
          </Field>
          <Field label="Cidade" expanded>
            <Input value={layout.city} onChange={(v) => setLayoutField('city', v)} placeholder="Cidade" />
          </Field>
          <Field label="UF" style={{ maxWidth: 80 }}>
            <Input value={layout.state} onChange={(v) => setLayoutField('state', v)} placeholder="SP" maxLength={2} />
          </Field>
        </Field>
      </div>

      <p className="tx-section-divider">Input com Botão Integrado (addons)</p>
      <div className="tx-layout-demo">
        <p className="tx-layout-label">Combina input e botão no mesmo campo</p>
        <Field label="Buscar CEP" grouped>
          <Field expanded>
            <Input value={layout.cepSearch} onChange={(v) => setLayoutField('cepSearch', v)} placeholder="00000-000" icon="map-search" />
          </Field>
          <div className="control">
            <Button type="is-info" iconLeft="magnify" onClick={() => ui.notify('Buscando CEP...', 'is-info')}>
              Buscar
            </Button>
          </div>
        </Field>
        <Field label="Cupom de desconto" grouped>
          <Field expanded>
            <Input value={layout.coupon} onChange={(v) => setLayoutField('coupon', v)} placeholder="PROMO2026" icon="ticket-percent" />
          </Field>
          <div className="control">
            <Button type="is-success" iconLeft="check">Aplicar</Button>
          </div>
        </Field>
      </div>

      <p className="tx-section-divider">Formulário por Etapas</p>
      <div className="tx-layout-demo">
        <Steps
          current={activeStep}
          steps={[
            { label: 'Dados Pessoais' },
            { label: 'Endereço', clickable: activeStep >= 2 },
            { label: 'Confirmar', clickable: activeStep >= 3 },
          ]}
          onChange={setActiveStep}
        />

        <div className="tx-steps-content">
          {activeStep === 1 && (
            <div className="columns">
              <div className="column is-6">
                <Field label="Nome">
                  <Input value={wizard.name} onChange={(v) => setWizard({ ...wizard, name: v })} placeholder="Nome completo" />
                </Field>
              </div>
              <div className="column is-6">
                <Field label="E-mail">
                  <Input value={wizard.email} onChange={(v) => setWizard({ ...wizard, email: v })} type="email" placeholder="email@exemplo.com" />
                </Field>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="columns">
              <div className="column is-8">
                <Field label="Endereço">
                  <Input value={wizard.address} onChange={(v) => setWizard({ ...wizard, address: v })} placeholder="Rua, número" />
                </Field>
              </div>
              <div className="column is-4">
                <Field label="Cidade">
                  <Input value={wizard.city} onChange={(v) => setWizard({ ...wizard, city: v })} placeholder="Cidade" />
                </Field>
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className="columns">
              <div className="column">
                <p style={{ fontSize: '0.875rem', color: 'var(--tx-text-muted)' }}>
                  Confirme os dados antes de finalizar:
                </p>
                <ul style={{ marginTop: '0.75rem', fontSize: '0.875rem', lineHeight: 2 }}>
                  <li><strong>Nome:</strong> {wizard.name || '—'}</li>
                  <li><strong>E-mail:</strong> {wizard.email || '—'}</li>
                  <li><strong>Endereço:</strong> {wizard.address || '—'}</li>
                  <li><strong>Cidade:</strong> {wizard.city || '—'}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="tx-steps-nav">
          {activeStep > 1 && (
            <Button type="is-light" iconLeft="arrow-left" onClick={() => setActiveStep(activeStep - 1)}>
              Anterior
            </Button>
          )}
          {activeStep < 3 ? (
            <Button type="is-primary" iconRight="arrow-right" onClick={() => setActiveStep(activeStep + 1)}>
              Próximo
            </Button>
          ) : (
            <Button type="is-success" iconLeft="check" onClick={() => ui.notifySuccess('Cadastro finalizado!')}>
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className="columns">
      <div className="column is-8">
        <CardComponent title="Formulários" icon="mdi-form-select">
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            tabs={[
              { label: 'Cadastro', icon: 'account-plus', content: cadastroContent },
              { label: 'Componentes', icon: 'puzzle', content: componentesContent },
              { label: 'Layouts', icon: 'view-dashboard', content: layoutsContent },
            ]}
          />
        </CardComponent>
      </div>

      <div className="column is-4">
        <CardComponent title="Dados do Formulário" icon="mdi-code-json">
          <pre className="tx-json-preview">{formPreview}</pre>
        </CardComponent>

        <CardComponent title="Componentes Utilizados" icon="mdi-puzzle" style={{ marginTop: '1rem' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--tx-text)', lineHeight: 2 }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {buefyComponents.map((c) => (
                <li key={c}>
                  <span className="mdi mdi-check-circle" style={{ color: 'var(--tx-success)', marginRight: '0.4rem' }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </CardComponent>
      </div>
    </div>
  )
}
