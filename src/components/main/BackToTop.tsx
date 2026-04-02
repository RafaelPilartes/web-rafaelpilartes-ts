import { TbArrowNarrowUp } from 'react-icons/tb'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { ButtonBase } from './ButtonBase'

export const BackToTop = () => {
  const [show, setShow] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleScroll = useCallback(() => {
    if (!show && window.scrollY > 500) setShow(true)
    if (show && window.scrollY <= 500) setShow(false)
  }, [show])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed right-12 xl:bottom-6 bottom-20 z-60"
          initial={{ opacity: 0, right: -10 }}
          animate={{ opacity: 1, right: 36 }}
          exit={{ opacity: 0, right: -10 }}
        >
          <ButtonBase
            onClick={scrollToTop}
            className="shadow-lg shadow-red-300/20"
          >
            <TbArrowNarrowUp size={20} />
          </ButtonBase>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
