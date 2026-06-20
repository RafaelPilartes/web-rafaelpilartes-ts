// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import {
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
  RxRocket,
  RxArrowTopRight
} from 'react-icons/rx'
import { useTranslation } from 'react-i18next'

const WorkSlider = () => {
  const { t } = useTranslation('work')

  const wordData = [
    {
      icon: <RxPencil2 />,
      title: t('slider.items.0.title'),
      description: t('slider.items.0.description')
    },
    {
      icon: <RxDesktop />,
      title: t('slider.items.1.title'),
      description: t('slider.items.1.description')
    },
    {
      icon: <RxArrowTopRight />,
      title: t('slider.items.2.title'),
      description: t('slider.items.2.description')
    },
    {
      icon: <RxCrop />,
      title: t('slider.items.3.title'),
      description: t('slider.items.3.description')
    },
    {
      icon: <RxReader />,
      title: t('slider.items.4.title'),
      description: t('slider.items.4.description')
    },
    {
      icon: <RxRocket />,
      title: t('slider.items.5.title'),
      description: t('slider.items.5.description')
    }
  ]

  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true
      }}
      modules={[FreeMode, Pagination]}
      className="h-[280px] sm:h-[480px] "
    >
      {wordData.map((_item, index) => {
        return <SwiperSlide key={index}></SwiperSlide>
      })}
    </Swiper>
  )
}

export default WorkSlider
