import { CustomerEntity } from '@/core/entities/content/CustomerEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class CustomerUseCase {
  private repository = ApiRepository.customers

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<CustomerEntity>
  ): Promise<ListResponseType<CustomerEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<CustomerEntity | null> {
    return this.repository.getById(id)
  }

  async executeCreate(
    data: Omit<CustomerEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<CustomerEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<CustomerEntity>
  ): Promise<CustomerEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const customerUseCase = new CustomerUseCase()
