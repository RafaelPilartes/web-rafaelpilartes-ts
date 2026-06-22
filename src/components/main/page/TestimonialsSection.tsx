import { useTestimonialViewModel } from '@/viewModels/testimonial.viewmodel'
import { TestimonialEntity } from '@/core/entities/content/TestimonialEntity'
import { Skeleton } from '../ui/Skeleton'
import {
  ScrollReelTestimonials,
  ScrollReelTestimonial
} from '@/components/ui/scroll-reel-testimonials'

export const TestimonialsSection = () => {
  const { getAllTestimonials } = useTestimonialViewModel()
  const { data: response, isLoading, isError } = getAllTestimonials()

  const testimonials = response?.data || []

  if (isError) return null

  if (isLoading) {
    return (
      <div className="mt-[60px] flex w-full max-w-[1060px] flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:flex-row md:items-center">
        <Skeleton className="h-56 w-full rounded-xl md:h-64 md:w-[340px]" />
        <div className="flex flex-1 flex-col gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className="mt-[60px] w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/50">
        Nenhum testemunho disponível
      </div>
    )
  }

  // Map CMS entities to the ScrollReel shape
  const mapped: ScrollReelTestimonial[] = testimonials.map(
    (t: TestimonialEntity) => ({
      quote: t.description,
      author: t.occupation ? `${t.name}, ${t.occupation}` : t.name,
      image: t.photo,
      alt: t.name
    })
  )

  return (
    <div className="mt-[60px] flex justify-center">
      <ScrollReelTestimonials testimonials={mapped} />
    </div>
  )
}
