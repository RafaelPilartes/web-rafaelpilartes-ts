import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class ProjectUseCase {
  private repository = ApiRepository.projects

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<ProjectEntity>
  ): Promise<ListResponseType<ProjectEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<ProjectEntity | null> {
    return this.repository.getById(id)
  }

  async executeGetBySlug(slug: string): Promise<ProjectEntity | null> {
    return this.repository.getOneByField('slug', slug)
  }

  async executeCreate(
    data: Omit<ProjectEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<ProjectEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<ProjectEntity>
  ): Promise<ProjectEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const projectUseCase = new ProjectUseCase()
