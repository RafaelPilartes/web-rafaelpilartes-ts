import ServiceSlider from '../ServiceSlider'
import {
  RxPencil2,
  RxDesktop,
  RxArrowTopRight,
  RxCrop,
  RxReader,
  RxRocket
} from 'react-icons/rx'

const servicesData = {
  services: [
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
        'Criação de designs atraentes e criativos que ajudam a transmitir a mensagem da sua marca de forma única e memorável'
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
}

export const ServicesSection = () => {
  return (
    <div className="w-full gap-x-4 gap-y-6 mt-[60px] ">
      <div className="flex flex-col gap-x-8 ">
        {/* Slider */}
        <div className="w-full">
          <ServiceSlider services={servicesData.services} />
        </div>
      </div>
    </div>
  )
}
