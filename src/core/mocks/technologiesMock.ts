import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
import {
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoTypescript,
  BiLogoPhp,
  BiLogoReact,
  BiLogoNodejs,
  BiLogoJavascript,
  BiLogoTailwindCss,
  BiLogoFigma,
  BiLogoGithub
} from 'react-icons/bi'
import { TbSql } from 'react-icons/tb'

export const mockTechnologies: TechnologyEntity[] = [
  new TechnologyEntity({
    name: 'HTML',
    start_date: '2021-01-01',
    icon_svg: BiLogoHtml5 as any
  }),
  new TechnologyEntity({
    name: 'CSS',
    start_date: '2021-01-01',
    icon_svg: BiLogoCss3 as any
  }),
  new TechnologyEntity({
    name: 'JavaScript',
    start_date: '2021-01-01',
    icon_svg: BiLogoJavascript as any
  }),
  new TechnologyEntity({
    name: 'PHP',
    start_date: '2022-01-01',
    icon_svg: BiLogoPhp as any
  }),
  new TechnologyEntity({
    name: 'TypeScript',
    start_date: '2022-01-01',
    icon_svg: BiLogoTypescript as any
  }),
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
    name: 'Next Js',
    start_date: '2023-01-01',
    icon_svg: BiLogoReact as any
  }),
  new TechnologyEntity({
    name: 'Node.Js',
    start_date: '2021-01-01',
    icon_svg: BiLogoNodejs as any
  }),
  new TechnologyEntity({
    name: 'MySQL',
    start_date: '2022-01-01',
    icon_svg: TbSql as any
  }),
  new TechnologyEntity({
    name: 'Tailwind',
    start_date: '2022-01-01',
    icon_svg: BiLogoTailwindCss as any
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
