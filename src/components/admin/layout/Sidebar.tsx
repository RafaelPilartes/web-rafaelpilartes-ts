import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthViewModel } from '@/viewModels/auth.viewmodel'
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Briefcase,
  Award,
  Code2,
  Wrench,
  MessageSquare,
  Users,
  Star,
  Shield,
  ChevronLeft,
  ChevronDown,
  Tag,
  Settings,
  LogOut
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavGroup {
  label: string
  items: NavItem[]
}

interface NavItem {
  icon: React.ElementType
  label: string
  path: string
  children?: { label: string; path: string }[]
}

const navigation: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ icon: LayoutDashboard, label: 'Dashboard', path: '/admin' }]
  },
  {
    label: 'Blog',
    items: [
      {
        icon: FileText,
        label: 'Posts',
        path: '/admin/blog',
        children: [
          { label: 'All Posts', path: '/admin/blog' },
          { label: 'New Post', path: '/admin/blog/new' }
        ]
      },
      { icon: Tag, label: 'Categories', path: '/admin/categories' }
    ]
  },
  {
    label: 'Portfolio',
    items: [
      { icon: FolderOpen, label: 'Projects', path: '/admin/projects' },
      { icon: Code2, label: 'Technologies', path: '/admin/technologies' },
      { icon: Award, label: 'Certificates', path: '/admin/certificates' },
      { icon: Briefcase, label: 'Experiences', path: '/admin/experiences' }
    ]
  },
  {
    label: 'Content',
    items: [
      { icon: Wrench, label: 'Services', path: '/admin/services' },
      {
        icon: MessageSquare,
        label: 'Testimonials',
        path: '/admin/testimonials'
      },
      { icon: Users, label: 'Customers', path: '/admin/customers' },
      { icon: Star, label: 'Qualities', path: '/admin/qualities' }
    ]
  },
  {
    label: 'System',
    items: [
      { icon: Shield, label: 'Admins', path: '/admin/admins' },
      { icon: Settings, label: 'Settings', path: '/admin/settings' }
    ]
  }
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { useCurrentUser, logout } = useAuthViewModel()
  const { data: user } = useCurrentUser()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  const email = user?.email ?? ''
  const initials = email ? email.slice(0, 2).toUpperCase() : 'RP'

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    )
  }

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen z-40 flex flex-col dash-scroll"
      style={{
        width: collapsed
          ? 'var(--dash-sidebar-collapsed)'
          : 'var(--dash-sidebar-w)',
        background: 'var(--dash-surface)',
        borderRight: '1px solid var(--dash-border-visible)',
        transition: 'width var(--dash-transition)'
      }}
    >
      {/* Collapse toggle — discreet button on the sidebar edge */}
      <button
        onClick={onToggle}
        className="dash-collapse-toggle"
        title={collapsed ? 'Expand' : 'Collapse'}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft
          size={14}
          style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {/* Logo */}
      <div
        className={`flex items-center gap-3 shrink-0 ${collapsed ? 'justify-center px-0' : 'px-5'}`}
        style={{
          height: 'var(--dash-topbar-h)',
          borderBottom: '1px solid var(--dash-border-visible)'
        }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0"
          style={{ background: 'var(--dash-accent)' }}
        >
          RP
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-w-0"
          >
            <p
              className="font-semibold text-sm leading-tight whitespace-nowrap"
              style={{ color: 'var(--dash-text)' }}
            >
              Rafael CMS
            </p>
            <p
              className="text-[11px] whitespace-nowrap"
              style={{ color: 'var(--dash-text-faint)' }}
            >
              Content Manager
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 dash-scroll">
        {navigation.map(group => (
          <div key={group.label} className="mb-6">
            {!collapsed && (
              <p className="dash-nav-group-label">{group.label}</p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map(item => (
                <div key={item.path}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.path)}
                        title={collapsed ? item.label : undefined}
                        className={`dash-nav-item ${isActive(item.path) ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`}
                      >
                        <item.icon size={18} className="shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">
                              {item.label}
                            </span>
                            <ChevronDown
                              size={14}
                              className="transition-transform"
                              style={{
                                transform: expandedMenus.includes(item.path)
                                  ? 'rotate(180deg)'
                                  : 'rotate(0deg)'
                              }}
                            />
                          </>
                        )}
                      </button>
                      <AnimatePresence>
                        {!collapsed && expandedMenus.includes(item.path) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-5 pl-3 mt-0.5"
                            style={{
                              borderLeft: '1px solid var(--dash-border)'
                            }}
                          >
                            {item.children.map(child => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                end={child.path === item.path}
                                className={({ isActive: active }) =>
                                  `dash-nav-subitem ${active ? 'active' : ''}`
                                }
                              >
                                {child.label}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      end={item.path === '/admin'}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive: active }) =>
                        `dash-nav-item ${active ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
                      }
                    >
                      {({ isActive: active }) => (
                        <>
                          {active && (
                            <motion.div
                              layoutId="sidebar-active"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                              style={{ background: 'var(--dash-accent)' }}
                            />
                          )}
                          <item.icon size={18} className="shrink-0" />
                          {!collapsed && <span>{item.label}</span>}
                        </>
                      )}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Account */}
      <div
        className="px-3 py-3 shrink-0"
        style={{ borderTop: '1px solid var(--dash-border-visible)' }}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-1">
            <div className="dash-avatar" title={email}>
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="dash-nav-item justify-center"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="dash-sidebar-account">
            <div className="dash-avatar">{initials}</div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: 'var(--dash-text)' }}
              >
                Admin
              </p>
              <p
                className="text-xs truncate"
                style={{ color: 'var(--dash-text-muted)' }}
              >
                {email || '—'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="dash-btn dash-btn-ghost dash-btn-icon dash-btn-sm"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
