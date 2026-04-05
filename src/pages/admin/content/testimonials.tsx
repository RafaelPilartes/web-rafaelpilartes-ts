import { useState } from 'react'
import { useTestimonialViewModel } from '@/viewModels/testimonial.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { TestimonialEntity } from '@/core/entities/content/TestimonialEntity'
import { Column } from '@/components/admin/ui/DataTable'

const PAGE_SIZE = 10
export default function TestimonialsPage() {
  const vm = useTestimonialViewModel()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { data, isLoading } = vm.getAllTestimonials(PAGE_SIZE, page * PAGE_SIZE, search || undefined)

  const columns: Column<TestimonialEntity>[] = [
    { key: 'name', label: 'Person', render: item => (
      <div className="flex items-center gap-3">
        {item.photo && <img src={item.photo} alt="" className="w-9 h-9 rounded-full object-cover" />}
        <div>
          <p className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>{item.name}</p>
          <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>{item.occupation}</p>
        </div>
      </div>
    )},
    { key: 'description', label: 'Testimonial', render: item => <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>{item.description.slice(0, 80)}...</span> }
  ]

  return (
    <CrudPage title="Testimonials" subtitle="Manage client testimonials" columns={columns} data={data?.data ?? []} total={data?.pagination?.total ?? 0}
      page={page} pageSize={PAGE_SIZE} loading={isLoading} searchTerm={search} onPageChange={setPage} onSearchChange={setSearch}
      fields={[
        { key: 'name', label: 'Name', placeholder: 'John Doe' },
        { key: 'occupation', label: 'Occupation', placeholder: 'CEO at Company' },
        { key: 'photo', label: 'Photo URL', type: 'url', placeholder: 'https://...' },
        { key: 'description', label: 'Testimonial', type: 'textarea', placeholder: 'What they said...' }
      ]}
      onCreate={d => vm.createTestimonial(d as any)} onUpdate={(id, d) => vm.updateTestimonial({ id, data: d })} onDelete={vm.deleteTestimonial}
      isCreating={vm.isCreating} isDeleting={vm.isDeleting}
    />
  )
}
