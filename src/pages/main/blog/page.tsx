import { useState, useMemo } from 'react'
import Circles from '../../../components/main/Circles'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { mockBlogPosts } from '@/core/mocks/blogPostsMock'
import { BlogCategory } from '@/types/enum/portfolio'
import { LinkSimple } from '../../../components/main/Link'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { HiChevronLeft, HiChevronRight, HiMagnifyingGlass } from 'react-icons/hi2'

const ITEMS_PER_PAGE = 6

const categoryLabels: Record<string, string> = {
  ALL: 'Todos',
  [BlogCategory.TUTORIAL]: 'Tutorial',
  [BlogCategory.TIP]: 'Dica',
  [BlogCategory.REFLECTION]: 'Reflexão',
  [BlogCategory.CASE_STUDY]: 'Case Study'
}

const categoryColors: Record<string, string> = {
  [BlogCategory.TUTORIAL]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  [BlogCategory.TIP]: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  [BlogCategory.REFLECTION]: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  [BlogCategory.CASE_STUDY]: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
}

const introductionData = {
  subtitle: 'Artigos',
  title: 'Blog Pessoal',
  description:
    'Acompanhe histórias, tutoriais e dicas sobre desenvolvimento, design e a vida como criador. Partilho aprendizagens contínuas, novas tecnologias e insights para a nossa comunidade.'
}

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    let posts = mockBlogPosts

    if (activeFilter !== 'ALL') {
      posts = posts.filter((p) => p.category === activeFilter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
      )
    }

    return posts
  }, [activeFilter, searchQuery])

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <PageIntroduction {...introductionData} />

      <section className="container py-4">
        {/* Search + Filter Bar */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Search */}
          <div className="relative max-w-md mx-auto w-full">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Pesquisar artigos..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-12 bg-[#55555525] rounded-xl pl-11 pr-4 text-white placeholder:text-gray-600 border border-gray-800 focus:border-accent/50 focus:outline-none transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border
                  ${
                    activeFilter === key
                      ? 'bg-accent text-white border-accent'
                      : 'bg-transparent text-gray-400 border-gray-700 hover:border-accent/50 hover:text-white'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-20">
              Nenhum artigo encontrado.
            </div>
          ) : (
            paginatedPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-[#55555525] rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-accent/20 flex flex-col"
              >
                {/* Cover Image */}
                <div className="h-48 w-full bg-gray-700/50 relative overflow-hidden">
                  <div
                    style={{
                      backgroundImage: `url(${post.cover_image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  {post.category && (
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-semibold px-3 py-1 rounded-full border ${
                        categoryColors[post.category] ?? 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Date */}
                  <span className="text-xs text-gray-500 mb-2">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })
                      : ''}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 text-white group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author + Read More */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                      {post.author_avatar && (
                        <img
                          src={post.author_avatar}
                          alt={post.author_name ?? ''}
                          className="w-7 h-7 rounded-full"
                        />
                      )}
                      <span className="text-xs text-gray-500">
                        {post.author_name}
                      </span>
                    </div>

                    {/* Read more */}
                    <LinkSimple
                      to={`/blog/${post.slug}`}
                      className="text-xs text-gray-400 hover:text-accent transition-colors flex items-center gap-1"
                    >
                      Ler mais
                      <AiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </LinkSimple>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-12 pb-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-lg border border-gray-700 text-gray-400 hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-lg border border-gray-700 text-gray-400 hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        )}
      </section>

      <Circles />
    </main>
  )
}
export default Blog
