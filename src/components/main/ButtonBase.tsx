import { cn } from '../../lib/tailwind-merge'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonBase = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'py-3 px-4 rounded-lg flex justify-center items-center gap-2 overflow-hidden bg-accent text-white hover:bg-white hover:text-accent transition-all duration-500 disabled:opacity-50 active:scale-90',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
