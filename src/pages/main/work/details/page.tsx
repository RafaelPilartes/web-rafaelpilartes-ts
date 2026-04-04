import { HorizontalDivider } from '../../../../components/main/HorizontalDivider'
import WorkCarousel from '../../../../components/main/page/work/WorkCarousel'
import { WorkDetailsHeroContainer } from '../../../../components/main/page/work/WorkDetailsHeroContainer'
import { FaLayerGroup } from 'react-icons/fa'
import { BsRocketTakeoff } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { ItemBadge } from '../../../../components/main/ItemBadge'
import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { ProjectCategory, ProjectSectionType } from '@/types/enum/portfolio'

const projectData: ProjectEntity = {
  id: 'next-level',
  slug: 'slug',
  client_name: 'Projeto pessoal',
  category: ProjectCategory.WEB,
  duration: '2 semanas',
  thumbnail: {
    url: '/thumb2.jpg'
  },
  title: 'Next Level',
  short_description:
    'É uma plataforma angolana de venda e streaming de ficheiros multimídia, que permite aos artistas e criadores de conteúdos, disponibilizarem os seus trabalhos para o público, e serem recompensados.',
  technologies: [
    { id: '1', name: 'HTML', created_at: new Date() },
    { id: '1', name: 'CSS', created_at: new Date() },
    { id: '1', name: 'JavaScript', created_at: new Date() }
  ],
  page_thumbnail: {
    url: '/thumb2.jpg'
  },
  description: {
    raw: 'RichTextContent',
    text: 'Description text'
  },
  images: ['/thumb1.jpg', '/thumb2.jpg', '/thumb3.jpg'],
  live_project_url: 'liveProjectUrl',
  github_url: 'githubUrl',
  created_at: new Date(),
  updated_at: new Date(),
  sections: [
    {
      type: ProjectSectionType.TEXT,
      title: 'Visão',
      subtitle: 'Geral do Projeto:',
      description: {
        raw: '',
        text: 'Um sistema de gerenciamento de conteúdo ajuda você a criar, gerenciar e publicar conteúdo na web. Ele também mantém o conteúdo organizado e acessível para que possa ser usado e reaproveitado de forma eficaz. Existem vários tipos de sistemas de gerenciamento de conteúdo disponíveis - desde CMS baseados em nuvem até headless - para atender a todas as necessidades do público.'
      }
    },
    {
      type: ProjectSectionType.FEATURES,
      title: 'Funcionalidades',
      subtitle: 'desse projeto:',
      description: {
        raw: '',
        text: 'Um sistema de gerenciamento de conteúdo (CMS) é um aplicativo usado para gerenciar conteúdo, permitindo que vários colaboradores criem, editem e publiquem. O conteúdo em um CMS normalmente é armazenado em um banco de dados e exibido em uma camada de apresentação com base em um conjunto de modelos como um site.'
      },
      items: [
        'Criação e edição de conteúdo',
        'Fluxos de trabalho, relatórios e organização de conteúdo',
        'Administração e segurança baseadas em usuário e função',
        'Recursos de conteúdo multilíngue',
        'Flexibilidade, escalabilidade e desempenho e análise'
      ]
    },
    {
      type: ProjectSectionType.CHALLENGES,
      title: 'Desafios encontrados',
      subtitle: 'nesse projeto:',
      description: {
        raw: '',
        text: 'Um sistema de gerenciamento de conteúdo (CMS) é um aplicativo usado para gerenciar conteúdo, permitindo que vários colaboradores criem, editem e publiquem.'
      },
      items: [
        'Criação e edição de conteúdo',
        'Fluxos de trabalho, relatórios e organização de conteúdo',
        'Administração e segurança baseadas em usuário e função',
        'Recursos de conteúdo multilíngue',
        'Flexibilidade, escalabilidade e desempenho e análise'
      ]
    },
    {
      type: ProjectSectionType.SOLUTIONS,
      title: 'Soluções para os',
      subtitle: 'problemas:',
      description: {
        raw: '',
        text: 'Um sistema de gerenciamento de conteúdo (CMS) é um aplicativo usado para gerenciar conteúdo, permitindo que vários colaboradores criem, editem e publiquem.'
      },
      items: [
        'Criação e edição de conteúdo',
        'Fluxos de trabalho, relatórios e organização de conteúdo',
        'Administração e segurança baseadas em usuário e função',
        'Recursos de conteúdo multilíngue',
        'Flexibilidade, escalabilidade e desempenho e análise'
      ]
    },
    {
      type: ProjectSectionType.FEEDBACK,
      title: 'Feedback',
      subtitle: 'do Projeto:',
      description: {
        raw: '',
        text: 'Ter um sistema de gerenciamento de conteúdo para o seu site permite que você tenha controle do seu conteúdo. Significa ter a capacidade de atualizar, alterar ou excluir qualquer imagem, texto, vídeo ou áudio. Ele permite que você mantenha seu site organizado, atualizado e com boa aparência.'
      }
    }
  ]
}

