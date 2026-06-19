import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProjectViewModel } from '@/viewModels/project.viewmodel'
import { useTechnologyViewModel } from '@/viewModels/technology.viewmodel'
import { MarkdownEditor } from '@/components/admin/ui/MarkdownEditor'
import { ImageUploader } from '@/components/admin/ui/ImageUploader'
import { ProjectCategory, ProjectSectionType } from '@/types/enum/portfolio'
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
  GripVertical
} from 'lucide-react'

const schema = z.object({
  title: z.string().min(2, 'Mínimo 2 caracteres'),
  slug: z.string().min(2, 'Mínimo 2 caracteres'),
  category: z.string().optional(),
  highlight: z.string().optional(),
  client_name: z.string().optional(),
  duration: z.string().optional(),
  short_description: z.string().min(1, 'Obrigatório'),
  description_raw: z.string().optional(),
  thumbnail: z.string().optional(),
  page_thumbnail: z.string().optional(),
  live_project_url: z.string().optional(),
  github_url: z.string().optional(),
  figma_url: z.string().optional(),
  play_store_url: z.string().optional(),
  app_store_url: z.string().optional()
})

type FormValues = z.infer<typeof schema>

interface SectionDraft {
  type: string
  title: string
  subtitle: string
  description_raw: string
  images: string[]
  items: string[]
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

const emptySection = (): SectionDraft => ({
  type: ProjectSectionType.TEXT,
  title: '',
  subtitle: '',
  description_raw: '',
  images: [],
  items: []
})

export default function ProjectFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const { getProjectById, createProject, updateProject, isCreating, isUpdating } =
    useProjectViewModel()
  const { getAllTechnologies } = useTechnologyViewModel()

  const projectQuery = isEditing ? getProjectById(id!) : null
  const techQuery = getAllTechnologies(200, 0)

