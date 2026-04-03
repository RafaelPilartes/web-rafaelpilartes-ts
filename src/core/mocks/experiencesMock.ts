import { WorkExperienceEntity } from '@/core/entities/portfolio/WorkExperienceEntity'
import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'

export const mockExperiences: WorkExperienceEntity[] = [
  new WorkExperienceEntity({
    id: 'exp-1',
    company_logo: { url: '/experience/toqueplay.png' },
    role: 'Toqueplay é uma plataforma de streaming e vendas de músicas que aproxima os fãs dos artistas através de experiências únicas e da mais alta qualidade do som.',
    company_name: 'ToquePlay',
    company_url: 'https://toqueplay.com/',
    start_date: '2022-01-01',
    end_date: '2023-01-01',
    description: { raw: '' },
    technologies: [
      new TechnologyEntity({ name: 'JavaScript' }),
      new TechnologyEntity({ name: 'React Js' }),
      new TechnologyEntity({ name: 'React Native' }),
      new TechnologyEntity({ name: 'Firebase' })
    ]
  }),
  new WorkExperienceEntity({
    id: 'exp-2',
    company_logo: { url: '/experience/gusmapis.jpg' },
    role: 'A Gusmapis é uma das maiores organizações de construção do país e classificada entre as maiores empreiteiras. Aborde diferentes segmentos.',
    company_name: 'Gusmapis',
    company_url: 'https://gusmapis.com/',
    start_date: '2020-01-01',
    end_date: '2021-01-01',
    description: { raw: '' },
    technologies: [
      new TechnologyEntity({ name: 'SAC4' }),
      new TechnologyEntity({ name: 'Excel' }),
      new TechnologyEntity({ name: 'Word' })
    ]
  }),
  new WorkExperienceEntity({
    id: 'exp-3',
    company_logo: { url: '/experience/graceminds.jpg' },
    role: 'Grace Minds a equipe de profissionais que entendem e guiá-lo com a consciência de vida rica e profunda durante todo o processo de orientação e cura.',
    company_name: 'Grace Minds',
    company_url: 'https://graceminds.com/',
    start_date: '2019-01-01',
    end_date: '2020-01-01',
    description: { raw: '' },
    technologies: [
      new TechnologyEntity({ name: 'HTML' }),
      new TechnologyEntity({ name: 'CSS' }),
      new TechnologyEntity({ name: 'JavaScript' })
    ]
  })
]
