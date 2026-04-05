import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { IProjectRepository } from '@/core/interfaces/IProjectRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

export class SupabaseProjectDAO
  extends BaseSupabaseDAO<ProjectEntity>
  implements IProjectRepository
{
  constructor() {
    super(
      'projects',
      ['title', 'slug', 'short_description', 'client_name'],
      '*, technologies:project_technologies(technology:technologies(*)), sections:project_sections(*)'
    )
  }

  protected mapToEntity(data: any): ProjectEntity {
    const technologies = data.technologies
      ?.map((pt: any) => pt.technology)
      .filter(Boolean)

    return new ProjectEntity({
      ...data,
      technologies,
      sections: data.sections || [],
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined
    })
  }
}
