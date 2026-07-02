import { useState, useMemo } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Switch from '@/components/ui/Switch'
import Tooltip from '@/components/ui/Tooltip'
import Modal from '@/components/ui/Modal'
import Rate from '@/components/ui/Rate'
import Table, { type TableColumn } from '@/components/ui/Table'

interface UserRow {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: string
  date: string
  color: string
}

interface ProductRow {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
  active: boolean
  icon: string
  color: string
  description: string
  sku: string
  supplier: string
  weight: string
  createdAt: string
  sales: number
}

const avatarColors = ['#485fc7', '#48c774', '#3273dc', '#f59e0b', '#f14668', '#9b59b6', '#1abc9c', '#e67e22']
const names = ['João Silva', 'Maria Santos', 'Carlos Lima', 'Ana Costa', 'Pedro Oliveira', 'Lucia Fernandes', 'Roberto Alves', 'Fernanda Ramos', 'Thiago Souza', 'Camila Barbosa', 'Diego Martins', 'Beatriz Carvalho', 'Rodrigo Pereira', 'Juliana Rocha', 'Marcelo Gomes', 'Patricia Teixeira', 'Anderson Lima', 'Renata Moreira', 'Felipe Nascimento', 'Claudia Ribeiro']
const handles = ['joao', 'maria', 'carlos', 'ana', 'pedro', 'lucia', 'roberto', 'fernanda', 'thiago', 'camila', 'diego', 'beatriz', 'rodrigo', 'juliana', 'marcelo', 'patricia', 'anderson', 'renata', 'felipe', 'claudia']
const phones = ['(11) 98765-4321', '(21) 99876-5432', '(41) 97654-3210', '(31) 96543-2109', '(51) 95432-1098', '(71) 94321-0987', '(85) 93210-9876', '(92) 92109-8765', '(81) 91098-7654', '(11) 90987-6543', '(21) 89876-5432', '(41) 88765-4321', '(31) 87654-3210', '(51) 86543-2109', '(11) 85432-1098', '(21) 84321-0987', '(41) 83210-9876', '(31) 82109-8765', '(51) 81098-7654', '(11) 80987-6543']

const seedUsers: UserRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: names[i],
  email: handles[i] + '@empresa.com',
  phone: phones[i],
  role: ['Administrador', 'Gerente', 'Operador', 'Visualizador', 'Operador'][i % 5],
  status: i % 5 === 3 ? 'Inativo' : 'Ativo',
  date: `${String((i % 28) + 1).padStart(2, '0')}/${String((i % 12) + 1).padStart(2, '0')}/2025`,
  color: avatarColors[i % avatarColors.length],
}))

