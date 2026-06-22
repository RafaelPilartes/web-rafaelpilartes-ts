import { LinkSimple } from '../../components/main/Link'
import { SectionTitle } from '../../components/main/SectionTitle'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { motion } from 'framer-motion'

type PageIntroductionProps = {
  subtitle: string
  title: string
  description: string
  backLabel?: string
}
export const PageIntroduction = ({
  subtitle,
  title,
  description,
  backLabel = 'Voltar para Home'
}: PageIntroductionProps) => {
  return (
    <section className="relative w-full overflow-hidden px-4 pb-16 pt-32 md:pb-20 md:pt-40">
      {/* Dotted grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />

      {/* Accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      {/* Fade into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0a0b14]" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <SectionTitle
          subtitle={subtitle}
          title={title}
          className="items-center text-center [&>h3]:text-4xl [&>h3]:md:text-5xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="my-6 max-w-[640px] text-sm leading-relaxed text-white/60 sm:text-base"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LinkSimple
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-sm text-white/70 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
          >
            <HiArrowNarrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {backLabel}
          </LinkSimple>
        </motion.div>
      </div>
    </section>
  )
}
