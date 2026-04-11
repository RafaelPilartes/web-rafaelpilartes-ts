import { SectionTitle } from '../../../../components/main/SectionTitle'
import { ButtonBase } from '../../../../components/main/ButtonBase'
import { useProjectViewModel } from '@/viewModels/project.viewmodel'
import { useNavigate, Link } from 'react-router-dom'
import { Skeleton } from '../../ui/Skeleton'

export const HomeProjects = () => {
  const navigate = useNavigate()
  const { getAllProjects } = useProjectViewModel()
  const { data: response, isLoading, isError } = getAllProjects(3) // Top 3

  const projects = response?.data || [] // Assuming response shape is { data: ProjectEntity[] }
  
  if (isError) {
    return null // Esconde a secção se falhar
  }

  return (
    <section id="projects" className="container relative py-16">
      <SectionTitle subtitle="projetos" title="Veja os meus" />
      
      <div className="flex flex-col lg:flex-row gap-x-10 mt-10">
        <div className="flex-1 flex flex-col gap-y-12 mb-10 lg:mb-0 ">
          {/* Text */}
          <div className="flex-1">
            <h2 className="h2 leading-tight text-accent">Últimos projetos.</h2>
            <p className="max-w-lg mb-6 mt-6">
              Explore a galeria de projetos inspiradores. Cada trabalho reflete
              meu compromisso com a excelência e criatividade. Seja o próximo
              sucesso nesta jornada!!
            </p>
            <ButtonBase onClick={() => navigate('/works')}>
              Ver todos os projetos
            </ButtonBase>
          </div>

          {/* First Column Image (Project 0) */}
          {isLoading ? (
            <Skeleton className="flex-1 h-[400px] w-full rounded-xl" />
          ) : projects[0] ? (
            <Link
              to={`/works/details/${projects[0].id}/${projects[0].slug}`}
              className="flex-1 group relative overflow-hidden border-2 border-white/50 rounded-xl min-h-[300px]"
            >
              {/* Overlay */}
              <div className="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>

              {/* Image */}
              <img
                src={projects[0].thumbnail?.url || '/thumb3.jpg'}
                width={800}
                height={800}
                alt={projects[0].title}
                className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500"
              />
              
              {/* Category */}
              <div className="absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
                <span className="text-[1.3rem] text-accent font-semibold">
                  {projects[0].category?.replace('_', ' ') || 'Projeto'}
                </span>
              </div>
              {/* Title */}
              <div className="absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                <span className="text-3xl text-white">{projects[0].title}</span>
              </div>
            </Link>
          ) : (
            <div className="flex-1 border-2 border-white/10 rounded-xl flex items-center justify-center p-8 text-center text-white/50 bg-white/5">
              Mais projetos em breve
            </div>
          )}
        </div>

        {/* Second Column Images (Projects 1 & 2) */}
        <div className="flex-1 flex flex-col gap-10">
          {isLoading ? (
            <>
              <Skeleton className="flex-1 h-[300px] w-full rounded-xl" />
              <Skeleton className="flex-1 h-[300px] w-full rounded-xl" />
            </>
          ) : (
            <>
              {[1, 2].map((index) => {
                const project = projects[index]
                if (!project) return null
                
                return (
                  <Link
                    key={project.id}
                    to={`/works/details/${project.id}/${project.slug}`}
                    className="group relative overflow-hidden border-2 border-white/50 rounded-xl flex-1 min-h-[250px]"
                  >
                    {/* Overlay */}
                    <div className="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>

                    {/* Image */}
                    <img
                      src={project.thumbnail?.url || '/thumb4.jpg'}
                      width={800}
                      height={800}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500"
                    />
                    
                    {/* Category */}
                    <div className="absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
                      <span className="text-[1.3rem] text-accent font-semibold capitalize">
                        {project.category?.replace('_', ' ') || 'Projeto'}
                      </span>
                    </div>
                    {/* Title */}
                    <div className="absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                      <span className="text-3xl text-white">{project.title}</span>
                    </div>
                  </Link>
                )
              })}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
