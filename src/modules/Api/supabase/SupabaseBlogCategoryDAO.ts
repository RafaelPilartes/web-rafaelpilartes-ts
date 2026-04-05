import { BlogCategoryEntity } from '@/core/entities/content/BlogCategoryEntity'
import { IBlogCategoryRepository } from '@/core/interfaces/IBlogCategoryRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseBlogCategoryDAO
  extends BaseSupabaseDAO<BlogCategoryEntity>
  implements IBlogCategoryRepository
{
  constructor() {
    super('blog_categories', ['name', 'slug'])
  }

  protected mapToEntity(data: any): BlogCategoryEntity {
    return new BlogCategoryEntity({
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
