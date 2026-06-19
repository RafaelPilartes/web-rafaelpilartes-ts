import { Bell, Search } from 'lucide-react'
import { toast } from 'sonner'

export function Topbar() {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 shrink-0"
      style={{
        height: 'var(--dash-topbar-h)',
        background: 'rgba(9, 10, 18, 0.85)',
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
        <button
          className="dash-btn dash-btn-ghost dash-btn-icon relative"
          title="Notificações"
          onClick={() =>
            toast('O painel de notificações está em desenvolvimento.')
          }
        >
          <Bell size={18} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: 'var(--dash-accent)' }}
          />
        </button>
      </div>
    </header>
  )
}
