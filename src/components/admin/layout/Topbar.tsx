import { useNavigate } from 'react-router-dom'
import { useAuthViewModel } from '@/viewModels/auth.viewmodel'
import { LogOut, Bell, Search, User } from 'lucide-react'
import { toast } from 'sonner'

export function Topbar() {
  const navigate = useNavigate()
  const { useCurrentUser, logout } = useAuthViewModel()
  const { data: user } = useCurrentUser()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 shrink-0"
      style={{
        height: 'var(--dash-topbar-h)',
        background: 'rgba(10, 11, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--dash-border-visible)'
      }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--dash-text-faint)' }}
        />
        <input
          type="text"
          placeholder="Search anything..."
          className="dash-input"
          onClick={() => toast('Função de pesquisa em desenvolvimento.')}
          style={{
            paddingLeft: '36px',
            fontSize: '13px',
            background: 'var(--dash-surface-hover)'
          }}
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className="dash-btn dash-btn-ghost dash-btn-icon relative"
          title="Notificações"
          onClick={() => toast('O painel de notificações está em desenvolvimento.')}
        >
          <Bell size={18} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: 'var(--dash-accent)' }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-8 mx-2" style={{ background: 'var(--dash-border-visible)' }} />

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium" style={{ color: 'var(--dash-text)' }}>
              Admin
            </p>
            <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>
              {user?.email ?? ''}
            </p>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'var(--dash-accent-soft)' }}
          >
            <User size={18} style={{ color: 'var(--dash-accent)' }} />
          </div>
          <button
            onClick={handleLogout}
            className="dash-btn dash-btn-ghost dash-btn-icon"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
