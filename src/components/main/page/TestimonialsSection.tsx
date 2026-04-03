import TestimonialsSlider from '../TestimonialsSlider'
import { mockTestimonials } from '@/core/mocks/testimonialsMock'

export const TestimonialsSection = () => {
  return (
    <div className="w-full gap-x-4 gap-y-6 mt-[60px] ">
      <div className="flex flex-col gap-x-8 ">
        <div className="w-full">
          <TestimonialsSlider testimonials={mockTestimonials} />
        </div>
      </div>
    </div>
  )
}
