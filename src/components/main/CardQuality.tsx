import { Quality } from '../../types/quality'

type CardQualityProps = {
  quality: Quality
}

export const CardQuality = ({ quality }: CardQualityProps) => {
  return (
    <div className="p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col gap-4 hover:text-red-500 hover:bg-gray-600/30 hover:-translate-y-2 transition-all">
      <span className="text-4xl text-accent">{quality.iconSvg}</span>

      <p className="font-medium text-xl text-white">{quality.name}</p>

      <span className="text-gray-400 text-sm ">{quality.description}</span>
    </div>
  )
}
