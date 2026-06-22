import { motion } from 'framer-motion'

/* Syntax tokens */
const kw = 'text-accent' // keywords (const, return)
const fn = 'text-[#79c0ff]' // identifiers / functions
const str = 'text-[#7ee787]' // strings
const num = 'text-[#f0883e]' // booleans / numbers
const punc = 'text-white/40' // brackets, punctuation
const prop = 'text-white/80' // object keys

export default function HomeCodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full max-w-[460px] rounded-xl border border-white/10 bg-[#0d0e1a]/90 font-mono text-[13px] leading-relaxed shadow-2xl shadow-black/50 backdrop-blur"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-white/40">rafaelpilartes.ts</span>
      </div>

      {/* Code body */}
      <pre className="overflow-x-auto px-5 py-5">
        <code className="grid grid-cols-[1.5rem_1fr] gap-x-4">
          <span className="select-none text-right text-white/20">1</span>
          <span>
            <span className={kw}>const</span> <span className={fn}>rafael</span>{' '}
            <span className={punc}>=</span> <span className={punc}>{'{'}</span>
          </span>

          <span className="select-none text-right text-white/20">2</span>
          <span className="pl-4">
            <span className={prop}>role</span>
            <span className={punc}>:</span>{' '}
            <span className={str}>"Full-Stack Developer"</span>
            <span className={punc}>,</span>
          </span>

          <span className="select-none text-right text-white/20">3</span>
          <span className="pl-4">
            <span className={prop}>stack</span>
            <span className={punc}>: [</span>
            <span className={str}>"React"</span>
            <span className={punc}>,</span> <span className={str}>"Node"</span>
            <span className={punc}>,</span> <span className={str}>"Next"</span>
            <span className={punc}>],</span>
          </span>

          <span className="select-none text-right text-white/20">4</span>
          <span className="pl-4">
            <span className={prop}>focus</span>
            <span className={punc}>:</span>{' '}
            <span className={str}>"produtos sob medida"</span>
            <span className={punc}>,</span>
          </span>

          <span className="select-none text-right text-white/20">5</span>
          <span className="pl-4">
            <span className={prop}>open</span>
            <span className={punc}>:</span> <span className={num}>true</span>
            <span className={punc}>,</span>
          </span>

          <span className="select-none text-right text-white/20">6</span>
          <span>
            <span className={punc}>{'}'}</span>
            <span className="blink-caret text-accent">_</span>
          </span>
        </code>
      </pre>
    </motion.div>
  )
}
