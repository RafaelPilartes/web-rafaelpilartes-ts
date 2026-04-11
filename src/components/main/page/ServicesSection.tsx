import { createElement } from 'react'
import { motion } from 'framer-motion'
import { RxArrowTopRight } from 'react-icons/rx'
import { FaWrench } from 'react-icons/fa'
import { useServiceViewModel } from '@/viewModels/service.viewmodel'
import { Skeleton } from '../ui/Skeleton'

export const ServicesSection = () => {
  const { getAllServices } = useServiceViewModel()
  const { data: response, isLoading, isError } = getAllServices()
  
  const services = response?.data || []

  if (isError) return null

  return (
    <div className="w-full mt-[60px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
             <div key={index} className="bg-[#55555525] rounded-xl p-8 flex flex-col gap-4 border border-transparent h-[256px]">
                <Skeleton className="w-14 h-14 rounded-lg flex-shrink-0" />
                <Skeleton className="w-[60%] h-6" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-[90%] h-4" />
                <Skeleton className="w-[80%] h-4" />
             </div>
          ))
        ) : services.length > 0 ? (
          services.map((service, index) => (
            <motion.div
              key={service.id ?? index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="bg-[#55555525] rounded-xl p-8 flex flex-col gap-4 group cursor-pointer
                         hover:bg-[#a9414126] hover:-translate-y-2 transition-all duration-300
                         border border-transparent hover:border-accent/20"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-2xl group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {service.icon && typeof service.icon === 'function'
                  ? createElement(service.icon)
                  : <FaWrench />}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="text-xl text-gray-600 group-hover:text-accent transition-all duration-300 mt-auto">
                <RxArrowTopRight className="group-hover:rotate-45 transition-all duration-300" />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full border border-white/10 p-10 text-center rounded-xl bg-white/5 text-white/50">
            Nenhum serviço registado.
          </div>
        )}
      </div>
    </div>
  )
}
