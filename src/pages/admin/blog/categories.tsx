import { useState } from 'react'
import { useBlogCategoryViewModel } from '@/viewModels/blog-category.viewmodel'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { BlogCategoryEntity } from '@/core/entities/content/BlogCategoryEntity'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'

export default function BlogCategoriesPage() {
  const { getAllCategories, createCategory, updateCategory, deleteCategory, isCreating, isDeleting } = useBlogCategoryViewModel()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ name: '', slug: '', color: '', description: '' })
  const [showNew, setShowNew] = useState(false)
  const [newData, setNewData] = useState({ name: '', slug: '', color: '#F13024', description: '' })

  const { data, isLoading } = getAllCategories(pageSize, page * pageSize, search || undefined)

  const columns: Column<BlogCategoryEntity>[] = [
    {
      key: 'name', label: 'Name', render: item =>
        editingId === item.id ? (
          <input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className="dash-input dash-btn-sm" style={{ padding: '4px 8px', fontSize: '13px' }} />
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: item.color || 'var(--dash-accent)' }} />
            <span className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>{item.name}</span>
          </div>
        )
    },
    {
      key: 'slug', label: 'Slug', width: '160px', render: item =>
        editingId === item.id ? (
          <input value={editData.slug} onChange={e => setEditData({ ...editData, slug: e.target.value })} className="dash-input dash-btn-sm" style={{ padding: '4px 8px', fontSize: '13px' }} />
        ) : (
          <code className="text-xs px-2 py-1 rounded" style={{ background: 'var(--dash-surface-hover)', color: 'var(--dash-text-muted)' }}>{item.slug}</code>
        )
    },
    {
      key: 'color', label: 'Color', width: '100px', render: item =>
        editingId === item.id ? (
          <input type="color" value={editData.color} onChange={e => setEditData({ ...editData, color: e.target.value })} className="w-8 h-8 rounded cursor-pointer" />
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md border" style={{ background: item.color || '#F13024', borderColor: 'var(--dash-border)' }} />
          </div>
        )
    }
  ]

  const startEdit = (item: BlogCategoryEntity) => {
    setEditingId(item.id)
    setEditData({ name: item.name, slug: item.slug, color: item.color || '', description: item.description || '' })
  }

  const saveEdit = async () => {
    if (!editingId) return
    await updateCategory({ id: editingId, data: editData })
    setEditingId(null)
  }

  const handleCreate = async () => {
    await createCategory(newData as any)
    setShowNew(false)
    setNewData({ name: '', slug: '', color: '#F13024', description: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--dash-text)' }}>Blog Categories</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--dash-text-muted)' }}>Manage blog categories</p>
        </div>
        <button onClick={() => setShowNew(true)} className="dash-btn dash-btn-primary dash-btn-sm">
          <Plus size={16} /> New Category
        </button>
      </div>

      {showNew && (
        <div className="dash-card p-4 dash-animate-in">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--dash-text-muted)' }}>Name</label>
              <input value={newData.name} onChange={e => {
                setNewData({ ...newData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })
              }} className="dash-input" placeholder="Category name" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--dash-text-muted)' }}>Slug</label>
              <input value={newData.slug} onChange={e => setNewData({ ...newData, slug: e.target.value })} className="dash-input" placeholder="category-slug" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--dash-text-muted)' }}>Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={newData.color} onChange={e => setNewData({ ...newData, color: e.target.value })} className="w-9 h-9 rounded cursor-pointer" />
                <span className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>{newData.color}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCreate} disabled={isCreating || !newData.name} className="dash-btn dash-btn-primary dash-btn-sm flex-1">
                <Check size={14} /> Create
              </button>
              <button onClick={() => setShowNew(false)} className="dash-btn dash-btn-secondary dash-btn-sm">
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        total={data?.pagination?.total ?? 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        searchTerm={search}
        onSearchChange={setSearch}
        loading={isLoading}
        actions={item =>
          editingId === item.id ? (
            <>
              <button onClick={saveEdit} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm" style={{ color: 'var(--dash-success)' }}><Check size={14} /></button>
              <button onClick={() => setEditingId(null)} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"><X size={14} /></button>
            </>
          ) : (
            <>
              <button onClick={() => startEdit(item)} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"><Pencil size={14} /></button>
              <button onClick={() => setDeleteTarget(item.id)} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm" style={{ color: 'var(--dash-danger)' }}><Trash2 size={14} /></button>
            </>
          )
        }
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Apagar Categoria"
        message="Apagar esta categoria pode afetar posts associados."
        confirmLabel="Apagar"
        onConfirm={async () => { if (deleteTarget) { await deleteCategory(deleteTarget); setDeleteTarget(null) } }}
        onCancel={() => setDeleteTarget(null)}
        loading={isDeleting}
      />
    </div>
  )
}
