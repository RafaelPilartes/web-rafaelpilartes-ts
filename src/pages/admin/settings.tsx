import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: 'var(--dash-text)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--dash-text-muted)' }}>System configuration</p>
      </div>

      <div className="dash-card p-8 flex flex-col items-center justify-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--dash-surface-hover)' }}
        >
          <Settings size={32} style={{ color: 'var(--dash-text-faint)' }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: 'var(--dash-text)' }}>
            Settings coming soon
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--dash-text-muted)' }}>
            Site configuration, SEO defaults, and more
          </p>
        </div>
      </div>
    </div>
  )
}
