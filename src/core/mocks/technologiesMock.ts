import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
import {
  BiLogoTypescript,
  BiLogoReact,
  BiLogoNodejs,
  BiLogoFigma,
  BiLogoGithub,
  BiLogoPython
} from 'react-icons/bi'
import { SiElectron, SiKotlin } from 'react-icons/si'

export const mockTechnologies: TechnologyEntity[] = [
  new TechnologyEntity({
    name: 'React Js',
    start_date: '2021-01-01',
    icon_svg: BiLogoReact as any
  }),
  new TechnologyEntity({
    name: 'React Native',
    start_date: '2022-01-01',
    icon_svg: BiLogoReact as any
  }),
  new TechnologyEntity({
    name: 'Kotlin',
    start_date: '2022-01-01',
    icon_svg: SiKotlin as any
  }),
  new TechnologyEntity({
    name: 'Electron',
    start_date: '2023-01-01',
    icon_svg: SiElectron as any
  }),
  new TechnologyEntity({
    name: 'TypeScript',
    start_date: '2022-01-01',
    icon_svg: BiLogoTypescript as any
  }),
  new TechnologyEntity({
    name: 'Node.Js',
    start_date: '2021-01-01',
    icon_svg: BiLogoNodejs as any
  }),
  new TechnologyEntity({
    name: 'Python',
    start_date: '2022-01-01',
    icon_svg: BiLogoPython as any
  }),
  new TechnologyEntity({
    name: 'Figma',
    start_date: '2020-01-01',
    icon_svg: BiLogoFigma as any
  }),
  new TechnologyEntity({
    name: 'GitHub',
    start_date: '2021-01-01',
    icon_svg: BiLogoGithub as any
  })
]
