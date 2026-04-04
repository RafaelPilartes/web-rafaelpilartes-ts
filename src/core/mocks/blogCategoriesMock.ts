import { BlogCategoryEntity } from '@/core/entities/content/BlogCategoryEntity'

export const mockBlogCategories: BlogCategoryEntity[] = [
  new BlogCategoryEntity({
    id: 'cat-tutorial',
    name: 'Tutorial',
    slug: 'tutorial',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }),
  new BlogCategoryEntity({
    id: 'cat-tip',
    name: 'Dica',
    slug: 'dica',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  }),
  new BlogCategoryEntity({
    id: 'cat-reflection',
    name: 'Reflexão',
    slug: 'reflexao',
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  }),
  new BlogCategoryEntity({
    id: 'cat-case-study',
    name: 'Case Study',
    slug: 'case-study',
    color: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
  })
]
