import { useState } from 'react'
import { useTechnologyViewModel } from '@/viewModels/technology.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
import { Column } from '@/components/admin/ui/DataTable'

const PAGE_SIZE = 20

export default function TechnologiesPage() {
  const vm = useTechnologyViewModel()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [search, setSearch] = useState('')
  const { data, isLoading } = vm.getAllTechnologies(
    pageSize,
    page * pageSize,
    search || undefined
  )

  const columns: Column<TechnologyEntity>[] = [
    {
      key: 'name',
      label: 'Name',
      render: item => (
        <span
          className="font-medium text-sm"
          style={{ color: 'var(--dash-text)' }}
        >
          {item.name}
        </span>
      )
    },
    {
      key: 'icon_svg',
      label: 'Icon',
      width: '80px',
      render: item =>
        item.icon_svg ? (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--dash-surface-hover)' }}
            dangerouslySetInnerHTML={{ __html: item.icon_svg }}
          />
        ) : (
          <span style={{ color: 'var(--dash-text-faint)' }}>—</span>
        )
    },
    {
      key: 'start_date',
      label: 'Since',
      width: '120px',
      render: item => (
        <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          {item.start_date ? new Date(item.start_date).getFullYear() : '—'}
        </span>
      )
    }
  ]

  return (
    <CrudPage
      title="Technologies"
      subtitle="Manage your tech stack"
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
        { key: 'name', label: 'Name', placeholder: 'React, TypeScript...' },
        {
          key: 'icon_svg',
          label: 'Icon SVG',
          type: 'textarea',
          placeholder: '<svg>...</svg>'
        },
        { key: 'start_date', label: 'Start Date', type: 'date' }
      ]}
      onCreate={data => vm.createTechnology(data as any)}
      onUpdate={(id, data) => vm.updateTechnology({ id, data })}
      onDelete={vm.deleteTechnology}
      isCreating={vm.isCreating}
      isDeleting={vm.isDeleting}
    />
  )
}
