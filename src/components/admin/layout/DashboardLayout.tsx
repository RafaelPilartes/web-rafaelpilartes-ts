import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { Breadcrumbs } from './Breadcrumbs'
import '@/styles/dashboard.css'

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: 'var(--dash-bg)' }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(v => !v)}
      />

      <div
        className="flex flex-col min-h-screen transition-all"
        style={{
          marginLeft: sidebarCollapsed ? 'var(--dash-sidebar-collapsed)' : 'var(--dash-sidebar-w)',
          transition: 'margin-left var(--dash-transition)'
        }}
      >
        <Topbar />

        <main className="flex-1 p-6">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
