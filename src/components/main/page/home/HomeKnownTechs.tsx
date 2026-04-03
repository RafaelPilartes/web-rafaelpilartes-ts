import { motion } from 'framer-motion'
import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
import { KnownTech } from '../../../../components/main/KnownTech'
import { SectionTitle } from '../../../../components/main/SectionTitle'

type HomeKnownTechsProps = {
  techs: TechnologyEntity[]
}

export const HomeKnownTechs = ({ techs }: HomeKnownTechsProps) => {
  return (
    <section id="skills" className="container py-16">
      <SectionTitle subtitle="competências" title="Conhecimentos" />
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-x-4 gap-y-6 mt-[60px]">
        {techs?.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.15, delay: i * 0.1 }}
          >
            <KnownTech tech={tech} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
