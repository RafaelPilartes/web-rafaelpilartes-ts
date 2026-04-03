import { BaseEntity } from '@/core/entities/BaseEntity'
import { ProjectProps, ProjectSectionProps, ImageMediaProps } from '@/types/database/portfolio'
import { ProjectCategory } from '@/types/enum/portfolio'
import { TechnologyEntity } from './TechnologyEntity'

export class ProjectEntity extends BaseEntity {
  public readonly slug: string
  public readonly category?: ProjectCategory
  public readonly thumbnail: ImageMediaProps
  public readonly page_thumbnail: ImageMediaProps
  public readonly title: string
  public readonly short_description: string
  public readonly description: {
    raw: any
    text: string
  }
  public readonly images?: string[]
  public readonly live_project_url?: string
  public readonly github_url?: string
  public readonly figma_url?: string
  public readonly play_store_url?: string
  public readonly app_store_url?: string
  public readonly highlight?: string
  
  // Joins
  public readonly technologies?: TechnologyEntity[]
  public readonly sections?: ProjectSectionProps[]

  constructor(props: ProjectProps & { technologies?: TechnologyEntity[], sections?: ProjectSectionProps[] }) {
    super(props.id ?? '', props.created_at, props.updated_at)
    this.slug = props.slug
    this.category = props.category
    this.thumbnail = props.thumbnail
    this.page_thumbnail = props.page_thumbnail
    this.title = props.title
    this.short_description = props.short_description
    this.description = props.description
    this.images = props.images
    this.live_project_url = props.live_project_url
    this.github_url = props.github_url
    this.figma_url = props.figma_url
    this.play_store_url = props.play_store_url
    this.app_store_url = props.app_store_url
    this.highlight = props.highlight
    
    this.technologies = props.technologies
    this.sections = props.sections
  }
}
