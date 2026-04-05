import { useQuery } from '@tanstack/react-query'
import { StatsCard } from '@/components/admin/ui/StatsCard'
import {
  FileText,
  FolderOpen,
  Award,
  MessageSquare,
  Users,
  Code2,
  Wrench,
  Star
} from 'lucide-react'
import { blogPostUseCase } from '@/domain/usecases/BlogPostUseCase'
import { projectUseCase } from '@/domain/usecases/ProjectUseCase'
import { certificateUseCase } from '@/domain/usecases/CertificateUseCase'
import { testimonialUseCase } from '@/domain/usecases/TestimonialUseCase'
import { technologyUseCase } from '@/domain/usecases/TechnologyUseCase'
import { serviceUseCase } from '@/domain/usecases/ServiceUseCase'
import { customerUseCase } from '@/domain/usecases/CustomerUseCase'
import { qualityUseCase } from '@/domain/usecases/QualityUseCase'
import { Link } from 'react-router-dom'
import { Plus, ArrowUpRight } from 'lucide-react'

export default function AdminDashboardPage() {
  const { data: posts } = useQuery({
    queryKey: ['dash-stats-posts'],
    queryFn: () => blogPostUseCase.executeGetAll(1, 0)
  })
  const { data: projects } = useQuery({
    queryKey: ['dash-stats-projects'],
    queryFn: () => projectUseCase.executeGetAll(1, 0)
  })
  const { data: certs } = useQuery({
    queryKey: ['dash-stats-certs'],
    queryFn: () => certificateUseCase.executeGetAll(1, 0)
  })
  const { data: testimonials } = useQuery({
    queryKey: ['dash-stats-testimonials'],
    queryFn: () => testimonialUseCase.executeGetAll(1, 0)
  })
  const { data: techs } = useQuery({
    queryKey: ['dash-stats-techs'],
    queryFn: () => technologyUseCase.executeGetAll(1, 0)
  })
  const { data: services } = useQuery({
    queryKey: ['dash-stats-services'],
    queryFn: () => serviceUseCase.executeGetAll(1, 0)
  })
  const { data: customers } = useQuery({
    queryKey: ['dash-stats-customers'],
    queryFn: () => customerUseCase.executeGetAll(1, 0)
  })
  const { data: qualities } = useQuery({
    queryKey: ['dash-stats-qualities'],
    queryFn: () => qualityUseCase.executeGetAll(1, 0)
  })

  const recentPosts = useQuery({
    queryKey: ['dash-recent-posts'],
    queryFn: () => blogPostUseCase.executeGetAll(5, 0)
  })

  const recentProjects = useQuery({
    queryKey: ['dash-recent-projects'],
    queryFn: () => projectUseCase.executeGetAll(5, 0)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: 'var(--dash-text)' }}
          >
            Dashboard
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--dash-text-muted)' }}
          >
            Overview of your portfolio content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/blog/new"
            className="dash-btn dash-btn-primary dash-btn-sm"
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Blog Posts"
          value={posts?.pagination?.total ?? 0}
          icon={<FileText size={20} />}
          color="#F13024"
        />
        <StatsCard
          title="Projects"
          value={projects?.pagination?.total ?? 0}
          icon={<FolderOpen size={20} />}
          color="#3b82f6"
        />
        <StatsCard
          title="Technologies"
          value={techs?.pagination?.total ?? 0}
          icon={<Code2 size={20} />}
          color="#22c55e"
        />
        <StatsCard
          title="Certificates"
          value={certs?.pagination?.total ?? 0}
          icon={<Award size={20} />}
          color="#eab308"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Testimonials"
          value={testimonials?.pagination?.total ?? 0}
          icon={<MessageSquare size={20} />}
          color="#a855f7"
        />
        <StatsCard
          title="Services"
          value={services?.pagination?.total ?? 0}
          icon={<Wrench size={20} />}
          color="#06b6d4"
        />
        <StatsCard
          title="Customers"
          value={customers?.pagination?.total ?? 0}
          icon={<Users size={20} />}
          color="#f97316"
        />
        <StatsCard
          title="Qualities"
          value={qualities?.pagination?.total ?? 0}
          icon={<Star size={20} />}
          color="#ec4899"
        />
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="dash-card">
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid var(--dash-border)' }}
          >
            <h2
              className="text-sm font-semibold"
              style={{ color: 'var(--dash-text)' }}
            >
              Recent Posts
            </h2>
            <Link
              to="/admin/blog"
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: 'var(--dash-accent)' }}
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div
            className="divide-y"
            style={{ borderColor: 'var(--dash-border)' }}
          >
            {recentPosts.isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="px-5 py-3.5">
                  <div className="dash-skeleton h-4 w-3/4 mb-2" />
                  <div className="dash-skeleton h-3 w-1/2" />
                </div>
              ))
            ) : recentPosts.data?.data.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p
                  className="text-sm"
                  style={{ color: 'var(--dash-text-muted)' }}
                >
                  No posts yet
                </p>
              </div>
            ) : (
              recentPosts.data?.data.map(post => (
                <Link
                  key={post.id}
                  to={`/admin/blog/${post.id}/edit`}
                  className="block px-5 py-3.5 transition-colors"
                  style={{ borderColor: 'var(--dash-border)' }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.background =
                      'var(--dash-surface-hover)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.background =
                      'transparent'
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--dash-text)' }}
                  >
                    {post.title}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: 'var(--dash-text-muted)' }}
                  >
                    {post.category?.name ?? 'Uncategorized'} •{' '}
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('pt-PT')
                      : 'Rascunho'}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="dash-card">
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid var(--dash-border)' }}
          >
            <h2
              className="text-sm font-semibold"
              style={{ color: 'var(--dash-text)' }}
            >
              Recent Projects
            </h2>
            <Link
              to="/admin/projects"
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: 'var(--dash-accent)' }}
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div
            className="divide-y"
            style={{ borderColor: 'var(--dash-border)' }}
          >
            {recentProjects.isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="px-5 py-3.5">
                  <div className="dash-skeleton h-4 w-3/4 mb-2" />
                  <div className="dash-skeleton h-3 w-1/2" />
                </div>
              ))
            ) : recentProjects.data?.data.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p
                  className="text-sm"
                  style={{ color: 'var(--dash-text-muted)' }}
                >
                  No projects yet
                </p>
              </div>
            ) : (
              recentProjects.data?.data.map(project => (
                <Link
                  key={project.id}
                  to={`/admin/projects`}
                  className="block px-5 py-3.5 transition-colors"
                  style={{ borderColor: 'var(--dash-border)' }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.background =
                      'var(--dash-surface-hover)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.background =
                      'transparent'
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--dash-text)' }}
                  >
                    {project.title}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: 'var(--dash-text-muted)' }}
                  >
                    {project.category ?? 'Uncategorized'} •{' '}
                    {project.client_name ?? 'Personal'}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dash-card lg:col-span-2">
          <div
            className="px-5 py-4"
            style={{ borderBottom: '1px solid var(--dash-border)' }}
          >
            <h2
              className="text-sm font-semibold"
              style={{ color: 'var(--dash-text)' }}
            >
              Quick Actions
            </h2>
          </div>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'New Post',
                path: '/admin/blog/new',
                icon: FileText,
                color: '#F13024'
              },
              {
                label: 'Add Project',
                path: '/admin/projects',
                icon: FolderOpen,
                color: '#3b82f6'
              },
              {
                label: 'Add Tech',
                path: '/admin/technologies',
                icon: Code2,
                color: '#22c55e'
              },
              {
                label: 'Add Certificate',
                path: '/admin/certificates',
                icon: Award,
                color: '#eab308'
              }
            ].map(action => (
              <Link
                key={action.path}
                to={action.path}
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-colors text-center"
                style={{ background: 'var(--dash-surface-hover)' }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    'var(--dash-surface-active)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    'var(--dash-surface-hover)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${action.color}18`,
                    color: action.color
                  }}
                >
                  <action.icon size={20} />
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: 'var(--dash-text)' }}
                >
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
