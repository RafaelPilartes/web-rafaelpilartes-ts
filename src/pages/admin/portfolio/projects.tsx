import { useState } from 'react'
import { useProjectViewModel } from '@/viewModels/project.viewmodel'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { Pencil, Trash2, ExternalLink } from 'lucide-react'

const PAGE_SIZE = 10

export default function ProjectsPage() {
  const { getAllProjects, deleteProject, isDeleting } = useProjectViewModel()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const { data, isLoading } = getAllProjects(PAGE_SIZE, page * PAGE_SIZE, search || undefined)

  const columns: Column<ProjectEntity>[] = [
    { key: 'title', label: 'Project', render: item => (
      <div className="flex items-center gap-3">
        {item.thumbnail?.url && (
          <img src={item.thumbnail.url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
        )}
        <div>
          <p className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>{item.title}</p>
          <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>{item.short_description?.slice(0, 60)}...</p>
        </div>
      </div>
    )},
    { key: 'category', label: 'Category', width: '120px', render: item => (
      <span className="dash-badge dash-badge-info">{item.category || '—'}</span>
    )},
    { key: 'client_name', label: 'Client', width: '140px', render: item => (
      <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>{item.client_name || 'Personal'}</span>
    )},
    { key: 'live_project_url', label: 'Links', width: '80px', render: item => (
      item.live_project_url ? (
        <a href={item.live_project_url} target="_blank" rel="noopener" className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm">
          <ExternalLink size={14} />
        </a>
      ) : <span style={{ color: 'var(--dash-text-faint)' }}>—</span>
    )}
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--dash-text)' }}>Projects</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--dash-text-muted)' }}>Manage portfolio projects</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'var(--dash-surface-hover)', color: 'var(--dash-text-muted)' }}>
            Full editor coming soon
          </span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        total={data?.pagination?.total ?? 0}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        searchTerm={search}
        onSearchChange={setSearch}
        loading={isLoading}
        actions={item => (
          <>
            <button className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm" title="Editar">
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
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        confirmLabel="Delete"
        onConfirm={async () => { if (deleteTarget) { await deleteProject(deleteTarget); setDeleteTarget(null) } }}
        onCancel={() => setDeleteTarget(null)}
        loading={isDeleting}
      />
    </div>
  )
}
