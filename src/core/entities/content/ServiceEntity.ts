import { BaseEntity } from '@/core/entities/BaseEntity'
import { ServiceProps } from '@/types/database/content'
import { ReactNode } from 'react'

export class ServiceEntity extends BaseEntity {
  public readonly icon?: string | ReactNode | any
  public readonly title: string
  public readonly description: string

  constructor(props: ServiceProps) {
    super(props.id ?? '', props.created_at, props.updated_at)
    this.icon = props.icon
    this.title = props.title
    this.description = props.description
  }
}
