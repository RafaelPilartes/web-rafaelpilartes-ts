import { useState } from 'react'
import { useBlogCategoryViewModel } from '@/viewModels/blog-category.viewmodel'
import { CrudPage } from '@/components/admin/ui/CrudPage'
import { Column } from '@/components/admin/ui/DataTable'
import { BlogCategoryEntity } from '@/core/entities/content/BlogCategoryEntity'

export default function BlogCategoriesPage() {
  const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating,
    isDeleting
  } = useBlogCategoryViewModel()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [search, setSearch] = useState('')

  const { data, isLoading } = getAllCategories(
    pageSize,
    page * pageSize,
    search || undefined
  )

  const columns: Column<BlogCategoryEntity>[] = [
    {
      key: 'name',
      label: 'Name',
      render: item => (
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ background: item.color || 'var(--dash-accent)' }}
          />
          <span
            className="font-medium text-sm"
            style={{ color: 'var(--dash-text)' }}
          >
            {item.name}
          </span>
        </div>
      )
    },
    {
      key: 'slug',
      label: 'Slug',
      width: '180px',
      render: item => (
        <code
          className="text-xs px-2 py-1 rounded"
          style={{
            background: 'var(--dash-surface-hover)',
            color: 'var(--dash-text-muted)'
          }}
        >
          {item.slug}
        </code>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: item => (
        <span className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          {item.description?.slice(0, 60) || '—'}
        </span>
      )
    }
  ]

  return (
    <CrudPage
      title="Categories"
      subtitle="Manage blog categories"
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
        { key: 'name', label: 'Name', placeholder: 'Category name' },
        {
          key: 'slug',
          label: 'Slug',
          placeholder: 'category-slug',
          autoFillSlugFrom: 'name'
        },
        { key: 'color', label: 'Color', type: 'color' },
        {
          key: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Short description (optional)'
        }
      ]}
      onCreate={async values => {
        await createCategory(values as any)
      }}
      onUpdate={async (id, values) => {
        await updateCategory({ id, data: values as any })
      }}
      onDelete={deleteCategory}
      isCreating={isCreating}
      isDeleting={isDeleting}
    />
  )
}
