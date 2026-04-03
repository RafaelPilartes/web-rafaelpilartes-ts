import { BaseEntity } from '@/core/entities/BaseEntity'
import { WorkExperienceProps, ImageMediaProps } from '@/types/database/portfolio'
import { TechnologyEntity } from './TechnologyEntity'

export class WorkExperienceEntity extends BaseEntity {
  public readonly role: string
  public readonly company_name: string
  public readonly company_url?: string
  public readonly company_logo: ImageMediaProps
  public readonly start_date: Date
  public readonly end_date?: Date
  public readonly description: {
    raw: any
  }
  
  // Joins
  public readonly technologies?: TechnologyEntity[]

  constructor(props: WorkExperienceProps & { technologies?: TechnologyEntity[] }) {
    super(props.id ?? '', props.created_at, props.updated_at)
    this.role = props.role
    this.company_name = props.company_name
    this.company_url = props.company_url
    this.company_logo = props.company_logo
    this.start_date = new Date(props.start_date)
    this.end_date = props.end_date ? new Date(props.end_date) : undefined
    this.description = props.description
    
    this.technologies = props.technologies
  }
}
