import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/tailwind-merge'

type NavItemProps = {
  href: string
  label: string
}

export const NavItem = ({ label, href }: NavItemProps) => {
  const { pathname } = useLocation()

  const isActive = pathname === href

  return (
    <Link
      to={href}
      className={cn(
        'text-gray-400 flex items-center gap-2 font-medium font-mono',
        isActive && 'text-gray-50'
      )}
    >
      <span className="text-emerald-400">#</span>
      {label}
    </Link>
  )
}
