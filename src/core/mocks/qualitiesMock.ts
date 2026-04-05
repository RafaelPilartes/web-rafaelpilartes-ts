import { QualityEntity } from '@/core/entities/content/QualityEntity'
import { RiLightbulbFlashLine } from 'react-icons/ri'
import { FaCogs } from 'react-icons/fa'
import { IoIosTimer } from 'react-icons/io'

export const mockQualities: QualityEntity[] = [
  new QualityEntity({
    id: 'qual-1',
    icon_svg: RiLightbulbFlashLine as any,
    name: 'Criatividade',
    description:
      'Minha mente está sempre fervilhando de ideias criativas. Amo explorar diferentes abordagens e conceitos inovadores para cada projeto, proporcionando soluções únicas e atraentes que se destacam no mercado.'
  }),
  new QualityEntity({
    id: 'qual-2',
    icon_svg: IoIosTimer as any,
    name: 'Dedicação Incansável',
    description:
      'Estou comprometido(a) em entregar resultados excepcionais para cada projeto que assumo. Minha dedicação incansável me impulsiona a trabalhar arduamente, superar obstáculos e garantir que cada detalhe seja cuidadosamente tratado.'
  }),
  new QualityEntity({
    id: 'qual-3',
    icon_svg: FaCogs as any,
    name: 'Inovação Constante',
    description:
      'Estou sempre buscando aprender e evoluir. Mantenho-me atualizado(a) com as últimas tendências e tecnologias em meu campo de atuação, o que me permite trazer inovação e novas perspectivas para cada projeto.'
  })
]
