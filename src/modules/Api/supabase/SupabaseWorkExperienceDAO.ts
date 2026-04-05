import { WorkExperienceEntity } from '@/core/entities/portfolio/WorkExperienceEntity'
import { IWorkExperienceRepository } from '@/core/interfaces/IWorkExperienceRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseWorkExperienceDAO
  extends BaseSupabaseDAO<WorkExperienceEntity>
  implements IWorkExperienceRepository
{
  constructor() {
    super(
      'work_experiences',
      ['role', 'company_name'],
      '*'
    )
  }

  protected mapToEntity(data: any): WorkExperienceEntity {
    const technologies = data.technologies
      ?.map((et: any) => et.technology)
      .filter(Boolean)

    return new WorkExperienceEntity({
      ...data,
      technologies,
      start_date: data.start_date ? new Date(data.start_date) : new Date(),
      end_date: data.end_date ? new Date(data.end_date) : undefined,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
