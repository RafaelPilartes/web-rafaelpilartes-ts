import { CertificateEntity } from '@/core/entities/portfolio/CertificateEntity'
import { ICertificateRepository } from '@/core/interfaces/ICertificateRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseCertificateDAO
  extends BaseSupabaseDAO<CertificateEntity>
  implements ICertificateRepository
{
  constructor() {
    super('certificates', ['title', 'issued_by', 'credential_id'])
  }

  protected mapToEntity(data: any): CertificateEntity {
    return new CertificateEntity({
      ...data,
      issue_date: data.issue_date ? new Date(data.issue_date) : new Date(),
      expiration_date: data.expiration_date
        ? new Date(data.expiration_date)
        : undefined,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
