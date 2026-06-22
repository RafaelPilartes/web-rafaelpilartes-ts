import { useTranslation } from 'react-i18next'
import { Search, PenTool, Code, CheckCircle, Rocket } from 'lucide-react'
import RadialOrbitalTimeline, {
  TimelineItem
} from '@/components/ui/radial-orbital-timeline'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

type Step = { title: string; date: string; content: string }

export const HomeProcess = () => {
  const { t } = useTranslation('home')
  const steps = t('process.steps', { returnObjects: true }) as Step[]

  const icons = [Search, PenTool, Code, CheckCircle, Rocket]
  const statuses: TimelineItem['status'][] = [
    'completed',
    'completed',
    'in-progress',
    'pending',
    'pending'
  ]
  const energies = [100, 85, 65, 45, 25]
  const related = [[2], [1, 3], [2, 4], [3, 5], [4]]

  const timelineData: TimelineItem[] = steps.map((s, i) => ({
    id: i + 1,
    title: s.title,
    date: s.date,
    content: s.content,
    category: 'process',
    icon: icons[i] ?? Code,
    relatedIds: related[i] ?? [],
    status: statuses[i] ?? 'pending',
    energy: energies[i] ?? 50
  }))

  return (
    <section
      id="process"
      className="relative z-10 overflow-hidden bg-[#0a0b14] py-10"
    >
      {/* Animated shader background */}
      <AnimatedShaderBackground className="pointer-events-none absolute inset-0 z-0 opacity-70" />
      {/* Darkening overlay for legibility */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#0a0b14]/55" />

      {/* Heading (normal flow, above the orbit) */}
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
          {t('process.subtitle')}
        </span>
        <h2 className="h2 text-white">{t('process.title')}</h2>
        <p className="max-w-md text-sm !leading-relaxed text-white/50">
          {t('process.description')}
        </p>
      </div>

      {/* Orbit area: tall enough to keep full size, with a gap from the title */}
      <div className="relative z-10 mt-6 h-[68vh] min-h-[540px]">
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  )
}
