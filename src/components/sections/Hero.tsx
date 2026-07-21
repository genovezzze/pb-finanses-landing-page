'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
})

const PHOTOS = [
  '/images/agnese-1-tall.jpg',
  '/images/agnese-2-tall.jpg',
  '/images/agnese-3-tall.jpg',
]

// The headline must never wrap mid-phrase, so it is sized in `cqi` — a share of
// #hero-left's own content width — instead of `vw`. That keeps it fitting the column
// in both the 2-col desktop layout and the 1-col mobile one. The coefficient is
// 100 / (longest line length x average glyph width), so it differs per locale:
// lv "Finanšu pārvaldība" 18 chars, en "Financial management" 20, ru 21 (wider Cyrillic).
// The max is set to the size the widest desktop column already yields, so the
// 1-col layout near 768px does not balloon past it.
const HEADLINE_SIZE: Record<string, string> = {
  lv: 'clamp(26px, 11cqi, 56px)',
  en: 'clamp(25px, 10cqi, 51px)',
  ru: 'clamp(24px, 8.7cqi, 46px)',
}

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const questions = t.raw('audienceQuestions') as string[]

  // Cycle through photos every 6.35 seconds (6s visible + 0.35s fast transition)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PHOTOS.length)
    }, 6350)
    return () => clearInterval(interval)
  }, [])


  return (
    <section
      id="hero"
      style={{
        background: 'var(--color-canvas-white)',
        padding: '0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <div
        className="section-wrap"
        style={{
          display: 'grid',
          gridTemplateColumns: '50fr 50fr',
          gap: 0,
          alignItems: 'stretch',
          padding: '0',
          width: '100%',
        }}
      >
        {/* ── LEFT: text content ── */}
        <div
          id="hero-left"
          style={{
            alignSelf: 'flex-start',
            padding: '64px 48px 72px 40px',
            // makes cqi units in the headline resolve against this column's width
            containerType: 'inline-size',
          }}
        >
          <motion.h1
            {...fadeUp(0)}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: HEADLINE_SIZE[locale] ?? HEADLINE_SIZE.lv,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              color: 'var(--color-ink-black)',
              marginBottom: 4,
              // each line stays intact; the explicit <br/> below is the only break
              whiteSpace: 'nowrap',
            }}
          >
            {t('headline')}
            <br />
            <span className="gilt-text">{t('headlineAccent')}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: 'var(--color-graphite)',
              lineHeight: 1.6,
              maxWidth: 560,
              marginTop: 16,
            }}
          >
            {t('subtext')}
          </motion.p>

          {/* Audience question — synced with photo slideshow */}
          <motion.div
            {...fadeUp(0.2)}
            id="hero-question"
            style={{
              position: 'relative',
              maxWidth: 560,
              marginTop: 12,
              marginBottom: 4,
              minHeight: 90,
            }}
          >
            {questions.map((question, i) => (
              <p
                key={question}
                style={{
                  position: 'absolute',
                  inset: 0,
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: 15,
                  color: 'var(--color-stone)',
                  lineHeight: 1.6,
                  opacity: i === activeIndex ? 1 : 0,
                  transition: 'opacity 0.35s ease-in-out',
                }}
              >
                {question}
              </p>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div id="hero-cta" {...fadeUp(0.3)} style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <Link
              href={`/${locale}#contact`}
              className="btn-teal"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href={`/${locale}#services`}
              className="btn-ghost"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>

        </div>

        {/* ── RIGHT: photo slideshow ── */}
        <div
          id="hero-right"
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {PHOTOS.map((src, i) => (
            <div
              key={src}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === activeIndex ? 1 : 0,
                transition: 'opacity 0.35s ease-in-out',
              }}
            >
              <Image
                src={src}
                alt={`Agnese Pastare ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top left',
                }}
                priority={i === 0}
              />
            </div>
          ))}

          {/* Dot indicators */}
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 6,
              zIndex: 10,
            }}
          >
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i === activeIndex
                      ? 'var(--color-gilt)'
                      : 'var(--color-parchment-rule)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s, background 0.3s',
                }}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 768px) {
          #hero > div {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
          }
          #hero-left {
            padding: 48px 24px 24px !important;
            order: 1;
          }
          #hero-right {
            order: 2;
            min-height: 320px !important;
          }
          #hero-question {
            min-height: 100px !important;
          }
          #hero-cta {
            flex-direction: column !important;
          }
          #hero-cta a {
            text-align: center;
            justify-content: center;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          #hero-question {
            min-height: 150px !important;
          }
        }
      `,
        }}
      />
    </section>
  )
}
