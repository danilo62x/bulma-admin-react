import { useMemo, useState } from 'react'
import type { ApexOptions } from 'apexcharts'
import type { ColumnDef } from '@tanstack/react-table'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import ApexChart from '@/components/ui/ApexChart'
import DataTable from '@/components/ui/DataTable'
import { TextField, SelectField, CheckboxField } from '@/components/ui/FormikField'
import RichTextEditor from '@/components/ui/RichTextEditor'
import DatePicker from '@/components/ui/DatePicker'
import FileDropzone from '@/components/ui/FileDropzone'
import Field from '@/components/ui/Field'
import Button from '@/components/ui/Button'

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

interface UserRow {
  id: number
  nome: string
  email: string
  funcao: string
  status: 'Ativo' | 'Pendente' | 'Inativo'
  valor: number
}

const users: UserRow[] = [
  { id: 1, nome: 'Marina Costa', email: 'marina@empresa.com', funcao: 'Administradora', status: 'Ativo', valor: 1299.9 },
  { id: 2, nome: 'Lucas Pereira', email: 'lucas@empresa.com', funcao: 'Editor', status: 'Pendente', valor: 349.5 },
  { id: 3, nome: 'Aline Souza', email: 'aline@empresa.com', funcao: 'Visualizador', status: 'Ativo', valor: 89.0 },
  { id: 4, nome: 'Rafael Lima', email: 'rafael@empresa.com', funcao: 'Editor', status: 'Inativo', valor: 0 },
  { id: 5, nome: 'Bianca Rocha', email: 'bianca@empresa.com', funcao: 'Administradora', status: 'Ativo', valor: 2499.0 },
  { id: 6, nome: 'Diego Martins', email: 'diego@empresa.com', funcao: 'Visualizador', status: 'Pendente', valor: 159.9 },
]

function statusTagClass(status: UserRow['status']) {
  if (status === 'Ativo') return 'tag is-success is-light'
  if (status === 'Pendente') return 'tag is-warning is-light'
  return 'tag is-danger is-light'
}

const currencyFmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const schema = yup.object({
  nome: yup.string().min(3, 'Mínimo de 3 caracteres').required('Informe o nome'),
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
  plano: yup.string().required('Selecione um plano'),
  termos: yup.boolean().oneOf([true], 'É preciso aceitar os termos'),
})

