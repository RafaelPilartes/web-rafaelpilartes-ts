import { LinkSimple } from '../../components/main/Link'
import { TechBadge } from '../../components/main/TechBadge'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { Project } from '../../types/projects'
import { fadeUpAnimation } from '../../lib/animations'

type ProjectCardProps = {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      className="flex gap-6 lg:gap-12 flex-col lg:flex-row py-4 px-4 rounded-md group hover:bg-white/[0.03] hover:backdrop-blur-sm transition-all duration-200"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-[200px] sm:h-[300px] lg:w-[420px] lg:min-h-full rounded-lg overflow-hidden transition-all duration-500"
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.5 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <img
          src={project.thumbnail.url}
          width={420}
          height={304}
          alt=""
          className="w-full h-full rounded-lg group-hover:scale-125 transition-all duration-500"
        />
      </motion.div>

      <div className="flex-1 lg:py-[18px]">
        <motion.h3
          className="flex items-center gap-3 font-medium text-lg text-gray-50"
          {...fadeUpAnimation}
          transition={{ duration: 0.7 }}
        >
          <img
            width={20}
            height={20}
            alt=""
            src="/icons/project-title-icon.svg"
          />
          {project.title}
        </motion.h3>

        <motion.p
          className="text-gray-400 my-6 line-clamp-3"
          {...fadeUpAnimation}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          {project.shortDescription}
        </motion.p>

        <div className="flex gap-x-2 gap-y-3 flex-wrap lg:max-w-[350px] mb-8">
          {project.technologies.map((tech, i) => (
            <TechBadge
              name={tech.name}
              key={`${project.title}-tech-${tech.name}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2, delay: 0.5 + i * 0.1 }}
              className="hover:-translate-y-2"
            />
          ))}
        </div>

        <LinkSimple
          to={`/works/${project.slug}`}
          className="group-hover:text-red-500 py-3 px-1"
        >
          Ver projeto
          <AiOutlineArrowRight className="-rotate-[34deg] group-hover:-translate-y-[1px] group-hover:translate-x-[1px] transition-all" />
        </LinkSimple>
      </div>
    </motion.div>
  )
}
