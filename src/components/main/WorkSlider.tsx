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

const wordData = [
  {
    icon: <RxPencil2 />,
    title: 'Desenvolvimento de website',
    description:
      'Desenvolvimento de websites criarão uma presença online única e envolvente para o seu negócio'
  },
  {
    icon: <RxDesktop />,
    title: 'Design gráfico',
    description:
      'Crio designs atraentes e criativos que ajudam a transmitir a mensagem da sua marca de forma única e memorável'
  },
  {
    icon: <RxArrowTopRight />,
    title: 'Marketing Digital',
    description:
      'Soluções abrangentes de marketing digital, desde estratégias de mídia social até campanhas de e-mail marketing'
  },
  {
    icon: <RxCrop />,
    title: 'Branding',
    description:
      'Através de uma abordagem estratégica, desenvolvemos uma identidade de marca coesa e autêntica'
  },
  {
    icon: <RxReader />,
    title: 'Copywriting',
    description:
      'Criam conteúdo persuasivo e envolvente que atrai, convence e transforma os visitantes em clientes'
  },
  {
    icon: <RxRocket />,
    title: 'SEO',
    description:
      'Aumente a visibilidade e a classificação do seu site nos mecanismos de busca com nosso serviço de SEO'
  }
]

const WorkSlider = () => {
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
