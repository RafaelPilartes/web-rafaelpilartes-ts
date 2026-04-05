import { useState } from 'react'
import { useServiceViewModel } from '@/viewModels/service.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { ServiceEntity } from '@/core/entities/content/ServiceEntity'
import { Column } from '@/components/admin/ui/DataTable'

const PAGE_SIZE = 10
export default function ServicesPage() {
  const vm = useServiceViewModel()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { data, isLoading } = vm.getAllServices(PAGE_SIZE, page * PAGE_SIZE, search || undefined)

  const columns: Column<ServiceEntity>[] = [
    { key: 'title', label: 'Service', render: item => <span className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>{item.title}</span> },
    { key: 'description', label: 'Description', render: item => <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>{String(item.description).slice(0, 80)}...</span> }
  ]

  return (
    <CrudPage title="Services" subtitle="Manage your offered services" columns={columns} data={data?.data ?? []} total={data?.pagination?.total ?? 0}
      page={page} pageSize={PAGE_SIZE} loading={isLoading} searchTerm={search} onPageChange={setPage} onSearchChange={setSearch}
      fields={[
        { key: 'title', label: 'Title', placeholder: 'UI/UX Design' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the service' },
        { key: 'icon', label: 'Icon (SVG or text)', placeholder: '<svg>...' }
      ]}
      onCreate={d => vm.createService(d as any)} onUpdate={(id, d) => vm.updateService({ id, data: d })} onDelete={vm.deleteService}
      isCreating={vm.isCreating} isDeleting={vm.isDeleting}
    />
  )
}
