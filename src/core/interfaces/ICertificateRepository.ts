import { CertificateEntity } from '@/core/entities/portfolio/CertificateEntity'
import { IBaseRepository } from './IBaseRepository'

export interface ICertificateRepository
  extends IBaseRepository<CertificateEntity> {}
