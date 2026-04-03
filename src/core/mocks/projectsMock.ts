import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
import { ProjectCategory } from '@/types/enum/portfolio'

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  [ProjectCategory.WEB]: 'Web Apps',
  [ProjectCategory.MOBILE]: 'Mobile',
  [ProjectCategory.DESIGN]: 'UI Design'
}

export const mockProjects: ProjectEntity[] = [
  new ProjectEntity({
    id: 'proj-1',
    slug: 'details/1/toqueplay',
    category: ProjectCategory.WEB,
    thumbnail: { url: '/thumb2.jpg' },
    page_thumbnail: { url: '/thumb2.jpg' },
    title: 'ToquePlay',
    short_description:
      'Plataforma angolana de venda e streaming de ficheiros multimídia, que permite aos artistas disponibilizarem os seus trabalhos para o público.',
    description: { raw: '', text: 'Descrição completa do projecto ToquePlay...' },
    live_project_url: 'https://toqueplay.com',
    github_url: 'https://github.com/RafaelPilartes',
    highlight: '500+ active users',
    technologies: [
      new TechnologyEntity({ name: 'React Js' }),
      new TechnologyEntity({ name: 'Node.js' }),
      new TechnologyEntity({ name: 'Firebase' })
    ],
    sections: [{ title: 'Hero', image: { url: '/thumb2.jpg' } }]
  }),
  new ProjectEntity({
    id: 'proj-2',
    slug: 'details/2/gusmapis',
    category: ProjectCategory.WEB,
    thumbnail: { url: '/thumb3.jpg' },
    page_thumbnail: { url: '/thumb3.jpg' },
    title: 'Gusmapis',
    short_description:
      'Website institucional para uma das maiores organizações de construção do país, destacando os seus projectos e serviços.',
    description: { raw: '', text: 'Descrição completa do projecto Gusmapis...' },
    live_project_url: 'https://gusmapis.com',
    highlight: '40% increase in conversion',
    technologies: [
      new TechnologyEntity({ name: 'Next.js' }),
      new TechnologyEntity({ name: 'Tailwind' }),
      new TechnologyEntity({ name: 'Prisma' })
    ],
    sections: [{ title: 'Hero', image: { url: '/thumb3.jpg' } }]
  }),
  new ProjectEntity({
    id: 'proj-3',
    slug: 'details/3/kandengue-atrevido',
    category: ProjectCategory.MOBILE,
    thumbnail: { url: '/thumb4.jpg' },
    page_thumbnail: { url: '/thumb4.jpg' },
    title: 'Kandengue Atrevido',
    short_description:
      'Aplicação mobile de ride-hailing para o mercado angolano, conectando passageiros e motoristas de forma eficiente.',
    description: { raw: '', text: 'Descrição completa do projecto Kandengue Atrevido...' },
    highlight: '1K+ downloads',
    technologies: [
      new TechnologyEntity({ name: 'React Native' }),
      new TechnologyEntity({ name: 'Firebase' }),
      new TechnologyEntity({ name: 'Node.js' })
    ],
    sections: [{ title: 'Hero', image: { url: '/thumb4.jpg' } }]
  }),
  new ProjectEntity({
    id: 'proj-4',
    slug: 'details/4/graceminds',
    category: ProjectCategory.WEB,
    thumbnail: { url: '/thumb2.jpg' },
    page_thumbnail: { url: '/thumb2.jpg' },
    title: 'Grace Minds',
    short_description:
      'Plataforma de orientação e cura mental, com equipe de profissionais que guiam com consciência de vida rica e profunda.',
    description: { raw: '', text: 'Descrição completa do projecto Grace Minds...' },
    live_project_url: 'https://graceminds.com',
    highlight: '200+ registered users',
    technologies: [
      new TechnologyEntity({ name: 'HTML' }),
      new TechnologyEntity({ name: 'CSS' }),
      new TechnologyEntity({ name: 'JavaScript' })
    ],
    sections: [{ title: 'Hero', image: { url: '/thumb2.jpg' } }]
  }),
  new ProjectEntity({
    id: 'proj-5',
    slug: 'details/5/brand-dunamis',
    category: ProjectCategory.DESIGN,
    thumbnail: { url: '/thumb3.jpg' },
    page_thumbnail: { url: '/thumb3.jpg' },
    title: 'Dunamis Brand Identity',
    short_description:
      'Identidade visual completa para a marca Dunamis, incluindo logotipo, paleta de cores, tipografia e materiais de marketing.',
    description: { raw: '', text: 'Descrição completa do projecto Dunamis Brand...' },
    figma_url: 'https://figma.com',
    highlight: '3 major brand awards',
    technologies: [
      new TechnologyEntity({ name: 'Figma' }),
      new TechnologyEntity({ name: 'Illustrator' })
    ],
    sections: [{ title: 'Hero', image: { url: '/thumb3.jpg' } }]
  }),
  new ProjectEntity({
    id: 'proj-6',
    slug: 'details/6/tchossy-app',
    category: ProjectCategory.MOBILE,
    thumbnail: { url: '/thumb4.jpg' },
    page_thumbnail: { url: '/thumb4.jpg' },
    title: 'Tchossy App',
    short_description:
      'Aplicação mobile para gestão de tarefas e produtividade, com foco na simplicidade e experiência do utilizador.',
    description: { raw: '', text: 'Descrição completa do projecto Tchossy App...' },
    play_store_url: 'https://play.google.com',
    highlight: '500+ active users',
    technologies: [
      new TechnologyEntity({ name: 'Flutter' }),
      new TechnologyEntity({ name: 'Dart' }),
      new TechnologyEntity({ name: 'Firebase' })
    ],
    sections: [{ title: 'Hero', image: { url: '/thumb4.jpg' } }]
  }),
  new ProjectEntity({
    id: 'proj-7',
    slug: 'details/7/portfolio-v2',
    category: ProjectCategory.WEB,
    thumbnail: { url: '/thumb2.jpg' },
    page_thumbnail: { url: '/thumb2.jpg' },
    title: 'Portfólio v2',
    short_description:
      'Segundo versão do meu portfólio pessoal, construído com React e TypeScript com arquitectura DAO/MVVM.',
    description: { raw: '', text: 'Descrição completa do portfólio v2...' },
    github_url: 'https://github.com/RafaelPilartes',
    highlight: '1K+ npm downloads',
    technologies: [
      new TechnologyEntity({ name: 'React Js' }),
      new TechnologyEntity({ name: 'TypeScript' }),
      new TechnologyEntity({ name: 'Tailwind' })
    ],
    sections: [{ title: 'Hero', image: { url: '/thumb2.jpg' } }]
  }),
  new ProjectEntity({
    id: 'proj-8',
    slug: 'details/8/ui-kit-angola',
    category: ProjectCategory.DESIGN,
    thumbnail: { url: '/thumb3.jpg' },
    page_thumbnail: { url: '/thumb3.jpg' },
    title: 'UI Kit Angola',
    short_description:
      'Kit de componentes de interface pensado para aplicações do mercado angolano, com padrões locais de UX.',
    description: { raw: '', text: 'Descrição completa UI Kit Angola...' },
    figma_url: 'https://figma.com',
    highlight: '50+ components',
    technologies: [
      new TechnologyEntity({ name: 'Figma' }),
      new TechnologyEntity({ name: 'Sketch' })
    ],
    sections: [{ title: 'Hero', image: { url: '/thumb3.jpg' } }]
  })
]
