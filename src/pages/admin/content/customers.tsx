import { useState } from 'react'
import { useCustomerViewModel } from '@/viewModels/customer.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { CustomerEntity } from '@/core/entities/content/CustomerEntity'
import { Column } from '@/components/admin/ui/DataTable'

const PAGE_SIZE = 10
export default function CustomersPage() {
  const vm = useCustomerViewModel()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [search, setSearch] = useState('')
  const { data, isLoading } = vm.getAllCustomers(pageSize, page * pageSize, search || undefined)

  const columns: Column<CustomerEntity>[] = [
    { key: 'name', label: 'Customer', render: item => (
      <div className="flex items-center gap-3">
        {item.photo && <img src={item.photo} alt="" className="w-9 h-9 rounded-full object-cover" />}
        <div>
          <p className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>{item.name}</p>
          <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>{item.occupation}</p>
        </div>
      </div>
    )},
    { key: 'description', label: 'Description', render: item => <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>{item.description.slice(0, 80)}...</span> }
  ]

  return (
    <CrudPage title="Customers" subtitle="Manage your client roster" columns={columns} data={data?.data ?? []} total={data?.pagination?.total ?? 0}
      page={page} pageSize={pageSize} loading={isLoading} searchTerm={search} onPageChange={setPage} onPageSizeChange={setPageSize} onSearchChange={setSearch}
      fields={[
        { key: 'name', label: 'Name', placeholder: 'Client Name' },
        { key: 'occupation', label: 'Occupation', placeholder: 'Role / Company' },
        { key: 'photo', label: 'Photo', type: 'image' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'About the customer' }
      ]}
      onCreate={d => vm.createCustomer(d as any)} onUpdate={(id, d) => vm.updateCustomer({ id, data: d })} onDelete={vm.deleteCustomer}
      isCreating={vm.isCreating} isDeleting={vm.isDeleting}
    />
  )
}
