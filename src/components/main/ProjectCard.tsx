import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { TbBrandGithub } from 'react-icons/tb'
import { Link } from 'react-router-dom'

type ProjectCardProps = {
  project: ProjectEntity
  index: number
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isReversed = index % 2 !== 0
  const projectNumber = (index + 1).toString().padStart(2, '0')

  return (
    <div className="relative group py-4 lg:py-8 w-full">
      {/* Desktop layout: flex row with overlap via negative margin */}
      <div
        className={`flex flex-col lg:flex-row lg:items-center gap-0 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
      >
        {/* Content Area */}
        <div
          className={`relative z-20 flex flex-col w-full lg:w-[55%] xl:w-[50%]
            ${isReversed ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}
            ${isReversed ? 'lg:mr-[10%]' : ''}
            p-6 lg:p-0 transition-all duration-500`}
        >
          {/* Project Type / Number */}
          <div
            className={`flex items-center gap-3 mb-2 w-full ${isReversed ? 'lg:justify-end' : 'lg:justify-start'}`}
          >
            <span className="text-accent font-mono text-sm tracking-widest">
              {projectNumber}.
            </span>
            <span className="text-accent text-xs font-mono tracking-widest uppercase">
              Projeto em Destaque
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-5 group-hover:text-accent transition-colors">
            <Link to={`/works/details/${project.id}/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Description Card */}
          <div className="relative mb-5 lg:mb-6 w-full max-w-xl group-hover:-translate-y-1 transition-transform duration-300">
            <div className="lg:bg-[#112240] p-5 lg:p-6 rounded-sm shadow-2xl border border-white/5 backdrop-blur-md">
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                {project.short_description}
              </p>
            </div>
          </div>

          {/* Tech List */}
          <ul
            className={`flex flex-wrap gap-x-5 gap-y-2 mb-6 text-xs lg:text-sm font-mono text-gray-400 
              ${isReversed ? 'lg:justify-end' : 'lg:justify-start'}`}
          >
            {project.technologies?.map(tech => (
              <li
                key={tech.name}
                className="hover:text-accent transition-colors"
              >
                {tech.name}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div
            className={`flex items-center gap-5 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'}`}
          >
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-accent transition-colors hover:-translate-y-1"
                title="GitHub Repository"
              >
                <TbBrandGithub size={22} />
              </a>
            )}
            {project.live_project_url && (
              <a
                href={project.live_project_url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-accent transition-colors hover:-translate-y-1"
                title="Site ao Vivo"
              >
                <HiArrowTopRightOnSquare size={22} />
              </a>
            )}
          </div>
        </div>

        {/* Image Area */}
        <div
          className={`absolute inset-0 lg:inset-auto lg:relative lg:block h-full lg:h-[350px] lg:w-[55%] xl:w-[55%]
            ${isReversed ? 'lg:-mr-[10%]' : 'lg:-ml-[10%]'}
            rounded-sm overflow-hidden shadow-2xl transition-all duration-500 z-0 lg:z-10 bg-[#112240]`}
        >
          <Link
            to={`/works/details/${project.id}/${project.slug}`}
            className="block w-full h-full relative"
          >
            {/* Overlay for desktop tint */}
            <div className="absolute inset-0 bg-blue-700/20 lg:bg-blue-700/30 group-hover:bg-transparent transition-all duration-500 z-20" />

            <img
              src={project.thumbnail.url || '/placeholder-project.jpg'}
              alt={project.title}
              className="w-full h-full object-cover lg:grayscale-[50%] group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700"
            />

            {/* Mobile/Tablet Background Fade */}
            <div className="absolute inset-0 bg-black/85 lg:hidden z-10" />
          </Link>
        </div>
      </div>
    </div>
  )
}
