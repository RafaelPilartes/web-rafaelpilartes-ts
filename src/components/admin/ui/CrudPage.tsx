import { useState, useEffect, useRef, useCallback, memo, ReactNode } from 'react'
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

// ---------------------------------------------------------------------------
// CrudModal — isolated component so its formData state never re-renders the
// parent DataTable (which can contain heavy SVG content via dangerouslySetInnerHTML)
// ---------------------------------------------------------------------------
interface CrudModalProps<T> {
  open: boolean
  editingId: string | null
  initialData: Record<string, any>
  fields: Field<T>[]
  title: string
  isCreating?: boolean
  onClose: () => void
  onSubmit: (data: Record<string, any>) => Promise<void>
}

function CrudModalInner<T>({
  open, editingId, initialData, fields, title, isCreating, onClose, onSubmit,
}: CrudModalProps<T>) {
  // Ref tracks all field values — zero re-renders on keystroke for text/textarea/select/date
  const valuesRef = useRef<Record<string, any>>({})

  // Only color + image need controlled state (live visual feedback)
  const [richValues, setRichValues] = useState<Record<string, any>>({})

  // Sync values when the modal opens or switches to a different item
  useEffect(() => {
    if (!open) return
    valuesRef.current = { ...initialData }
    const rich: Record<string, any> = {}
    fields.forEach(f => {
      if (f.type === 'color' || f.type === 'image') {
        rich[f.key] = initialData[f.key] ?? (f.type === 'color' ? '#F13024' : '')
      }
    })
    setRichValues(rich)
  }, [open, editingId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose() }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleSubmit = async () => {
    // Merge uncontrolled ref values with controlled rich values
    await onSubmit({ ...valuesRef.current, ...richValues })
  }

  const entityName = title.replace(/s$/, '')

  // Unique key per session — forces remount of uncontrolled inputs when switching items
  const sessionKey = editingId ?? 'new'

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dash-modal-overlay"
            onClick={onClose}
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
                <h2>{editingId ? `Edit ${entityName}` : `Create ${entityName}`}</h2>
                <button onClick={onClose} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm">
                  <X size={16} />
                </button>
              </div>

              {/* Body — key forces remount of all uncontrolled inputs on session change */}
              <div className="dash-modal-body">
                <div key={sessionKey} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {fields.map(field => (
                    <div
                      key={field.key}
                      className={`dash-form-group ${field.type === 'textarea' || field.type === 'image' ? 'md:col-span-2' : ''}`}
                    >
                      <label className="dash-label">{field.label}</label>

                      {field.type === 'image' ? (
                        // Controlled — needs to display the uploaded URL
                        <ImageUploader
                          value={richValues[field.key] ?? ''}
                          onChange={val => {
                            valuesRef.current[field.key] = val
                            setRichValues(prev => ({ ...prev, [field.key]: val }))
                          }}
                          bucket="images"
                          path={`crud_${field.key}/`}
                        />
                      ) : field.type === 'textarea' ? (
                        // Uncontrolled — no re-render on keystroke, cursor position preserved
                        <textarea
                          defaultValue={initialData[field.key] ?? ''}
                          onChange={e => { valuesRef.current[field.key] = e.target.value }}
                          className="dash-textarea"
                          rows={4}
                          placeholder={field.placeholder}
                        />
                      ) : field.type === 'color' ? (
                        // Controlled — color picker must reflect current hex value
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={richValues[field.key] ?? '#F13024'}
                            onChange={e => {
                              valuesRef.current[field.key] = e.target.value
                              setRichValues(prev => ({ ...prev, [field.key]: e.target.value }))
                            }}
                            className="dash-color-input"
                          />
                          <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
                            {richValues[field.key] ?? '#F13024'}
                          </span>
                        </div>
                      ) : field.type === 'select' ? (
                        // Uncontrolled — defaultValue sets initial selection
                        <select
                          defaultValue={initialData[field.key] ?? ''}
                          onChange={e => { valuesRef.current[field.key] = e.target.value }}
                          className="dash-select"
                        >
                          <option value="">Select...</option>
                          {field.options?.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      ) : (
                        // Uncontrolled — no re-render on keystroke
                        <input
                          type={field.type || 'text'}
                          defaultValue={initialData[field.key] ?? ''}
                          onChange={e => { valuesRef.current[field.key] = e.target.value }}
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
                <button onClick={onClose} className="dash-btn dash-btn-secondary dash-btn-sm">
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
  )
}

// Generic components can't use memo() directly with proper TypeScript generics,
// so we cast it — this is safe because the props shape is fully typed above.
const CrudModal = memo(CrudModalInner) as typeof CrudModalInner

// ---------------------------------------------------------------------------
// CrudPage — only holds visibility state; formData lives inside CrudModal
// ---------------------------------------------------------------------------
export function CrudPage<T extends { id: string }>({
  title, subtitle, fields, columns, data, total, page, pageSize, loading,
  searchTerm, onPageChange, onPageSizeChange, onSearchChange, onCreate, onUpdate, onDelete,
  isCreating, isDeleting
}: CrudPageProps<T>) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [initialData, setInitialData] = useState<Record<string, any>>({})
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const resetForm = useCallback(() => {
    setInitialData({})
    setEditingId(null)
    setShowForm(false)
  }, [])

  const startEdit = useCallback((item: T) => {
    const snapshot: Record<string, any> = {}
    fields.forEach(f => { snapshot[f.key] = (item as any)[f.key] ?? '' })
    setInitialData(snapshot)
    setEditingId(item.id)
    setShowForm(true)
  }, [fields])

  const handleSubmit = useCallback(async (formData: Record<string, any>) => {
    if (editingId) {
      await onUpdate(editingId, formData)
    } else {
      await onCreate(formData)
    }
    resetForm()
  }, [editingId, onUpdate, onCreate, resetForm])

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

      <CrudModal
        open={showForm}
        editingId={editingId}
        initialData={initialData}
        fields={fields}
        title={title}
        isCreating={isCreating}
        onClose={resetForm}
        onSubmit={handleSubmit}
      />

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
