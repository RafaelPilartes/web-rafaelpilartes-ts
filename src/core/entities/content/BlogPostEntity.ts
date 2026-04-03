import { BaseEntity } from '@/core/entities/BaseEntity'
import { BlogPostProps } from '@/types/database/content'
import { BlogCategory } from '@/types/enum/portfolio'
import { UserEntity } from '../UserEntity'

export class BlogPostEntity extends BaseEntity {
  public readonly title: string
  public readonly slug: string
  public readonly cover_image: string
  public readonly category?: BlogCategory
  public readonly author_id?: string
  public readonly author_name?: string
  public readonly author_avatar?: string
  public readonly excerpt: string
  public readonly content: {
    raw: any
    text?: string
  }
  public readonly published_at?: Date
  
  // Joins
  public readonly author?: UserEntity

  constructor(props: BlogPostProps & { author?: UserEntity }) {
    super(props.id ?? '', props.created_at, props.updated_at)
    this.title = props.title
    this.slug = props.slug
    this.cover_image = props.cover_image
    this.category = props.category
    this.author_id = props.author_id
    this.author_name = props.author_name
    this.author_avatar = props.author_avatar
    this.excerpt = props.excerpt
    this.content = props.content
    this.published_at = props.published_at ? new Date(props.published_at) : undefined
    
    this.author = props.author
  }
}
