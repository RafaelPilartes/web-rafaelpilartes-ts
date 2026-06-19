import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProjectViewModel } from '@/viewModels/project.viewmodel'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'

const PAGE_SIZE = 10

export default function ProjectsPage() {
  const navigate = useNavigate()
  const { getAllProjects, deleteProject, isDeleting } = useProjectViewModel()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const { data, isLoading } = getAllProjects(
    pageSize,
    page * pageSize,
    search || undefined
  )

  const columns: Column<ProjectEntity>[] = [
    {
      key: 'title',
      label: 'Project',
      render: item => (
        <div className="flex items-center gap-3">
          {item.thumbnail?.url && (
            <img
              src={item.thumbnail.url}
              alt=""
              className="w-10 h-10 rounded-lg object-cover shrink-0"
            />
          )}
          <div>
            <p className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>
              {item.title}
            </p>
            <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>
              {item.short_description?.slice(0, 60)}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      width: '110px',
      render: item => (
        <span className="dash-badge dash-badge-info">{item.category || '—'}</span>
      )
    },
    {
      key: 'technologies',
      label: 'Tech',
      width: '90px',
      render: item => (
        <span className="dash-badge dash-badge-neutral">
          {item.technologies?.length ?? 0}
        </span>
      )
    },
    {
      key: 'sections',
      label: 'Sections',
      width: '90px',
      render: item => (
        <span className="dash-badge dash-badge-neutral">
          {item.sections?.length ?? 0}
        </span>
      )
    },
    {
      key: 'live_project_url',
      label: 'Links',
      width: '70px',
      render: item =>
        item.live_project_url ? (
          <a
            href={item.live_project_url}
            target="_blank"
            rel="noopener"
            onClick={e => e.stopPropagation()}
            className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
          >
            <ExternalLink size={14} />
          </a>
        ) : (
          <span style={{ color: 'var(--dash-text-faint)' }}>—</span>
        )
    }
  ]

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteProject(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Projects</h1>
          <p className="dash-page-subtitle">Manage portfolio projects</p>
        </div>
        <Link to="/admin/projects/new" className="dash-btn dash-btn-primary dash-btn-sm">
          <Plus size={16} /> New Project
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
        onRowClick={item => navigate(`/admin/projects/${item.id}/edit`)}
        actions={item => (
          <>
            <button
              onClick={() => navigate(`/admin/projects/${item.id}/edit`)}
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
        title="Apagar Projeto"
        message="Tens a certeza? Esta ação apaga o projeto e as suas secções/relações de tecnologias."
        confirmLabel="Apagar"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={isDeleting}
      />
    </div>
  )
}
