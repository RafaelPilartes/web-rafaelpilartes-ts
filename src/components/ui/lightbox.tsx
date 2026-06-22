import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  images: string[]
  index: number
  onClose: () => void
  onChange: (i: number) => void
}

export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const total = images.length
  const go = (dir: 1 | -1) => onChange((index + dir + total) % total)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total])

  const btn =
    'grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label="Fechar"
        onClick={onClose}
        className={`absolute right-4 top-4 z-10 ${btn}`}
      >
        <X className="h-5 w-5" />
      </button>

      {total > 1 && (
        <span className="absolute left-1/2 top-5 -translate-x-1/2 font-mono text-sm text-white/60">
          {index + 1} / {total}
        </span>
      )}

      {total > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={e => {
              e.stopPropagation()
              go(-1)
            }}
            className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 ${btn}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Seguinte"
            onClick={e => {
              e.stopPropagation()
              go(1)
            }}
            className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 ${btn}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <motion.img
        key={index}
        src={images[index]}
        alt=""
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
      />
    </motion.div>,
    document.body
  )
}

export default Lightbox
