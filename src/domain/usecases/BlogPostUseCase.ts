import { BlogPostEntity } from '@/core/entities/content/BlogPostEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class BlogPostUseCase {
  private repository = ApiRepository.blogPosts

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<BlogPostEntity>
  ): Promise<ListResponseType<BlogPostEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<BlogPostEntity | null> {
    return this.repository.getById(id)
  }

  async executeGetBySlug(slug: string): Promise<BlogPostEntity | null> {
    return this.repository.getOneByField('slug', slug)
  }

  async executeCreate(
    data: Omit<BlogPostEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<BlogPostEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<BlogPostEntity>
  ): Promise<BlogPostEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  listenToAll(
    onUpdate: (posts: BlogPostEntity[]) => void,
    filters?: Partial<BlogPostEntity>
  ) {
    return this.repository.listenAll(onUpdate, undefined, { filters })
  }
}

export const blogPostUseCase = new BlogPostUseCase()
