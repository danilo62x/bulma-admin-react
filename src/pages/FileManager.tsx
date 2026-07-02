import { useState } from 'react'
import { useUiStore } from '@/stores/ui'
import Button from '@/components/ui/Button'
import Dropdown, { DropdownItem } from '@/components/ui/Dropdown'
import Progress from '@/components/ui/Progress'
import FileDropzone from '@/components/ui/FileDropzone'
import Modal from '@/components/ui/Modal'

interface FolderItem {
  id: string
  name: string
  items: number
  modified: string
}

type FileKind = 'document' | 'image' | 'archive' | 'sheet'

interface FileItem {
  id: string
  name: string
  kind: FileKind
  size: string
  modified: string
}

const FOLDERS: FolderItem[] = [
  { id: 'f1', name: 'Documentos', items: 24, modified: '24/05/2026' },
  { id: 'f2', name: 'Imagens', items: 132, modified: '22/05/2026' },
  { id: 'f3', name: 'Projetos', items: 9, modified: '20/05/2026' },
  { id: 'f4', name: 'Backups', items: 5, modified: '12/05/2026' },
]

const FILES: FileItem[] = [
  { id: 'a1', name: 'Proposta-comercial.pdf', kind: 'document', size: '2,4 MB', modified: 'Hoje, 09:42' },
  { id: 'a2', name: 'Relatorio-maio.xlsx', kind: 'sheet', size: '845 KB', modified: 'Ontem, 18:11' },
  { id: 'a3', name: 'Banner-home.png', kind: 'image', size: '1,1 MB', modified: 'Ontem, 14:25' },
  { id: 'a4', name: 'Apresentacao.pdf', kind: 'document', size: '5,8 MB', modified: '23/05/2026' },
  { id: 'a5', name: 'Logo-vetor.svg', kind: 'image', size: '64 KB', modified: '22/05/2026' },
  { id: 'a6', name: 'Codigo-fonte.zip', kind: 'archive', size: '18,2 MB', modified: '20/05/2026' },
]

const KIND_STYLE: Record<FileKind, { icon: string; color: string }> = {
  document: { icon: 'mdi-file-document', color: '#485fc7' },
  image: { icon: 'mdi-image', color: '#48c774' },
  archive: { icon: 'mdi-folder-zip', color: '#f59e0b' },
  sheet: { icon: 'mdi-file-table', color: '#3273dc' },
}

const MENU_ACTIONS: { label: string; icon: string; danger?: boolean }[] = [
  { label: 'Abrir', icon: 'mdi-eye' },
  { label: 'Renomear', icon: 'mdi-pencil' },
  { label: 'Baixar', icon: 'mdi-download' },
  { label: 'Excluir', icon: 'mdi-delete', danger: true },
]

