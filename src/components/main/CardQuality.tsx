import { QualityEntity } from '@/core/entities/content/QualityEntity'
import { createElement } from 'react'

type CardQualityProps = {
  quality: QualityEntity
  index?: number
}

export const CardQuality = ({ quality, index = 0 }: CardQualityProps) => {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_-15px_rgba(241,48,36,0.4)]">
      {/* Index watermark */}
      <span className="pointer-events-none absolute -right-1 -top-5 select-none font-mono text-7xl font-bold text-white/[0.04] transition-colors duration-300 group-hover:text-accent/10">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex flex-col gap-4">
        {/* Icon */}
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-accent/10 text-2xl text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-white">
          {typeof quality.icon_svg === 'function'
            ? createElement(quality.icon_svg)
            : quality.icon_svg}
        </span>

        <p className="text-xl font-semibold text-white">{quality.name}</p>

        <span className="text-sm leading-relaxed text-white/50">
          {quality.description}
        </span>

        {/* Growing accent line */}
        <span className="mt-2 h-px w-full origin-left scale-x-[0.15] bg-accent/60 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </div>
    </div>
  )
}
