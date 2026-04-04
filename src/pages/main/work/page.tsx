import { useState, useMemo } from 'react'
import { ProjectCard } from '../../../components/main/ProjectCard'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { mockProjects } from '@/core/mocks/projectsMock'
import { ProjectCategory } from '@/types/enum/portfolio'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

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

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return mockProjects
    return mockProjects.filter(p => p.category === activeFilter)
  }, [activeFilter])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <PageIntroduction {...introductionData} />

      <div className="container flex flex-col gap-8 pb-12">
        {/* Filters */}
        <div className="w-full flex flex-wrap items-center justify-center gap-3">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const count =
              key === 'ALL'
                ? mockProjects.length
                : mockProjects.filter(p => p.category === key).length
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
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    activeFilter === key ? 'bg-white/20' : 'bg-gray-800'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Project Grid */}
        {paginatedProjects.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            Nenhum projeto encontrado para esta categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {paginatedProjects.map(project => (
              <ProjectCard key={project.id ?? project.slug} project={project} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-lg border border-gray-700 text-gray-400 hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
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
              disabled={currentPage === totalPages}
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
