
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthViewModel } from '@/viewModels/auth.viewmodel'
import { adminProfileUseCase } from '@/domain/usecases/AdminProfileUseCase'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import '@/styles/dashboard.css'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
})

type LoginForm = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { login, isLoggingIn, logout } = useAuthViewModel()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await login({ email: data.email, password: data.password })

      if (!user?.data) throw new Error('User not found')

      const profile = await adminProfileUseCase.executeGetOneByField(
        'user_id',
        user.data.id
      )

      if (!profile || !profile.is_active) {
        await logout()
        toast.error('Acesso negado. Conta de administrador não encontrada ou inativa.')
        return
      }

      navigate('/admin', { replace: true })
    } catch (error: any) {
      // login mutation already handles toast via onError in viewmodel
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--dash-bg)', fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[128px] opacity-20"
        style={{ background: 'var(--dash-accent)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[100px] opacity-10"
        style={{ background: '#3b82f6' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Card */}
        <div className="dash-glass p-8" style={{ boxShadow: 'var(--dash-shadow)' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg text-white"
              style={{ background: 'var(--dash-accent)' }}
            >
              RP
            </div>
            <h1
              className="text-xl font-bold mb-1"
              style={{ color: 'var(--dash-text)' }}
            >
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
              Sign in to your admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--dash-text)' }}
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--dash-text-faint)' }}
                />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@example.com"
                  className={`dash-input ${errors.email ? 'dash-input-error' : ''}`}
                  style={{ paddingLeft: '36px' }}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: 'var(--dash-danger)' }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--dash-text)' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--dash-text-faint)' }}
                />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`dash-input ${errors.password ? 'dash-input-error' : ''}`}
                  style={{ paddingLeft: '36px', paddingRight: '40px' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--dash-text-faint)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: 'var(--dash-danger)' }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="dash-btn dash-btn-primary w-full"
              style={{ marginTop: '8px' }}
            >
              {isLoggingIn ? (
                <div
                  className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: 'white', borderTopColor: 'transparent' }}
                />
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs mt-6"
          style={{ color: 'var(--dash-text-faint)' }}
        >
          Rafael Pilartes © {new Date().getFullYear()} — Admin Panel
        </p>
      </motion.div>
    </div>
  )
}
