import { BlogPostEntity } from '@/core/entities/content/BlogPostEntity'
import { mockBlogCategories } from './blogCategoriesMock'

export const mockBlogPosts: BlogPostEntity[] = [
  new BlogPostEntity({
    id: 'blog-1',
    title: 'Como comecei a carreira em Desenvolvimento Web',
    slug: 'comecando-carreira-desenvolvimento-web',
    category: mockBlogCategories.find(c => c.slug === 'reflexao'),
    cover_image: '/thumb2.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Muitas pessoas perguntam como fiz a transição. Aqui estão as ferramentas, tecnologias e desafios que enfrentei no início da minha jornada.',
    content: {
      raw: ``,
      text: `
## Introdução

Este artigo explora como iniciar com **React**, **TypeScript** e **Tailwind CSS**. Aprender essas tecnologias separadamente é fácil, mas combiná-las pode ser esmagador no início.

Vamos abordar:
1. Configuração inicial
2. Vantagens do \`Typing\`
3. Escrita rápida de CSS

---

## Desenvolvimento e Exemplos Práticos

Abaixo podes conferir como inicializar um componente básico usando a sintaxe moderna do React com Functional Components e Type alias:

\`\`\`tsx
import React, { useState } from 'react';

// Tipagem de Propriedades
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const ModernButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    onClick();
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-accent text-white px-4 py-2 hover:bg-red-700 transition"
      disabled={loading}
    >
      {loading ? 'A carregar...' : label}
    </button>
  );
};
\`\`\`

> **Dica do autor:** Sempre tipes as interfaces dos teus componentes. O IntelliSense do Visual Studio Code vai-te salvar de dezenas de bugs na hora de importar módulos entre pastas diferentes.

### Tabelas em Markdown (Suporte de remark-gfm)

| Feature | React | Angular | Vue |
| :--- | :---: | :---: | :---: |
| Curva de Aprendizado | **Média** | Alta | Baixa |
| Ecossistema | Gigante | Grande | Grande |
| Tipagem Nativa | Não (Usa TS) | Sim | Suporta (TS) |

---

## Conclusão

Construir interfaces nunca foi tão flexível. Convido-te a verificares a documentação do [React Oficial](https://react.dev) ou explorares outros frameworks!

![A beautiful setup dev environment](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop)
      `
    },
    published_at: '2023-08-10'
  }),
  new BlogPostEntity({
    id: 'blog-2',
    title: 'Porque o Design System é Importante?',
    slug: 'porque-design-system-e-importante',
    category: mockBlogCategories.find(c => c.slug === 'tutorial'),
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
    category: mockBlogCategories.find(c => c.slug === 'dica'),
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
    category: mockBlogCategories.find(c => c.slug === 'case-study'),
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
    category: mockBlogCategories.find(c => c.slug === 'tutorial'),
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
    category: mockBlogCategories.find(c => c.slug === 'reflexao'),
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
    category: mockBlogCategories.find(c => c.slug === 'dica'),
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
    category: mockBlogCategories.find(c => c.slug === 'case-study'),
    cover_image: '/thumb3.jpg',
    author_name: 'Rafael Pilartes',
    author_avatar: '/t-avt-1.png',
    excerpt:
      'Como apliquei princípios de arquitectura backend no frontend para criar aplicações mais escaláveis e testáveis.',
    content: { raw: '...' },
    published_at: '2024-05-01'
  })
]
