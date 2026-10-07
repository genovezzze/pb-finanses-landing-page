'use client'
import { motion, type Transition } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'

// A gentle overshoot so every reveal lands with a little spring rather than a
// flat glide - the base motion feel shared across the whole site.
const EASE: Transition['ease'] = [0.22, 1.2, 0.36, 1]

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'rise' | 'tilt' | 'wipe'

const VARIANTS: Record<RevealVariant, { initial: Record<string, string | number>; animate: Record<string, string | number> }> = {
  up: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } },
  blur: { initial: { opacity: 0, filter: 'blur(6px)' }, animate: { opacity: 1, filter: 'blur(0px)' } },
  // A fuller entrance: the block lifts, unblurs and settles from a hair of
  // scale at once - the "interesting" reveal used across the marketing sections.
  rise: {
    initial: { opacity: 0, y: 34, scale: 0.965, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },
  // 3D tilt-in: the block hinges up from a slight backward lean into the screen,
  // rising and unblurring as it flattens. transformPerspective gives the tilt
  // real depth without needing perspective on a parent; the origin is set to the
  // top edge on the element below so it swings from its top like a lifting lid.
  tilt: {
    initial: { opacity: 0, rotateX: 14, y: 40, scale: 0.97, filter: 'blur(8px)', transformPerspective: 1000 },
    animate: { opacity: 1, rotateX: 0, y: 0, scale: 1, filter: 'blur(0px)', transformPerspective: 1000 },
  },
  // Curtain / "шторка": the content is unveiled from the top down as a mask
  // retracts, riding up a touch as it clears. clip-path keeps it a flat 2D
  // reveal, so there is no 3D compositing seam at the block's edge.
  wipe: {
    initial: { opacity: 0, y: 24, clipPath: 'inset(0% 0% 100% 0%)' },
    animate: { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' },
  },
}

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  className,
  style,
}: {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  style?: CSSProperties
}) {
  const { initial, animate } = VARIANTS[variant]
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      // Reveal once and stay. Replaying on every crossing made blocks flicker:
      // the -10% margins shrank the trigger area, so a tall card could be fully
      // on screen yet counted as "out of view" and animated back to opacity 0.
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      // The tilt hinges from the top edge; other variants keep the default
      // center origin. Caller styles still win over this base.
      style={{ transformOrigin: variant === 'tilt' ? 'center top' : undefined, ...style }}
    >
      {children}
    </motion.div>
  )
}
