import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HorizontalDivider } from '../../../../components/main/HorizontalDivider'
import WorkCarousel from '../../../../components/main/page/work/WorkCarousel'
import { WorkDetailsHeroContainer } from '../../../../components/main/page/work/WorkDetailsHeroContainer'
import { FaLayerGroup } from 'react-icons/fa'
import { BsRocketTakeoff } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { HiArrowLeft } from 'react-icons/hi2'
import { ItemBadge } from '../../../../components/main/ItemBadge'
import { ProjectCategory, ProjectSectionType } from '@/types/enum/portfolio'
import { useProjectViewModel } from '@/viewModels/project.viewmodel'
import { Skeleton } from '@/components/main/ui/Skeleton'

const ProjectDetailsSkeleton = () => (
  <main className="relative pb-12 w-full flex flex-col gap-8 animate-pulse">
    <div className="w-full h-[60vh] bg-white/5" />
    <div className="container mx-auto flex flex-col gap-8 px-6 -mt-32 relative z-10">
      <Skeleton className="w-[80%] h-12" />
      <Skeleton className="w-[40%] h-6" />
      <div className="w-full h-96 bg-white/5 rounded-2xl mt-12" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
        <Skeleton className="w-full h-24 rounded-xl" />
        <Skeleton className="w-full h-24 rounded-xl" />
        <Skeleton className="w-full h-24 rounded-xl" />
      </div>
    </div>
  </main>
)

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
      <h4 className="text-4xl max-[440px]:text-3xl font-extrabold sm:pr-12 text-zinc-100">
        {section.title}{' '}
        {section.subtitle && (
          <span className="text-accent relative inline-block px-2 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[40%] after:bg-accent after:opacity-[18%] ">
            {section.subtitle}
          </span>
        )}
      </h4>

      {(section.description?.text ||
        (section.items && section.items.length > 0)) && (
        <div className="flex flex-col gap-4 flex-1">
          {section.description?.text && (
            <p className="text-slate-300 text-base leading-relaxed text-justify">
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
  const { workId } = useParams<{ workId: string; workName: string }>()
  const navigate = useNavigate()

  const { getProjectById } = useProjectViewModel()
  const { data: project, isLoading, isError } = getProjectById(workId || '')

  if (isLoading) {
    return <ProjectDetailsSkeleton />
  }

  if (isError || !project) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] gap-4 z-10 relative">
        <h2 className="text-2xl font-bold text-white">
          Projeto não encontrado
        </h2>
        <p className="text-gray-400">
          O projeto que procura não existe ou foi removido.
        </p>
        <button
          onClick={() => navigate('/works')}
          className="text-accent hover:underline flex items-center gap-2"
        >
          <HiArrowLeft size={16} /> Voltar aos projetos
        </button>
      </main>
    )
  }

  return (
    <main className="relative pb-12">
      {/* Hero with absolute Back Button */}
      <div className="relative">
        <WorkDetailsHeroContainer project={project} />
        {/* Back Button — aligned with content container */}
        <div className="absolute top-28 left-0 right-0 z-10 container mx-auto px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate('/works')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm hover:border-accent/50 hover:bg-black/80 transition-all"
          >
            <HiArrowLeft size={16} />
            Voltar
          </motion.button>
        </div>
      </div>

      <div className="container w-full gap-x-4 gap-y-6 mt-[60px] relative z-10 text-left">
        {/* Images */}
        {project.images && project.images.length > 0 ? (
          <div className="w-full h-full flex justify-center items-center rounded-2xl overflow-hidden border border-white/5">
            <WorkCarousel slides={project.images} />
          </div>
        ) : (
          <div className="w-full h-[400px] bg-[#111] rounded-2xl border border-white/5 flex items-center justify-center">
            <span className="text-white/20">Sem imagens complementares</span>
          </div>
        )}

        <div className="flex flex-col gap-3 py-6 mt-12">
          <HorizontalDivider className="h-[1px] my-1 bg-gradient-to-r to-accent/10 via-white/20 from-accent/10" />

          <div className="w-full py-3 flex flex-row max-md:flex-col max-md:items-start flex-wrap gap-4 justify-between items-center">
            {/* Receptor */}
            {project.client_name && (
              <div className="group flex flex-row gap-4 justify-center items-center flex-1 ">
                <span className="w-12 h-12 text-xl rounded-full bg-gradient-to-r from-accent to-red-800 flex justify-center items-center group-hover:animate-spin duration-75">
                  <BsRocketTakeoff />
                </span>
                <div className="flex flex-col gap-[0.15rem] justify-center items-start">
                  <span className="uppercase font-medium font-poppins text-zinc-400 text-xs tracking-wider">
                    Receptor:
                  </span>
                  <span className="text-white font-bold text-lg">
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
                  <span className="uppercase font-medium font-poppins text-zinc-400 text-xs tracking-wider">
                    Categoria:
                  </span>
                  <span className="text-white font-bold text-lg">
                    {project.category === ProjectCategory.WEB
                      ? 'Desenvolvimento web'
                      : project.category === ProjectCategory.MOBILE
                        ? 'Desenvolvimento mobile'
                        : project.category === ProjectCategory.DESIGN
                          ? 'Design de Interfaces'
                          : project.category === ProjectCategory.DESKTOP
                            ? 'Aplicações Desktop'
                            : 'Software'}
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
                  <span className="uppercase font-medium font-poppins text-zinc-400 text-xs tracking-wider">
                    Duração:
                  </span>
                  <span className="text-white font-bold text-lg">
                    {project.duration}
                  </span>
                </div>
              </div>
            )}
          </div>

          <HorizontalDivider className="h-[1px] my-1 bg-gradient-to-r to-accent/10 via-white/20 from-accent/10" />

          {project.sections && project.sections.length > 0 && (
            <div className="flex flex-col gap-20 my-16">
              {project.sections.map((section: any, index: number) =>
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
