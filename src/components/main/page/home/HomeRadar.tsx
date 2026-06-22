import { useTranslation } from 'react-i18next'
import {
  Code,
  Smartphone,
  PenTool,
  Wrench,
  Server,
  GitBranch,
  Database
} from 'lucide-react'
import { RadarRows, RadarItem } from '@/components/ui/radar-rows'
import { SectionTitle } from '../../SectionTitle'

const ICONS = [Code, Smartphone, PenTool, Wrench, Server, GitBranch, Database]

export const HomeRadar = () => {
  const { t } = useTranslation('home')
  const labels = t('radar.items', { returnObjects: true }) as string[]

  const items: RadarItem[] = labels.map((label, i) => {
    const Icon = ICONS[i] ?? Code
    return { label, icon: <Icon className="h-6 w-6" /> }
  })

  return (
    <section
      id="capabilities"
      className="relative z-10 overflow-hidden bg-[#0a0b14] pt-20 pb-0 -mb-14"
    >
      {/* Dotted grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />

      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)'
        }}
      />

      {/* Brand glow behind the radar */}
      <div className="pointer-events-none absolute left-1/2 top-[62%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="container relative mx-auto">
        <SectionTitle
          subtitle={t('radar.subtitle')}
          title={t('radar.title')}
          className="items-center text-center"
        />

        <div className="mt-16">
          <RadarRows items={items} />
        </div>
      </div>
    </section>
  )
}
