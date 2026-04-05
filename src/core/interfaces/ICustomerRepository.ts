import { CustomerEntity } from '@/core/entities/content/CustomerEntity'
import { IBaseRepository } from './IBaseRepository'

export interface ICustomerRepository extends IBaseRepository<CustomerEntity> {}
