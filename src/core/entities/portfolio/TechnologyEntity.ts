import { BaseEntity } from '@/core/entities/BaseEntity'
import { TechnologyProps } from '@/types/database/portfolio'

export class TechnologyEntity extends BaseEntity {
  public readonly name: string
  public readonly icon_svg?: string
  public readonly start_date?: Date

  constructor(props: TechnologyProps) {
    super(props.id ?? '', props.created_at, props.updated_at)
    this.name = props.name
    this.icon_svg = props.icon_svg
    this.start_date = props.start_date ? new Date(props.start_date) : undefined
  }
}
