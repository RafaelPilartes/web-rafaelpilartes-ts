import { TestimonialEntity } from '@/core/entities/content/TestimonialEntity'
import { ApiRepository } from '@/modules/Api'
import { ListResponseType } from '@/types/IApiResponse'

export class TestimonialUseCase {
  private repository = ApiRepository.testimonials

  async executeGetAll(
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<TestimonialEntity>
  ): Promise<ListResponseType<TestimonialEntity[]>> {
    return this.repository.getAll(limit, offset, searchTerm, filters)
  }

  async executeGetById(id: string): Promise<TestimonialEntity | null> {
    return this.repository.getById(id)
  }

  async executeCreate(
    data: Omit<TestimonialEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<TestimonialEntity> {
    return this.repository.create(data)
  }

  async executeUpdate(
    id: string,
    data: Partial<TestimonialEntity>
  ): Promise<TestimonialEntity> {
    return this.repository.update(id, data)
  }

  async executeDelete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}

export const testimonialUseCase = new TestimonialUseCase()
