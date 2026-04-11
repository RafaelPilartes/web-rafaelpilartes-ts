// import { getRelativeTimeString } from '@/utils/get-relative-time'
import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
// import { CMSIcon } from '@/components/cms-icon'

type KnownTechProps = {
  tech: TechnologyEntity
}

import { differenceInYears } from 'date-fns'
import { CMSIcon } from './CMSIcon'

export const KnownTech = ({ tech }: KnownTechProps) => {
  const years = tech.start_date
    ? differenceInYears(new Date(), tech.start_date)
    : 0
  const relativeTime =
    years > 0 ? `${years} ano${years > 1 ? 's' : ''}` : 'Menos de um ano'
  return (
    <div className="p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col gap-2 hover:text-red-500 hover:bg-gray-600/30 hover:-translate-y-2 transition-all">
      <div className="flex items-center justify-between">
        <p className="font-medium text-white">{tech.name}</p>
        {tech.icon_svg && <CMSIcon icon={tech.icon_svg} />}
      </div>

      <span className="text-gray-500">{relativeTime} de experiência</span>
    </div>
  )
}
