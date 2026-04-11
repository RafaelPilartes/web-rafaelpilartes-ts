import TestimonialsSlider from '../TestimonialsSlider'
import { useTestimonialViewModel } from '@/viewModels/testimonial.viewmodel'
import { Skeleton } from '../ui/Skeleton'

export const TestimonialsSection = () => {
  const { getAllTestimonials } = useTestimonialViewModel()
  const { data: response, isLoading, isError } = getAllTestimonials()

  const testimonials = response?.data || []

  if (isError) return null

  return (
    <div className="w-full gap-x-4 gap-y-6 mt-[60px] ">
      <div className="flex flex-col gap-x-8 ">
        <div className="w-full">
          {isLoading ? (
            <div className="flex gap-4 overflow-hidden">
               {Array.from({ length: 3 }).map((_, idx) => (
                 <div key={idx} className="flex-shrink-0 w-[400px] p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-6">
                   <div className="flex items-center gap-4">
                     <Skeleton className="w-16 h-16 rounded-full" />
                     <div className="flex flex-col gap-2">
                       <Skeleton className="w-32 h-5" />
                       <Skeleton className="w-24 h-4" />
                     </div>
                   </div>
                   <Skeleton className="w-full h-24" />
                 </div>
               ))}
            </div>
          ) : testimonials.length > 0 ? (
            <TestimonialsSlider testimonials={testimonials} />
          ) : (
             <div className="text-center text-white/50 p-6 border border-white/10 rounded-2xl bg-white/5 w-full">
                 Nenhum testemunho disponível
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
