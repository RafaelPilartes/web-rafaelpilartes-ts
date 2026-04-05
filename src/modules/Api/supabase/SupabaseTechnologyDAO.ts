import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
import { ITechnologyRepository } from '@/core/interfaces/ITechnologyRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseTechnologyDAO
  extends BaseSupabaseDAO<TechnologyEntity>
  implements ITechnologyRepository
{
  constructor() {
    super('technologies', ['name'])
  }

  protected mapToEntity(data: any): TechnologyEntity {
    return new TechnologyEntity({
      ...data,
      start_date: data.start_date ? new Date(data.start_date) : undefined,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
