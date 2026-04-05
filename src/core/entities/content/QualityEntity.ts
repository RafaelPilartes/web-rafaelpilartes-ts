import { BaseEntity } from '@/core/entities/BaseEntity'
import { QualityProps } from '@/types/database/content'

export class QualityEntity extends BaseEntity {
  public readonly icon_svg: string
  public readonly name: string
  public readonly description: string

  constructor(props: QualityProps) {
    super(props.id ?? '', props.created_at, props.updated_at)
    this.icon_svg = props.icon_svg
    this.name = props.name
    this.description = props.description
  }
}
