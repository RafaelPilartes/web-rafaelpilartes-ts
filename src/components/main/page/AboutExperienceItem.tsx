import { TechBadge } from '../../../components/main/TechBadge'
import { motion } from 'framer-motion'
import { WorkExperienceEntity } from '@/core/entities/portfolio/WorkExperienceEntity'
import { fadeUpAnimation, techBadgeAnimation } from '../../../lib/animations'

type ExperienceItemProps = {
  experience: WorkExperienceEntity
}

export const ExperienceItem = ({ experience }: ExperienceItemProps) => {
  const {
    end_date,
    company_name,
    company_logo,
    company_url,
    role,
    technologies
  } = experience

  const startDate = experience.start_date
    ? new Date(experience.start_date)
    : new Date()
  const endDate = end_date ? new Date(end_date) : null

  const formatter = new Intl.DateTimeFormat('pt-PT', {
    month: 'short',
    year: 'numeric'
  })

  const formattedStartDate = formatter.format(startDate).replace(' de ', '/')
  const formattedEndDate = endDate
    ? formatter.format(endDate).replace(' de ', '/')
    : 'Presente'

  const end = endDate || new Date()

  const diffInMonths =
    (end.getFullYear() - startDate.getFullYear()) * 12 +
    (end.getMonth() - startDate.getMonth())
  const years = Math.floor(diffInMonths / 12)
  const monthsRemaining = diffInMonths % 12

  const formattedDuration =
    years > 0
      ? `${years} ano${years > 1 ? 's' : ''}${
          monthsRemaining > 0
            ? ` e ${monthsRemaining} mês${monthsRemaining > 1 ? 'es' : ''}`
            : ''
        }`
      : `${diffInMonths} mes${diffInMonths > 1 ? 'es' : ''}`

  return (
    <motion.div
      className="grid grid-cols-[48px,1fr] gap-6 md:gap-8 group"
      {...fadeUpAnimation}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline & Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] p-1.5 flex items-center justify-center group-hover:border-accent/40 shadow-lg transition-all duration-300">
          <img
            src={company_logo?.url}
            width={36}
            height={36}
            className="rounded-lg object-contain w-full h-full"
            alt={`Logo da empresa ${company_name}`}
          />
        </div>
        {/* Line */}
        <div className="h-full w-[2px] bg-gradient-to-b from-white/[0.1] to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className="flex flex-col gap-1.5 text-sm sm:text-base">
          <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
            {role}
          </h4>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <a
              href={company_url}
              target="_blank"
              className="font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
              rel="noreferrer"
            >
              @{company_name}
            </a>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400 capitalize">
              {formattedStartDate} — {formattedEndDate}
            </span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span className="text-accent/80 font-medium text-xs bg-accent/10 px-2 py-0.5 rounded-full">
              {formattedDuration}
            </span>
          </div>

          <div className="text-gray-400 text-sm leading-relaxed mt-3">
            {/* If we have an actual rich text renderer we could use it here.
                 For now, we'll just fall back to role. 
             */}
            {role}
          </div>
        </div>

        {technologies && technologies.length > 0 && (
          <div className="mt-5">
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <TechBadge
                  key={`experience-${company_name}-tech-${tech.name}`}
                  name={tech.name}
                  className="bg-white/[0.03] text-gray-400 border border-white/[0.08] hover:bg-accent/10 hover:text-accent hover:border-accent/30 py-1 px-3 text-xs"
                  {...techBadgeAnimation}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
