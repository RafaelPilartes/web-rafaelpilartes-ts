import { ReactNode } from 'react'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Inbox } from 'lucide-react'

export interface Column<T> {
  key: string
  label: string
  render?: (item: T) => ReactNode
  sortable?: boolean
  width?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  total?: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  searchTerm?: string
  onSearchChange?: (term: string) => void
  loading?: boolean
  actions?: (item: T) => ReactNode
  onRowClick?: (item: T) => void
  emptyMessage?: string
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  total = 0,
  page,
  pageSize,
  onPageChange,
  searchTerm,
  onSearchChange,
  loading = false,
  actions,
  onRowClick,
  emptyMessage = 'Nenhum registo encontrado'
}: DataTableProps<T>) {
  const totalPages = Math.ceil(total / pageSize) || 1
  const canPrev = page > 0
  const canNext = page < totalPages - 1

  return (
    <div className="dash-card overflow-hidden">
      {/* Search */}
      {onSearchChange && (
        <div className="p-4" style={{ borderBottom: '1px solid var(--dash-border)' }}>
          <div className="relative max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--dash-text-faint)' }}
            />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="dash-input pl-10"
              style={{ fontSize: '13px', padding: '8px 14px 8px 36px' }}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="dash-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
              {actions && <th style={{ width: '100px' }}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {columns.map(col => (
                    <td key={col.key}>
                      <div className="dash-skeleton h-4 w-3/4" />
                    </td>
                  ))}
                  {actions && (
                    <td>
                      <div className="dash-skeleton h-4 w-16" />
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)}>
                  <div className="dash-empty py-12">
                    <Inbox size={40} />
                    <p className="text-sm mt-2">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map(item => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(item)
                        : String((item as any)[col.key] ?? '-')}
                    </td>
                  ))}
                  {actions && (
                    <td onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        {actions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderTop: '1px solid var(--dash-border)' }}
      >
        <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>
          {total > 0
            ? `${page * pageSize + 1}–${Math.min((page + 1) * pageSize, total)} de ${total}`
            : '0 registos'}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(0)}
            disabled={!canPrev}
            className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
          >
            <ChevronsLeft size={14} />
          </button>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={!canPrev}
            className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
          >
            <ChevronLeft size={14} />
          </button>
          <span
            className="px-3 text-xs font-medium"
            style={{ color: 'var(--dash-text)' }}
          >
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!canNext}
            className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
          >
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => onPageChange(totalPages - 1)}
            disabled={!canNext}
            className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
