import { useEffect, useLayoutEffect, useRef } from 'react'
import {
  motion,
  animate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue
} from 'framer-motion'
import { cn } from '@/lib/utils'

export interface RadarItem {
  icon: React.ReactNode
  label: string
}

const TRAIL = 70 // degrees of fading trail behind the sweep
const BASE = 0.12 // resting opacity (very dim until swept)
const SPIN_SECONDS = 9

function RowIcon({
  item,
  index,
  sweep,
  anglesRef,
  registerRef,
  reduce
}: {
  item: RadarItem
  index: number
  sweep: MotionValue<number>
  anglesRef: React.MutableRefObject<number[]>
  registerRef: (i: number, el: HTMLDivElement | null) => void
  reduce: boolean
}) {
  const flash = useTransform(sweep, s => {
    const a = anglesRef.current[index]
    if (a == null) return 0
    const d = (s - a + 360) % 360
    return d <= TRAIL ? 1 - d / TRAIL : 0
  })

  const wrapOpacity = useTransform(flash, v =>
    reduce ? 1 : BASE + v * (1 - BASE)
  )
  const scale = useTransform(flash, v => 1 + v * 0.18)
  const borderColor = useTransform(flash, v => `rgba(241,48,36,${0.1 + v * 0.9})`)
  const boxShadow = useTransform(flash, v =>
    v > 0.05 ? `0 0 ${8 + v * 24}px rgba(241,48,36,${v * 0.6})` : 'none'
  )
  const labelOpacity = useTransform(flash, v => (reduce ? 1 : v))

  return (
    <motion.div
      ref={el => registerRef(index, el)}
      className="relative z-50 flex flex-col items-center gap-2"
      style={{ opacity: wrapOpacity }}
    >
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/5 text-white backdrop-blur-sm"
        style={{ scale, borderColor, boxShadow }}
      >
        {item.icon}
      </motion.div>
      <motion.span
        className="hidden whitespace-nowrap text-center text-xs font-medium text-white md:block"
        style={{ opacity: labelOpacity }}
      >
        {item.label}
      </motion.span>
    </motion.div>
  )
}

export function RadarRows({
  items,
  className
}: {
  items: RadarItem[]
  className?: string
}) {
  const reduce = useReducedMotion() ?? false
  const sweep = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const anglesRef = useRef<number[]>([])

  const registerRef = (i: number, el: HTMLDivElement | null) => {
    iconRefs.current[i] = el
  }

  // Measure each icon's angle from the radar pivot (bottom-center).
  useLayoutEffect(() => {
    const measure = () => {
      const c = containerRef.current
      if (!c) return
      const cr = c.getBoundingClientRect()
      const pivotX = cr.left + cr.width / 2
      const pivotY = cr.bottom
      anglesRef.current = iconRefs.current.map(el => {
        if (!el) return 0
        const r = el.getBoundingClientRect()
        const dx = r.left + r.width / 2 - pivotX
        const dy = r.top + r.height / 2 - pivotY
        return (((Math.atan2(dy, dx) * 180) / Math.PI) + 360) % 360
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [items.length])

  useEffect(() => {
    if (reduce) {
      sweep.set(0)
      return
    }
    const controls = animate(sweep, 360, {
      duration: SPIN_SECONDS,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop'
    })
    return () => controls.stop()
  }, [reduce, sweep])

  const icon = (i: number) => (
    <RowIcon
      key={i}
      item={items[i]}
      index={i}
      sweep={sweep}
      anglesRef={anglesRef}
      registerRef={registerRef}
      reduce={reduce}
    />
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative mx-auto flex h-96 w-full max-w-3xl flex-col items-center justify-center gap-8 overflow-hidden px-4',
        className
      )}
    >
      {/* Radar dish (concentric arcs from the bottom-center pivot) */}
      {[1, 2, 3, 4].map(r => (
        <div
          key={r}
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/[0.08]"
          style={{ width: `${r * 170}px`, height: `${r * 170}px` }}
        />
      ))}

      {/* Rotating sweep line (pivots at bottom-center) */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 z-40 h-px w-[640px] origin-left"
        style={{ rotate: sweep }}
      >
        <div className="h-px w-full bg-gradient-to-r from-accent via-accent/40 to-transparent" />
      </motion.div>

      {/* Center node */}
      <div className="absolute bottom-0 left-1/2 z-40 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(241,48,36,0.8)]" />

      {/* Base line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[41] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* Rows of icons */}
      <div className="flex w-full items-center justify-center gap-10 md:justify-between md:gap-0">
        {icon(0)}
        {icon(1)}
        {icon(2)}
      </div>
      <div className="flex w-full max-w-md items-center justify-center gap-10 md:justify-between md:gap-0">
        {icon(3)}
        {icon(4)}
      </div>
      <div className="flex w-full items-center justify-center gap-10 md:justify-between md:gap-0">
        {icon(5)}
        {icon(6)}
      </div>
    </div>
  )
}

export default RadarRows
