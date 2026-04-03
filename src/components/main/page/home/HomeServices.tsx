import { createElement } from 'react'
import { motion } from 'framer-motion'
import { ButtonBase } from '../../../../components/main/ButtonBase'
import { mockServices } from '@/core/mocks/servicesMock'
import { RxArrowTopRight } from 'react-icons/rx'
import { FaWrench } from 'react-icons/fa'

const topServices = mockServices.slice(0, 4)

export const HomeServices = () => {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background Grid Pattern */}
      {/* <div
        className="absolute  inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      /> */}
      {/* Subtle radial gradient to highlight the center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col gap-12 items-center">
          {/* Header row */}
          <div className="flex flex-col items-center justify-center text-center gap-5">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 flex items-center gap-2 text-accent text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] uppercase"
            >
              <FaWrench size={14} />o que eu ofereço
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
            >
              Feito para inovar. Projetado para{' '}
              <span className="text-accent">resultados.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-xl text-gray-400 text-sm md:text-base leading-relaxed"
            >
              Soluções completas para transformar as suas ideias em experiências
              digitais excepcionais.
            </motion.p>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {topServices.map((item, index) => (
              <motion.div
                key={item.id ?? index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative p-7 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]
                            hover:border-accent/30 hover:-translate-y-1 group transition-all duration-300 flex flex-col gap-4 shadow-lg shadow-black/10"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-white/[0.05] flex items-center justify-center text-accent text-xl group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300">
                  {typeof item.icon === 'function'
                    ? createElement(item.icon)
                    : item.icon}
                </div>

                {/* Title */}
                <h4 className="text-base font-semibold text-white mt-2">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6"
          >
            <ButtonBase onClick={() => (window.location.href = '/services')}>
              Ver todos os serviços
              <RxArrowTopRight className="ml-1" />
            </ButtonBase>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
