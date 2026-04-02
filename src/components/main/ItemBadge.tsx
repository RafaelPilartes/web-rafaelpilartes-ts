import { cn } from '../../lib/tailwind-merge'
import { motion } from 'framer-motion'
import { ComponentProps } from 'react'
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle
} from 'react-icons/ai'
import { BsListCheck } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'

type ItemBadgeProps = ComponentProps<typeof motion.div> & {
  name: string
  className?: string
  type?: 'error' | 'success' | 'normal' | 'alert'
}

export const ItemBadge = ({
  name,
  className,
  type = 'normal',
  ...props
}: ItemBadgeProps) => {
  return (
    <motion.div
      data-type={type}
      className={cn(
        'inline-flex flex-row items-center justify-center gap-2 p-3 rounded-md data-[type=normal]:bg-blue-700/20 data-[type=success]:bg-green-700/20 data-[type=error]:bg-red-700/20 data-[type=alert]:bg-yellow-700/20 ',
        className
      )}
      {...props}
    >
      <span
        data-type={type}
        className="data-[type=normal]:text-blue-800 data-[type=success]:text-green-700 data-[type=error]:text-accent data-[type=alert]:text-yellow-600"
      >
        {type == 'normal' && <BsListCheck />}
        {type == 'success' && <AiOutlineCheckCircle />}
        {type == 'error' && <ImCancelCircle />}
        {type == 'alert' && <AiOutlineExclamationCircle />}
      </span>
      <span className="text-sm font-light text-slate-100">{name}</span>
    </motion.div>
  )
}
