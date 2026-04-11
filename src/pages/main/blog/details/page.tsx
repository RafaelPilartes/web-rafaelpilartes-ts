import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiCalendar, HiClock } from 'react-icons/hi2'
import { TbBrandTwitter, TbBrandLinkedin, TbLink } from 'react-icons/tb'
import { LinkSimple } from '../../../../components/main/Link'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { MarkdownRenderer } from '../../../../components/main/MarkdownRenderer'
import Circles from '@/components/main/Circles'
import { useBlogPostViewModel } from '@/viewModels/blog-post.viewmodel'
import { Skeleton } from '@/components/main/ui/Skeleton'

const BlogDetailsSkeleton = () => (
  <main className="pb-16 flex flex-col w-full animate-pulse">
    <div className="relative w-full h-[300px] md:h-[400px] bg-white/5" />
    <div className="container max-w-4xl mx-auto px-6 -mt-20 relative z-10 flex flex-col gap-6">
      <Skeleton className="w-24 h-6 rounded-full" />
      <Skeleton className="w-3/4 h-12 rounded-lg" />
      <div className="flex gap-6 pb-8 border-b border-white/5">
        <div className="flex gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-3" />
            <Skeleton className="w-16 h-2" />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-4 mt-8" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-4/5 h-4" />
      <Skeleton className="w-full h-4 mt-4" />
      <Skeleton className="w-3/4 h-4" />
    </div>
  </main>
)

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const { getPostBySlug, getAllPosts } = useBlogPostViewModel()
  
  // Fetch current post
  const { data: post, isLoading: isPostLoading, isError: isPostError } = getPostBySlug(slug || '')
  
  // Fetch related posts (same category context)
  const categoryId = post?.category_id
  const { data: relatedData } = getAllPosts(4, 0, undefined, categoryId ? { category_id: categoryId } : undefined)
  const relatedPosts = (relatedData?.data || []).filter(p => p.slug !== slug).slice(0, 3)

  if (isPostLoading) {
    return <BlogDetailsSkeleton />
  }

  if (!post || isPostError) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] gap-4 z-10 relative">
        <h2 className="text-2xl font-bold text-white">Artigo não encontrado</h2>
        <p className="text-gray-400">
          O artigo que procura não existe ou foi removido.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="text-accent hover:underline flex items-center gap-2"
        >
          <HiArrowLeft size={16} /> Voltar ao blog
        </button>
      </main>
    )
  }

  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    : ''

  const wordCount = post.content?.text?.trim().split(/\s+/).length || 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <main className="pb-16 text-left">
      {/* Hero / Cover */}
      <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden bg-gray-900 border-b border-white/5">
        {post.cover_image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.cover_image})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

        {/* Back Button — aligned with content container */}
        <div className="absolute top-28 left-0 right-0 z-10 container max-w-4xl mx-auto px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm hover:border-accent/50 hover:bg-black/80 transition-all"
          >
            <HiArrowLeft size={16} />
            Voltar
          </motion.button>
        </div>
      </div>

      {/* Content Container */}
      <div className="container max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        {/* Category Badge */}
        {post.category && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`inline-block text-xs font-semibold px-4 py-1.5 rounded-full border mb-5 bg-black/60 text-white backdrop-blur-md border-white/10`}
          >
            {post.category.name}
          </motion.span>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Meta Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-white/[0.06]"
        >
          {/* Author */}
          <div className="flex items-center gap-3">
            {post.author_avatar ? (
              <img
                src={post.author_avatar}
                alt={post.author_name ?? ''}
                className="w-10 h-10 rounded-full border-2 border-accent/20 object-cover"
              />
            ) : (
               <div className="w-10 h-10 rounded-full border-2 border-accent/20 bg-gray-800" />
            )}
            <div>
              <p className="text-sm font-medium text-white">
                {post.author_name || 'Desconhecido'}
              </p>
              <p className="text-xs text-gray-500">Autor</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <HiCalendar size={16} />
            <span>{publishDate}</span>
          </div>

          {/* Reading time */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <HiClock size={16} />
            <span>{readingTime} min de leitura</span>
          </div>

          {/* Share */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopyLink}
              title="Copiar link"
              className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all bg-white/5 hover:bg-white/10"
            >
              <TbLink size={16} />
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all bg-white/5 hover:bg-white/10"
            >
              <TbBrandTwitter size={16} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all bg-white/5 hover:bg-white/10"
            >
              <TbBrandLinkedin size={16} />
            </a>
          </div>
        </motion.div>

        {/* Article Body */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-10"
        >
          <MarkdownRenderer
            content={post.content?.text || post.content?.raw || ''}
          />
        </motion.article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/[0.06]">
          {post.category && (
            <span className="text-xs px-3 py-1.5 rounded-full border border-accent/20 text-accent bg-accent/5">
              {post.category.name}
            </span>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-white mb-8">
              Artigos relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <div
                  key={related.slug}
                  className="bg-[#55555525] rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-accent/20 flex flex-col"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={related.cover_image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] text-gray-500">
                      {related.published_at
                        ? new Date(related.published_at).toLocaleDateString(
                            'pt-BR',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }
                          )
                        : ''}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-1 line-clamp-2 group-hover:text-accent transition-colors">
                      {related.title}
                    </h4>
                    <LinkSimple
                      to={`/blog/${related.slug}`}
                      className="text-xs text-gray-400 hover:text-accent mt-auto pt-3 flex items-center gap-1"
                    >
                      Ler mais <AiOutlineArrowRight size={12} />
                    </LinkSimple>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Circles />
    </main>
  )
}

export default BlogDetails
