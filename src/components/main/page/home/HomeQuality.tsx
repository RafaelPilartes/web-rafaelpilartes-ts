import { motion } from 'framer-motion'
import { RiLightbulbFlashLine } from 'react-icons/ri'
import { FaCogs } from 'react-icons/fa'
import { IoIosTimer } from 'react-icons/io'
import { SectionTitle } from '../../SectionTitle'
import { CardQuality } from '../../CardQuality'

const quality = [
  {
    iconSvg: (<RiLightbulbFlashLine />) as any,
    name: 'Criatividade',
    description:
      'Minha mente está sempre fervilhando de ideias criativas. Amo explorar diferentes abordagens e conceitos inovadores para cada projeto, proporcionando soluções únicas e atraentes que se destacam no mercado.'
  },
  {
    iconSvg: (<IoIosTimer />) as any,
    name: 'Dedicação Incansável',
    description:
      'Estou comprometido(a) em entregar resultados excepcionais para cada projeto que assumo. Minha dedicação incansável me impulsiona a trabalhar arduamente, superar obstáculos e garantir que cada detalhe seja cuidadosamente tratado.'
  },
  {
    iconSvg: (<FaCogs />) as any,
    name: 'Inovação Constante',
    description:
      'Estou sempre buscando aprender e evoluir. Mantenho-me atualizado(a) com as últimas tendências e tecnologias em meu campo de atuação, o que me permite trazer inovação e novas perspectivas para cada projeto.'
  }
]

export const HomeQuality = () => {
  return (
    <section className="container relative py-16">
      <div className="flex flex-col">
        {/* Text */}
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
            {quality?.map((quality, i) => (
              <motion.div
                key={quality.name}
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
