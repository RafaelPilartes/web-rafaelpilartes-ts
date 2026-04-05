import { useState } from 'react'
import { useProjectViewModel } from '@/viewModels/project.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { Column } from '@/components/admin/ui/DataTable'
import { ExternalLink } from 'lucide-react'

const PAGE_SIZE = 10

export default function ProjectsPage() {
  const vm = useProjectViewModel()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [search, setSearch] = useState('')

  const { data, isLoading } = vm.getAllProjects(pageSize, page * pageSize, search || undefined)

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
    <CrudPage
      title="Projects"
      subtitle="Manage portfolio projects"
      columns={columns}
      data={data?.data ?? []}
      total={data?.pagination?.total ?? 0}
      page={page}
      pageSize={pageSize}
      loading={isLoading}
      searchTerm={search}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onSearchChange={setSearch}
      fields={[
        { key: 'title', label: 'Title', placeholder: 'Project Name' },
        { key: 'slug', label: 'Slug', placeholder: 'project-name' },
        { 
          key: 'category', 
          label: 'Category', 
          type: 'select',
          options: [
            { label: 'Web', value: 'WEB' },
            { label: 'Mobile', value: 'MOBILE' },
            { label: 'AI', value: 'AI' },
            { label: 'Desktop', value: 'DESKTOP' },
            { label: 'Design', value: 'DESIGN' },
          ]
        },
        { key: 'highlight', label: 'Highlight/Badge', placeholder: 'Award winning' },
        { key: 'thumbnail', label: 'Thumbnail', type: 'image' },
        { key: 'page_thumbnail', label: 'Page Cover Image', type: 'image' },
        { key: 'short_description', label: 'Short Description', type: 'textarea' },
        { key: 'description', label: 'Detailed Description', type: 'textarea', placeholder: 'Markdown accepted' },
        { key: 'client_name', label: 'Client Name (Optional)' },
        { key: 'duration', label: 'Duration (ex: 3 months)' },
        { key: 'live_project_url', label: 'Live URL', type: 'url' },
        { key: 'github_url', label: 'GitHub URL', type: 'url' },
        { key: 'figma_url', label: 'Figma URL', type: 'url' },
        { key: 'play_store_url', label: 'Play Store URL', type: 'url' },
        { key: 'app_store_url', label: 'App Store URL', type: 'url' }
      ]}
      onCreate={async data => {
        const payload: any = { ...data }
        if (data.thumbnail && typeof data.thumbnail === 'string') {
          payload.thumbnail = { url: data.thumbnail }
        } else if (!data.thumbnail) {
          payload.thumbnail = null
        }
        if (data.page_thumbnail && typeof data.page_thumbnail === 'string') {
          payload.page_thumbnail = { url: data.page_thumbnail }
        } else if (!data.page_thumbnail) {
          payload.page_thumbnail = null
        }
        if (data.description && typeof data.description === 'string') {
          payload.description = { raw: data.description, text: data.description }
        }
        await vm.createProject(payload)
      }}
      onUpdate={async (id, data) => {
        const payload: any = { ...data }
        if (data.thumbnail && typeof data.thumbnail === 'string') {
          payload.thumbnail = { url: data.thumbnail }
        } else if (!data.thumbnail) {
          payload.thumbnail = null
        }
        if (data.page_thumbnail && typeof data.page_thumbnail === 'string') {
          payload.page_thumbnail = { url: data.page_thumbnail }
        } else if (!data.page_thumbnail) {
          payload.page_thumbnail = null
        }
        if (data.description && typeof data.description === 'string') {
          payload.description = { raw: data.description, text: data.description }
        }
        await vm.updateProject({ id, data: payload })
      }}
      onDelete={vm.deleteProject}
      isCreating={vm.isCreating}
      isDeleting={vm.isDeleting}
    />
  )
}
