import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { RxArrowTopRight } from 'react-icons/rx'
import { SectionTitle } from '../../../../components/main/SectionTitle'
import { ButtonBase } from '../../../../components/main/ButtonBase'
import { useProjectViewModel } from '@/viewModels/project.viewmodel'
import { useNavigate, Link } from 'react-router-dom'
import { Skeleton } from '../../ui/Skeleton'
import { cn } from '@/lib/tailwind-merge'
import { fadeUpItem } from '@/lib/animations'
import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'

const ProjectCard = ({
  project,
  index = 0,
  className
}: {
  project: ProjectEntity
  index?: number
  className?: string
}) => {
  return (
    <motion.div
      variants={fadeUpItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1 }}
      className={cn('relative', className)}
    >
      <Link
        to={`/works/details/${project.id}/${project.slug}`}
        className="group relative block h-full overflow-hidden rounded-xl border border-white/10 transition-colors duration-300 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b14]"
      >
        {/* Image */}
        <img
          src={project.thumbnail?.url || '/thumb3.jpg'}
          width={800}
          height={800}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Legibility gradient (always visible) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Corner arrow (appears on hover) */}
        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:opacity-100">
          <RxArrowTopRight />
        </span>

        {/* Content (always visible, lifts slightly on hover) */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 transition-transform duration-300 group-hover:-translate-y-1">
          <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-xs capitalize text-accent backdrop-blur-sm">
            {project.category?.replace('_', ' ') || 'Projeto'}
          </span>
          <span className="text-2xl font-semibold text-white">
            {project.title}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export const HomeProjects = () => {
  const { t } = useTranslation('home')
  const navigate = useNavigate()
  const { getAllProjects } = useProjectViewModel()
  const { data: response, isLoading, isError } = getAllProjects(3) // Top 3

  const projects = response?.data || []

  if (isError) {
    return null // Esconde a secção se falhar
  }

  return (
    <section id="projects" className="container relative py-16">
      <SectionTitle
        subtitle={t('projects.subtitle')}
        title={t('projects.sectionTitle')}
      />

      <div className="mt-10 flex flex-col gap-x-10 lg:flex-row">
        <div className="mb-10 flex flex-1 flex-col gap-y-12 lg:mb-0">
          {/* Text */}
          <div className="flex-1">
            <h3 className="h2 leading-tight text-accent">
              {t('projects.heading')}
            </h3>
            <p className="mb-6 mt-6 max-w-lg">{t('projects.description')}</p>
            <ButtonBase onClick={() => navigate('/works')}>
              {t('projects.viewAll')}
            </ButtonBase>
          </div>

          {/* First Column Image (Project 0) */}
          {isLoading ? (
            <Skeleton className="h-[400px] w-full flex-1 rounded-xl" />
          ) : projects[0] ? (
            <ProjectCard
              project={projects[0]}
              index={0}
              className="min-h-[300px] flex-1"
            />
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/50">
              {t('projects.comingSoon')}
            </div>
          )}
        </div>

        {/* Second Column Images (Projects 1 & 2) */}
        <div className="flex flex-1 flex-col gap-10">
          {isLoading ? (
            <>
              <Skeleton className="h-[300px] w-full flex-1 rounded-xl" />
              <Skeleton className="h-[300px] w-full flex-1 rounded-xl" />
            </>
          ) : (
            [1, 2].map(index => {
              const project = projects[index]
              if (!project) return null
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  className="min-h-[250px] flex-1"
                />
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
