import { useState, useEffect } from 'react'
import Circles from '../../../components/main/Circles'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { LinkSimple } from '../../../components/main/Link'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { HiChevronLeft, HiChevronRight, HiMagnifyingGlass } from 'react-icons/hi2'
import { useBlogCategoryViewModel } from '@/viewModels/blog-category.viewmodel'
import { useBlogPostViewModel } from '@/viewModels/blog-post.viewmodel'
import { Skeleton } from '../../../components/main/ui/Skeleton'

const ITEMS_PER_PAGE = 6

const introductionData = {
  subtitle: 'Artigos',
  title: 'Blog Pessoal',
  description:
    'Acompanhe histórias, tutoriais e dicas sobre desenvolvimento, design e a vida como criador. Partilho aprendizagens contínuas, novas tecnologias e insights para a nossa comunidade.'
}

// Simple internal hook to debounce search query
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

const BlogPostSkeleton = () => (
   <div className="bg-[#55555525] rounded-xl overflow-hidden h-[420px] border border-transparent flex flex-col">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 flex flex-col flex-1 gap-3">
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-full h-5 mt-1" />
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-full h-3 mt-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-4/5 h-3" />
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
           <div className="flex items-center gap-2">
             <Skeleton className="w-7 h-7 rounded-full" />
             <Skeleton className="w-16 h-3" />
           </div>
           <Skeleton className="w-16 h-4" />
        </div>
      </div>
   </div>
)

const Blog = () => {
  const [activeFilterId, setActiveFilterId] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const debouncedSearch = useDebounce(searchQuery, 500)

  // API Hooks
  const { getAllCategories } = useBlogCategoryViewModel()
  const { getAllPosts } = useBlogPostViewModel()

  const { data: catResponse, isLoading: isLoadingCats } = getAllCategories()
  const categories = catResponse?.data || []

  // Setup Filters
  const filters = activeFilterId !== 'ALL' ? { category_id: activeFilterId } : undefined
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const { data: postResponse, isLoading: isLoadingPosts, isError: isErrorPosts } = getAllPosts(ITEMS_PER_PAGE, offset, debouncedSearch, filters)
  
  const posts = postResponse?.data || []
  const totalCount = postResponse?.pagination?.total || 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handleFilterChange = (categoryId: string) => {
    setActiveFilterId(categoryId)
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
            <button
              onClick={() => handleFilterChange('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border
                ${
                  activeFilterId === 'ALL'
                    ? 'bg-accent text-white border-accent'
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-accent/50 hover:text-white'
                }`}
            >
              Todos
            </button>
            {isLoadingCats ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-8 rounded-full" />
              ))
            ) : categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border
                  ${
                    activeFilterId === cat.id
                      ? 'bg-accent text-white border-accent'
                      : 'bg-transparent text-gray-400 border-gray-700 hover:border-accent/50 hover:text-white'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        {isErrorPosts ? (
           <p className="text-center text-red-500 py-20 bg-red-500/10 rounded-2xl">
              Não foi possível carregar os artigos.
           </p>
        ) : isLoadingPosts ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => <BlogPostSkeleton key={i} />)}
           </div>
        ) : posts.length === 0 ? (
           <div className="text-center text-gray-500 py-20 border border-white/10 rounded-2xl bg-white/5">
              Nenhum artigo encontrado.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id || post.slug}
                className="bg-[#55555525] rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-accent/20 flex flex-col"
              >
                {/* Cover Image */}
                <div className="h-48 w-full bg-gray-700/50 relative overflow-hidden">
                  {post.cover_image && (
                     <div
                        style={{
                          backgroundImage: `url(${post.cover_image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                     />
                  )}
                  {/* Category Badge */}
                  {post.category && (
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-semibold px-3 py-1 rounded-full border bg-black/60 text-white backdrop-blur-sm border-white/10`}
                    >
                      {post.category.name}
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
                      {post.author_avatar ? (
                        <img
                          src={post.author_avatar}
                          alt={post.author_name ?? ''}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-700" />
                      )}
                      <span className="text-xs text-gray-500">
                        {post.author_name || 'Desconhecido'}
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
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-12 pb-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || isLoadingPosts}
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
                     disabled={isLoadingPosts}
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
              disabled={currentPage === totalPages || isLoadingPosts}
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
