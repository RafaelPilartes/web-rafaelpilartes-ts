import { useState, ReactNode } from 'react'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Field<T> {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'color' | 'date' | 'url' | 'select'
  placeholder?: string
  options?: { label: string; value: string }[]
  render?: (item: T) => ReactNode
}

interface CrudPageProps<T extends { id: string }> {
  title: string
  subtitle: string
  fields: Field<T>[]
  columns: Column<T>[]
  data: T[]
  total: number
  page: number
  pageSize: number
  loading: boolean
  searchTerm: string
  onPageChange: (p: number) => void
  onSearchChange: (s: string) => void
  onCreate: (data: Record<string, any>) => Promise<any>
  onUpdate: (id: string, data: Record<string, any>) => Promise<any>
  onDelete: (id: string) => Promise<any>
  isCreating?: boolean
  isDeleting?: boolean
}

export function CrudPage<T extends { id: string }>({
  title, subtitle, fields, columns, data, total, page, pageSize, loading,
  searchTerm, onPageChange, onSearchChange, onCreate, onUpdate, onDelete,
  isCreating, isDeleting
}: CrudPageProps<T>) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const resetForm = () => {
    setFormData({})
    setEditingId(null)
    setShowForm(false)
  }

  const startEdit = (item: T) => {
    const data: Record<string, any> = {}
    fields.forEach(f => { data[f.key] = (item as any)[f.key] ?? '' })
    setFormData(data)
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (editingId) {
      await onUpdate(editingId, formData)
    } else {
      await onCreate(formData)
    }
    resetForm()
  }

  const updateField = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--dash-text)' }}>{title}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--dash-text-muted)' }}>{subtitle}</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="dash-btn dash-btn-primary dash-btn-sm"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="dash-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold" style={{ color: 'var(--dash-text)' }}>
                  {editingId ? 'Edit' : 'Create New'}
                </h2>
                <button onClick={resetForm} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm">
                  <X size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map(field => (
                  <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--dash-text-muted)' }}>
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.key] ?? ''}
                        onChange={e => updateField(field.key, e.target.value)}
                        className="dash-input"
                        rows={3}
                        placeholder={field.placeholder}
                        style={{ resize: 'vertical' }}
                      />
                    ) : field.type === 'color' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formData[field.key] || '#F13024'}
                          onChange={e => updateField(field.key, e.target.value)}
                          className="w-9 h-9 rounded cursor-pointer"
                        />
                        <span className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>
                          {formData[field.key] || '#F13024'}
                        </span>
                      </div>
                    ) : field.type === 'select' ? (
                      <select
                        value={formData[field.key] ?? ''}
                        onChange={e => updateField(field.key, e.target.value)}
                        className="dash-input"
                      >
                        <option value="">Select...</option>
                        {field.options?.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || 'text'}
                        value={formData[field.key] ?? ''}
                        onChange={e => updateField(field.key, e.target.value)}
                        className="dash-input"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={resetForm} className="dash-btn dash-btn-secondary dash-btn-sm">Cancel</button>
                <button
                  onClick={handleSubmit}
                  disabled={isCreating}
                  className="dash-btn dash-btn-primary dash-btn-sm"
                >
                  {isCreating ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DataTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        loading={loading}
        actions={item => (
          <>
            <button onClick={() => startEdit(item)} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm" title="Editar">
              <Pencil size={14} />
            </button>
            <button onClick={() => setDeleteTarget(item.id)} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm" title="Apagar" style={{ color: 'var(--dash-danger)' }}>
              <Trash2 size={14} />
            </button>
          </>
        )}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete ${title.replace(/s$/, '')}`}
        message="This action cannot be undone. Are you sure?"
        confirmLabel="Delete"
        onConfirm={async () => { if (deleteTarget) { await onDelete(deleteTarget); setDeleteTarget(null) } }}
        onCancel={() => setDeleteTarget(null)}
        loading={isDeleting}
      />
    </div>
  )
}
