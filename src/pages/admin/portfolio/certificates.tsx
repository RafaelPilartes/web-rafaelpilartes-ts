import { useState } from 'react'
import { useCertificateViewModel } from '@/viewModels/certificate.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { CertificateEntity } from '@/core/entities/portfolio/CertificateEntity'
import { Column } from '@/components/admin/ui/DataTable'

const PAGE_SIZE = 10

export default function CertificatesPage() {
  const vm = useCertificateViewModel()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { data, isLoading } = vm.getAllCertificates(PAGE_SIZE, page * PAGE_SIZE, search || undefined)

  const columns: Column<CertificateEntity>[] = [
    { key: 'title', label: 'Title', render: item => (
      <span className="font-medium text-sm" style={{ color: 'var(--dash-text)' }}>{item.title}</span>
    )},
    { key: 'issued_by', label: 'Issued By', width: '160px' },
    { key: 'issue_date', label: 'Date', width: '120px', render: item => (
      <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
        {new Date(item.issue_date).toLocaleDateString('pt-PT')}
      </span>
    )},
    { key: 'credential_id', label: 'Credential ID', width: '140px', render: item => (
      <code className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>{item.credential_id || '—'}</code>
    )}
  ]

  return (
    <CrudPage
      title="Certificates"
      subtitle="Manage your certifications"
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
        { key: 'title', label: 'Title', placeholder: 'AWS Solutions Architect' },
        { key: 'issued_by', label: 'Issued By', placeholder: 'Amazon Web Services' },
        { key: 'issue_date', label: 'Issue Date', type: 'date' },
        { key: 'expiration_date', label: 'Expiration Date', type: 'date' },
        { key: 'credential_id', label: 'Credential ID', placeholder: 'ABC-123' },
        { key: 'credential_url', label: 'Credential URL', type: 'url', placeholder: 'https://...' }
      ]}
      onCreate={data => vm.createCertificate(data as any)}
      onUpdate={(id, data) => vm.updateCertificate({ id, data })}
      onDelete={vm.deleteCertificate}
      isCreating={vm.isCreating}
      isDeleting={vm.isDeleting}
    />
  )
}
