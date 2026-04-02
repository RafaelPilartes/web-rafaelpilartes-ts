import { motion } from 'framer-motion'
import { Project } from '../../../../types/projects'
import { TechBadge } from '../../TechBadge'
import { techBadgeAnimation } from '../../../../lib/animations'
import { HorizontalDivider } from '../../HorizontalDivider'
import { ButtonCenterHover } from '../../ButtonCenterHover'
import { TbBrandGithub } from 'react-icons/tb'
import { FiGlobe } from 'react-icons/fi'
import { ButtonCenterHoverReverse } from '../../ButtonCenterHoverReverse'

type ProjectDetailsProps = {
  project: Project
}

export const WorkDetailsHeroContainer = ({ project }: ProjectDetailsProps) => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-end relative overflow-hidden bg-gradient-to-r from-primary/10 via-black/30 z-[1] ">
      {/* Text */}
      <div className="container text-left flex flex-col justify-end gap-4 xl:pt-40 xl:text-left h-full py-20 mx-auto ">
        {/* Date */}
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-gray-200 text-left max-w-3xl max-0 line-clamp-2"
        >
          {project.createdAt}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:h2 font-bold line-clamp-2"
        >
          {project.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-gray-200 text-left max-w-3xl max-0 line-clamp-5"
        >
          {project.shortDescription}
        </motion.p>

        {/* TechBadge */}
        <div className="flex flex-wrap gap-x-2 gap-y-3 py-2 lg:max-w-[340px]">
          {project.technologies.map((tech, i) => (
            <TechBadge
              name={tech.name}
              key={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Line */}
        <HorizontalDivider className="bg-gradient-to-r to-primary/10 from-white/60" />

        {/* Buttons */}
        <motion.div
          className="flex items-center gap-2 sm:gap-4 flex-col sm:flex-row"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <ButtonCenterHoverReverse className="min-w-[180px]">
                <TbBrandGithub size={20} />
                Repositório
              </ButtonCenterHoverReverse>
            </a>
          )}
          {project.liveProjectUrl && (
            <a href={project.liveProjectUrl} target="_blank" rel="noreferrer">
              <ButtonCenterHover className="min-w-[180px]">
                <FiGlobe size={20} />
                Projeto Online
              </ButtonCenterHover>
            </a>
          )}
        </motion.div>
      </div>

      {/* Shadow */}
      <div className="w-full h-full bg-primary/[0.9] absolute right-0 bottom-0 pointer-events-none z-[-1]"></div>

      {/* Image */}
      <div
        className="w-full h-full absolute right-0 bottom-0 blur-[2px] pointer-events-none inset-0 z-[-2]"
        style={{
          background: `url(${project.pageThumbnail.url}) no-repeat center/cover`
        }}
      ></div>
    </section>
  )
}
