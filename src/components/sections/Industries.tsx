'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/ui/reveal'

// Клиентская база по отраслям (внутренняя аналитика 2026). Порядок = топ по числу клиентов.
const COUNTS = [13, 10, 8, 7, 7, 6]
const MAX = Math.max(...COUNTS)

// Фото под каждую карточку (16:9). Пока пусто — рендерится льняная заглушка.
const IMAGES = [
  '/images/industries/it-robotics.png',
  '/images/industries/construction-development.png',
  '/images/industries/forestry-agriculture.png',
  '/images/industries/retail-logistics.png',
  '/images/industries/hospitality-real-estate.png',
  '/images/industries/business-services-education.png',
]

export default function Industries() {
  const t = useTranslations('industries')
  const items = t.raw('items') as Array<{ title: string; body: string }>

  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="industries"
      ref={ref}
      className="section-gap"
      style={{ background: 'var(--color-canvas-white)' }}
    >
      <div className="section-wrap">
        {/* Header */}
        <Reveal variant="right">
          <div
            id="industries-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 48,
              paddingBottom: 24,
              borderBottom: '1px solid var(--color-parchment-rule)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 4vw, 52px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {t('title')}
            </h2>
            <p
              id="industries-subtitle"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                fontStyle: 'italic',
                color: 'var(--color-stone)',
                textAlign: 'right',
                lineHeight: 1.5,
                maxWidth: 380,
              }}
            >
              {t('subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="industry-grid">
          {items.slice(0, COUNTS.length).map((item, i) => (
            <Reveal key={item.title} variant="up" duration={0.5} delay={i * 0.06} once>
              <article className="industry-card">
                <div className="industry-media">
                  <Image
                    src={IMAGES[i]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="industry-img"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="industry-media-veil" aria-hidden="true" />
                </div>

                <div className="industry-card-body">
                <div className="industry-card-top">
                  <span className="industry-rank">{String(i + 1).padStart(2, '0')}</span>
                  <span className="industry-count">
                    <strong>{COUNTS[i]}</strong> {t('clients')}
                  </span>
                </div>

                <h3 className="industry-title">{item.title}</h3>
                <p className="industry-text">{item.body}</p>

                <div className="industry-track">
                  <div
                    className="industry-fill"
                    style={{
                      width: inView ? `${(COUNTS[i] / MAX) * 100}%` : '0%',
                      transitionDelay: `${i * 90}ms`,
                    }}
                  />
                </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" duration={0.4}>
          <p className="industry-note">{t('note')}</p>
        </Reveal>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .industry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        .industry-grid > * { min-width: 0; }

        .industry-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--color-parchment-wash);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.45s cubic-bezier(0.16,1,0.3,1),
                      background 0.4s ease;
        }
        .industry-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-gilt);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .industry-card:hover {
          transform: translateY(-8px);
          background: var(--color-canvas-white);
          box-shadow: 0 30px 50px -24px rgba(12,10,7,0.28);
        }
        .industry-card:hover::before { transform: scaleX(1); }
        .industry-card:hover .industry-title { color: var(--color-gilt); }
        .industry-card:hover .industry-rank { opacity: 1; }
        .industry-card:hover .industry-img { transform: scale(1.06); }
        .industry-card:hover .industry-media-veil { opacity: 1; }

        .industry-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-bottom: 1px solid var(--color-parchment-rule);
          background: var(--color-linen-tint);
        }
        .industry-img {
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        /* Временная заглушка, пока не подставлены фото */
        .industry-img-fallback {
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              135deg,
              rgba(184,146,58,0.10) 0px,
              rgba(184,146,58,0.10) 1px,
              transparent 1px,
              transparent 11px
            ),
            linear-gradient(135deg, var(--color-linen-tint) 0%, var(--color-parchment-wash) 100%);
        }
        .industry-media-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 55%, rgba(184,146,58,0.10) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .industry-card-body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 22px 26px 24px;
        }

        .industry-card-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }
        .industry-rank {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 30px;
          line-height: 1;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          color: var(--color-gilt);
          opacity: 0.4;
          transition: opacity 0.35s ease;
        }
        .industry-count {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--color-stone);
          white-space: nowrap;
        }
        .industry-count strong {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          color: var(--color-espresso);
          margin-right: 4px;
        }

        .industry-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 21px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--color-ink-black);
          margin-bottom: 10px;
          transition: color 0.3s ease;
        }
        .industry-text {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.65;
          color: var(--color-graphite);
          margin-bottom: 22px;
        }

        .industry-track {
          height: 5px;
          margin-top: auto;
          border-radius: 999px;
          background: var(--color-linen-tint);
          overflow: hidden;
        }
        .industry-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--color-gilt-dark), var(--color-gilt));
          transition: width 1.1s cubic-bezier(0.16,1,0.3,1);
        }

        .industry-note {
          margin-top: 32px;
          font-family: var(--font-display);
          font-size: 15px;
          font-style: italic;
          line-height: 1.6;
          color: var(--color-stone);
          max-width: 70ch;
        }

        @media (max-width: 1024px) {
          .industry-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 860px) {
          #industries-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          #industries-subtitle {
            text-align: left;
            max-width: 100%;
          }
        }
        @media (max-width: 640px) {
          .industry-grid { grid-template-columns: 1fr; }
          .industry-card:hover { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .industry-card, .industry-card::before, .industry-rank, .industry-title, .industry-fill {
            transition: none;
          }
        }
      `,
        }}
      />
    </section>
  )
}
