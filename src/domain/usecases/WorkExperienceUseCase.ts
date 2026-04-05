import { WorkExperienceEntity } from '@/core/entities/portfolio/WorkExperienceEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class WorkExperienceUseCase {
  private repository = ApiRepository.workExperiences

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<WorkExperienceEntity>
  ): Promise<ListResponseType<WorkExperienceEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<WorkExperienceEntity | null> {
    return this.repository.getById(id)
  }

  async executeCreate(
    data: Omit<WorkExperienceEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<WorkExperienceEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<WorkExperienceEntity>
  ): Promise<WorkExperienceEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const workExperienceUseCase = new WorkExperienceUseCase()
