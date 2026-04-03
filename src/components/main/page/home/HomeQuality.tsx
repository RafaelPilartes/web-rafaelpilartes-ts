import { motion } from 'framer-motion'
import { SectionTitle } from '../../SectionTitle'
import { CardQuality } from '../../CardQuality'
import { mockQualities } from '@/core/mocks/qualitiesMock'

export const HomeQuality = () => {
  return (
    <section id="qualities" className="container relative py-16">
      <div className="flex flex-col">
        <div className="flex-1 relative mb-12 lg:mb-0 ">
          <SectionTitle
            subtitle="o que me diferencia? "
            title="Minhas Qualidades"
          />

          <h3 className="mb-16">
            Sou conhecido por minha paixão, dedicação e comprometimento com cada
            projeto. Minhas habilidades em permitem abraçar desafios complexos e
            encontrar soluções criativas para superá-los. Juntamente com uma
            abordagem colaborativa, garante resultados excepcionais para meus
            clientes e parceiros.
          </h3>

          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-x-6 gap-y-6 mt-[60px]">
            {mockQualities?.map((quality, i) => (
              <motion.div
                key={quality.id ?? quality.name}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.15, delay: i * 0.1 }}
              >
                <CardQuality quality={quality} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
