import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBlogPostViewModel } from '@/viewModels/blog-post.viewmodel'
import { useBlogCategoryViewModel } from '@/viewModels/blog-category.viewmodel'
import { MarkdownEditor } from '@/components/admin/ui/MarkdownEditor'
import { ImageUploader } from '@/components/admin/ui/ImageUploader'
import { ArrowLeft, Save } from 'lucide-react'

const postSchema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  slug: z.string().min(3, 'Mínimo 3 caracteres'),
  excerpt: z.string().min(10, 'Mínimo 10 caracteres'),
  category_id: z.string().optional(),
  cover_image: z.string().min(1, 'Cover image is required'),
  content_raw: z.string().min(10, 'Content is required'),
  author_name: z.string().optional(),
  published_at: z.string().optional()
})

type PostFormValues = z.infer<typeof postSchema>

export default function BlogPostFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const { getPostById, createPost, updatePost, isCreating, isUpdating } = useBlogPostViewModel()
  const { getAllCategories } = useBlogCategoryViewModel()

  const postQuery = isEditing ? getPostById(id!) : null
  const categoriesQuery = getAllCategories(100, 0)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      cover_image: '',
      content_raw: '',
      author_name: '',
      published_at: ''
    }
  })

  useEffect(() => {
    if (postQuery?.data) {
      const p = postQuery.data
      setValue('title', p.title)
      setValue('slug', p.slug)
      setValue('excerpt', p.excerpt)
      setValue('cover_image', p.cover_image)
      setValue('content_raw', p.content?.raw ?? '')
      setValue('category_id', p.category_id ?? '')
      setValue('author_name', p.author_name ?? '')
      setValue('published_at', p.published_at ? new Date(p.published_at).toISOString().slice(0, 16) : '')
    }
  }, [postQuery?.data])

  const titleValue = watch('title')
  useEffect(() => {
    if (!isEditing && titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setValue('slug', slug)
    }
  }, [titleValue, isEditing])

  const onSubmit = async (data: PostFormValues) => {
    const payload: any = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      cover_image: data.cover_image,
      content: { raw: data.content_raw, text: data.content_raw },
      category_id: data.category_id || null,
      author_name: data.author_name || null,
      published_at: data.published_at || null
    }

    if (isEditing) {
      await updatePost({ id: id!, data: payload })
    } else {
      await createPost(payload)
    }
    navigate('/admin/blog')
  }

  const saving = isCreating || isUpdating

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/blog')}
          className="dash-btn dash-btn-ghost dash-btn-icon"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--dash-text)' }}>
            {isEditing ? 'Edit Post' : 'New Post'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="dash-card p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--dash-text)' }}>
              Title
            </label>
            <input
              {...register('title')}
              className={`dash-input ${errors.title ? 'dash-input-error' : ''}`}
              placeholder="Post title"
            />
            {errors.title && <p className="text-xs mt-1" style={{ color: 'var(--dash-danger)' }}>{errors.title.message}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--dash-text)' }}>
              Slug
            </label>
            <input
              {...register('slug')}
              className={`dash-input ${errors.slug ? 'dash-input-error' : ''}`}
              placeholder="post-slug"
            />
            {errors.slug && <p className="text-xs mt-1" style={{ color: 'var(--dash-danger)' }}>{errors.slug.message}</p>}
          </div>

          {/* Category + Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--dash-text)' }}>
                Category
              </label>
              <select {...register('category_id')} className="dash-input">
                <option value="">Select category</option>
                {categoriesQuery.data?.data.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--dash-text)' }}>
                Author Name
              </label>
              <input {...register('author_name')} className="dash-input" placeholder="Author" />
            </div>
          </div>

          {/* Publish Date */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--dash-text)' }}>
              Publish Date (leave empty for draft)
            </label>
            <input
              {...register('published_at')}
              type="datetime-local"
              className="dash-input"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--dash-text)' }}>
              Excerpt
            </label>
            <textarea
              {...register('excerpt')}
              className={`dash-input ${errors.excerpt ? 'dash-input-error' : ''}`}
              rows={3}
              placeholder="Brief description"
              style={{ resize: 'vertical' }}
            />
            {errors.excerpt && <p className="text-xs mt-1" style={{ color: 'var(--dash-danger)' }}>{errors.excerpt.message}</p>}
          </div>

          {/* Cover Image */}
          <Controller
            control={control}
            name="cover_image"
            render={({ field }) => (
              <ImageUploader
                value={field.value}
                onChange={field.onChange}
                label="Cover Image"
                bucket="images"
                path="blog/"
              />
            )}
          />
          {errors.cover_image && <p className="text-xs mt-1" style={{ color: 'var(--dash-danger)' }}>{errors.cover_image.message}</p>}
        </div>

        {/* Markdown Content */}
        <Controller
          control={control}
          name="content_raw"
          render={({ field }) => (
            <MarkdownEditor
              value={field.value}
              onChange={field.onChange}
              label="Content"
              placeholder="Write your post in Markdown..."
              minHeight="400px"
            />
          )}
        />
        {errors.content_raw && <p className="text-xs mt-1" style={{ color: 'var(--dash-danger)' }}>{errors.content_raw.message}</p>}

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="dash-btn dash-btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="dash-btn dash-btn-primary"
          >
            {saving ? 'Saving...' : <><Save size={16} /> {isEditing ? 'Update' : 'Publish'}</>}
          </button>
        </div>
      </form>
    </div>
  )
}
