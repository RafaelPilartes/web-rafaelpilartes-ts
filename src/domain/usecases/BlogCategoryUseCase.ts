import { BlogCategoryEntity } from '@/core/entities/content/BlogCategoryEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class BlogCategoryUseCase {
  private repository = ApiRepository.blogCategories

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<BlogCategoryEntity>
  ): Promise<ListResponseType<BlogCategoryEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<BlogCategoryEntity | null> {
    return this.repository.getById(id)
  }

  async executeCreate(
    data: Omit<BlogCategoryEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<BlogCategoryEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<BlogCategoryEntity>
  ): Promise<BlogCategoryEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const blogCategoryUseCase = new BlogCategoryUseCase()