  const [techIds, setTechIds] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [sections, setSections] = useState<SectionDraft[]>([])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      slug: '',
      short_description: '',
      description_raw: ''
    }
  })

  // Hydrate on edit
  useEffect(() => {
    const p = projectQuery?.data
    if (!p) return
    setValue('title', p.title)
    setValue('slug', p.slug)
    setValue('category', p.category ?? '')
    setValue('highlight', p.highlight ?? '')
    setValue('client_name', p.client_name ?? '')
    setValue('duration', p.duration ?? '')
    setValue('short_description', p.short_description ?? '')
    setValue('description_raw', p.description?.raw ?? p.description?.text ?? '')
    setValue('thumbnail', p.thumbnail?.url ?? '')
    setValue('page_thumbnail', p.page_thumbnail?.url ?? '')
    setValue('live_project_url', p.live_project_url ?? '')
    setValue('github_url', p.github_url ?? '')
    setValue('figma_url', p.figma_url ?? '')
    setValue('play_store_url', p.play_store_url ?? '')
    setValue('app_store_url', p.app_store_url ?? '')

    setImages(Array.isArray(p.images) ? p.images : [])
    setTechIds((p.technologies ?? []).map(t => t.id).filter(Boolean))
    setSections(
      (p.sections ?? []).map(s => ({
        type: s.type,
        title: s.title ?? '',
        subtitle: s.subtitle ?? '',
        description_raw: s.description?.raw ?? s.description?.text ?? '',
        images: (s.images ?? []).map(img => img.url).filter(Boolean),
        items: s.items ?? []
      }))
    )
  }, [projectQuery?.data]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-slug from title (create only)
  const titleValue = watch('title')
  useEffect(() => {
    if (!isEditing && titleValue) setValue('slug', slugify(titleValue))
  }, [titleValue, isEditing]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTech = (techId: string) =>
    setTechIds(prev =>
      prev.includes(techId)
        ? prev.filter(t => t !== techId)
        : [...prev, techId]
    )

  // Sections helpers
  const updateSection = (index: number, patch: Partial<SectionDraft>) =>
    setSections(prev =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
    )
  const removeSection = (index: number) =>
    setSections(prev => prev.filter((_, i) => i !== index))
  const moveSection = (index: number, dir: -1 | 1) =>
    setSections(prev => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })

  const onSubmit = async (data: FormValues) => {
    const payload: any = {
      title: data.title,
      slug: data.slug,
      category: data.category || null,
      highlight: data.highlight || null,
      client_name: data.client_name || null,
      duration: data.duration || null,
      short_description: data.short_description,
      description: {
        raw: data.description_raw || '',
        text: data.description_raw || ''
      },
      thumbnail: data.thumbnail ? { url: data.thumbnail } : {},
      page_thumbnail: data.page_thumbnail ? { url: data.page_thumbnail } : {},
      images,
      live_project_url: data.live_project_url || null,
      github_url: data.github_url || null,
      figma_url: data.figma_url || null,
      play_store_url: data.play_store_url || null,
      app_store_url: data.app_store_url || null,
      technologyIds: techIds,
      sections: sections.map(s => ({
        type: s.type,
        title: s.title,
        subtitle: s.subtitle || null,
        description: { raw: s.description_raw || '', text: s.description_raw || '' },
        images: s.images.map(url => ({ url })),
        items: s.items.filter(Boolean)
      }))
    }

    if (isEditing) {
      await updateProject({ id: id!, data: payload })
    } else {
      await createProject(payload)
    }
    navigate('/admin/projects')
  }

  const saving = isCreating || isUpdating
  const technologies = techQuery.data?.data ?? []

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/admin/projects')}
          className="dash-btn dash-btn-ghost dash-btn-icon"
          aria-label="Voltar"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="dash-page-title">
          {isEditing ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ---- Basics ---- */}
        <section className="dash-card p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="dash-form-group">
              <label className="dash-label dash-label-required">Title</label>
              <input
                {...register('title')}
                className={`dash-input ${errors.title ? 'dash-input-error' : ''}`}
                placeholder="Project name"
              />
              {errors.title && (
                <p className="dash-error-text">{errors.title.message}</p>
              )}
            </div>
            <div className="dash-form-group">
              <label className="dash-label dash-label-required">Slug</label>
              <input
                {...register('slug')}
                className={`dash-input ${errors.slug ? 'dash-input-error' : ''}`}
                placeholder="project-name"
              />
              {errors.slug && (
                <p className="dash-error-text">{errors.slug.message}</p>
              )}
            </div>
            <div className="dash-form-group">
              <label className="dash-label">Category</label>
              <select {...register('category')} className="dash-select">
                <option value="">Select...</option>
                {Object.values(ProjectCategory).map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="dash-form-group">
              <label className="dash-label">Highlight / Badge</label>
              <input
                {...register('highlight')}
                className="dash-input"
                placeholder="Award winning"
              />
            </div>
            <div className="dash-form-group">
              <label className="dash-label">Client Name</label>
              <input
                {...register('client_name')}
                className="dash-input"
                placeholder="Personal"
              />
            </div>
            <div className="dash-form-group">
              <label className="dash-label">Duration</label>
              <input
                {...register('duration')}
                className="dash-input"
                placeholder="3 months"
              />
            </div>
          </div>

          <div className="dash-form-group">
            <label className="dash-label dash-label-required">
              Short Description
            </label>
            <textarea
              {...register('short_description')}
              className={`dash-textarea ${errors.short_description ? 'dash-input-error' : ''}`}
              rows={3}
              placeholder="One-line summary shown in listings"
            />
            {errors.short_description && (
              <p className="dash-error-text">
                {errors.short_description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              control={control}
              name="thumbnail"
              render={({ field }) => (
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  label="Thumbnail"
                  bucket="images"
                  path="projects/"
                />
              )}
            />
            <Controller
              control={control}
              name="page_thumbnail"
              render={({ field }) => (
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  label="Page Cover Image"
                  bucket="images"
                  path="projects/"
                />
              )}
            />
          </div>
        </section>

        {/* ---- Detailed description (markdown) ---- */}
        <Controller
          control={control}
          name="description_raw"
          render={({ field }) => (
            <MarkdownEditor
              value={field.value ?? ''}
              onChange={field.onChange}
              label="Detailed Description"
              placeholder="Describe the project in Markdown..."
              minHeight="280px"
            />
          )}
        />

        {/* ---- Technologies (many-to-many) ---- */}
        <section className="dash-card p-6 space-y-4">
          <div>
            <h2 className="dash-page-subtitle" style={{ marginTop: 0, fontWeight: 600, color: 'var(--dash-text)' }}>
              Technologies
            </h2>
            <p className="dash-hint" style={{ marginTop: 2 }}>
              {techIds.length} selected
            </p>
          </div>
          {techIds.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techIds.map(tid => {
                const tech = technologies.find(t => t.id === tid)
                return (
                  <span key={tid} className="dash-chip">
                    {tech?.name ?? '—'}
                    <button type="button" onClick={() => toggleTech(tid)} aria-label="Remover">
                      <X size={12} />
                    </button>
                  </span>
                )
              })}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {technologies
              .filter(t => !techIds.includes(t.id))
              .map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTech(t.id)}
                  className="dash-btn dash-btn-secondary dash-btn-sm"
                >
                  <Plus size={13} /> {t.name}
                </button>
              ))}
            {technologies.length === 0 && (
              <p className="dash-hint">No technologies yet. Create some first.</p>
            )}
          </div>
        </section>

        {/* ---- Gallery images ---- */}
        <section className="dash-card p-6 space-y-4">
          <h2 className="dash-page-subtitle" style={{ marginTop: 0, fontWeight: 600, color: 'var(--dash-text)' }}>
            Gallery
          </h2>
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((url, i) => (
                <div key={`${url}-${i}`} className="relative group">
                  <img
                    src={url}
                    alt=""
                    className="w-full h-24 object-cover rounded-lg"
                    style={{ border: '1px solid var(--dash-border-visible)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                    className="dash-btn dash-btn-danger dash-btn-icon dash-btn-sm absolute top-1 right-1"
                    aria-label="Remover imagem"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <ImageUploader
            value=""
            onChange={url => setImages(prev => [...prev, url])}
            label="Add gallery image"
            bucket="images"
            path="projects/gallery/"
          />
        </section>

        {/* ---- Sections (one-to-many) ---- */}
        <section className="space-y-4">
          <div className="dash-page-header">
            <h2 className="dash-page-subtitle" style={{ marginTop: 0, fontWeight: 600, color: 'var(--dash-text)' }}>
              Sections
            </h2>
            <button
              type="button"
              onClick={() => setSections(prev => [...prev, emptySection()])}
              className="dash-btn dash-btn-secondary dash-btn-sm"
            >
              <Plus size={14} /> Add Section
            </button>
          </div>

          {sections.length === 0 && (
            <div className="dash-card p-6">
              <p className="dash-hint" style={{ margin: 0 }}>
                No sections. Sections render the rich content blocks on the public
                project page (gallery, features, challenges…).
              </p>
            </div>
          )}

          {sections.map((s, i) => (
            <div key={i} className="dash-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" style={{ color: 'var(--dash-text-muted)' }}>
                  <GripVertical size={16} />
                  <span className="text-sm font-medium">Section {i + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveSection(i, -1)} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm" aria-label="Mover para cima">
                    <ChevronUp size={14} />
                  </button>
                  <button type="button" onClick={() => moveSection(i, 1)} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm" aria-label="Mover para baixo">
                    <ChevronDown size={14} />
                  </button>
                  <button type="button" onClick={() => removeSection(i)} className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm" style={{ color: 'var(--dash-danger)' }} aria-label="Remover secção">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="dash-form-group">
                  <label className="dash-label">Type</label>
                  <select
                    value={s.type}
                    onChange={e => updateSection(i, { type: e.target.value })}
                    className="dash-select"
                  >
                    {Object.values(ProjectSectionType).map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="dash-form-group">
                  <label className="dash-label">Title</label>
                  <input
                    value={s.title}
                    onChange={e => updateSection(i, { title: e.target.value })}
                    className="dash-input"
                    placeholder="Section title"
                  />
                </div>
              </div>

              <div className="dash-form-group">
                <label className="dash-label">Subtitle</label>
                <input
                  value={s.subtitle}
                  onChange={e => updateSection(i, { subtitle: e.target.value })}
                  className="dash-input"
                  placeholder="Optional subtitle"
                />
              </div>

              <div className="dash-form-group">
                <label className="dash-label">Description</label>
                <textarea
                  value={s.description_raw}
                  onChange={e => updateSection(i, { description_raw: e.target.value })}
                  className="dash-textarea"
                  rows={3}
                  placeholder="Section text (Markdown accepted)"
                />
              </div>

              {/* Items (bullet list) */}
              <div className="dash-form-group">
                <label className="dash-label">Items</label>
                <div className="space-y-2">
                  {s.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        value={item}
                        onChange={e => {
                          const items = [...s.items]
                          items[idx] = e.target.value
                          updateSection(i, { items })
                        }}
                        className="dash-input"
                        placeholder={`Item ${idx + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateSection(i, {
                            items: s.items.filter((_, x) => x !== idx)
                          })
                        }
                        className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
                        style={{ color: 'var(--dash-danger)' }}
                        aria-label="Remover item"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateSection(i, { items: [...s.items, ''] })}
                    className="dash-btn dash-btn-ghost dash-btn-sm"
                  >
                    <Plus size={13} /> Add item
                  </button>
                </div>
              </div>

              {/* Section images */}
              <div className="dash-form-group">
                <label className="dash-label">Images</label>
                {s.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                    {s.images.map((url, idx) => (
                      <div key={`${url}-${idx}`} className="relative">
                        <img
                          src={url}
                          alt=""
                          className="w-full h-20 object-cover rounded-lg"
                          style={{ border: '1px solid var(--dash-border-visible)' }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateSection(i, {
                              images: s.images.filter((_, x) => x !== idx)
                            })
                          }
                          className="dash-btn dash-btn-danger dash-btn-icon dash-btn-sm absolute top-1 right-1"
                          aria-label="Remover imagem"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <ImageUploader
                  value=""
                  onChange={url =>
                    updateSection(i, { images: [...s.images, url] })
                  }
                  label="Add section image"
                  bucket="images"
                  path="projects/sections/"
                />
              </div>
            </div>
          ))}
        </section>

        {/* ---- Links ---- */}
        <section className="dash-card p-6">
          <h2 className="dash-page-subtitle" style={{ marginTop: 0, marginBottom: 16, fontWeight: 600, color: 'var(--dash-text)' }}>
            Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="dash-form-group">
              <label className="dash-label">Live URL</label>
              <input {...register('live_project_url')} type="url" className="dash-input" placeholder="https://" />
            </div>
            <div className="dash-form-group">
              <label className="dash-label">GitHub URL</label>
              <input {...register('github_url')} type="url" className="dash-input" placeholder="https://" />
            </div>
            <div className="dash-form-group">
              <label className="dash-label">Figma URL</label>
              <input {...register('figma_url')} type="url" className="dash-input" placeholder="https://" />
            </div>
            <div className="dash-form-group">
              <label className="dash-label">Play Store URL</label>
              <input {...register('play_store_url')} type="url" className="dash-input" placeholder="https://" />
            </div>
            <div className="dash-form-group">
              <label className="dash-label">App Store URL</label>
              <input {...register('app_store_url')} type="url" className="dash-input" placeholder="https://" />
            </div>
          </div>
        </section>

        {/* ---- Actions ---- */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="dash-btn dash-btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" disabled={saving} className="dash-btn dash-btn-primary">
            {saving ? (
              'Saving...'
            ) : (
              <>
                <Save size={16} /> {isEditing ? 'Update' : 'Create'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
