import { ServiceEntity } from '@/core/entities/content/ServiceEntity'
import {
  RxPencil2,
  RxDesktop,
  RxArrowTopRight,
  RxCrop,
  RxReader,
  RxRocket
} from 'react-icons/rx'

export const mockServices: ServiceEntity[] = [
  new ServiceEntity({
    id: 'svc-1',
    icon: RxDesktop,
    title: 'Desenvolvimento Web',
    description:
      'Desenvolvimento de websites e aplicações web com as mais recentes tecnologias, criando uma presença online única e envolvente para o seu negócio.'
  }),
  new ServiceEntity({
    id: 'svc-2',
    icon: RxPencil2,
    title: 'Design Gráfico',
    description:
      'Criação de designs atraentes e criativos que ajudam a transmitir a mensagem da sua marca de forma única e memorável.'
  }),
  new ServiceEntity({
    id: 'svc-3',
    icon: RxArrowTopRight,
    title: 'Marketing Digital',
    description:
      'Soluções abrangentes de marketing digital, desde estratégias de mídia social até campanhas de e-mail marketing.'
  }),
  new ServiceEntity({
    id: 'svc-4',
    icon: RxCrop,
    title: 'Branding',
    description:
      'Através de uma abordagem estratégica, desenvolvemos uma identidade de marca coesa e autêntica.'
  }),
  new ServiceEntity({
    id: 'svc-5',
    icon: RxReader,
    title: 'Copywriting',
    description:
      'Criam conteúdo persuasivo e envolvente que atrai, convence e transforma os visitantes em clientes.'
  }),
  new ServiceEntity({
    id: 'svc-6',
    icon: RxRocket,
    title: 'SEO',
    description:
      'Aumente a visibilidade e a classificação do seu site nos mecanismos de busca com nosso serviço de SEO.'
  })
]
