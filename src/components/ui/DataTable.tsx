import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

interface Props<T> {
  columns: ColumnDef<T, any>[]
  data: T[]
  pageSize?: number
  searchable?: boolean
}

/**
 * Generic data table built on TanStack Table v8 — sorting, global filter and
 * client-side pagination, styled with Bulma's `.table`.
 */
export default function DataTable<T>({ columns, data, pageSize = 10, searchable = true }: Props<T>) {
  const { t } = useTranslation()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })

  return (
    <div className="tx-datatable">
      {searchable && (
        <div className="field" style={{ maxWidth: 320, marginBottom: '1rem' }}>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={t('common.search')}
            />
            <span className="icon is-left">
              <i className="mdi mdi-magnify" />
            </span>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="table is-fullwidth is-hoverable">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={header.column.getCanSort() ? { cursor: 'pointer', userSelect: 'none' } : undefined}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' && <span className="mdi mdi-arrow-up" />}
                    {header.column.getIsSorted() === 'desc' && <span className="mdi mdi-arrow-down" />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="has-text-centered has-text-grey" style={{ padding: '2.5rem' }}>
                  {t('common.noResults')}
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="level is-mobile" style={{ marginTop: '1rem' }}>
        <div className="level-left">
          <span className="is-size-7 has-text-grey">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            {'–'}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            / {table.getFilteredRowModel().rows.length}
          </span>
        </div>
        <div className="level-right">
          <div className="buttons has-addons">
            <button
              className="button is-small"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              {t('common.previous')}
            </button>
            <button
              className="button is-small"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              {t('common.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
