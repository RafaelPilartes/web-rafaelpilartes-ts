import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const routeLabels: Record<string, string> = {
  admin: 'Dashboard',
  blog: 'Blog',
  new: 'Novo',
  edit: 'Editar',
  categories: 'Categorias',
  projects: 'Projetos',
  technologies: 'Tecnologias',
  certificates: 'Certificados',
  experiences: 'Experiências',
  services: 'Serviços',
  testimonials: 'Testemunhos',
  customers: 'Clientes',
  qualities: 'Qualidades',
  admins: 'Administradores',
  settings: 'Configurações'
}

export function Breadcrumbs() {
  const location = useLocation()

  const crumbs = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean)
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`
      const label = routeLabels[segment] || segment
      const isLast = index === segments.length - 1
      return { label, path, isLast }
    })
  }, [location.pathname])

  return (
    <nav className="flex items-center gap-1.5 text-sm mb-6">
      <Link
        to="/admin"
        className="flex items-center gap-1 transition-colors"
        style={{ color: 'var(--dash-text-muted)' }}
        onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--dash-text)' }}
        onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--dash-text-muted)' }}
      >
        <Home size={14} />
      </Link>
      {crumbs.slice(1).map(crumb => (
        <span key={crumb.path} className="flex items-center gap-1.5">
          <ChevronRight size={12} style={{ color: 'var(--dash-text-faint)' }} />
          {crumb.isLast ? (
            <span style={{ color: 'var(--dash-text)' }} className="font-medium">
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="transition-colors"
              style={{ color: 'var(--dash-text-muted)' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--dash-text)' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--dash-text-muted)' }}
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
