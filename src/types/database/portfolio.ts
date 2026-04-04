import { ProjectCategory, ProjectSectionType } from '../enum/portfolio'

export interface ImageMediaProps {
  url: string
}

export interface TechnologyProps {
  id?: string
  name: string
  icon_svg?: string
  start_date?: string | Date
  created_at?: Date
  updated_at?: Date
}

export interface ProjectSectionProps {
  id?: string
  project_id?: string
  type: ProjectSectionType | string
  title: string
  subtitle?: string
  description?: {
    raw: any
    text?: string
  }
  images?: ImageMediaProps[]
  items?: string[]
  created_at?: Date
  updated_at?: Date
}

export interface ProjectProps {
  id?: string
  slug: string
  category?: ProjectCategory
  client_name?: string
  duration?: string
  thumbnail: ImageMediaProps
  page_thumbnail: ImageMediaProps
  title: string
  short_description: string
  description: {
    raw: any
    text: string
  }
  images?: string[]
  live_project_url?: string
  github_url?: string
  figma_url?: string
  play_store_url?: string
  app_store_url?: string
  highlight?: string
  created_at?: Date
  updated_at?: Date
}

export interface WorkExperienceProps {
  id?: string
  role: string
  company_name: string
  company_url?: string
  company_logo: ImageMediaProps
  start_date: string | Date
  end_date?: string | Date
  description: {
    raw: any
  }
  created_at?: Date
  updated_at?: Date
}
