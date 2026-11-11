'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const SECTOR_IMAGES = [
  '/images/sector-jaunuznemumi.webp',
  '/images/sector-holdingi.webp',
  '/images/sector-starptautiskas.webp',
  '/images/sector-nvo.webp',
]

const SECTOR_ALTS = [
  'Jaunuzņēmumi',
  'Holdingi un korporācijas',
  'Starptautiskas korporācijas',
  'NVO, biedrības un nodibinājumi',
]

export default function Sectors() {
  const t = useTranslations('sectors')
  const items = t.raw('items') as Array<{ title: string; body: string }>

  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={inView ? 'is-in' : undefined}
      style={{ background: 'var(--color-linen-tint)', padding: '64px 0' }}
    >
      <div className="section-wrap">
        <h2
          id="sectors-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(26px, 2.6vw, 36px)',
            color: 'var(--color-ink-black)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 40,
          }}
        >
          {t('title')}
        </h2>
        <div
          className="sector-card-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              className="sector-card"
              style={{
                background: 'var(--color-canvas-white)',
                overflow: 'hidden',
                height: '100%',
                borderRadius: 12,
                boxShadow: '0 1px 2px rgba(12,10,7,0.04)',
                transition:
                  'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Image block */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                {SECTOR_IMAGES[i] ? (
                  <Image
                    src={SECTOR_IMAGES[i]}
                    alt={SECTOR_ALTS[i]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                    className="sector-img"
                  />
                ) : (
                  <div
                    className="sector-img"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, var(--color-gilt), var(--color-gilt-dark))',
                    }}
                  />
                )}
                <div
                  className="sector-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(184,146,58,0.08) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.4s',
                  }}
                />
                {SECTOR_IMAGES[i]?.startsWith('/images/') && (
                  <span
                    style={{
                      position: 'absolute',
                      right: 8,
                      bottom: 7,
                      fontFamily: 'var(--font-body)',
                      fontSize: 10.5,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.85)',
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                      pointerEvents: 'none',
                    }}
                  >
                    Agnese Pastare
                  </span>
                )}
              </div>

              {/* Text */}
              <div style={{ padding: '24px 28px 28px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 22,
                    color: 'var(--color-ink-black)',
                    marginBottom: 10,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--color-graphite)',
                    lineHeight: 1.65,
                  }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #sectors-title, .sector-card {
          opacity: 0;
          transform: translateY(26px);
        }
        #sectors-title {
          transition: opacity .7s cubic-bezier(0.16,1,0.3,1), transform .7s cubic-bezier(0.16,1,0.3,1);
        }
        .is-in #sectors-title { opacity: 1; transform: none; }
        .is-in .sector-card { opacity: 1; transform: none; }
        .is-in .sector-card:nth-child(1) { transition-delay: .12s; }
        .is-in .sector-card:nth-child(2) { transition-delay: .20s; }
        .is-in .sector-card:nth-child(3) { transition-delay: .28s; }
        .is-in .sector-card:nth-child(4) { transition-delay: .36s; }
        .sector-card:hover { transition-delay: 0s; }
        @media (prefers-reduced-motion: reduce) {
          #sectors-title, .sector-card { opacity: 1; transform: none; transition: none; }
        }
        .sector-card h3 { transition: color 0.3s ease; }
        .sector-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 50px -24px rgba(12,10,7,0.28);
        }
        .sector-card:hover .sector-img { transform: scale(1.06); }
        .sector-card:hover .sector-overlay { opacity: 1; }
        .sector-card:hover h3 { color: var(--color-gilt); }
        @media (prefers-reduced-motion: reduce) {
          .sector-card, .sector-card .sector-img, .sector-card .sector-overlay, .sector-card h3 { transition: none; }
          .sector-card:hover { transform: none; }
        }
        @media (max-width: 1040px) {
          .sector-card-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .sector-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
