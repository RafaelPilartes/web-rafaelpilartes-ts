import { useState } from 'react'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ComparisonSliderProps {
  /** Top image, revealed on the right side (clipped from the left). */
  before: string
  /** Bottom image, revealed on the left side. */
  after: string
  beforeLabel?: string
  afterLabel?: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

export function ComparisonSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  beforeAlt,
  afterAlt,
  className
}: ComparisonSliderProps) {
  const [inset, setInset] = useState(50)
  const [down, setDown] = useState(false)

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!down) return
    const rect = e.currentTarget.getBoundingClientRect()
    let x = 0
    if ('touches' in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left
    } else if ('clientX' in e) {
      x = (e as React.MouseEvent).clientX - rect.left
    }
    const pct = (x / rect.width) * 100
    setInset(Math.max(0, Math.min(100, pct)))
  }

  return (
    <div
      className={cn(
        'relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-white/10 sm:aspect-video',
        className
      )}
      onMouseMove={onMove}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      onTouchMove={onMove}
      onTouchEnd={() => setDown(false)}
    >
      {/* Divider + handle */}
      <div
        className="absolute top-0 z-20 -ml-px h-full w-0.5 bg-white/80"
        style={{ left: inset + '%' }}
      >
        <button
          type="button"
          aria-label="Arrastar para comparar"
          className="absolute top-1/2 z-30 -ml-4 flex h-10 w-8 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-md bg-accent text-white shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b14]"
          onTouchStart={e => {
            setDown(true)
            onMove(e)
          }}
          onMouseDown={e => {
            setDown(true)
            onMove(e)
          }}
          onTouchEnd={() => setDown(false)}
          onMouseUp={() => setDown(false)}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Top image (revealed on the right) */}
      <img
        src={before}
        alt={beforeAlt ?? ''}
        draggable={false}
        loading="lazy"
        className="absolute left-0 top-0 z-10 h-full w-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${inset}%)` }}
      />
      {/* Bottom image (revealed on the left) */}
      <img
        src={after}
        alt={afterAlt ?? ''}
        draggable={false}
        loading="lazy"
        className="absolute left-0 top-0 h-full w-full object-cover"
      />

      {/* Labels */}
      {afterLabel && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-2.5 py-1 font-mono text-xs text-white backdrop-blur-sm">
          {afterLabel}
        </span>
      )}
      {beforeLabel && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-black/50 px-2.5 py-1 font-mono text-xs text-white backdrop-blur-sm">
          {beforeLabel}
        </span>
      )}
    </div>
  )
}

export default ComparisonSlider
