import { createElement } from 'react'
import { motion } from 'framer-motion'
import { FaWrench } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useServiceViewModel } from '@/viewModels/service.viewmodel'
import { Skeleton } from '../ui/Skeleton'

export const ServicesSection = () => {
  const { t } = useTranslation('services')
  const { getAllServices } = useServiceViewModel()
  const { data: response, isLoading, isError } = getAllServices()

  const services = response?.data || []

  if (isError) return null

  return (
    <div className="w-full mt-[60px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex h-[256px] flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8"
            >
              <Skeleton className="h-14 w-14 flex-shrink-0 rounded-xl" />
              <Skeleton className="h-6 w-[60%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          ))
        ) : services.length > 0 ? (
          services.map((service, index) => (
            <motion.div
              key={service.id ?? index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_10px_40px_-15px_rgba(241,48,36,0.4)]"
            >
              {/* Top accent bar (grows on hover) */}
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />

              {/* Index */}
              <span className="pointer-events-none absolute right-6 top-6 font-mono text-sm text-white/20">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.05] bg-accent/10 text-2xl text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                {service.icon && typeof service.icon === 'function' ? (
                  createElement(service.icon)
                ) : (
                  <FaWrench />
                )}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-lg font-semibold text-white">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                {service.description}
              </p>

              {/* Growing accent line */}
              <span className="mt-6 block h-px w-full origin-left scale-x-[0.15] bg-accent/50 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full border border-white/10 p-10 text-center rounded-2xl bg-white/5 text-white/50">
            {t('empty')}
          </div>
        )}
      </div>
    </div>
  )
}
