import { useTranslation } from 'react-i18next'
import { useTechnologyViewModel } from '@/viewModels/technology.viewmodel'
import { Skeleton } from '../../ui/Skeleton'
import { PixelCanvas } from '@/components/ui/pixel-canvas'
import { CMSIcon } from '../../CMSIcon'

const PIXEL_COLORS = ['#F13024', '#ff6a5e', '#ffffff']

// 14 perimeter cells around a centered text block (cols 2-4 / rows 2-3).
// Order fills the full top and bottom rows first, then the side cells.
const POSITIONS = [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
  [2, 1],
  [2, 5],
  [3, 1],
  [3, 5]
] as const

export const HomeKnownTechs = () => {
  const { t } = useTranslation('home')
  const { getAllTechnologies } = useTechnologyViewModel()
  const { data: response, isLoading, isError } = getAllTechnologies(14)

  const techs = response?.data || []

  if (isError) return null

  return (
    <section id="skills" className="container py-16">
      <div className="overflow-x-auto">
        <div
          className="mx-auto grid min-w-[720px] max-w-[1160px] grid-cols-5 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
          style={{ gridTemplateRows: 'repeat(4, minmax(130px, 1fr))' }}
        >
          {POSITIONS.map(([row, col], i) => {
            const style = { gridRow: row, gridColumn: col }

            if (isLoading) {
              return (
                <div
                  key={`${row}-${col}`}
                  className="grid place-items-center gap-2 bg-[#0a0b14] p-4"
                  style={style}
                >
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
              )
            }

            const tech = techs[i]
            if (!tech) {
              return (
                <div
                  key={`${row}-${col}`}
                  className="bg-[#0a0b14]"
                  style={style}
                />
              )
            }

            return (
              <div
                key={tech.id || tech.name}
                className="group relative isolate grid cursor-pointer place-items-center overflow-hidden bg-[#0a0b14] p-4 transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(241,48,36,0.4)]"
                style={style}
              >
                <PixelCanvas colors={PIXEL_COLORS} gap={5} speed={30} />
                <div className="relative z-[1] flex flex-col items-center gap-1.5 text-center">
                  {tech.icon_svg && (
                    <span className="text-white/70 transition-colors duration-300 group-hover:text-accent">
                      <CMSIcon icon={tech.icon_svg} />
                    </span>
                  )}
                  <p className="text-sm font-medium text-white">{tech.name}</p>
                  {/* <span className="text-xs text-white/40">{relativeTime}</span> */}
                </div>
              </div>
            )
          })}

          {/* Centered title block */}
          <div
            className="flex flex-col items-center justify-center gap-3 bg-[#0a0b14] px-6 text-center"
            style={{ gridColumn: '2 / span 3', gridRow: '2 / span 2' }}
          >
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
              {t('knownTechs.subtitle')}
            </span>
            <h2 className="h2 text-white">{t('knownTechs.title')}</h2>
          </div>
        </div>
      </div>
    </section>
  )
}
