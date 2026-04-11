import { motion } from 'framer-motion'
import { KnownTech } from '../../../../components/main/KnownTech'
import { SectionTitle } from '../../../../components/main/SectionTitle'
import { useTechnologyViewModel } from '@/viewModels/technology.viewmodel'
import { Skeleton } from '../../ui/Skeleton'

export const HomeKnownTechs = () => {
  const { getAllTechnologies } = useTechnologyViewModel()
  const { data: response, isLoading, isError } = getAllTechnologies(8)

  const techs = response?.data || []

  if (isError) return null

  return (
    <section id="skills" className="container py-16">
      <SectionTitle subtitle="competências" title="Conhecimentos" />
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-x-4 gap-y-6 mt-[60px]">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-24 h-4 rounded-md" />
              </div>
              <Skeleton className="w-6 h-6 rounded-md" />
            </div>
          ))
        ) : techs.length > 0 ? (
          techs.map((tech, i) => (
            <motion.div
              key={tech.id || tech.name}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.15, delay: i * 0.1 }}
            >
              <KnownTech tech={tech} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full border border-white/10 p-10 text-center rounded-xl bg-white/5 text-white/50">
            Nenhuma competência registada ainda.
          </div>
        )}
      </div>
    </section>
  )
}
