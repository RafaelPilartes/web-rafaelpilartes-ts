import { Link } from 'react-router-dom'
import { cn } from '../../lib/tailwind-merge'
import { ComponentProps } from 'react'

type LinkProps = ComponentProps<typeof Link>

export const LinkSimple = ({ className, children, ...props }: LinkProps) => {
  return (
    <Link
      className={cn(
        'flex items-center gap-2 text-gray-300 text-sm transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
