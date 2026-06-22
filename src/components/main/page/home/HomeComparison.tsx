import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../../SectionTitle'
import { ComparisonSlider } from '@/components/ui/comparison-slider'

export const HomeComparison = () => {
  const { t } = useTranslation('home')

  return (
    <section id="comparison" className="container py-16">
      <SectionTitle
        subtitle={t('comparison.subtitle')}
        title={t('comparison.title')}
        description={t('comparison.description')}
      />

      <div className="mt-12 w-full">
        <ComparisonSlider
          before="/after_image.png"
          after="/before_image.png"
          beforeLabel={t('comparison.codeLabel')}
          afterLabel={t('comparison.designLabel')}
          beforeAlt="Loja de moda — site final em código"
          afterAlt="Loja de moda — wireframe de design"
        />
      </div>
    </section>
  )
}
