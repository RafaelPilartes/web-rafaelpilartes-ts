import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBlogPostViewModel } from '@/viewModels/blog-post.viewmodel'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { BlogPostEntity } from '@/core/entities/content/BlogPostEntity'
import { Plus, Pencil, Trash2 } from 'lucide-react'

const PAGE_SIZE = 10

export default function BlogPostsPage() {
  const navigate = useNavigate()
  const { getAllPosts, deletePost, isDeleting } = useBlogPostViewModel()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const { data, isLoading } = getAllPosts(pageSize, page * pageSize, search || undefined)

  const columns: Column<BlogPostEntity>[] = [
    {
      key: 'title',
      label: 'Title',
      render: item => (
        <div className="flex items-center gap-3">
          {item.cover_image && (
            <img src={item.cover_image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
          )}
          <div>
            <p className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>{item.title}</p>
            <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>{item.slug}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      width: '140px',
      render: item => (
        <span className="dash-badge dash-badge-accent">
          {item.category?.name ?? 'N/A'}
        </span>
      )
    },
    {
      key: 'published_at',
      label: 'Published',
      width: '130px',
      render: item => (
        <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          {item.published_at
            ? new Date(item.published_at).toLocaleDateString('pt-PT')
            : <span className="dash-badge dash-badge-warning">Draft</span>}
        </span>
      )
    }
  ]

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deletePost(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--dash-text)' }}>Blog Posts</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--dash-text-muted)' }}>
            Manage your blog content
          </p>
        </div>
        <Link to="/admin/blog/new" className="dash-btn dash-btn-primary dash-btn-sm">
          <Plus size={16} /> New Post
        </Link>
      </div>

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
        onRowClick={item => navigate(`/admin/blog/${item.id}/edit`)}
        actions={item => (
          <>
            <button
              onClick={() => navigate(`/admin/blog/${item.id}/edit`)}
              className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
              title="Editar"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => setDeleteTarget(item.id)}
              className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
              title="Apagar"
              style={{ color: 'var(--dash-danger)' }}
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Apagar Post"
        message="Tens a certeza que queres apagar este post? Esta ação é irreversível."
        confirmLabel="Apagar"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={isDeleting}
      />
    </div>
  )
}
