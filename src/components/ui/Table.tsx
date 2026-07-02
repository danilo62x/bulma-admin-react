import { Fragment, useState, useMemo, type ReactNode } from 'react'

export interface TableColumn<T> {
  field?: string
  label: string
  width?: number | string
  sortable?: boolean
  centered?: boolean
  numeric?: boolean
  render?: (row: T) => ReactNode
}

interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  striped?: boolean
  hoverable?: boolean
  loading?: boolean
  paginated?: boolean
  perPage?: number
  checkable?: boolean
  checkedRows?: T[]
  onCheck?: (rows: T[]) => void
  detailed?: boolean
  detailKey?: keyof T
  renderDetail?: (row: T) => ReactNode
  rowKey: keyof T
  defaultSort?: string
  defaultSortDirection?: 'asc' | 'desc'
  empty?: ReactNode
}

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  striped = false,
  hoverable = false,
  loading = false,
  paginated = false,
  perPage = 10,
  checkable = false,
  checkedRows = [],
  onCheck,
  detailed = false,
  detailKey,
  renderDetail,
  rowKey,
  defaultSort,
  defaultSortDirection = 'asc',
  empty,
}: TableProps<T>) {
  const [sortField, setSortField] = useState<string | undefined>(defaultSort)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSortDirection)
  const [page, setPage] = useState(1)
  const [expanded, setExpanded] = useState<Set<any>>(new Set())

  const sortedData = useMemo(() => {
    if (!sortField) return data
    const sorted = [...data].sort((a, b) => {
      const av = a[sortField]
      const bv = b[sortField]
      if (av == null) return 1
      if (bv == null) return -1
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))
    })
    return sorted
  }, [data, sortField, sortDir])

  const totalPages = paginated ? Math.max(1, Math.ceil(sortedData.length / perPage)) : 1
  const currentPage = Math.min(page, totalPages)
  const pagedData = paginated
    ? sortedData.slice((currentPage - 1) * perPage, currentPage * perPage)
    : sortedData

  function handleSort(col: TableColumn<T>) {
    if (!col.sortable || !col.field) return
    if (sortField === col.field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(col.field)
      setSortDir('asc')
    }
  }

  function toggleDetail(row: T) {
    const key = detailKey ? row[detailKey] : row[rowKey]
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function isChecked(row: T) {
    return checkedRows.some((r) => r[rowKey] === row[rowKey])
  }

  function toggleRow(row: T) {
    if (!onCheck) return
    if (isChecked(row)) {
      onCheck(checkedRows.filter((r) => r[rowKey] !== row[rowKey]))
    } else {
      onCheck([...checkedRows, row])
    }
  }

  function toggleAll() {
    if (!onCheck) return
    const allOnPage = pagedData.every((r) => isChecked(r))
    if (allOnPage) {
      onCheck(checkedRows.filter((r) => !pagedData.some((p) => p[rowKey] === r[rowKey])))
    } else {
      const news = pagedData.filter((r) => !isChecked(r))
      onCheck([...checkedRows, ...news])
    }
  }

  return (
    <div>
      <div className="tx-table-wrap">
        <table
          className={`tx-table ${striped ? 'is-striped' : ''} ${hoverable ? 'is-hoverable' : ''}`}
        >
          <thead>
            <tr>
              {detailed && <th style={{ width: 36 }} />}
              {checkable && (
                <th className="tx-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={pagedData.length > 0 && pagedData.every((r) => isChecked(r))}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => {
                const sorted =
                  col.field && sortField === col.field
                    ? sortDir === 'asc'
                      ? 'is-sorted-asc'
                      : 'is-sorted-desc'
                    : ''
                return (
                  <th
                    key={col.label}
                    style={{
                      width: col.width,
                      textAlign: col.centered ? 'center' : col.numeric ? 'right' : 'left',
                    }}
                    className={`${col.sortable ? 'is-sortable' : ''} ${sorted}`}
                    onClick={() => handleSort(col)}
                  >
                    {col.label}
                    {col.sortable && (
                      <span className="tx-sort-icon mdi">
                        {sorted === 'is-sorted-asc'
                          ? '▲'
                          : sorted === 'is-sorted-desc'
                          ? '▼'
                          : '↕'}
                      </span>
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (checkable ? 1 : 0) + (detailed ? 1 : 0)}>
                  <div className="tx-table-empty">Carregando...</div>
                </td>
              </tr>
            ) : pagedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (checkable ? 1 : 0) + (detailed ? 1 : 0)}>
                  {empty ?? <div className="tx-table-empty">Sem dados</div>}
                </td>
              </tr>
            ) : (
              pagedData.map((row) => {
                const key = row[rowKey]
                const detailKeyValue = detailKey ? row[detailKey] : key
                const showDetail = detailed && expanded.has(detailKeyValue)
                return (
                  <Fragment key={String(key)}>
                    <tr>
                      {detailed && (
                        <td>
                          <button
                            type="button"
                            onClick={() => toggleDetail(row)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: 'var(--tx-text-muted)',
                            }}
                          >
                            <span
                              className={`mdi ${
                                showDetail ? 'mdi-chevron-down' : 'mdi-chevron-right'
                              }`}
                            />
                          </button>
                        </td>
                      )}
                      {checkable && (
                        <td className="tx-checkbox-cell">
                          <input
                            type="checkbox"
                            checked={isChecked(row)}
                            onChange={() => toggleRow(row)}
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col.label}
                          style={{
                            textAlign: col.centered ? 'center' : col.numeric ? 'right' : 'left',
                          }}
                        >
                          {col.render ? col.render(row) : col.field ? row[col.field] : ''}
                        </td>
                      ))}
                    </tr>
                    {showDetail && renderDetail && (
                      <tr className="tx-table-detail-row">
                        <td
                          colSpan={
                            columns.length + (checkable ? 1 : 0) + (detailed ? 1 : 0)
                          }
                        >
                          {renderDetail(row)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {paginated && totalPages > 1 && (
        <div className="tx-pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              className={p === currentPage ? 'is-current' : ''}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
