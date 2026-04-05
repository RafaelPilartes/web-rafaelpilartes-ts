import { ReactNode } from 'react'

export interface ServiceProps {
  id?: string
  icon?: string | ReactNode | any
  title: string
  description: string
  created_at?: Date
  updated_at?: Date
}

export interface CustomerProps {
  id?: string
  photo: string
  name: string
  description: string
  occupation: string
  created_at?: Date | string
  updated_at?: Date
}

export interface TestimonialProps {
  id?: string
  photo: string
  name: string
  description: string
  occupation: string
  created_at?: Date | string
  updated_at?: Date
}

export interface QualityProps {
  id?: string
  icon_svg: string
  name: string
  description: string
  created_at?: Date
  updated_at?: Date
}

export interface BlogCategoryProps {
  id?: string
  name: string
  slug: string
  color?: string
  description?: string
  created_at?: Date | string
  updated_at?: Date
}

export interface BlogPostProps {
  id?: string
  title: string
  slug: string
  category_id?: string
  category?: BlogCategoryProps
  cover_image: string
  author_id?: string
  author_name?: string
  author_avatar?: string
  excerpt: string
  content: {
    raw: any
    text?: string
  }
  published_at?: Date | string
  created_at?: Date
  updated_at?: Date
}
