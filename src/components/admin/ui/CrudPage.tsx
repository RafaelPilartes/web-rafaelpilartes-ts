import { useState, useEffect, ReactNode } from 'react'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageUploader } from '@/components/admin/ui/ImageUploader'

interface Field<T> {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'color' | 'date' | 'url' | 'select' | 'image'
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
  onPageSizeChange?: (s: number) => void
  onSearchChange: (s: string) => void
  onCreate: (data: Record<string, any>) => Promise<any>
  onUpdate: (id: string, data: Record<string, any>) => Promise<any>
  onDelete: (id: string) => Promise<any>
  isCreating?: boolean
  isDeleting?: boolean
}

export function CrudPage<T extends { id: string }>({
  title, subtitle, fields, columns, data, total, page, pageSize, loading,
  searchTerm, onPageChange, onPageSizeChange, onSearchChange, onCreate, onUpdate, onDelete,
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

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showForm) resetForm()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showForm])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showForm])

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

      {/* Modal for Create/Edit */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="dash-modal-overlay"
              onClick={resetForm}
              style={{ zIndex: 60 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 flex items-center justify-center p-4"
              style={{ zIndex: 61 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="dash-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="dash-modal-header">
                  <h2>{editingId ? `Edit ${title.replace(/s$/, '')}` : `Create ${title.replace(/s$/, '')}`}</h2>
                  <button onClick={resetForm} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm">
                    <X size={16} />
                  </button>
                </div>

                {/* Body */}
                <div className="dash-modal-body">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {fields.map(field => (
                      <div key={field.key} className={`dash-form-group ${field.type === 'textarea' || field.type === 'image' ? 'md:col-span-2' : ''}`}>
                        <label className="dash-label">{field.label}</label>

                        {field.type === 'image' ? (
                          <ImageUploader
                            value={formData[field.key] ?? ''}
                            onChange={val => updateField(field.key, val)}
                            bucket="images"
                            path={`crud_${field.key}/`}
                          />
                        ) : field.type === 'textarea' ? (
                          <textarea
                            value={formData[field.key] ?? ''}
                            onChange={e => updateField(field.key, e.target.value)}
                            className="dash-textarea"
                            rows={4}
                            placeholder={field.placeholder}
                          />
                        ) : field.type === 'color' ? (
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={formData[field.key] || '#F13024'}
                              onChange={e => updateField(field.key, e.target.value)}
                              className="dash-color-input"
                            />
                            <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
                              {formData[field.key] || '#F13024'}
                            </span>
                          </div>
                        ) : field.type === 'select' ? (
                          <select
                            value={formData[field.key] ?? ''}
                            onChange={e => updateField(field.key, e.target.value)}
                            className="dash-select"
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
                </div>

                {/* Footer */}
                <div className="dash-modal-footer">
                  <button onClick={resetForm} className="dash-btn dash-btn-secondary dash-btn-sm">
                    Cancel
                  </button>
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
          </>
        )}
      </AnimatePresence>

      <DataTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
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
