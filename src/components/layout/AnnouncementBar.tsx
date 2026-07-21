'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

export default function AnnouncementBar() {
  const t = useTranslations()
  const [visible, setVisible] = useState(true)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  // Hide on scroll down, reveal on scroll up (always shown near the top)
  useEffect(() => {
    lastY.current = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const delta = y - lastY.current
      if (y < 80) setHidden(false)
      else if (delta > 4) setHidden(true)
      else if (delta < -4) setHidden(false)
      lastY.current = y
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'sticky',
        top: 64,
        zIndex: 99,
        background: 'linear-gradient(to right, #236E74, #517272)',
        color: '#fff',
        textAlign: 'center',
        padding: '4px 44px',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.04em',
        cursor: 'pointer',
        transform: hidden ? 'translateY(calc(-100% - 64px))' : 'translateY(0)',
        transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {t('announcement')}

      <button
        onClick={(e) => {
          e.stopPropagation()
          setVisible(false)
        }}
        aria-label="Close"
        style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: '#fff',
          opacity: 0.7,
          fontSize: 16,
          lineHeight: 1,
          padding: 4,
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
      >
        ✕
      </button>
    </div>
  )
}
