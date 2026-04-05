import { CertificateEntity } from '@/core/entities/portfolio/CertificateEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class CertificateUseCase {
  private repository = ApiRepository.certificates

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<CertificateEntity>
  ): Promise<ListResponseType<CertificateEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<CertificateEntity | null> {
    return this.repository.getById(id)
  }

  async executeCreate(
    data: Omit<CertificateEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<CertificateEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<CertificateEntity>
  ): Promise<CertificateEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const certificateUseCase = new CertificateUseCase()
