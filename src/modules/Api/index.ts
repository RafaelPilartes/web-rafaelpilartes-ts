import { IAuthRepository } from '@/core/interfaces/IAuthRepository'
import { IUserRepository } from '@/core/interfaces/IUserRepository'
import { IAdminProfileRepository } from '@/core/interfaces/IAdminProfileRepository'
import { IStorageRepository } from '@/core/interfaces/IStorageRepository'
import { IBlogPostRepository } from '@/core/interfaces/IBlogPostRepository'
import { IBlogCategoryRepository } from '@/core/interfaces/IBlogCategoryRepository'
import { IProjectRepository } from '@/core/interfaces/IProjectRepository'
import { ITechnologyRepository } from '@/core/interfaces/ITechnologyRepository'
import { ICertificateRepository } from '@/core/interfaces/ICertificateRepository'
import { IWorkExperienceRepository } from '@/core/interfaces/IWorkExperienceRepository'
import { IServiceRepository } from '@/core/interfaces/IServiceRepository'
import { ITestimonialRepository } from '@/core/interfaces/ITestimonialRepository'
import { ICustomerRepository } from '@/core/interfaces/ICustomerRepository'
import { IQualityRepository } from '@/core/interfaces/IQualityRepository'

// Supabase DAOs
import { SupabaseAuthDAO } from './supabase/SupabaseAuthDAO'
import { SupabaseUserDAO } from './supabase/SupabaseUserDAO'
import { SupabaseAdminProfileDAO } from './supabase/SupabaseAdminProfileDAO'
import { SupabaseStorageDAO } from './supabase/SupabaseStorageDAO'
import { SupabaseBlogPostDAO } from './supabase/SupabaseBlogPostDAO'
import { SupabaseBlogCategoryDAO } from './supabase/SupabaseBlogCategoryDAO'
import { SupabaseProjectDAO } from './supabase/SupabaseProjectDAO'
import { SupabaseTechnologyDAO } from './supabase/SupabaseTechnologyDAO'
import { SupabaseCertificateDAO } from './supabase/SupabaseCertificateDAO'
import { SupabaseWorkExperienceDAO } from './supabase/SupabaseWorkExperienceDAO'
import { SupabaseServiceDAO } from './supabase/SupabaseServiceDAO'
import { SupabaseTestimonialDAO } from './supabase/SupabaseTestimonialDAO'
import { SupabaseCustomerDAO } from './supabase/SupabaseCustomerDAO'
import { SupabaseQualityDAO } from './supabase/SupabaseQualityDAO'

export type ApiDriverType = 'supabase' | 'rest' | 'firebase'

class ApiFactory {
  setDriver(_driver: ApiDriverType) {}

  // Auth
  get auth(): IAuthRepository {
    return new SupabaseAuthDAO()
  }

  // Users
  get user(): IUserRepository {
    return new SupabaseUserDAO()
  }

  // Identity Profiles
  get adminProfiles(): IAdminProfileRepository {
    return new SupabaseAdminProfileDAO()
  }

  // Storage
  get storage(): IStorageRepository {
    return new SupabaseStorageDAO()
  }

  // Blog
  get blogPosts(): IBlogPostRepository {
    return new SupabaseBlogPostDAO()
  }

  get blogCategories(): IBlogCategoryRepository {
    return new SupabaseBlogCategoryDAO()
  }

  // Portfolio
  get projects(): IProjectRepository {
    return new SupabaseProjectDAO()
  }

  get technologies(): ITechnologyRepository {
    return new SupabaseTechnologyDAO()
  }

  get certificates(): ICertificateRepository {
    return new SupabaseCertificateDAO()
  }

  get workExperiences(): IWorkExperienceRepository {
    return new SupabaseWorkExperienceDAO()
  }

  // Content
  get services(): IServiceRepository {
    return new SupabaseServiceDAO()
  }

  get testimonials(): ITestimonialRepository {
    return new SupabaseTestimonialDAO()
  }

  get customers(): ICustomerRepository {
    return new SupabaseCustomerDAO()
  }

  get qualities(): IQualityRepository {
    return new SupabaseQualityDAO()
  }
}

export const ApiRepository = new ApiFactory()
