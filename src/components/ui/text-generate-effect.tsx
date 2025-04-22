'use client'
import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'motion/react'
import { cn } from '@/lib/utils'

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5
}: {
  words: string | null
  className?: string
  filter?: boolean
  duration?: number
}) => {
  const [scope, animate] = useAnimate()
  const letters = words ? words.split('') : ['']

  // Add words to the dependency array so the effect runs when words changes
  useEffect(() => {
    if (!scope.current) return

    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none'
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.05)
      }
    )
  }, [words]) // Include all dependencies

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {letters.map((letter, idx) => {
          return (
            <motion.span
              key={`${letter}-${idx}-${words}`} // Add words to the key for proper re-rendering
              style={{
                // opacity: 0, // Start with opacity 0
                filter: filter ? 'blur(10px)' : 'none'
              }}
            >
              {letter}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn(className)}>
      <div className='leading-snug tracking-wide'>{renderWords()}</div>
    </div>
  )
}
