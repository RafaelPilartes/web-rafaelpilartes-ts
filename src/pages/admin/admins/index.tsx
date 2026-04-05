import { useState } from 'react'
import { useAdminProfileViewModel } from '@/viewModels/admin-profile.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { AdminProfileEntity } from '@/core/entities/AdminProfileEntity'
import { Column } from '@/components/admin/ui/DataTable'
import { Shield } from 'lucide-react'

const PAGE_SIZE = 10

export default function AdminsPage() {
  const vm = useAdminProfileViewModel()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [search, setSearch] = useState('')

  const { data, isLoading } = vm.getAllAdminProfiles(pageSize, page * pageSize, search || undefined)

  const columns: Column<AdminProfileEntity>[] = [
    { key: 'user', label: 'Admin', render: item => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--dash-accent-soft)' }}>
          <Shield size={16} style={{ color: 'var(--dash-accent)' }} />
        </div>
        <div>
          <p className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>
            {item.user?.name ?? item.user_id}
          </p>
          <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>
            {item.user?.email ?? '—'}
          </p>
        </div>
      </div>
    )},
    { key: 'permission_level', label: 'Role', width: '140px', render: item => (
      <span className="dash-badge dash-badge-accent">{item.permission_level}</span>
    )},
    { key: 'department', label: 'Department', width: '140px', render: item => (
      <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>{item.department || '—'}</span>
    )},
    { key: 'is_active', label: 'Status', width: '100px', render: item => (
      <span className={`dash-badge ${item.is_active ? 'dash-badge-success' : 'dash-badge-danger'}`}>
        {item.is_active ? 'Active' : 'Inactive'}
      </span>
    )}
  ]

  return (
    <CrudPage
      title="Administrators"
      subtitle="Manage admin access"
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
        { key: 'user_id', label: 'User ID (UUID)', placeholder: 'UUID do utilizador' },
        { 
          key: 'permission_level', 
          label: 'Role', 
          type: 'select',
          options: [
            { label: 'Super Admin', value: 'SUPER_ADMIN' },
            { label: 'Admin', value: 'ADMIN' },
            { label: 'Editor', value: 'EDITOR' },
          ]
        },
        { key: 'department', label: 'Department' },
        { 
          key: 'is_active', 
          label: 'Status', 
          type: 'select',
          options: [
            { label: 'Active', value: 'true' },
            { label: 'Inactive', value: 'false' },
          ]
        }
      ]}
      onCreate={async data => {
        const payload = {
          ...data,
          is_active: data.is_active === 'true' || data.is_active === true
        }
        await vm.createAdminProfile(payload as any)
      }}
      onUpdate={async (id, data) => {
        const payload = {
          ...data,
          is_active: data.is_active === 'true' || data.is_active === true
        }
        await vm.updateAdminProfile({ id, data: payload })
      }}
      onDelete={vm.deleteAdminProfile}
      isCreating={vm.isCreating}
      isDeleting={vm.isDeleting}
    />
  )
}
