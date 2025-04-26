'use client'
import { useEffect, useState } from 'react'
import { motion, stagger, useAnimate } from 'motion/react'
import { cn } from '@/lib/utils'

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5
}: {
  words: string
  className?: string
  filter?: boolean
  duration?: number
}) => {
  const [scope, animate] = useAnimate()
  // Use a state to force re-renders
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Force component re-render when words change
    setKey(prev => prev + 1)

    // Small timeout to ensure DOM is ready before animation
    const timeout = setTimeout(() => {
      animate(
        'span',
        {
          opacity: 1,
          filter: filter ? 'blur(0px)' : 'none'
        },
        {
          duration: duration ? duration : 0.2,
          delay: stagger(0.025)
        }
      )
    }, 10)

    return () => clearTimeout(timeout)
  }, [words, filter, duration])

  const letters = words.split('')

  return (
    <div className={cn(className)}>
      <div className='leading-snug tracking-wide'>
        <motion.div ref={scope} key={key}>
          {letters.map((letter, idx) => {
            return (
              <motion.span
                key={idx}
                className='opacity-0'
                style={{
                  filter: filter ? 'blur(10px)' : 'none'
                }}
              >
                {letter}
              </motion.span>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