const seedProducts: ProductRow[] = [
  { id: 1, name: 'Teclado Mecânico', category: 'Periférico', price: 459.9, stock: 23, rating: 5, active: true, icon: 'mdi-keyboard', color: '#485fc7', description: 'Teclado mecânico com switches Blue, retroiluminação RGB e layout ABNT2.', sku: 'TECL-MEC-001', supplier: 'TechBrasil', weight: '980g', createdAt: '10/01/2025', sales: 142 },
  { id: 2, name: 'Monitor 27" 4K', category: 'Hardware', price: 2199.9, stock: 8, rating: 5, active: true, icon: 'mdi-monitor', color: '#3273dc', description: 'Monitor IPS 4K com 144Hz, HDR400 e resposta de 1ms.', sku: 'MON-27-4K-002', supplier: 'DisplayTech', weight: '5.2kg', createdAt: '15/01/2025', sales: 67 },
  { id: 3, name: 'Mouse Sem Fio', category: 'Periférico', price: 189.9, stock: 45, rating: 4, active: true, icon: 'mdi-mouse', color: '#48c774', description: 'Mouse wireless com DPI ajustável até 4800, bateria de 12 meses e receptor USB.', sku: 'MOUS-WL-003', supplier: 'TechBrasil', weight: '95g', createdAt: '20/01/2025', sales: 289 },
  { id: 4, name: 'SSD NVMe 1TB', category: 'Hardware', price: 399.9, stock: 0, rating: 5, active: false, icon: 'mdi-harddisk', color: '#f59e0b', description: 'SSD NVMe PCIe 4.0 com velocidade de leitura de 7000MB/s.', sku: 'SSD-NVMe-004', supplier: 'StoragePro', weight: '8g', createdAt: '25/01/2025', sales: 198 },
  { id: 5, name: 'Headset USB', category: 'Periférico', price: 299.9, stock: 15, rating: 4, active: true, icon: 'mdi-headset', color: '#9b59b6', description: 'Headset USB com microfone retrátil, drivers de 50mm.', sku: 'HEAD-USB-005', supplier: 'AudioMax', weight: '320g', createdAt: '01/02/2025', sales: 94 },
  { id: 6, name: 'Suporte para Notebook', category: 'Acessório', price: 129.9, stock: 67, rating: 3, active: true, icon: 'mdi-laptop', color: '#1abc9c', description: 'Suporte ergonômico em alumínio para notebooks de 11 a 17 polegadas.', sku: 'SUP-NB-006', supplier: 'ErgoPro', weight: '650g', createdAt: '05/02/2025', sales: 213 },
  { id: 7, name: 'Licença Office 365', category: 'Software', price: 599.0, stock: 999, rating: 4, active: true, icon: 'mdi-microsoft-office', color: '#e67e22', description: 'Licença anual para 1 usuário com acesso a Word, Excel, PowerPoint.', sku: 'OFF-365-007', supplier: 'Microsoft BR', weight: 'N/A', createdAt: '10/02/2025', sales: 445 },
  { id: 8, name: 'Webcam Full HD', category: 'Periférico', price: 249.9, stock: 5, rating: 4, active: true, icon: 'mdi-webcam', color: '#e74c3c', description: 'Webcam 1080p30fps com microfone estéreo embutido, autofoco.', sku: 'WEB-FHD-008', supplier: 'VideoTech', weight: '180g', createdAt: '15/02/2025', sales: 156 },
  { id: 9, name: 'Hub USB-C 7 em 1', category: 'Acessório', price: 179.9, stock: 32, rating: 5, active: true, icon: 'mdi-usb-port', color: '#2c3e50', description: 'Hub USB-C com HDMI 4K, 3x USB-A 3.0, SD/MicroSD, USB-C PD 87W.', sku: 'HUB-7IN1-009', supplier: 'ConnectMax', weight: '72g', createdAt: '20/02/2025', sales: 327 },
  { id: 10, name: 'Mousepad XL', category: 'Acessório', price: 89.9, stock: 88, rating: 4, active: true, icon: 'mdi-surface-usb', color: '#27ae60', description: 'Mousepad extra large 900x400mm com base antiderrapante.', sku: 'MPAD-XL-010', supplier: 'GamerGear', weight: '450g', createdAt: '01/03/2025', sales: 512 },
]

