import { HorizontalDivider } from '../../../components/main/HorizontalDivider'
import { ProjectCard } from '../../../components/main/ProjectCard'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { ButtonBase } from '../../../components/main/ButtonBase'

const projectsData = [
  {
    slug: 'details/1234/Testando',
    thumbnail: {
      url: '/thumb2.jpg'
    },
    title: 'Next Level',
    shortDescription:
      'É uma plataforma angolana de venda e streaming de ficheiros multimídia,que permite aos artistas e criadores de conteúdos, disponibilizarem os seus trabalhos para o público, e serem recompensados.',
    technologies: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    pageThumbnail: {
      url: 'pageThumbnail url'
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
    liveProjectUrl: 'liveProjectUrl',
    githubUrl: 'githubUrl'
  }
]

const introductionData = {
  subtitle: 'projetos',
  title: 'Meus Projetos',
  description:
    'Aqui você poderá ver alguns dos trabalhos que eu desenvolvi. Navegue à vontade e explore os projetos para ver como  criados, as tecnologias utilizadas e as funcionalidades implementadas.'
}

const Projects = () => {
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <PageIntroduction {...introductionData} />

      <div className="container flex flex-col gap-6">
        {/* Filter */}
        <div className="w-full flex flex-row items-center justify-end">
          <ButtonBase>
            Filtro
            {/* <BsFilter /> */}
          </ButtonBase>
        </div>

        {/* List Project */}
        <div className="px-6">
          {projectsData?.map(project => (
            <div key={project.slug}>
              <ProjectCard key={project.title} project={project as any} />
              <HorizontalDivider className="my-8 bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Projects
