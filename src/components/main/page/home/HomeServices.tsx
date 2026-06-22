import { createElement } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { ButtonBase } from '../../../../components/main/ButtonBase'
import { RxArrowTopRight } from 'react-icons/rx'
import { FaWrench } from 'react-icons/fa'
import { useServiceViewModel } from '@/viewModels/service.viewmodel'
import { Skeleton } from '../../ui/Skeleton'
import { fadeUpItem } from '@/lib/animations'

export const HomeServices = () => {
  const { t } = useTranslation('home')
  const navigate = useNavigate()
  const { getAllServices } = useServiceViewModel()
  const { data: response, isLoading, isError } = getAllServices(4)

  const services = response?.data || []

  if (isError) return null

  return (
    <section id="services" className="relative py-24 overflow-hidden">
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
              className="px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 flex items-center gap-2 text-accent text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(241,48,36,0.15)] uppercase"
            >
              <FaWrench size={14} /> {t('services.badge')}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
            >
              {t('services.titlePrefix')}{' '}
              <span className="text-accent">{t('services.titleAccent')}</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-xl text-gray-400 text-sm md:text-base leading-relaxed"
            >
              {t('services.subtitle')}
            </motion.p>
          </div>

          {/* Services Cards / Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {isLoading ? (
               Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="relative p-7 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] flex flex-col gap-4 shadow-lg h-[220px]">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <Skeleton className="w-3/4 h-5 mt-2" />
                  <Skeleton className="w-full h-4 mt-2" />
                  <Skeleton className="w-5/6 h-4" />
                </div>
               ))
            ) : services.length > 0 ? (
              services.map((item, index) => (
                <motion.div
                  key={item.id ?? index}
                  variants={fadeUpItem}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    to="/services"
                    className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b14]"
                  >
                    {/* Top accent bar (grows on hover) */}
                    <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />

                    {/* Index */}
                    <span className="pointer-events-none absolute right-5 top-5 font-mono text-xs text-white/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex h-full flex-col gap-4">
                      {/* Icon */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.05] bg-accent/10 text-xl text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                        {item.icon && typeof item.icon === 'function' ? (
                          createElement(item.icon)
                        ) : (
                          <FaWrench />
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="mt-2 text-base font-semibold text-white">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="flex-1 text-sm leading-relaxed text-gray-400">
                        {item.description}
                      </p>

                      {/* Arrow indicator */}
                      <RxArrowTopRight className="text-lg text-accent opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-white/50 p-10 bg-white/5 rounded-2xl border border-white/10">
                   {t('services.empty')}
                </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6"
          >
            <ButtonBase onClick={() => navigate('/services')}>
              {t('services.viewAll')}
              <RxArrowTopRight className="ml-1" />
            </ButtonBase>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
