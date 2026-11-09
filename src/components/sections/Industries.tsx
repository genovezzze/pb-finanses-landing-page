'use client'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'

// Карточек ровно столько, сколько фотографий ниже. Порядок = топ по числу клиентов.
const CARD_COUNT = 3

// Фото под каждую карточку (2:1). Пока пусто - рендерится льняная заглушка.
const IMAGES = [
  '/images/industries/it-robotics.png',
  '/images/industries/construction-buvnieciba.webp',
  '/images/industries/kokapstrade-malka.webp',
  '/images/industries/retail-logistics.png',
  '/images/industries/hospitality-real-estate.png',
  '/images/industries/business-services-education.png',
]

// Фото авторства Agnese Pastare - подписываются её именем.
const CREDITED = new Set([
  '/images/industries/construction-buvnieciba.webp',
  '/images/industries/kokapstrade-malka.webp',
])

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
        {/* Big statement first: we know every sector, then a short explanation */}
        <Reveal variant="up">
          <div className="ind-statement">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="ind-statement-title">{t('headline')}</h2>
            <p className="ind-statement-body">{t('body')}</p>
          </div>
        </Reveal>

        {/* Top-3 niches heading */}
        <Reveal variant="up">
          <p className="ind-top-label">{t('topLabel')}</p>
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
                  {CREDITED.has(IMAGES[i]) && (
                    <span className="industry-credit">Agnese Pastare</span>
                  )}
                </div>

                <div className="industry-card-body">
                <h3 className="industry-title">{item.title}</h3>
                <p className="industry-text">{item.body}</p>

                {/* Space for the invitation is reserved whether or not it is
                    showing, so hovering never changes the card's height. */}
                <div className="industry-card-foot">
                  <Link href={`/${locale}/kontakti`} className="industry-cta">
                    {t('cardCta')}
                  </Link>
                </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* After the top 3: an accent line plus the remaining sectors as tags */}
        {items.length > CARD_COUNT && (
          <Reveal variant="up">
            <div className="ind-more">
              <span className="ind-more-label">{t('moreLabel')}</span>
              <ul className="ind-more-tags">
                {items.slice(CARD_COUNT).map((it) => (
                  <li key={it.title} className="ind-more-tag">
                    {it.title}
                  </li>
                ))}
                <li className="ind-more-tag is-more">{t('moreTag')}</li>
              </ul>
            </div>
          </Reveal>
        )}

      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ind-statement {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: clamp(32px, 5vw, 56px);
        }
        .ind-statement .eyebrow { margin-bottom: 16px; }
        .ind-statement-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(26px, 2.6vw, 36px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-ink-black);
          margin: 0;
        }
        .ind-statement-body {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.3vw, 19px);
          line-height: 1.7;
          color: var(--color-graphite);
          max-width: 62ch;
          margin: 18px 0 0;
        }

        .ind-top-label {
          display: inline-block;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.04em;
          color: #fff;
          background: var(--color-gilt);
          border-radius: 999px;
          padding: 9px 20px;
          margin: 0 0 18px;
        }

        .industry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: stretch;
        }

        .ind-more {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px 14px;
          margin-top: clamp(28px, 4vw, 44px);
        }
        .ind-more-label {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          color: var(--color-ink-black);
        }
        .ind-more-tags {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .ind-more-tag {
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-graphite);
          background: var(--color-parchment-wash);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 999px;
          padding: 7px 15px;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .ind-more-tag:hover {
          color: var(--color-gilt);
          border-color: var(--color-gilt);
        }
        .ind-more-tag.is-more {
          background: transparent;
          border-style: dashed;
          color: var(--color-stone);
          font-style: italic;
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
        .industry-credit {
          position: absolute;
          right: 8px;
          bottom: 7px;
          z-index: 2;
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
          pointer-events: none;
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
          padding: 20px 22px 22px;
        }

        .industry-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 19px;
          line-height: 1.22;
          letter-spacing: -0.02em;
          color: var(--color-ink-black);
          margin-bottom: 10px;
          transition: color 0.3s ease;
        }
        .industry-text {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.55;
          color: var(--color-graphite);
          margin-bottom: 14px;
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
