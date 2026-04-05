import { useEffect, useState } from 'react'
import { useWorkExperienceViewModel } from '@/viewModels/work-experience.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { WorkExperienceEntity } from '@/core/entities/portfolio/WorkExperienceEntity'
import { Column } from '@/components/admin/ui/DataTable'

const PAGE_SIZE = 10

export default function ExperiencesPage() {
  const vm = useWorkExperienceViewModel()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { data, isLoading } = vm.getAllExperiences(
    PAGE_SIZE,
    page * PAGE_SIZE,
    search || undefined
  )

  useEffect(() => {
    console.log('data ==>', data)
  }, [data])

  const columns: Column<WorkExperienceEntity>[] = [
    {
      key: 'role',
      label: 'Role',
      render: item => (
        <div>
          <p
            className="font-medium text-sm"
            style={{ color: 'var(--dash-text)' }}
          >
            {item.role}
          </p>
          <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>
            {item.company_name}
          </p>
        </div>
      )
    },
    { key: 'company_name', label: 'Company', width: '160px' },
    {
      key: 'start_date',
      label: 'Period',
      width: '180px',
      render: item => (
        <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          {new Date(item.start_date).toLocaleDateString('pt-PT', {
            month: 'short',
            year: 'numeric'
          })}
          {' — '}
          {item.end_date
            ? new Date(item.end_date).toLocaleDateString('pt-PT', {
                month: 'short',
                year: 'numeric'
              })
            : 'Present'}
        </span>
      )
    }
  ]

  return (
    <CrudPage
      title="Experiences"
      subtitle="Manage your work experience"
      columns={columns}
      data={data?.data ?? []}
      total={data?.pagination?.total ?? 0}
      page={page}
      pageSize={PAGE_SIZE}
      loading={isLoading}
      searchTerm={search}
      onPageChange={setPage}
      onSearchChange={setSearch}
      fields={[
        { key: 'role', label: 'Role', placeholder: 'Senior Developer' },
        { key: 'company_name', label: 'Company', placeholder: 'Company Name' },
        {
          key: 'company_url',
          label: 'Company URL',
          type: 'url',
          placeholder: 'https://...'
        },
        { key: 'start_date', label: 'Start Date', type: 'date' },
        { key: 'end_date', label: 'End Date (empty = present)', type: 'date' }
      ]}
      onCreate={data =>
        vm.createExperience({
          ...data,
          company_logo: { url: '' },
          description: { raw: '' }
        } as any)
      }
      onUpdate={(id, data) => vm.updateExperience({ id, data })}
      onDelete={vm.deleteExperience}
      isCreating={vm.isCreating}
      isDeleting={vm.isDeleting}
    />
  )
}
