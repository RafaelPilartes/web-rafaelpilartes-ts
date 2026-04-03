import { SectionTitle } from '../../../../components/main/SectionTitle'
import { TestimonialsSection } from '../TestimonialsSection'

export const HomeTestimonials = () => {
  return (
    <section id="testimonials" className="container py-16">
      <SectionTitle subtitle="testemunhos" title="O que os clientes dizem" />
      <TestimonialsSection />
    </section>
  )
}
