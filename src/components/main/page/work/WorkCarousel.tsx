import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { Lightbox } from '@/components/ui/lightbox'

type SlidesDetailsProps = {
  slides: string[]
}

export default function WorkCarousel({ slides }: SlidesDetailsProps) {
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState(false)

  const go = (dir: 1 | -1) =>
    setCurrent(p => (p + dir + slides.length) % slides.length)

  const ctrl =
    'grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

  return (
    <div className="w-full">
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        {slides.map((slide, i) => (
          <motion.img
            key={i}
            src={slide}
            alt={`Imagem ${i + 1}`}
            loading="lazy"
            onClick={() => setOpen(true)}
            className={`absolute inset-0 h-full w-full cursor-zoom-in object-cover transition-opacity duration-300 ${
              i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}

        {/* Counter */}
        {slides.length > 1 && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 font-mono text-xs text-white/80 backdrop-blur-sm">
            {current + 1} / {slides.length}
          </span>
        )}

        {/* Expand */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Ampliar imagem"
          className={`absolute right-3 top-3 z-10 h-9 w-9 opacity-0 transition-opacity group-hover:opacity-100 ${ctrl}`}
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Imagem anterior"
              className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 ${ctrl}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Próxima imagem"
              className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 ${ctrl}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir para imagem ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 bg-accent'
                  : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <Lightbox
            images={slides}
            index={current}
            onClose={() => setOpen(false)}
            onChange={setCurrent}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
