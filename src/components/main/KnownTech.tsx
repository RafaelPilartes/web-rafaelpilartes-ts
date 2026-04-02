// import { getRelativeTimeString } from '@/utils/get-relative-time'
import { KnownTech as IKnownTech } from '../../types/projects'
// import { CMSIcon } from '@/components/cms-icon'

type KnownTechProps = {
  tech: IKnownTech
}

export const KnownTech = ({ tech }: KnownTechProps) => {
  const relativeTime = tech.startDate
  // const relativeTime = getRelativeTimeString(
  //   new Date(tech.startDate),
  //   'pt-BR',
  // ).replace('há ', '')
  return (
    <div className="p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col gap-2 hover:text-red-500 hover:bg-gray-600/30 hover:-translate-y-2 transition-all">
      <div className="flex items-center justify-between">
        <p className="font-medium text-white">{tech.name}</p>
        <span>{tech.iconSvg}</span>
        {/* <CMSIcon icon={tech.iconSvg} /> */}
      </div>

      <span className="text-gray-500">{relativeTime} de experiência</span>
    </div>
  )
}
