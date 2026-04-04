import { BaseEntity } from '@/core/entities/BaseEntity'
import { BlogPostProps } from '@/types/database/content'
import { BlogCategoryEntity } from './BlogCategoryEntity'
import { UserEntity } from '../UserEntity'

export class BlogPostEntity extends BaseEntity {
  public readonly title: string
  public readonly slug: string
  public readonly cover_image: string
  public readonly category_id?: string
  public readonly category?: BlogCategoryEntity
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
    this.category_id = props.category_id
    this.category = props.category ? new BlogCategoryEntity(props.category) : undefined
    this.author_id = props.author_id
    this.author_name = props.author_name
    this.author_avatar = props.author_avatar
    this.excerpt = props.excerpt
    this.content = props.content
    this.published_at = props.published_at ? new Date(props.published_at) : undefined
    
    this.author = props.author
  }
}
