import { supabase } from '@/config/supabase'
import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { IProjectRepository } from '@/core/interfaces/IProjectRepository'
import { BaseSupabaseDAO } from './BaseSupabaseDAO'

/**
 * Projects own three relations that are NOT columns on the `projects` table:
 *  - images          → JSONB array of URLs on `projects` itself (stays in payload)
 *  - technologies     → many-to-many via `project_technologies (project_id, technology_id)`
 *  - sections         → one-to-many via `project_sections`
 *
 * The base DAO inserts the payload straight into `projects`, so create/update are
 * overridden here to strip the relation fields, write the `projects` row, then sync
 * the join/child tables. Callers pass `technologyIds: string[]` and `sections: [...]`.
 */
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

  /** Separates the `projects` columns from the relation payloads. */
  private split(data: any) {
    const { technologies, sections, technologyIds, ...projectData } = data

    let techIds: string[] | undefined = technologyIds
    if (!techIds && Array.isArray(technologies)) {
      techIds = technologies
        .map((t: any) => (typeof t === 'string' ? t : t?.id))
        .filter(Boolean)
    }

    return {
      projectData,
      techIds,
      sections: sections as any[] | undefined
    }
  }

  /** Replaces the project's technology links (delete-all then insert). */
  private async syncTechnologies(projectId: string, techIds?: string[]) {
    if (techIds === undefined) return

    const { error: delError } = await supabase
      .from('project_technologies')
      .delete()
      .eq('project_id', projectId)
    if (delError) throw new Error(delError.message)

    if (techIds.length) {
      const rows = techIds.map(technology_id => ({
        project_id: projectId,
        technology_id
      }))
      const { error } = await supabase.from('project_technologies').insert(rows)
      if (error) throw new Error(error.message)
    }
  }

  /** Replaces the project's sections (delete-all then insert, preserving order). */
  private async syncSections(projectId: string, sections?: any[]) {
    if (sections === undefined) return

    const { error: delError } = await supabase
      .from('project_sections')
      .delete()
      .eq('project_id', projectId)
    if (delError) throw new Error(delError.message)

    if (sections.length) {
      const rows = sections.map((s: any) => ({
        project_id: projectId,
        type: s.type,
        title: s.title,
        subtitle: s.subtitle ?? null,
        description: s.description ?? {},
        images: s.images ?? [],
        items: s.items ?? []
      }))
      const { error } = await supabase.from('project_sections').insert(rows)
      if (error) throw new Error(error.message)
    }
  }

  async create(data: any): Promise<ProjectEntity> {
    const { projectData, techIds, sections } = this.split(data)

    const { data: created, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single()
    if (error) throw new Error(error.message)

    await this.syncTechnologies(created.id, techIds)
    await this.syncSections(created.id, sections)

    const full = await this.getById(created.id)
    return full ?? this.mapToEntity(created)
  }

  async update(id: string, data: any): Promise<ProjectEntity> {
    const { projectData, techIds, sections } = this.split(data)

    if (Object.keys(projectData).length) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
      if (error) throw new Error(error.message)
    }

    await this.syncTechnologies(id, techIds)
    await this.syncSections(id, sections)

    const full = await this.getById(id)
    if (!full) throw new Error('Project not found after update')
    return full
  }
}
