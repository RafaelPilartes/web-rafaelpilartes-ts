import { HorizontalDivider } from '../../../../components/main/HorizontalDivider'
import WorkCarousel from '../../../../components/main/page/work/WorkCarousel'
import { WorkDetailsHeroContainer } from '../../../../components/main/page/work/WorkDetailsHeroContainer'
import { FaLayerGroup } from 'react-icons/fa'
import { BsRocketTakeoff } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { ItemBadge } from '../../../../components/main/ItemBadge'

const project = {
  slug: 'slug',
  thumbnail: {
    url: '/thumb2.jpg'
  },
  title: 'Next Level',
  shortDescription:
    'É uma plataforma angolana de venda e streaming de ficheiros multimídia, que permite aos artistas e criadores de conteúdos, disponibilizarem os seus trabalhos para o público, e serem recompensados.',
  technologies: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
  pageThumbnail: {
    url: '/thumb2.jpg'
  },
  sections: [
    {
      title: 'sections title',
      image: {
        url: 'sections url'
      }
    }
  ],
  description: {
    raw: 'RichTextContent',
    text: 'Description text'
  },
  images: ['/thumb1.jpg', '/thumb2.jpg', '/thumb3.jpg'],
  liveProjectUrl: 'liveProjectUrl',
  githubUrl: 'githubUrl',
  createdAt: 'Novembro de 2023'
}

