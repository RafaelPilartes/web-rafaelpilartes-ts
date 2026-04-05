import { BlogPostEntity } from '@/core/entities/content/BlogPostEntity'
import { IBaseRepository } from './IBaseRepository'

export interface IBlogPostRepository extends IBaseRepository<BlogPostEntity> {}
