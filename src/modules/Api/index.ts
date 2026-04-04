import { IAuthRepository } from '@/core/interfaces/IAuthRepository'
import { IUserRepository } from '@/core/interfaces/IUserRepository'
import { IAdminProfileRepository } from '@/core/interfaces/IAdminProfileRepository'
import { IStorageRepository } from '@/core/interfaces/IStorageRepository'

// Supabase DAOs
import { SupabaseAuthDAO } from './supabase/SupabaseAuthDAO'
import { SupabaseUserDAO } from './supabase/SupabaseUserDAO'
import { SupabaseAdminProfileDAO } from './supabase/SupabaseAdminProfileDAO'
import { SupabaseStorageDAO } from './supabase/SupabaseStorageDAO'

export type ApiDriverType = 'supabase' | 'rest' | 'firebase'

class ApiFactory {
  // private driver: ApiDriverType = 'supabase'

  setDriver(_driver: ApiDriverType) {
    // this.driver = driver
  }

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
}

export const ApiRepository = new ApiFactory()
