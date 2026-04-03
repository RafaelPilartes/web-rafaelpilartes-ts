import { BaseEntity } from '@/core/entities/BaseEntity'
import { TestimonialProps } from '@/types/database/content'

export class TestimonialEntity extends BaseEntity {
  public readonly photo: string
  public readonly name: string
  public readonly description: string
  public readonly occupation: string

  constructor(props: TestimonialProps) {
    super(props.id ?? '', props.created_at ? new Date(props.created_at) : undefined, props.updated_at)
    this.photo = props.photo
    this.name = props.name
    this.description = props.description
    this.occupation = props.occupation
  }
}
