'use client'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'

// Карточек ровно столько, сколько фотографий ниже. Порядок = топ по числу клиентов.
const CARD_COUNT = 6

// Фото под каждую карточку (2:1). Пока пусто - рендерится льняная заглушка.
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
  const locale = useLocale()
  const items = t.raw('items') as Array<{ title: string; body: string }>

  return (
    <section
      id="industries"
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
              paddingBottom: 8,
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
            <p id="industries-subtitle" className="eyebrow">
              {t('subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="industry-grid">
          {items.slice(0, CARD_COUNT).map((item, i) => (
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
                <h3 className="industry-title">{item.title}</h3>
                <p className="industry-text">{item.body}</p>

                {/* Space for the invitation is reserved whether or not it is
                    showing, so hovering never changes the card's height. */}
                <div className="industry-card-foot">
                  <Link href={`/${locale}#contact`} className="industry-cta">
                    {t('cardCta')} <span aria-hidden="true">→</span>
                  </Link>
                </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

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
        .industry-card:hover .industry-img { transform: scale(1.06); }
        .industry-card:hover .industry-media-veil { opacity: 1; }

        .industry-media {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 1;
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
          padding: 18px 20px 18px;
        }

        .industry-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--color-ink-black);
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }
        .industry-text {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--color-graphite);
          margin-bottom: 16px;
        }

        .industry-card-foot {
          position: relative;
          margin-top: auto;
          min-height: 20px;
          display: flex;
          align-items: center;
        }
        .industry-cta {
          position: relative;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--color-gilt);
          text-decoration: none;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(4px);
          pointer-events: none;
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.16,1,0.3,1);
        }
        .industry-cta span {
          display: inline-block;
          margin-left: 6px;
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .industry-card:hover .industry-cta,
        .industry-cta:focus-visible {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }
        .industry-cta:hover span { transform: translateX(4px); }
        /* No hover to give: touch devices get the invitation outright. */
        @media (hover: none) {
          .industry-cta { opacity: 1; transform: none; pointer-events: auto; }
        }
        @media (prefers-reduced-motion: reduce) {
          .industry-cta, .industry-cta span { transition: none; }
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
          #industries-subtitle { align-self: flex-start; }
        }
        @media (max-width: 640px) {
          .industry-grid { grid-template-columns: 1fr; }
          .industry-card:hover { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .industry-card, .industry-card::before, .industry-title {
            transition: none;
          }
        }
      `,
        }}
      />
    </section>
  )
}
