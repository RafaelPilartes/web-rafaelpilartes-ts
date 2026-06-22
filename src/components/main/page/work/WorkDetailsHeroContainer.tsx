import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getDateLocale } from '@/utils/dateLocale'
import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { HorizontalDivider } from '../../HorizontalDivider'
import { ButtonCenterHover } from '../../ButtonCenterHover'
import { ButtonCenterHoverReverse } from '../../ButtonCenterHoverReverse'
import { TbBrandGithub } from 'react-icons/tb'
import { FiGlobe } from 'react-icons/fi'

type ProjectDetailsProps = {
  project: ProjectEntity
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }
}

export const WorkDetailsHeroContainer = ({ project }: ProjectDetailsProps) => {
  const { t, i18n } = useTranslation('work')

  const date = project.created_at
    ? new Date(project.created_at).toLocaleDateString(
        getDateLocale(i18n.language)
      )
    : ''
  const categoryLabel = project.category
    ? (t(`details.categories.${project.category.toLowerCase()}`, {
        defaultValue: project.category
      }) as string)
    : ''

  return (
    <section className="relative flex min-h-[90vh] w-full items-end overflow-hidden bg-[#0a0b14]">
      {/* Background image */}
      <img
        src={project.page_thumbnail?.url || project.thumbnail?.url}
        alt={project.title}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      {/* Legibility scrims */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#0a0b14] via-[#0a0b14]/75 to-[#0a0b14]/20" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#0a0b14]/80 via-[#0a0b14]/20 to-transparent" />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex flex-col gap-5 py-20">
        {/* Eyebrow: category + date */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 font-mono text-sm"
        >
          {categoryLabel && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-accent">
              {categoryLabel}
            </span>
          )}
          {date && <span className="text-white/50">{date}</span>}
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl"
        >
          {project.title}
        </motion.h1>

        {/* Short description */}
        {project.short_description && (
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl !leading-relaxed text-white/70"
          >
            {project.short_description}
          </motion.p>
        )}

        {/* Tech (outlined pills) */}
        {project.technologies && project.technologies.length > 0 && (
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {project.technologies.map(tech => (
              <span
                key={tech.name}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur-sm"
              >
                {tech.name}
              </span>
            ))}
          </motion.div>
        )}

        <HorizontalDivider className="bg-gradient-to-r from-white/40 to-transparent" />

        {/* Buttons */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer">
              <ButtonCenterHoverReverse className="min-w-[180px]">
                <TbBrandGithub size={20} />
                {t('details.repository')}
              </ButtonCenterHoverReverse>
            </a>
          )}
          {project.live_project_url && (
            <a href={project.live_project_url} target="_blank" rel="noreferrer">
              <ButtonCenterHover className="min-w-[180px]">
                <FiGlobe size={20} />
                {t('details.liveProject')}
              </ButtonCenterHover>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
