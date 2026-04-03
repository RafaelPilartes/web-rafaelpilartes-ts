import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { projectCategoryLabels } from '@/core/mocks/projectsMock'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { TbBrandGithub } from 'react-icons/tb'
import { HiOutlineTrendingUp } from 'react-icons/hi'

type ProjectCardProps = {
  project: ProjectEntity
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const categoryLabel = project.category
    ? projectCategoryLabels[project.category]
    : undefined

  return (
    <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] overflow-hidden group hover:border-accent/20 transition-all duration-300 flex flex-col">
      {/* Image Area */}
      <div className="relative p-4 pb-0">
        {/* Category Badge */}
        {categoryLabel && (
          <span className="absolute top-6 left-6 z-10 text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white">
            {categoryLabel}
          </span>
        )}

        {/* Thumbnail */}
        <div className="relative rounded-xl overflow-hidden h-[200px] bg-gray-900">
          <img
            src={project.thumbnail.url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Link Icons Overlay (bottom-right) */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            {project.live_project_url && (
              <a
                href={project.live_project_url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all"
              >
                <HiArrowTopRightOnSquare size={16} />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all"
              >
                <TbBrandGithub size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-4 flex flex-col flex-1 gap-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 flex-1">
          {project.short_description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.technologies?.map((tech) => (
            <span
              key={tech.name}
              className="text-xs px-3 py-1 rounded-full border border-accent/20 text-accent bg-accent/5"
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Highlight Stat */}
        {project.highlight && (
          <div className="flex items-center gap-2 mt-2 pt-3 border-t border-white/[0.06]">
            <HiOutlineTrendingUp className="text-accent" size={16} />
            <span className="text-xs font-medium text-accent">
              {project.highlight}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