export default function Tables() {
  usePageTitle('Tabelas')
  const ui = useUiStore()

  // Users
  const [users, setUsers] = useState<UserRow[]>(seedUsers)
  const [search, setSearch] = useState('')
  const [perPageUsers, setPerPageUsers] = useState(10)
  const [checkedRows, setCheckedRows] = useState<UserRow[]>([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingUser, setEditingUser] = useState<UserRow | null>(null)
  const [deletingUser, setDeletingUser] = useState<UserRow | null>(null)

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Operador',
    active: true,
  })

  const filteredUsers = useMemo(() => {
    if (!search) return users
    const q = search.toLowerCase()
    return users.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q)
    )
  }, [users, search])

  function openAddModal() {
    setEditingUser(null)
    setUserForm({ name: '', email: '', phone: '', role: 'Operador', active: true })
    setShowUserModal(true)
  }

  function openEditModal(row: UserRow) {
    setEditingUser(row)
    setUserForm({
      name: row.name,
      email: row.email,
      phone: row.phone,
      role: row.role,
      active: row.status === 'Ativo',
    })
    setShowUserModal(true)
  }

  function openDeleteModal(row: UserRow) {
    setDeletingUser(row)
    setShowDeleteModal(true)
  }

  function saveUser() {
    if (!userForm.name || !userForm.email) return
    if (editingUser) {
      setUsers((us) =>
        us.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: userForm.name,
                email: userForm.email,
                phone: userForm.phone,
                role: userForm.role,
                status: userForm.active ? 'Ativo' : 'Inativo',
              }
            : u
        )
      )
      ui.notifySuccess('Usuário atualizado!')
    } else {
      setUsers((us) => [
        ...us,
        {
          id: us.length + 1,
          ...userForm,
          status: userForm.active ? 'Ativo' : 'Inativo',
          date: new Date().toLocaleDateString('pt-BR'),
          color: avatarColors[us.length % avatarColors.length],
        },
      ])
      ui.notifySuccess('Usuário criado!')
    }
    setShowUserModal(false)
  }

  function confirmDelete() {
    if (!deletingUser) return
    setUsers((us) => us.filter((u) => u.id !== deletingUser.id))
    setCheckedRows((cr) => cr.filter((r) => r.id !== deletingUser.id))
    setShowDeleteModal(false)
    ui.notifySuccess('Usuário excluído!')
  }

  function bulkDelete() {
    const ids = new Set(checkedRows.map((r) => r.id))
    setUsers((us) => us.filter((u) => !ids.has(u.id)))
    const count = checkedRows.length
    setCheckedRows([])
    ui.notifySuccess(`${count} usuário${count > 1 ? 's' : ''} excluído${count > 1 ? 's' : ''}!`)
  }

  const userColumns: TableColumn<UserRow>[] = [
    { field: 'id', label: '#', width: 60, sortable: true, render: (r) => <span className="tx-row-id">#{r.id}</span> },
    {
      field: 'name',
      label: 'Nome',
      sortable: true,
      render: (r) => (
        <div className="tx-row-name">
          <div className="tx-row-avatar" style={{ ['--avatar-color' as any]: r.color }}>
            {r.name[0]}
          </div>
          {r.name}
        </div>
      ),
    },
    {
      field: 'email',
      label: 'E-mail',
      sortable: true,
      render: (r) => (
        <a href={`mailto:${r.email}`} style={{ color: 'var(--tx-text)' }}>
          {r.email}
        </a>
      ),
    },
    { field: 'role', label: 'Perfil', sortable: true, render: (r) => <span className="tag is-light">{r.role}</span> },
    {
      field: 'status',
      label: 'Status',
      sortable: true,
      centered: true,
      render: (r) => (
        <span className={`tag ${r.status === 'Ativo' ? 'is-success is-light' : 'is-danger is-light'}`}>
          <span className={`mdi ${r.status === 'Ativo' ? 'mdi-check-circle' : 'mdi-close-circle'}`} />
          {' '}{r.status}
        </span>
      ),
    },
    { field: 'date', label: 'Cadastro', sortable: true },
    {
      label: 'Ações',
      centered: true,
      render: (r) => (
        <div className="tx-row-actions">
          <Tooltip label="Editar">
            <Button size="is-small" type="is-info" iconLeft="pencil" outlined onClick={() => openEditModal(r)} />
          </Tooltip>
          <Tooltip label="Excluir">
            <Button size="is-small" type="is-danger" iconLeft="delete" outlined onClick={() => openDeleteModal(r)} />
          </Tooltip>
        </div>
      ),
    },
  ]

  // Products
  const [products, setProducts] = useState<ProductRow[]>(seedProducts)
  const [productSearch, setProductSearch] = useState('')
  const [productCategory, setProductCategory] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase())
      const matchCat = !productCategory || p.category === productCategory
      return matchSearch && matchCat
    })
  }, [products, productSearch, productCategory])

  const productColumns: TableColumn<ProductRow>[] = [
    {
      field: 'name',
      label: 'Produto',
      sortable: true,
      render: (r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`mdi ${r.icon}`} style={{ color: r.color, fontSize: '1.3rem' }} />
          <span style={{ fontWeight: 500 }}>{r.name}</span>
        </div>
      ),
    },
    {
      field: 'category',
      label: 'Categoria',
      sortable: true,
      render: (r) => <span className="tag is-info is-light">{r.category}</span>,
    },
    {
      field: 'price',
      label: 'Preço',
      sortable: true,
      numeric: true,
      render: (r) => <strong>R$ {r.price.toFixed(2)}</strong>,
    },
    {
      field: 'stock',
      label: 'Estoque',
      sortable: true,
      centered: true,
      render: (r) => (
        <span
          className={`tag ${
            r.stock > 10 ? 'is-success is-light' : r.stock > 0 ? 'is-warning is-light' : 'is-danger is-light'
          }`}
        >
          {r.stock > 0 ? r.stock + ' un.' : 'Esgotado'}
        </span>
      ),
    },
    {
      field: 'rating',
      label: 'Avaliação',
      centered: true,
      render: (r) => <Rate value={r.rating} max={5} size="is-small" disabled />,
    },
    {
      label: 'Status',
      centered: true,
      render: (r) => (
        <Switch
          checked={r.active}
          type="is-success"
          size="is-small"
          onChange={(v) =>
            setProducts((ps) => ps.map((p) => (p.id === r.id ? { ...p, active: v } : p)))
          }
        />
      ),
    },
  ]

  return (
    <div>
      <CardComponent
        title="Gerenciamento de Usuários"
        icon="mdi-account-group"
        toolbar={
          <div className="tx-table-toolbar">
            <div className="tx-table-search">
              <Input value={search} onChange={setSearch} placeholder="Buscar..." icon="magnify" size="is-small" />
            </div>
            <Button size="is-small" type="is-primary" iconLeft="plus" onClick={openAddModal}>
              Novo
            </Button>
            <Button size="is-small" type="is-light" iconLeft="download">
              Exportar
            </Button>
          </div>
        }
      >
        {checkedRows.length > 0 && (
          <div className="tx-bulk-bar">
            <span className="tx-bulk-count">
              <span className="mdi mdi-checkbox-multiple-marked" />
              {' '}{checkedRows.length} selecionado{checkedRows.length > 1 ? 's' : ''}
            </span>
            <Button size="is-small" type="is-danger" outlined iconLeft="delete" onClick={bulkDelete}>
              Excluir selecionados
            </Button>
            <Button size="is-small" type="is-light" iconLeft="close" onClick={() => setCheckedRows([])}>
              Limpar seleção
            </Button>
          </div>
        )}

        <Table
          data={filteredUsers}
          columns={userColumns}
          rowKey="id"
          striped
          hoverable
          paginated
          perPage={perPageUsers}
          checkable
          checkedRows={checkedRows}
          onCheck={setCheckedRows}
          defaultSort="id"
          empty={
            <div className="tx-table-empty">
              <span className="mdi mdi-magnify tx-table-empty-icon" />
              Nenhum resultado encontrado
            </div>
          }
        />

        <div className="tx-table-footer">
          <span className="tx-table-count">
            Exibindo {filteredUsers.length} de {users.length} registros
          </span>
          <Field style={{ margin: 0 }}>
            <Select
              value={perPageUsers}
              onChange={(v) => setPerPageUsers(Number(v))}
              size="is-small"
              expanded={false}
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={20}>20 por página</option>
            </Select>
          </Field>
        </div>
      </CardComponent>

      <CardComponent
        title="Catálogo de Produtos"
        icon="mdi-package-variant"
        style={{ marginTop: '1rem' }}
        toolbar={
          <div className="tx-table-toolbar">
            <div className="tx-table-search">
              <Input value={productSearch} onChange={setProductSearch} placeholder="Buscar produto..." icon="magnify" size="is-small" />
            </div>
            <Select value={productCategory} onChange={(v) => setProductCategory(v as string)} size="is-small" expanded={false}>
              <option value="">Todas categorias</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Periférico">Periférico</option>
              <option value="Acessório">Acessório</option>
            </Select>
          </div>
        }
      >
        <Table
          data={filteredProducts}
          columns={productColumns}
          rowKey="id"
          striped
          hoverable
          paginated
          perPage={10}
          detailed
          renderDetail={(row) => (
            <div className="tx-detail-row">
              <div className="tx-detail-grid">
                <div>
                  <p className="tx-detail-label">Descrição</p>
                  <p className="tx-detail-value">{row.description}</p>
                </div>
                <div>
                  <p className="tx-detail-label">SKU</p>
                  <p className="tx-detail-value">{row.sku}</p>
                </div>
                <div>
                  <p className="tx-detail-label">Fornecedor</p>
                  <p className="tx-detail-value">{row.supplier}</p>
                </div>
                <div>
                  <p className="tx-detail-label">Peso</p>
                  <p className="tx-detail-value">{row.weight}</p>
                </div>
                <div>
                  <p className="tx-detail-label">Cadastrado em</p>
                  <p className="tx-detail-value">{row.createdAt}</p>
                </div>
                <div>
                  <p className="tx-detail-label">Vendas</p>
                  <p className="tx-detail-value">{row.sales} unidades</p>
                </div>
              </div>
            </div>
          )}
          empty={
            <div className="tx-table-empty">
              <span className="mdi mdi-package-variant tx-table-empty-icon" />
              Nenhum produto encontrado
            </div>
          }
        />
      </CardComponent>

      <Modal open={showUserModal} onClose={() => setShowUserModal(false)}>
        <div className="modal-card" style={{ width: 480, maxWidth: '100%' }}>
          <header className="modal-card-head">
            <p className="modal-card-title">{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</p>
            <button className="delete" onClick={() => setShowUserModal(false)} />
          </header>
          <section className="modal-card-body">
            <Field label="Nome" type={!userForm.name ? 'is-danger' : ''} message={!userForm.name ? 'Nome obrigatório' : ''}>
              <Input value={userForm.name} onChange={(v) => setUserForm({ ...userForm, name: v })} placeholder="Nome completo" icon="account" />
            </Field>
            <Field label="E-mail" type={!userForm.email ? 'is-danger' : ''} message={!userForm.email ? 'E-mail obrigatório' : ''}>
              <Input value={userForm.email} onChange={(v) => setUserForm({ ...userForm, email: v })} type="email" placeholder="email@exemplo.com" icon="email" />
            </Field>
            <Field label="Telefone">
              <Input value={userForm.phone} onChange={(v) => setUserForm({ ...userForm, phone: v })} placeholder="(11) 99999-9999" icon="phone" />
            </Field>
            <Field label="Perfil">
              <Select value={userForm.role} onChange={(v) => setUserForm({ ...userForm, role: v as string })} icon="account-cog">
                <option value="Administrador">Administrador</option>
                <option value="Gerente">Gerente</option>
                <option value="Operador">Operador</option>
                <option value="Visualizador">Visualizador</option>
              </Select>
            </Field>
            <Field label="Status">
              <Switch checked={userForm.active} onChange={(v) => setUserForm({ ...userForm, active: v })} type="is-success">
                {userForm.active ? 'Ativo' : 'Inativo'}
              </Switch>
            </Field>
          </section>
          <footer className="modal-card-foot tx-modal-foot">
            <Button onClick={() => setShowUserModal(false)}>Cancelar</Button>
            <Button type="is-primary" iconLeft="content-save" onClick={saveUser}>Salvar</Button>
          </footer>
        </div>
      </Modal>

      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="modal-card" style={{ width: 400, maxWidth: '100%' }}>
          <header className="modal-card-head">
            <p className="modal-card-title">Confirmar exclusão</p>
          </header>
          <section className="modal-card-body">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span className="mdi mdi-alert-circle" style={{ fontSize: '2rem', color: 'var(--tx-danger)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--tx-text-heading)' }}>
                  Excluir "{deletingUser?.name}"?
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--tx-text-muted)', marginTop: '0.5rem' }}>
                  Esta ação não pode ser desfeita. O usuário será removido permanentemente.
                </p>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot tx-modal-foot">
            <Button onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
            <Button type="is-danger" iconLeft="delete" onClick={confirmDelete}>Excluir</Button>
          </footer>
        </div>
      </Modal>
    </div>
  )
}
