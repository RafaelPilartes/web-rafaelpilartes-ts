import { useState } from 'react'
import { motion } from 'framer-motion'

type SlidesDetailsProps = {
  slides: string[]
}

export default function WorkCarousel({ slides }: SlidesDetailsProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prevSlide: any) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide: any) => (prevSlide - 1 + slides.length) % slides.length
    )
  }

  return (
    <div className="relative container w-screen h-screen max-h-[16rem] sm:max-h-[26rem] md:max-h-[36rem] flex items-center justify-center rounded-md">
      {slides.map((slide, index) => (
        <motion.img
          key={index}
          src={slide}
          alt={`Slide ${index + 1}`}
          className={`w-full h-full absolute object-cover ${
            index === currentSlide
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.3 }} // Tempo de duração da animação (ajuste conforme necessário)
        />
      ))}

      <div className="absolute w-full inset-0 flex items-center justify-between px-4">
        <button
          onClick={prevSlide}
          className="text-white text-2xl px-4 py-2 bg-accent hover:bg-red-600/70 active:bg-red-700 rounded transition-all duration-200"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="text-white text-2xl px-4 py-2 bg-accent hover:bg-red-600/70 active:bg-red-700 rounded transition-all duration-200"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}
