'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Testimonial } from '@/components/ui/testimonials-columns-1'
import { Reveal } from '@/components/ui/reveal'

export default function Testimonials({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('testimonials')
  const items = t.raw('items') as Testimonial[]

  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  // Re-read how far the track can still travel, so the arrows disable at the
  // ends instead of scrolling into empty space.
  const syncEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    syncEdges()
    el.addEventListener('scroll', syncEdges, { passive: true })
    window.addEventListener('resize', syncEdges)
    return () => {
      el.removeEventListener('scroll', syncEdges)
      window.removeEventListener('resize', syncEdges)
    }
  }, [syncEdges])

  // One "page" is the width of a single card plus its gap, so a click lands the
  // next card flush against the left edge rather than mid-slide.
  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + 20 : el.clientWidth * 0.9
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section
      id="testimonials"
      className="section-gap"
      style={{ background: 'var(--color-linen-tint)' }}
    >
      <div className="section-wrap">
        {/* Header row: eyebrow on the left, carousel arrows on the right. */}
        <Reveal variant="blur">
          <div className="testimonials-head">
            <h2 className="testimonials-title">{t('eyebrow')}</h2>

            <div className="testimonials-nav">
              <button
                type="button"
                className="testimonials-arrow"
                aria-label="Iepriekšējā"
                onClick={() => scrollByCards(-1)}
                disabled={!canPrev}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="testimonials-arrow"
                aria-label="Nākamā"
                onClick={() => scrollByCards(1)}
                disabled={!canNext}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="testimonials-track" ref={trackRef}>
          {items.map(({ quote, name, role, initials, photo }, index) => (
            <Reveal
              key={name}
              variant="up"
              duration={0.6}
              delay={(index % 3) * 0.1}
              className="testimonial-cell"
            >
              <article className="testimonial-card">
                <span className="testimonial-quote-mark" aria-hidden="true">“</span>
                <p className="testimonial-quote">{quote}</p>
                <div className="testimonial-author">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={name}
                      width={48}
                      height={48}
                      className="testimonial-photo"
                    />
                  ) : (
                    <div className="testimonial-initials">{initials}</div>
                  )}
                  <div>
                    <div className="testimonial-name">{name}</div>
                    <div className="testimonial-role">{role}</div>
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
        .testimonials-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 40px;
        }
        .testimonials-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(26px, 2.6vw, 36px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-ink-black);
        }
        .testimonials-nav { display: flex; gap: 10px; }
        .testimonials-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--color-parchment-rule);
          background: var(--color-canvas-white);
          color: var(--color-ink-black);
          cursor: pointer;
          box-shadow: 0 10px 24px -18px rgba(12, 10, 7, 0.4);
          transition: transform .25s cubic-bezier(.16,1,.3,1), background .2s ease, color .2s ease, border-color .2s ease, opacity .2s ease;
        }
        .testimonials-arrow:hover:not(:disabled) {
          background: var(--color-gilt);
          border-color: var(--color-gilt);
          color: var(--color-canvas-white);
          transform: translateY(-2px);
        }
        .testimonials-arrow:disabled { opacity: .32; cursor: default; }

        .testimonials-track {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: calc((100% - 40px) / 3);
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          /* Break out of the centred content column to the full viewport width,
             so the row of cards bleeds off both edges instead of being clipped
             inside the wrap. The gutter aligns the first card with the heading. */
          width: 100vw;
          --edge: max(40px, calc((100vw - var(--page-max)) / 2 + 40px));
          scroll-padding-inline-start: var(--edge);
          /* Vertical padding/negative margin keeps the drop shadow from being
             clipped by overflow-x:auto; the horizontal edge does the full-bleed. */
          padding: 10px var(--edge) 40px;
          margin: -10px calc(50% - 50vw) -24px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .testimonials-track::-webkit-scrollbar { display: none; }

        .testimonial-cell { scroll-snap-align: start; height: 100%; }
        .testimonial-cell > * { height: 100%; }

        .testimonial-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 400px;
          padding: 40px 38px;
          overflow: hidden;
          border: 1px solid var(--color-parchment-rule);
          border-radius: 22px;
          background: var(--color-canvas-white);
          box-shadow: 0 16px 36px -24px rgba(12, 10, 7, 0.28);
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 42px -24px rgba(12, 10, 7, 0.34);
        }
        .testimonial-quote-mark {
          position: absolute;
          top: 12px;
          right: 24px;
          font-family: var(--font-display);
          font-size: 76px;
          line-height: 1;
          color: var(--color-gilt);
          opacity: .12;
        }
        .testimonial-quote {
          position: relative;
          z-index: 1;
          margin: 0 0 28px;
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.75;
          color: var(--color-ink-black);
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: auto;
          padding-top: 22px;
          border-top: 1px solid var(--color-parchment-rule);
        }
        .testimonial-photo,
        .testimonial-initials {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          border-radius: 50%;
        }
        .testimonial-photo { object-fit: cover; }
        .testimonial-initials {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-parchment-wash);
          font-family: var(--font-display);
          font-size: 17px;
          color: var(--color-gilt);
        }
        .testimonial-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.25;
          color: var(--color-ink-black);
        }
        .testimonial-role {
          margin-top: 4px;
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.4;
          color: var(--color-stone);
        }
        @media (max-width: 960px) {
          .testimonials-track { grid-auto-columns: calc((100% - 20px) / 2); }
        }
        @media (max-width: 640px) {
          .testimonials-track { grid-auto-columns: 86%; }
          .testimonial-card { min-height: 0; padding: 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-card { transition: none; }
          .testimonials-track { scroll-behavior: auto; }
        }
      `,
        }}
      />
    </section>
  )
}
