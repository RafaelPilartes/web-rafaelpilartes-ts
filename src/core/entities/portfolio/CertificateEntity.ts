import { BaseEntity } from '@/core/entities/BaseEntity'
import { CertificateProps, ImageMediaProps } from '@/types/database/portfolio'

export class CertificateEntity extends BaseEntity {
  public readonly title: string
  public readonly issued_by: string
  public readonly issue_date: Date
  public readonly expiration_date?: Date
  public readonly credential_id?: string
  public readonly credential_url?: string
  public readonly image?: ImageMediaProps
  public readonly description?: {
    raw: any
  }

  constructor(props: CertificateProps) {
    super(props.id ?? '', props.created_at, props.updated_at)
    this.title = props.title
    this.issued_by = props.issued_by
    this.issue_date = new Date(props.issue_date)
    this.expiration_date = props.expiration_date
      ? new Date(props.expiration_date)
      : undefined
    this.credential_id = props.credential_id
    this.credential_url = props.credential_url
    this.image = props.image
    this.description = props.description
  }
}
