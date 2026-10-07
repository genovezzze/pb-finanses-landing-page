'use client'
import { motion } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'

/**
 * Tactile wrapper for interactive elements: a spring lift on hover and a quick
 * press-in on tap, so buttons and links across the site feel physical. Renders
 * an inline-flex span around a single child (a Link or button) and leaves that
 * child's own styles untouched.
 */
export function Tappable({
  children,
  className,
  style,
  lift = -2,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  lift?: number
}) {
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-flex', ...style }}
      whileHover={{ y: lift }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
    >
      {children}
    </motion.span>
  )
}
