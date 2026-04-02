import Circles from '../../../components/main/Circles'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { TestimonialsSection } from '../../../components/main/page/TestimonialsSection'

const introductionData = {
  subtitle: 'testemunhos',
  title: 'O que os clientes dizem',
  description:
    'Confiança do cliente impulsiona minha paixão por oferecer resultados excepcionais. Explore os relatos inspiradores de clientes satisfeitos, parceiros e colaboradores que compartilham suas experiências positivas com meu trabalho:'
}
const Testimonials = () => {
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <PageIntroduction {...introductionData} />

      <section className="container">
        <TestimonialsSection />
      </section>

      <Circles />
    </main>
  )
}
export default Testimonials
