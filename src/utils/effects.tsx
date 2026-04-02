import React, { useState, useEffect } from 'react'

interface TypingEffectProps {
  texts: string[]
  typingSpeed?: number
  delay?: number
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  texts,
  typingSpeed = 100,
  delay = 900
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [displayText, setDisplayText] = useState<string>('')

  useEffect(() => {
    const currentText = texts[currentIndex]
    let interval: NodeJS.Timeout

    if (displayText === currentText) {
      const timeout = setTimeout(() => {
        setDisplayText('') // Limpa o texto antes de escrever o próximo
        setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length)
      }, delay)

      return () => {
        clearTimeout(timeout)
      }
    }

    interval = setInterval(() => {
      setDisplayText(prevText => {
        const nextChar = currentText[prevText.length]
        return prevText + nextChar
      })
    }, typingSpeed)

    return () => {
      clearInterval(interval)
    }
  }, [texts, currentIndex, displayText, typingSpeed, delay])

  return <span>{displayText}</span>
}

export default TypingEffect
