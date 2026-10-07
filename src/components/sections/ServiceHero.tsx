'use client'
import { useEffect, useRef } from 'react'

// Banner title + badge that drift upward and fade as the page scrolls down -
// a light parallax over the static hero image behind it.
export default function ServiceHero({
  badge,
  name,
}: {
  badge: string
  name: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      // Fade/rise over the first ~360px of scroll.
      const y = window.scrollY
      const span = 360
      const p = Math.min(Math.max(y / span, 0), 1)
      el.style.transform = `translateY(${-p * 10}px)`
      el.style.opacity = String(1 - p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="svc-banner-inner" style={{ willChange: 'transform, opacity' }}>
      <span className="svc-badge">{badge}</span>
      <h1 className="svc-title">{name}</h1>
    </div>
  )
}
