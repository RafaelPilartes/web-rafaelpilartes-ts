import { cn } from '../../lib/tailwind-merge'
import { motion } from 'framer-motion'

type SectionTitleProps = {
  subtitle: string
  title: string
  className?: string
  description?: string
}

export const SectionTitle = ({
  subtitle,
  title,
  className,
  description
}: SectionTitleProps) => {
  const animProps = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <motion.span
        className="font-mono text-sm text-red-400"
        {...animProps}
        transition={{ duration: 0.5 }}
      >{`../${subtitle}`}</motion.span>
      <motion.h3
        className="text-3xl font-medium"
        {...animProps}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p {...animProps} transition={{ duration: 0.5, delay: 0.2 }}>
        {description}
      </motion.p>
    </div>
  )
}
