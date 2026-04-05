import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class TechnologyUseCase {
  private repository = ApiRepository.technologies

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<TechnologyEntity>
  ): Promise<ListResponseType<TechnologyEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<TechnologyEntity | null> {
    return this.repository.getById(id)
  }

  async executeCreate(
    data: Omit<TechnologyEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<TechnologyEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<TechnologyEntity>
  ): Promise<TechnologyEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const technologyUseCase = new TechnologyUseCase()
