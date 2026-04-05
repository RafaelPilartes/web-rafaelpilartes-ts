import { TestimonialEntity } from '@/core/entities/content/TestimonialEntity'
import { ITestimonialRepository } from '@/core/interfaces/ITestimonialRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseTestimonialDAO
  extends BaseSupabaseDAO<TestimonialEntity>
  implements ITestimonialRepository
{
  constructor() {
    super('testimonials', ['name', 'occupation'])
  }

  protected mapToEntity(data: any): TestimonialEntity {
    return new TestimonialEntity({
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
