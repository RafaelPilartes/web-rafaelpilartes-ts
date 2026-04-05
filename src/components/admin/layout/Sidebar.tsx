import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  Settings
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
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

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
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 shrink-0"
        style={{
          height: 'var(--dash-topbar-h)',
          borderBottom: '1px solid var(--dash-border-visible)'
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0"
          style={{ background: 'var(--dash-accent)' }}
        >
          RP
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-sm whitespace-nowrap"
            style={{ color: 'var(--dash-text)' }}
          >
            Rafael CMS
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 dash-scroll">
        {navigation.map(group => (
          <div key={group.label} className="mb-6">
            {!collapsed && (
              <p
                className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: 'var(--dash-text-faint)' }}
              >
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map(item => (
                <div key={item.path}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.path)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
                        style={{
                          color: isActive(item.path)
                            ? 'var(--dash-text)'
                            : 'var(--dash-text-muted)',
                          background: isActive(item.path)
                            ? 'var(--dash-surface-hover)'
                            : 'transparent'
                        }}
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
                            className="overflow-hidden ml-5 pl-3"
                            style={{
                              borderLeft: '1px solid var(--dash-border)'
                            }}
                          >
                            {item.children.map(child => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                end={child.path === item.path}
                                className="block px-3 py-2 text-sm rounded-md transition-colors"
                                style={({ isActive: active }) => ({
                                  color: active
                                    ? 'var(--dash-accent)'
                                    : 'var(--dash-text-muted)',
                                  background: active
                                    ? 'var(--dash-accent-soft)'
                                    : 'transparent'
                                })}
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
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative"
                      style={({ isActive: active }) => ({
                        color: active
                          ? 'var(--dash-text)'
                          : 'var(--dash-text-muted)',
                        background: active
                          ? 'var(--dash-accent-soft)'
                          : 'transparent'
                      })}
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

      {/* Collapse Toggle */}
      <div
        className="px-3 py-3 shrink-0"
        style={{ borderTop: '1px solid var(--dash-border-visible)' }}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
          style={{ color: 'var(--dash-text-muted)' }}
          onMouseEnter={e => {
            ;(e.target as HTMLElement).style.background =
              'var(--dash-surface-hover)'
          }}
          onMouseLeave={e => {
            ;(e.target as HTMLElement).style.background = 'transparent'
          }}
        >
          <ChevronLeft
            size={18}
            className="transition-transform"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
