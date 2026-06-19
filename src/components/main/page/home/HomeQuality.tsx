import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../../SectionTitle'
import { CardQuality } from '../../CardQuality'
import { mockQualities } from '@/core/mocks/qualitiesMock'

export const HomeQuality = () => {
  const { t } = useTranslation('home')

  return (
    <section id="qualities" className="container relative py-16">
      <div className="flex flex-col">
        <div className="flex-1 relative mb-12 lg:mb-0 ">
          <SectionTitle
            subtitle={t('quality.subtitle')}
            title={t('quality.title')}
          />

          <h3 className="mb-16">
            {t('quality.description')}
          </h3>

          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-x-6 gap-y-6 mt-[60px]">
            {mockQualities?.map((quality, i) => (
              <motion.div
                key={quality.id ?? quality.name}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.15, delay: i * 0.1 }}
              >
                <CardQuality quality={quality} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
