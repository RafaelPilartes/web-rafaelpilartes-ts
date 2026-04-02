import Circles from '../../../components/main/Circles'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { ServicesSection } from '../../../components/main/page/ServicesSection'

const introductionData = {
  subtitle: 'serviços',
  title: 'Meus serviços',
  description:
    'Altamente qualificada estou pronto para atender às suas necessidades com uma ampla variedade de serviços especializados. Com um enfoque na excelência e inovação, ofereço soluções personalizadas para impulsionar o crescimento e o sucesso do seu negócio. a seguir estão alguns dos serviços que oferecemos:'
}
const Services = () => {
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <PageIntroduction {...introductionData} />

      <section className="container px-6">
        <ServicesSection />
      </section>

      <Circles />
    </main>
  )
}
export default Services
