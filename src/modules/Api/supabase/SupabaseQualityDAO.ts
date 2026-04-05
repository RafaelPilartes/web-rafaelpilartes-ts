import { QualityEntity } from '@/core/entities/content/QualityEntity'
import { IQualityRepository } from '@/core/interfaces/IQualityRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseQualityDAO
  extends BaseSupabaseDAO<QualityEntity>
  implements IQualityRepository
{
  constructor() {
    super('qualities', ['name'])
  }

  protected mapToEntity(data: any): QualityEntity {
    return new QualityEntity({
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