const project = projectData as unknown as ProjectEntity

const renderSection = (section: any, index: number) => {
  const alignClass =
    section.type === ProjectSectionType.TEXT ||
    section.type === ProjectSectionType.FEEDBACK
      ? 'flex flex-col gap-4'
      : 'flex flex-row max-lg:flex-col gap-8'

  const badgeType =
    section.type === ProjectSectionType.CHALLENGES
      ? 'error'
      : section.type === ProjectSectionType.SOLUTIONS
        ? 'success'
        : 'normal'

  return (
    <div key={index} className={alignClass}>
      <h4 className="text-4xl max-[440px]:text-3xl font-extrabold sm:pr-12">
        {section.title}{' '}
        {section.subtitle && (
          <span className="text-accent relative inline-block px-2 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[40%] after:bg-accent after:opacity-[18%] ">
            {section.subtitle}
          </span>
        )}
      </h4>

      {(section.description?.text ||
        (section.items && section.items.length > 0)) && (
        <div className="flex flex-col gap-4">
          {section.description?.text && (
            <p className="text-slate-100 text-base leading-relaxed">
              {section.description.text}
            </p>
          )}

          {section.items && section.items.length > 0 && (
            <div className="bg-transparent rounded-lg flex flex-col gap-4 items-start w-full">
              {section.items.map((item: string, i: number) => (
                <ItemBadge
                  key={i}
                  type={badgeType as 'normal' | 'error' | 'success'}
                  name={item}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const ProjectDetails = () => {
  return (
    <main className="relative pb-12">
      {/* Hero */}
      <WorkDetailsHeroContainer project={project} />

      <div className="container w-full gap-x-4 gap-y-6 mt-[60px] ">
        {/* Images */}
        <div className="w-full h-full flex justify-center items-center">
          <WorkCarousel slides={project.images || []} />
        </div>

        <div className="flex flex-col gap-3 py-6">
          <HorizontalDivider className="h-[1px] my-1 bg-gradient-to-r to-primary/10 via-white/50 from-primary/10" />

          <div className="w-full py-3 flex flex-row max-md:flex-col max-md:items-start flex-wrap gap-4 justify-between items-center">
            {/* Receptor */}
            {project.client_name && (
              <div className="group flex flex-row gap-4 justify-center items-center flex-1 ">
                <span className="w-12 h-12 text-xl rounded-full bg-gradient-to-r from-accent to-red-800 flex justify-center items-center group-hover:animate-spin duration-75">
                  <BsRocketTakeoff />
                </span>
                <div className="flex flex-col gap-[0.15rem] justify-center items-start">
                  <span className="uppercase font-medium font-poppins text-zinc-100">
                    Receptor:
                  </span>
                  <span className="text-accent font-bold text-lg">
                    {project.client_name}
                  </span>
                </div>
              </div>
            )}

            {/* Categoria */}
            {project.category && (
              <div className="group flex flex-row gap-4 justify-center items-center flex-1">
                <span className="w-12 h-12 text-xl rounded-full bg-gradient-to-r from-accent to-red-800 flex justify-center items-center group-hover:animate-spin duration-75">
                  <FaLayerGroup />
                </span>
                <div className="flex flex-col gap-[0.15rem] justify-center items-start">
                  <span className="uppercase font-medium font-poppins text-zinc-100">
                    Categoria:
                  </span>
                  <span className="text-accent font-bold text-lg">
                    {project.category === ProjectCategory.WEB
                      ? 'Desenvolvimento web'
                      : project.category === ProjectCategory.MOBILE
                        ? 'Desenvolvimento mobile'
                        : 'Design'}
                  </span>
                </div>
              </div>
            )}

            {/* Duração */}
            {project.duration && (
              <div className="group flex flex-row gap-4 justify-center items-center flex-1">
                <span className="w-12 h-12 text-xl rounded-full bg-gradient-to-r from-accent to-red-800 flex justify-center items-center group-hover:animate-spin duration-75">
                  <BiTime />
                </span>
                <div className="flex flex-col gap-[0.15rem] justify-center items-start">
                  <span className="uppercase font-medium font-poppins text-zinc-100">
                    Duração:
                  </span>
                  <span className="text-accent font-bold text-lg">
                    {project.duration}
                  </span>
                </div>
              </div>
            )}
          </div>

          <HorizontalDivider className="h-[1px] my-1 bg-gradient-to-r to-primary/10 via-white/50 from-primary/10" />

          {project.sections && project.sections.length > 0 && (
            <div className="flex flex-col gap-16 my-8">
              {project.sections.map((section, index) =>
                renderSection(section, index)
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProjectDetails
