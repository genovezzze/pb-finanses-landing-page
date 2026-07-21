'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '@/components/ui/reveal'

export default function Founder() {
  const t = useTranslations('founder')
  const bio = t.raw('bio') as string[]
  const [open, setOpen] = useState(false)
  const preview = bio.slice(0, 3)

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section
      id="about"
      className="section-gap"
      style={{ background: 'var(--color-canvas-white)' }}
    >
      <div className="section-wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* Left: text */}
          <Reveal variant="left">
            <p className="eyebrow" style={{ marginBottom: 20 }}>
              {t('eyebrow')}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 4vw, 52px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              {t('name')}
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--color-gilt)',
                letterSpacing: '0.04em',
                marginBottom: 24,
              }}
            >
              {t('credentials')}
            </div>
            <div className="founder-fade" style={{ maxWidth: '62ch' }}>
              {preview.map((paragraph, i) => (
                <p
                  key={paragraph}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: 'var(--color-graphite)',
                    lineHeight: 1.75,
                    marginTop: i === 0 ? 0 : 16,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <button
              type="button"
              className="founder-more"
              onClick={() => setOpen(true)}
              style={{ marginBottom: 28, position: 'relative', zIndex: 1 }}
            >
              {t('readMore')}
              <span className="founder-more-arrow" aria-hidden="true">→</span>
            </button>

            {/* Pull quote */}
            <blockquote
              style={{
                borderLeft: '2px solid var(--color-gilt)',
                paddingLeft: 20,
                margin: '0 0 28px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 22,
                  color: 'var(--color-ink-black)',
                  lineHeight: 1.4,
                }}
              >
                &ldquo;{t('quote')}&rdquo;
              </p>
            </blockquote>

            <a
              href="mailto:info@pbfinanses.lv"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-gilt)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              {t('contact')} →
            </a>
          </Reveal>

          {/* Right: photo */}
          <Reveal variant="scale" delay={0.1}>
            <div
              style={{
                position: 'relative',
                width: '75%',
                aspectRatio: '1 / 1',
                borderRadius: 2,
                overflow: 'hidden',
                alignSelf: 'center',
                justifySelf: 'center',
                marginTop: 40,
              }}
            >
              <Image
                src="/images/founder-agnese.jpg"
                alt="Agnese Pastare"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Detailed bio modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="founder-modal-backdrop"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={t('name')}
          >
            <motion.div
              className="founder-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                className="founder-modal-close"
                onClick={() => setOpen(false)}
                aria-label={t('close')}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>

              {/* Header */}
              <div className="founder-modal-header">
                <div className="founder-modal-photo">
                  <Image
                    src="/images/founder-agnese.jpg"
                    alt="Agnese Pastare"
                    fill
                    sizes="96px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>
                    {t('eyebrow')}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 30,
                      color: 'var(--color-ink-black)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      marginBottom: 8,
                    }}
                  >
                    {t('name')}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11.5,
                      color: 'var(--color-gilt)',
                      letterSpacing: '0.04em',
                      lineHeight: 1.5,
                    }}
                  >
                    {t('credentials')}
                  </div>
                </div>
              </div>

              {/* Full bio */}
              <div className="founder-modal-body">
                {bio.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15.5,
                      color: 'var(--color-graphite)',
                      lineHeight: 1.75,
                      marginTop: i === 0 ? 0 : 16,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}

                <blockquote
                  style={{
                    borderLeft: '2px solid var(--color-gilt)',
                    paddingLeft: 20,
                    margin: '28px 0 0',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 20,
                      color: 'var(--color-ink-black)',
                      lineHeight: 1.4,
                    }}
                  >
                    &ldquo;{t('quote')}&rdquo;
                  </p>
                </blockquote>

                <a href="mailto:info@pbfinanses.lv" className="founder-more" style={{ marginTop: 28 }}>
                  {t('contact')}
                  <span className="founder-more-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Bio text softly fades out toward the bottom, drawing the eye to the CTA */
        .founder-fade {
          position: relative;
          max-height: 250px;
          overflow: hidden;
          margin-bottom: 16px;
          -webkit-mask-image: linear-gradient(to bottom, #000 45%, transparent 96%);
          mask-image: linear-gradient(to bottom, #000 45%, transparent 96%);
        }

        .founder-more {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: var(--color-gilt);
          border: none;
          color: #fff;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          cursor: pointer;
          padding: 12px 22px;
          border-radius: 10px;
          box-shadow: 0 6px 16px -8px rgba(35,110,116,0.5);
          transition: background 0.22s ease, transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s ease;
        }
        .founder-more:hover {
          background: var(--color-gilt-dark);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -8px rgba(35,110,116,0.55);
        }
        .founder-more:active {
          transform: translateY(0);
        }
        .founder-more-arrow {
          display: inline-block;
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .founder-more:hover .founder-more-arrow {
          transform: translateX(4px);
        }

        .founder-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(12,10,7,0.5);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .founder-modal-card {
          position: relative;
          width: 100%;
          max-width: 720px;
          max-height: 88vh;
          overflow-y: auto;
          background: var(--color-canvas-white);
          border-top: 3px solid var(--color-gilt);
          border-radius: 16px;
          box-shadow: 0 40px 90px -30px rgba(12,10,7,0.5);
          padding: 40px 44px 44px;
        }
        .founder-modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid var(--color-parchment-rule);
          background: var(--color-canvas-white);
          color: var(--color-ink-black);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .founder-modal-close:hover {
          background: var(--color-gilt);
          border-color: var(--color-gilt);
          color: #fff;
        }
        .founder-modal-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--color-parchment-rule);
        }
        .founder-modal-photo {
          position: relative;
          flex-shrink: 0;
          width: 96px;
          height: 96px;
          border-radius: 999px;
          overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .founder-more-arrow, .founder-more, .founder-modal-close { transition: none; }
        }
        @media (max-width: 768px) {
          #about .section-wrap > div {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .founder-modal-card { padding: 32px 22px 28px; }
          .founder-modal-header { flex-direction: column; align-items: flex-start; gap: 14px; }
        }
      `,
        }}
      />
    </section>
  )
}
