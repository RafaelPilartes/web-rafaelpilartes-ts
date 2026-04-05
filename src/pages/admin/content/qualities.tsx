import { useState } from 'react'
import { useQualityViewModel } from '@/viewModels/quality.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { QualityEntity } from '@/core/entities/content/QualityEntity'
import { Column } from '@/components/admin/ui/DataTable'

const PAGE_SIZE = 10
export default function QualitiesPage() {
  const vm = useQualityViewModel()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { data, isLoading } = vm.getAllQualities(PAGE_SIZE, page * PAGE_SIZE, search || undefined)

  const columns: Column<QualityEntity>[] = [
    { key: 'name', label: 'Quality', render: item => <span className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>{item.name}</span> },
    { key: 'description', label: 'Description', render: item => <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>{item.description.slice(0, 100)}...</span> }
  ]

  return (
    <CrudPage title="Qualities" subtitle="Manage your personal qualities" columns={columns} data={data?.data ?? []} total={data?.pagination?.total ?? 0}
      page={page} pageSize={PAGE_SIZE} loading={isLoading} searchTerm={search} onPageChange={setPage} onSearchChange={setSearch}
      fields={[
        { key: 'name', label: 'Name', placeholder: 'Problem Solver' },
        { key: 'icon_svg', label: 'Icon SVG', type: 'textarea', placeholder: '<svg>...</svg>' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe this quality' }
      ]}
      onCreate={d => vm.createQuality(d as any)} onUpdate={(id, d) => vm.updateQuality({ id, data: d })} onDelete={vm.deleteQuality}
      isCreating={vm.isCreating} isDeleting={vm.isDeleting}
    />
  )
}
