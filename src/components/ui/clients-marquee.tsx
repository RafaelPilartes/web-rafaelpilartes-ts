import React from 'react'
import { motion } from 'framer-motion'

export interface MarqueeItem {
  image: string
  name: string
}

export const ClientsColumn = ({
  items,
  duration = 14,
  className
}: {
  items: MarqueeItem[]
  duration?: number
  className?: string
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop'
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {items.map((it, i) => (
              <div
                key={i}
                className="flex h-24 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-accent/30"
              >
                <img
                  src={it.image}
                  alt={it.name}
                  loading="lazy"
                  className="max-h-12 w-auto max-w-[150px] object-contain"
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
