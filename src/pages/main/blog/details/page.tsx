import { useParams, useNavigate } from 'react-router-dom'
import { mockBlogPosts } from '@/core/mocks/blogPostsMock'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiCalendar, HiClock } from 'react-icons/hi2'
import { TbBrandTwitter, TbBrandLinkedin, TbLink } from 'react-icons/tb'
import Circles from '../../../../components/main/Circles'
import { LinkSimple } from '../../../../components/main/Link'
import { AiOutlineArrowRight } from 'react-icons/ai'

const categoryColors: Record<string, string> = {
  Tutorial: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Dica: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Reflexão: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Case Study': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
}

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const post = mockBlogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold text-white">Artigo não encontrado</h2>
        <p className="text-gray-400">O artigo que procura não existe ou foi removido.</p>
        <button
          onClick={() => navigate('/blog')}
          className="text-accent hover:underline flex items-center gap-2"
        >
          <HiArrowLeft size={16} /> Voltar ao blog
        </button>
      </main>
    )
  }

  // Related posts (same category, exclude current)
  const relatedPosts = mockBlogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    : ''

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <main className="pb-16">
      {/* Hero / Cover */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.cover_image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate('/blog')}
          className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white text-sm hover:border-accent/50 transition-all"
        >
          <HiArrowLeft size={16} />
          Voltar
        </motion.button>
      </div>

      {/* Content Container */}
      <div className="container max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        {/* Category Badge */}
        {post.category && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`inline-block text-xs font-semibold px-4 py-1.5 rounded-full border mb-5 ${
              categoryColors[post.category] ?? 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {post.category}
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
            {post.author_avatar && (
              <img
                src={post.author_avatar}
                alt={post.author_name ?? ''}
                className="w-10 h-10 rounded-full border-2 border-accent/30"
              />
            )}
            <div>
              <p className="text-sm font-medium text-white">{post.author_name}</p>
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
            <span>5 min de leitura</span>
          </div>

          {/* Share */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopyLink}
              title="Copiar link"
              className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all"
            >
              <TbLink size={16} />
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all"
            >
              <TbBrandTwitter size={16} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all"
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
          className="prose prose-invert prose-lg max-w-none"
        >
          {/* Lead paragraph */}
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Mock article content */}
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <h2 className="text-2xl font-bold text-white mt-10">Introdução</h2>
            <p>
              Este artigo explora em detalhe os conceitos e as práticas por detrás do tema.
              Ao longo do texto, vamos abordar os fundamentos, as melhores práticas e
              exemplos concretos que podem ser aplicados no dia-a-dia de qualquer desenvolvedor.
            </p>

            <div className="my-8 p-6 rounded-2xl bg-accent/5 border border-accent/10">
              <p className="text-accent text-sm font-medium mb-2">💡 Nota do autor</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Este conteúdo é baseado na minha experiência prática. Os exemplos e
                recomendações podem variar conforme o contexto do seu projecto.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10">Desenvolvimento</h2>
            <p>
              A base de qualquer bom projecto começa com uma arquitectura sólida.
              Antes de escrever a primeira linha de código, é fundamental entender
              o problema que estamos a resolver e planear a solução adequada.
            </p>
            <p>
              Ferramentas modernas como React, TypeScript e Tailwind CSS permitem-nos
              construir interfaces robustas e escaláveis. No entanto, a escolha da
              tecnologia deve ser sempre guiada pelo contexto e pelos requisitos do projecto.
            </p>

            <div className="my-8 rounded-xl overflow-hidden border border-white/[0.06]">
              <img
                src={post.cover_image}
                alt="Ilustração do artigo"
                className="w-full h-[300px] object-cover"
              />
              <p className="text-center text-xs text-gray-600 py-3 bg-[#0d0d0d]">
                Ilustração demonstrativa do conceito abordado
              </p>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10">Conclusão</h2>
            <p>
              Em resumo, a chave para o sucesso em qualquer projecto está na combinação
              de boas práticas, ferramentas adequadas e uma mentalidade de aprendizagem contínua.
              Espero que este artigo tenha sido útil e inspirador para a tua jornada.
            </p>
          </div>
        </motion.article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/[0.06]">
          <span className="text-xs text-gray-500 mr-2 self-center">Tags:</span>
          {post.category && (
            <span className="text-xs px-3 py-1.5 rounded-full border border-accent/20 text-accent bg-accent/5">
              {post.category}
            </span>
          )}
          <span className="text-xs px-3 py-1.5 rounded-full border border-gray-700 text-gray-400">
            Desenvolvimento
          </span>
          <span className="text-xs px-3 py-1.5 rounded-full border border-gray-700 text-gray-400">
            Frontend
          </span>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-white mb-8">Artigos relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl overflow-hidden group hover:border-accent/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={related.cover_image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-gray-500">
                      {related.published_at
                        ? new Date(related.published_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })
                        : ''}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-1 line-clamp-2 group-hover:text-accent transition-colors">
                      {related.title}
                    </h4>
                    <LinkSimple
                      to={`/blog/${related.slug}`}
                      className="text-xs text-gray-400 hover:text-accent mt-3 flex items-center gap-1"
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
