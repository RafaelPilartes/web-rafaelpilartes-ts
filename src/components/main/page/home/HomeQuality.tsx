import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { RiLightbulbFlashLine } from 'react-icons/ri'
import { IoIosTimer } from 'react-icons/io'
import { FaCogs } from 'react-icons/fa'
import { SectionTitle } from '../../SectionTitle'
import { CardQuality } from '../../CardQuality'
import { QualityEntity } from '@/core/entities/content/QualityEntity'

const icons = [RiLightbulbFlashLine, IoIosTimer, FaCogs]
const ids = ['qual-1', 'qual-2', 'qual-3']

export const HomeQuality = () => {
  const { t } = useTranslation('home')
  const cards = t('quality.cards', { returnObjects: true }) as { name: string; description: string }[]

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
            {cards?.map((card, i) => {
              const quality = new QualityEntity({ id: ids[i], icon_svg: icons[i] as any, name: card.name, description: card.description })
              return (
                <motion.div
                  key={quality.id}
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.15, delay: i * 0.1 }}
                >
                  <CardQuality quality={quality} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
