import { AdminPermissionLevel, UserRole } from '@/types/enum/identity'

export interface UserProps {
  id: string
  avatar_url?: string
  name: string
  email: string
  phone: string
  gender: string
  birth_date: string
  role?: UserRole
  created_at?: Date
  updated_at?: Date
}

export interface AdminProfileProps {
  id: string
  user_id: string
  permission_level: AdminPermissionLevel
  department?: string
  is_active: boolean
  last_login_at?: Date
  created_at?: Date
  updated_at?: Date
}
