import { BlogPostEntity } from '@/core/entities/content/BlogPostEntity'
import { BlogCategory } from '@/types/enum/portfolio'

export const mockBlogPosts: BlogPostEntity[] = [
  new BlogPostEntity({
    id: 'blog-1',
    title: 'Como comecei a carreira em Desenvolvimento Web',
    slug: 'comecando-carreira-desenvolvimento-web',
    category: BlogCategory.REFLECTION,
    cover_image: '/thumb2.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Muitas pessoas perguntam como fiz a transição. Aqui estão as ferramentas, tecnologias e desafios que enfrentei no início da minha jornada.',
    content: { raw: '...' },
    published_at: '2023-08-10'
  }),
  new BlogPostEntity({
    id: 'blog-2',
    title: 'Porque o Design System é Importante?',
    slug: 'porque-design-system-e-importante',
    category: BlogCategory.TUTORIAL,
    cover_image: '/thumb3.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Criar um projeto escalável requer organização de UI/UX antes mesmo do desenvolvimento. Veja como estruturar um Design System.',
    content: { raw: '...' },
    published_at: '2023-09-01'
  }),
  new BlogPostEntity({
    id: 'blog-3',
    title: '5 Dicas para Melhorar o Seu Portfólio',
    slug: '5-dicas-melhorar-portfolio',
    category: BlogCategory.TIP,
    cover_image: '/thumb4.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Um bom portfólio é a chave para conquistar clientes e oportunidades. Descubra as melhores práticas para destacar os seus trabalhos.',
    content: { raw: '...' },
    published_at: '2023-10-15'
  }),
  new BlogPostEntity({
    id: 'blog-4',
    title: 'React Native vs Flutter em 2024',
    slug: 'react-native-vs-flutter-2024',
    category: BlogCategory.CASE_STUDY,
    cover_image: '/thumb2.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Uma comparação prática entre as duas frameworks mais populares de desenvolvimento mobile cross-platform.',
    content: { raw: '...' },
    published_at: '2024-01-20'
  }),
  new BlogPostEntity({
    id: 'blog-5',
    title: 'Como Configurar um Projeto com TypeScript e Vite',
    slug: 'configurar-projeto-typescript-vite',
    category: BlogCategory.TUTORIAL,
    cover_image: '/thumb3.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Guia passo a passo para iniciar um projecto moderno usando TypeScript com Vite, incluindo alias paths e ESLint.',
    content: { raw: '...' },
    published_at: '2024-02-10'
  }),
  new BlogPostEntity({
    id: 'blog-6',
    title: 'A importância do Clean Code no dia-a-dia',
    slug: 'importancia-clean-code',
    category: BlogCategory.REFLECTION,
    cover_image: '/thumb4.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Escrever código limpo não é apenas estética — é produtividade, manutenção e trabalho em equipa.',
    content: { raw: '...' },
    published_at: '2024-03-05'
  }),
  new BlogPostEntity({
    id: 'blog-7',
    title: 'Tailwind CSS: Prós e Contras',
    slug: 'tailwind-css-pros-contras',
    category: BlogCategory.TIP,
    cover_image: '/thumb2.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'O Tailwind CSS revolucionou o desenvolvimento front-end. Mas será que é sempre a melhor escolha? Veja a minha análise.',
    content: { raw: '...' },
    published_at: '2024-04-12'
  }),
  new BlogPostEntity({
    id: 'blog-8',
    title: 'Arquitectura DAO/MVVM no Frontend',
    slug: 'arquitectura-dao-mvvm-frontend',
    category: BlogCategory.CASE_STUDY,
    cover_image: '/thumb3.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Como apliquei princípios de arquitectura backend no frontend para criar aplicações mais escaláveis e testáveis.',
    content: { raw: '...' },
    published_at: '2024-05-01'
  })
]
