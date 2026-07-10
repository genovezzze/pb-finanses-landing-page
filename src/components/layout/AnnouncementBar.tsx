'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function AnnouncementBar() {
  const t = useTranslations()
  const [visible, setVisible] = useState(true)

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
