import { ServiceEntity } from '@/core/entities/content/ServiceEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class ServiceUseCase {
  private repository = ApiRepository.services

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<ServiceEntity>
  ): Promise<ListResponseType<ServiceEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<ServiceEntity | null> {
    return this.repository.getById(id)
  }

  async executeCreate(
    data: Omit<ServiceEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<ServiceEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<ServiceEntity>
  ): Promise<ServiceEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const serviceUseCase = new ServiceUseCase()