const ProjectDetails = () => {
  return (
    <main className="relative pb-12">
      {/* Hero */}
      <WorkDetailsHeroContainer project={project} />

      <div className="container w-full gap-x-4 gap-y-6 mt-[60px] ">
        {/* Images */}
        <div className="w-full h-full flex justify-center items-center">
          <WorkCarousel slides={project.images} />
        </div>

        <div className="flex flex-col gap-3 py-6">
          {/* <h3 className="text-3xl text-accent font-bold"> {project.title} </h3> */}
          <HorizontalDivider className="h-[1px] my-1 bg-gradient-to-r to-primary/10 via-white/50 from-primary/10" />

          <div className="w-full py-3 flex flex-row max-md:flex-col max-md:items-start flex-wrap gap-4 justify-between items-center">
            {/* Receptor */}
            <div className="group group flex flex-row gap-4 justify-center items-center flex-1 ">
              <span className="w-12 h-12 text-xl rounded-full bg-gradient-to-r from-accent to-red-800 flex justify-center items-center group-hover:animate-spin duration-75">
                <BsRocketTakeoff />
              </span>
              <div className="flex flex-col gap-[0.15rem] justify-center items-start">
                <span className="uppercase font-medium font-poppins text-zinc-100">
                  Receptor:
                </span>
                <span className="text-accent font-bold text-lg">
                  Projeto pessoal
                </span>
              </div>
            </div>

            {/* Categoria */}
            <div className="group flex flex-row gap-4 justify-center items-center flex-1">
              <span className="w-12 h-12 text-xl rounded-full bg-gradient-to-r from-accent to-red-800 flex justify-center items-center group-hover:animate-spin duration-75">
                <FaLayerGroup />
              </span>
              <div className="flex flex-col gap-[0.15rem] justify-center items-start">
                <span className="uppercase font-medium font-poppins text-zinc-100">
                  Categoria:
                </span>
                <span className="text-accent font-bold text-lg">
                  Desenvolvimento web
                </span>
              </div>
            </div>

            {/* Duração */}
            <div className="group flex flex-row gap-4 justify-center items-center flex-1">
              <span className="w-12 h-12 text-xl rounded-full bg-gradient-to-r from-accent to-red-800 flex justify-center items-center group-hover:animate-spin duration-75">
                <BiTime />
              </span>
              <div className="flex flex-col gap-[0.15rem] justify-center items-start">
                <span className="uppercase font-medium font-poppins text-zinc-100">
                  Duração:
                </span>
                <span className="text-accent font-bold text-lg">2 semanas</span>
              </div>
            </div>
          </div>

          <HorizontalDivider className="h-[1px] my-1 bg-gradient-to-r to-primary/10 via-white/50 from-primary/10" />

          <div className="flex flex-col gap-16 my-8">
            {/* Project overview */}
            <div className="flex flex-col gap-4">
              <h4 className="text-4xl max-[440px]:text-3xl font-extrabold sm:pr-12">
                Visão{' '}
                <span className="text-accent relative inline-block px-2 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[40%] after:bg-accent after:opacity-[18%] ">
                  Geral do Projeto:
                </span>
              </h4>
              <p className="text-slate-100 text-base leading-relaxed">
                Um sistema de gerenciamento de conteúdo ajuda você a criar,
                gerenciar e publicar conteúdo na web. Ele também mantém o
                conteúdo organizado e acessível para que possa ser usado e
                reaproveitado de forma eficaz. Existem vários tipos de sistemas
                de gerenciamento de conteúdo disponíveis - desde CMS baseados em
                nuvem até headless - para atender a todas as necessidades do
                público.
              </p>
            </div>

            {/* Function in this project  */}
            <div className="flex flex-row max-lg:flex-col gap-8">
              <h4 className="text-4xl max-[440px]:text-3xl font-extrabold sm:pr-12">
                Funcionalidades{' '}
                <span className="text-accent relative inline-block px-2 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[40%] after:bg-accent after:opacity-[18%] ">
                  desse projeto:
                </span>
              </h4>

              <div className="flex flex-col gap-4">
                <p className="text-slate-100 text-base leading-relaxed">
                  Um sistema de gerenciamento de conteúdo (CMS) é um aplicativo
                  usado para gerenciar conteúdo, permitindo que vários
                  colaboradores criem, editem e publiquem. O conteúdo em um CMS
                  normalmente é armazenado em um banco de dados e exibido em uma
                  camada de apresentação com base em um conjunto de modelos como
                  um site.
                </p>

                <div className="bg-transparent rounded-lg flex flex-col gap-4 items-start w-full">
                  <ItemBadge
                    type="normal"
                    name="Criação e edição de conteúdo"
                  />
                  <ItemBadge
                    type="normal"
                    name="Fluxos de trabalho, relatórios e organização de conteúdo"
                  />
                  <ItemBadge
                    type="normal"
                    name="Administração e segurança baseadas em usuário e função"
                  />
                  <ItemBadge
                    type="normal"
                    name="Recursos de conteúdo multilíngue"
                  />
                  <ItemBadge
                    type="normal"
                    name="Flexibilidade, escalabilidade e desempenho e análise"
                  />
                </div>
              </div>
            </div>

            {/* Challenges */}
            <div className="flex flex-row max-lg:flex-col gap-8">
              <h4 className="text-4xl max-[440px]:text-3xl font-extrabold sm:pr-12">
                Desafios encontrados nesse{' '}
                <span className="text-accent relative inline-block px-2 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[40%] after:bg-accent after:opacity-[18%] ">
                  projeto:
                </span>
              </h4>

              <div className="flex flex-col gap-4">
                <p className="text-slate-100 text-base leading-relaxed">
                  Um sistema de gerenciamento de conteúdo (CMS) é um aplicativo
                  usado para gerenciar conteúdo, permitindo que vários
                  colaboradores criem, editem e publiquem. O conteúdo em um CMS
                  normalmente é armazenado em um banco de dados e exibido em uma
                  camada de apresentação com base em um conjunto de modelos como
                  um site.
                </p>

                <div className="bg-transparent rounded-lg flex flex-col gap-4 items-start w-full">
                  <ItemBadge type="error" name="Criação e edição de conteúdo" />
                  <ItemBadge
                    type="error"
                    name="Fluxos de trabalho, relatórios e organização de conteúdo"
                  />
                  <ItemBadge
                    type="error"
                    name="Administração e segurança baseadas em usuário e função"
                  />
                  <ItemBadge
                    type="error"
                    name="Recursos de conteúdo multilíngue"
                  />
                  <ItemBadge
                    type="error"
                    name="Flexibilidade, escalabilidade e desempenho e análise"
                  />
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="flex flex-row max-lg:flex-col gap-8">
              <h4 className="text-4xl max-[440px]:text-3xl font-extrabold sm:pr-12">
                Soluções para os{' '}
                <span className="text-accent relative inline-block px-2 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[40%] after:bg-accent after:opacity-[18%] ">
                  problemas:
                </span>
              </h4>

              <div className="flex flex-col gap-4">
                <p className="text-slate-100 text-base leading-relaxed">
                  Um sistema de gerenciamento de conteúdo (CMS) é um aplicativo
                  usado para gerenciar conteúdo, permitindo que vários
                  colaboradores criem, editem e publiquem. O conteúdo em um CMS
                  normalmente é armazenado em um banco de dados e exibido em uma
                  camada de apresentação com base em um conjunto de modelos como
                  um site.
                </p>

                <div className="bg-transparent rounded-lg flex flex-col gap-4 items-start w-full">
                  <ItemBadge
                    type="success"
                    name="Criação e edição de conteúdo"
                  />
                  <ItemBadge
                    type="success"
                    name="Fluxos de trabalho, relatórios e organização de conteúdo"
                  />
                  <ItemBadge
                    type="success"
                    name="Administração e segurança baseadas em usuário e função"
                  />
                  <ItemBadge
                    type="success"
                    name="Recursos de conteúdo multilíngue"
                  />
                  <ItemBadge
                    type="success"
                    name="Flexibilidade, escalabilidade e desempenho e análise"
                  />
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="flex flex-col gap-4">
              <h4 className="text-4xl max-[440px]:text-3xl font-extrabold sm:pr-12">
                Feedback{' '}
                <span className="text-accent relative inline-block px-2 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[40%] after:bg-accent after:opacity-[18%] ">
                  do Projeto:
                </span>
              </h4>
              <p className="text-slate-100 text-base leading-relaxed">
                Ter um sistema de gerenciamento de conteúdo para o seu site
                permite que você tenha controle do seu conteúdo. Significa ter a
                capacidade de atualizar, alterar ou excluir qualquer imagem,
                texto, vídeo ou áudio. Ele permite que você mantenha seu site
                organizado, atualizado e com boa aparência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectDetails
