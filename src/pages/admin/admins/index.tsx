import { useState } from 'react'
import { useAdminProfileViewModel } from '@/viewModels/admin-profile.viewmodel'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { AdminProfileEntity } from '@/core/entities/AdminProfileEntity'
import { Trash2, Shield } from 'lucide-react'

const PAGE_SIZE = 10

export default function AdminsPage() {
  const { getAllAdminProfiles, deleteAdminProfile, isDeleting } = useAdminProfileViewModel()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const { data, isLoading } = getAllAdminProfiles(PAGE_SIZE, page * PAGE_SIZE, search || undefined)

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--dash-text)' }}>Administrators</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--dash-text-muted)' }}>Manage admin access</p>
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
          <button
            onClick={() => setDeleteTarget(item.id)}
            className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
            style={{ color: 'var(--dash-danger)' }}
          >
            <Trash2 size={14} />
          </button>
        )}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove Admin"
        message="Are you sure you want to remove this admin access?"
        confirmLabel="Remove"
        onConfirm={async () => { if (deleteTarget) { await deleteAdminProfile(deleteTarget); setDeleteTarget(null) } }}
        onCancel={() => setDeleteTarget(null)}
        loading={isDeleting}
      />
    </div>
  )
}
