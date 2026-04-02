import { cn } from '../../lib/tailwind-merge'
import { motion } from 'framer-motion'
import { ComponentProps } from 'react'

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string
  className?: string
}

export const TechBadge = ({ name, className, ...props }: TechBadgeProps) => {
  return (
    <motion.span
      className={cn(
        'text-red-400 bg-red-900/80 text-sm py-1 px-3 rounded-lg hover:bg-red-900/90 transition-all duration-200',
        className
      )}
      {...props}
    >
      {name}
    </motion.span>
  )
}
