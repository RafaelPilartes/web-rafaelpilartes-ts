import { CustomerEntity } from '@/core/entities/content/CustomerEntity'
import { ICustomerRepository } from '@/core/interfaces/ICustomerRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseCustomerDAO
  extends BaseSupabaseDAO<CustomerEntity>
  implements ICustomerRepository
{
  constructor() {
    super('customers', ['name', 'occupation'])
  }

  protected mapToEntity(data: any): CustomerEntity {
    return new CustomerEntity({
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