export default function Integrations() {
  const ui = useUiStore()
  const [d1, setD1] = useState<Date | null>(new Date())
  const [d2, setD2] = useState<Date | null>(new Date())

  const areaSeries: ApexOptions['series'] = [
    { name: 'Receita', data: [31, 40, 28, 51, 42, 62, 58, 70, 65, 82, 78, 95] },
    { name: 'Despesas', data: [22, 28, 25, 33, 30, 38, 36, 44, 41, 50, 47, 55] },
  ]
  const areaOptions: ApexOptions = {
    chart: { type: 'area' },
    xaxis: { categories: MONTHS },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } },
    legend: { show: true, position: 'top' },
  }

  const barSeries: ApexOptions['series'] = [{ name: 'Vendas', data: [44, 55, 41, 67, 22, 43, 36, 52] }]
  const barOptions: ApexOptions = {
    chart: { type: 'bar' },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    xaxis: { categories: ['Pro', 'Start', 'Storage', 'Ent.', 'Treino', 'API', 'SMS', 'Extra'] },
  }

  const donutSeries: ApexOptions['series'] = [42, 24, 18, 10, 6]
  const donutOptions: ApexOptions = {
    chart: { type: 'donut' },
    labels: ['Google', 'Direto', 'Social', 'Email', 'Outros'],
    legend: { show: true, position: 'bottom' },
    plotOptions: { pie: { donut: { size: '65%' } } },
  }

  const userColumns = useMemo<ColumnDef<UserRow, any>[]>(
    () => [
      {
        accessorKey: 'nome',
        header: 'Nome',
        cell: (info) => <span className="has-text-weight-medium">{info.getValue() as string}</span>,
      },
      { accessorKey: 'email', header: 'E-mail' },
      { accessorKey: 'funcao', header: 'Função' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue() as UserRow['status']
          return <span className={statusTagClass(status)}>{status}</span>
        },
      },
      {
        accessorKey: 'valor',
        header: 'Valor',
        cell: (info) => <span className="has-text-weight-medium">{currencyFmt.format(info.getValue() as number)}</span>,
      },
    ],
    []
  )

  return (
    <div className="integrations">
      <div className="tx-section-head">
        <h2 className="title is-5" style={{ margin: 0 }}>
          Gráficos
        </h2>
        <span className="tag is-primary is-light">
          <span className="icon is-small">
            <i className="mdi mdi-flash" />
          </span>
          <span>ApexCharts</span>
        </span>
        <p className="tx-section-desc">Gráficos interativos e responsivos com tema claro/escuro automático.</p>
      </div>

      <CardComponent title="Receita x Despesas" icon="mdi-chart-areaspline">
        <ApexChart type="area" series={areaSeries} options={areaOptions} height={320} />
      </CardComponent>

      <div className="columns" style={{ marginTop: '1rem' }}>
        <div className="column is-7">
          <CardComponent title="Vendas por produto" icon="mdi-chart-bar">
            <ApexChart type="bar" series={barSeries} options={barOptions} height={300} />
          </CardComponent>
        </div>
        <div className="column is-5">
          <CardComponent title="Fontes de tráfego" icon="mdi-chart-donut">
            <ApexChart type="donut" series={donutSeries} options={donutOptions} height={300} />
          </CardComponent>
        </div>
      </div>

      <div className="tx-section-head" style={{ marginTop: '2rem' }}>
        <h2 className="title is-5" style={{ margin: 0 }}>
          Tabela de dados
        </h2>
        <span className="tag is-primary is-light">
          <span className="icon is-small">
            <i className="mdi mdi-flash" />
          </span>
          <span>TanStack Table</span>
        </span>
        <p className="tx-section-desc">Ordenação, busca global e paginação no cliente.</p>
      </div>

      <CardComponent title="Usuários" icon="mdi-account-group">
        <DataTable columns={userColumns} data={users} pageSize={5} searchable />
      </CardComponent>

      <div className="columns" style={{ marginTop: '2rem' }}>
        <div className="column is-6">
          <div className="tx-section-head">
            <h2 className="title is-5" style={{ margin: 0 }}>
              Formulário validado
            </h2>
            <span className="tag is-primary is-light">
              <span className="icon is-small">
                <i className="mdi mdi-flash" />
              </span>
              <span>Formik + yup</span>
            </span>
          </div>
          <CardComponent title="Cadastro" icon="mdi-form-select">
            <Formik
              initialValues={{ nome: '', email: '', plano: '', termos: false }}
              validationSchema={schema}
              onSubmit={(values, { resetForm }) => {
                ui.notifySuccess(`Formulário enviado com sucesso para ${values.nome}!`)
                resetForm()
              }}
            >
              <Form>
                <TextField name="nome" label="Nome completo" placeholder="Seu nome" icon="mdi-account" />
                <TextField name="email" label="E-mail" type="email" placeholder="voce@empresa.com" icon="mdi-email" />
                <SelectField name="plano" label="Plano">
                  <option value="">Selecione...</option>
                  <option value="start">Start</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </SelectField>
                <CheckboxField name="termos" label="Aceito os termos de uso" />
                <Button nativeType="submit" type="is-primary" iconLeft="check" style={{ marginTop: '0.5rem' }}>
                  Enviar
                </Button>
              </Form>
            </Formik>
          </CardComponent>
        </div>

        <div className="column is-6">
          <div className="tx-section-head">
            <h2 className="title is-5" style={{ margin: 0 }}>
              Editor de texto rico
            </h2>
            <span className="tag is-primary is-light">
              <span className="icon is-small">
                <i className="mdi mdi-flash" />
              </span>
              <span>Slate</span>
            </span>
          </div>
          <CardComponent title="Conteúdo" icon="mdi-format-text">
            <RichTextEditor placeholder="Comece a escrever o seu conteúdo aqui..." />
          </CardComponent>
        </div>
      </div>

      <div className="columns" style={{ marginTop: '2rem' }}>
        <div className="column is-6">
          <div className="tx-section-head">
            <h2 className="title is-5" style={{ margin: 0 }}>
              Seletor de data
            </h2>
            <span className="tag is-primary is-light">
              <span className="icon is-small">
                <i className="mdi mdi-flash" />
              </span>
              <span>DatePicker</span>
            </span>
          </div>
          <CardComponent title="Datas" icon="mdi-calendar">
            <Field label="Data">
              <DatePicker value={d1} onChange={setD1} placeholder="Selecione a data" />
            </Field>
            <Field label="Data e hora">
              <DatePicker value={d2} onChange={setD2} type="datetime-local" placeholder="Selecione data e hora" />
            </Field>
          </CardComponent>
        </div>

        <div className="column is-6">
          <div className="tx-section-head">
            <h2 className="title is-5" style={{ margin: 0 }}>
              Upload de arquivos
            </h2>
            <span className="tag is-primary is-light">
              <span className="icon is-small">
                <i className="mdi mdi-flash" />
              </span>
              <span>Dropzone</span>
            </span>
          </div>
          <CardComponent title="Enviar arquivos" icon="mdi-cloud-upload">
            <FileDropzone
              maxFiles={5}
              accept="image/*,application/pdf"
              onFiles={(files) => {
                if (files.length) ui.notifySuccess(`${files.length} arquivo(s) selecionado(s).`)
              }}
            />
          </CardComponent>
        </div>
      </div>
    </div>
  )
}
