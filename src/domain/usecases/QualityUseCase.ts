import { QualityEntity } from '@/core/entities/content/QualityEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class QualityUseCase {
  private repository = ApiRepository.qualities

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<QualityEntity>
  ): Promise<ListResponseType<QualityEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<QualityEntity | null> {
    return this.repository.getById(id)
  }

  async executeCreate(
    data: Omit<QualityEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<QualityEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<QualityEntity>
  ): Promise<QualityEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const qualityUseCase = new QualityUseCase()