export default function FileManager() {
  const ui = useUiStore()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])

  const usedGb = 64.5
  const totalGb = 100
  const usedPct = Math.round((usedGb / totalGb) * 100)

  function onAction(label: string) {
    ui.notifySuccess(`${label} executado`)
  }

  function finishUpload() {
    setUploadOpen(false)
    const count = pendingFiles.length
    setPendingFiles([])
    ui.notifySuccess(
      count > 0
        ? `${count} arquivo${count > 1 ? 's' : ''} enviado${count > 1 ? 's' : ''} com sucesso`
        : 'Arquivos enviados com sucesso'
    )
  }

  const actionsMenu = (
    <>
      {MENU_ACTIONS.map((a) => (
        <DropdownItem key={a.label} className={a.danger ? 'has-text-danger' : ''} onClick={() => onAction(a.label)}>
          <span className={`mdi ${a.icon}`} style={{ marginRight: '0.4rem' }} />
          {a.label}
        </DropdownItem>
      ))}
    </>
  )

  return (
    <div>
      <div className="tx-fm-toolbar">
        <nav className="breadcrumb is-small" aria-label="breadcrumbs" style={{ marginBottom: 0 }}>
          <ul>
            <li>
              <a>Início</a>
            </li>
            <li className="is-active">
              <a aria-current="page">Meus arquivos</a>
            </li>
          </ul>
        </nav>
        <div className="tx-fm-actions">
          <div className="buttons has-addons" style={{ marginBottom: 0 }}>
            <Button
              size="is-small"
              type={view === 'grid' ? 'is-primary' : 'is-light'}
              iconLeft="view-grid"
              aria-label="Visualização em grade"
              onClick={() => setView('grid')}
            />
            <Button
              size="is-small"
              type={view === 'list' ? 'is-primary' : 'is-light'}
              iconLeft="view-list"
              aria-label="Visualização em lista"
              onClick={() => setView('list')}
            />
          </div>
          <Button type="is-primary" iconLeft="plus" onClick={() => setUploadOpen(true)}>
            Enviar arquivo
          </Button>
        </div>
      </div>

      <div className="box tx-storage">
        <div className="tx-storage-head">
          <div className="tx-storage-info">
            <span className="tx-storage-icon">
              <span className="mdi mdi-database" />
            </span>
            <div>
              <p className="has-text-weight-semibold" style={{ color: 'var(--tx-text-heading)' }}>
                Armazenamento
              </p>
              <p className="is-size-7 has-text-grey">
                {usedGb} GB de {totalGb} GB utilizados
              </p>
            </div>
          </div>
          <span className="has-text-weight-semibold" style={{ color: 'var(--tx-text-heading)' }}>
            {usedPct}%
          </span>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Progress value={usedPct} type={usedPct > 80 ? 'is-danger' : 'is-primary'} />
        </div>
      </div>

      <h2 className="tx-fm-section-title">Pastas</h2>
      <div className="columns is-multiline">
        {FOLDERS.map((f) => (
          <div key={f.id} className="column is-3-desktop is-6-tablet">
            <div className="box tx-folder-card">
              <span className="tx-folder-icon">
                <span className="mdi mdi-folder" />
              </span>
              <div className="tx-folder-meta">
                <p className="has-text-weight-medium tx-truncate" style={{ color: 'var(--tx-text-heading)' }}>
                  {f.name}
                </p>
                <p className="is-size-7 has-text-grey">
                  {f.items} itens · {f.modified}
                </p>
              </div>
              <Dropdown
                align="right"
                trigger={() => <Button size="is-small" type="is-light" iconLeft="dots-vertical" aria-label="Opções" />}
              >
                {actionsMenu}
              </Dropdown>
            </div>
          </div>
        ))}
      </div>

      <h2 className="tx-fm-section-title">Arquivos</h2>

      {view === 'grid' ? (
        <div className="columns is-multiline">
          {FILES.map((file) => (
            <div key={file.id} className="column is-3-desktop is-4-tablet is-6-mobile">
              <div className="box tx-file-card">
                <div className="tx-file-card-head">
                  <span className="tx-file-icon" style={{ ['--icon-color' as any]: KIND_STYLE[file.kind].color }}>
                    <span className={`mdi ${KIND_STYLE[file.kind].icon}`} />
                  </span>
                  <Dropdown
                    align="right"
                    trigger={() => <Button size="is-small" type="is-light" iconLeft="dots-vertical" aria-label="Opções" />}
                  >
                    {actionsMenu}
                  </Dropdown>
                </div>
                <div>
                  <p className="has-text-weight-medium tx-truncate" style={{ color: 'var(--tx-text-heading)' }}>
                    {file.name}
                  </p>
                  <p className="is-size-7 has-text-grey" style={{ marginTop: '0.15rem' }}>
                    {file.size} · {file.modified}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="box" style={{ padding: 0 }}>
          <table className="table is-fullwidth is-hoverable tx-file-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tamanho</th>
                <th>Modificado</th>
                <th className="has-text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {FILES.map((file) => (
                <tr key={file.id}>
                  <td>
                    <div className="tx-file-row-name">
                      <span className="tx-file-icon is-small" style={{ ['--icon-color' as any]: KIND_STYLE[file.kind].color }}>
                        <span className={`mdi ${KIND_STYLE[file.kind].icon}`} />
                      </span>
                      <span className="has-text-weight-medium" style={{ color: 'var(--tx-text-heading)' }}>
                        {file.name}
                      </span>
                    </div>
                  </td>
                  <td className="has-text-grey">{file.size}</td>
                  <td className="has-text-grey">{file.modified}</td>
                  <td className="has-text-right">
                    <Dropdown
                      align="right"
                      trigger={() => <Button size="is-small" type="is-light" iconLeft="dots-vertical" aria-label="Opções" />}
                    >
                      {actionsMenu}
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)}>
        <div className="modal-card" style={{ width: 560, maxWidth: '100%' }}>
          <header className="modal-card-head">
            <div>
              <p className="modal-card-title">Enviar arquivos</p>
              <p className="is-size-7 has-text-grey">Arraste e solte ou selecione do seu dispositivo</p>
            </div>
            <button className="delete" onClick={() => setUploadOpen(false)} />
          </header>
          <section className="modal-card-body">
            <FileDropzone maxFiles={8} onFiles={setPendingFiles} />
          </section>
          <footer className="modal-card-foot tx-modal-foot" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => setUploadOpen(false)}>Cancelar</Button>
            <Button type="is-primary" iconLeft="check" onClick={finishUpload}>
              Concluir
            </Button>
          </footer>
        </div>
      </Modal>
    </div>
  )
}
