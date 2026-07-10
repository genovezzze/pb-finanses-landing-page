'use client'
import { motion, type Transition } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'

const EASE: Transition['ease'] = [0.16, 1, 0.3, 1]

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'

const VARIANTS: Record<RevealVariant, { initial: Record<string, string | number>; animate: Record<string, string | number> }> = {
  up: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } },
  blur: { initial: { opacity: 0, filter: 'blur(6px)' }, animate: { opacity: 1, filter: 'blur(0px)' } },
}

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.6,
  className,
  style,
}: {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  const { initial, animate } = VARIANTS[variant]
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
