import { BlogPostEntity } from '@/core/entities/content/BlogPostEntity'
import { IBlogPostRepository } from '@/core/interfaces/IBlogPostRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseBlogPostDAO
  extends BaseSupabaseDAO<BlogPostEntity>
  implements IBlogPostRepository
{
  constructor() {
    super(
      'blog_posts',
      ['title', 'slug', 'excerpt'],
      '*, category:blog_categories(*), author:users(*)'
    )
  }

  protected mapToEntity(data: any): BlogPostEntity {
    return new BlogPostEntity({
      ...data,
      category: data.category || undefined,
      author: data.author || undefined,
      published_at: data.published_at
        ? new Date(data.published_at)
        : undefined,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
