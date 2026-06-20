import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../../../../components/main/SectionTitle'
import { TestimonialsSection } from '../TestimonialsSection'

export const HomeTestimonials = () => {
  const { t } = useTranslation('home')

  return (
    <section id="testimonials" className="container py-16">
      <SectionTitle subtitle={t('testimonials.subtitle')} title={t('testimonials.title')} />
      <TestimonialsSection />
    </section>
  )
}
