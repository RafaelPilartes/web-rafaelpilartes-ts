import { useEffect, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthViewModel } from '@/viewModels/auth.viewmodel'

import { adminProfileUseCase } from '@/domain/usecases/AdminProfileUseCase'
import { AdminProfileEntity } from '@/core/entities/AdminProfileEntity'

interface AdminAuthGuardProps {
  children: ReactNode
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const navigate = useNavigate()
  const { getCurrentUser, onAuthStateChange, logout } = useAuthViewModel()
  const [loading, setLoading] = useState(true)
  const [adminProfile, setAdminProfile] = useState<AdminProfileEntity | null>(null)

  useEffect(() => {
    checkAuth()

    const unsubscribe = onAuthStateChange((_event, user) => {
      if (!user) {
        navigate('/admin/login', { replace: true })
      }
    })

    return () => unsubscribe()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: user } = await getCurrentUser()

      if (!user) {
        navigate('/admin/login', { replace: true })
        return
      }

      const profile = await adminProfileUseCase.executeGetOneByField('user_id', user.id)

      if (!profile || !profile.is_active) {
        await logout()
        navigate('/admin/login', { replace: true })
        return
      }

      setAdminProfile(profile)
    } catch {
      navigate('/admin/login', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--dash-bg)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--dash-accent)', borderTopColor: 'transparent' }} />
          <p style={{ color: 'var(--dash-text-muted)' }}>Verificando acesso...</p>
        </div>
      </div>
    )
  }

  if (!adminProfile) return null

  return <>{children}</>
}

export { type AdminAuthGuardProps }
