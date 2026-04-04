import { BaseEntity } from '@/core/entities/BaseEntity'
import { BlogCategoryProps } from '@/types/database/content'

export class BlogCategoryEntity extends BaseEntity {
  public readonly name: string
  public readonly slug: string
  public readonly color?: string
  public readonly description?: string

  constructor(props: BlogCategoryProps) {
    super(props.id ?? '', props.created_at ? new Date(props.created_at) : undefined, props.updated_at)
    this.name = props.name
    this.slug = props.slug
    this.color = props.color
    this.description = props.description
  }
}
