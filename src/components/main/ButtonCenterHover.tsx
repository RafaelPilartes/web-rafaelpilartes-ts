import { cn } from '../../lib/tailwind-merge'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonCenterHover = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'relative py-3 px-4 rounded-lg flex flex-row justify-center items-center gap-2 overflow-hidden border border-accent text-accent shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-accent before:duration-300 before:ease-out hover:text-white hover:shadow-accent hover:before:h-[100%] hover:before:w-[100%] hover:before:opacity-80 disabled:opacity-50 active:scale-90',
        className
      )}
      {...props}
    >
      {/* 'py-3 px-4 rounded-lg flex justify-center items-center gap-2 bg-accent text-white hover:bg-white hover:text-accent transition-all  duration-400 disabled:opacity-50 active:scale-90', */}
      <span className="relative flex flex-row justify-center items-center gap-2 z-10">
        {children}
      </span>
    </button>
  )
}
