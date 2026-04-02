import { cn } from '../../lib/tailwind-merge'

import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonCenterHoverReverse = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'relative py-3 px-4 rounded-lg flex flex-row justify-center items-center gap-2 overflow-hidden border border-accent text-white shadow-lg transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-[100%] before:w-[100%] before:rounded-sm before:bg-accent before:duration-300 before:ease-out hover:text-accent hover:shadow-accent hover:before:h-0 hover:before:w-0 hover:before:opacity-80 disabled:opacity-50 active:scale-90',
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
