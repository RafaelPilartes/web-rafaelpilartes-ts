import { useTranslation } from 'react-i18next'
import Circles from '../../../components/main/Circles'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { ServicesSection } from '../../../components/main/page/ServicesSection'

const Services = () => {
  const { t } = useTranslation('services')

  const introductionData = {
    subtitle: t('subtitle'),
    title: t('title'),
    description: t('description'),
    backLabel: t('back')
  }

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
