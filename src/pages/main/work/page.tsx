import { useState } from 'react'
import { ProjectCard } from '../../../components/main/ProjectCard'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { ProjectCategory } from '@/types/enum/portfolio'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useProjectViewModel } from '@/viewModels/project.viewmodel'
import { Skeleton } from '../../../components/main/ui/Skeleton'

const ITEMS_PER_PAGE = 6

const categoryLabels: Record<string, string> = {
  ALL: 'Todos',
  [ProjectCategory.WEB]: 'Web',
  [ProjectCategory.MOBILE]: 'Mobile',
  [ProjectCategory.AI]: 'AI',
  [ProjectCategory.DESKTOP]: 'Desktop',
  [ProjectCategory.DESIGN]: 'Design'
}

const introductionData = {
  subtitle: 'projetos',
  title: 'Meus Projetos',
  description:
    'Aqui você poderá ver alguns dos trabalhos que eu desenvolvi. Navegue à vontade e explore os projetos para ver como foram criados, as tecnologias utilizadas e as funcionalidades implementadas.'
}

const ProjectCardSkeleton = ({ index = 0 }: { index?: number }) => {
  const isReversed = index % 2 !== 0
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 items-center py-10 lg:py-16 w-full animate-pulse">
      {/* Content Area Skeleton */}
      <div
        className={`relative z-10 flex flex-col col-span-12 lg:col-span-7 xl:col-span-6 lg:[grid-row:1]
          ${isReversed ? 'lg:col-start-6 xl:col-start-7 lg:items-end' : 'lg:col-start-1 lg:items-start'}
          p-6 lg:p-0`}
      >
        <div className="flex gap-3 mb-4">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <Skeleton className="w-64 h-8 mb-5" />
        <div className="w-full mb-6">
          <Skeleton className="w-full h-28 rounded-xl" />
        </div>
        <div className="flex gap-4 mb-6">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-6 h-6" />
        </div>
      </div>

      {/* Image Area Skeleton */}
      <div
        className={`hidden lg:block lg:h-[350px] col-span-12 lg:col-span-7 lg:[grid-row:1]
          ${isReversed ? 'lg:col-start-1' : 'lg:col-start-6'}
          rounded-xl overflow-hidden`}
      >
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  )
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const { getAllProjects } = useProjectViewModel()

  // Convert API filter format
  const filterParams =
    activeFilter !== 'ALL'
      ? { category: activeFilter as ProjectCategory }
      : undefined
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const {
    data: response,
    isLoading,
    isError
  } = getAllProjects(ITEMS_PER_PAGE, offset, undefined, filterParams)

  const projects = response?.data || []
  const totalCount = response?.pagination?.total || 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  return (
    <main className="flex flex-col gap-6 w-full">
      <PageIntroduction {...introductionData} />

      <div className="container flex flex-col gap-8 pb-12">
        {/* Filters */}
        <div className="w-full flex flex-wrap items-center justify-center gap-3">
          {Object.entries(categoryLabels).map(([key, label]) => {
            return (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                  ${
                    activeFilter === key
                      ? 'bg-accent text-white border-accent shadow-lg shadow-accent/25'
                      : 'bg-transparent text-gray-400 border-gray-700 hover:border-accent/50 hover:text-white'
                  }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Project Grid / Skeletons */}
        {isError ? (
          <p className="text-center text-red-500 py-20 bg-red-500/10 rounded-2xl mx-4">
            Não foi possível carregar os projetos momentaneamente.
          </p>
        ) : isLoading ? (
          <div className="flex flex-col gap-16 px-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} index={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500 py-20 border border-white/10 rounded-2xl mx-4 bg-white/5">
            Nenhum projeto encontrado para esta categoria.
          </p>
        ) : (
          <div className="flex flex-col gap-8 md:gap-12 px-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id ?? project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1 || isLoading}
              className="p-2.5 rounded-lg border border-gray-700 text-gray-400 hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  disabled={isLoading}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300
                      ${
                        currentPage === page
                          ? 'bg-accent text-white shadow-lg shadow-accent/25'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || isLoading}
              className="p-2.5 rounded-lg border border-gray-700 text-gray-400 hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Projects
