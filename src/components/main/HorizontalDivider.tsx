import { cn } from '../../lib/tailwind-merge'

type HorizontalDividerProps = {
  className?: string
}

export const HorizontalDivider = ({ className }: HorizontalDividerProps) => {
  return <div className={cn('w-full h-[2px] my-8 ', className)} />
}
