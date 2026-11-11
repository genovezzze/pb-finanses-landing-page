'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { BANNER_BLUR } from '@/lib/blur'

const DEFAULT_BANNER = '/images/481015454_1556450015297497_8823412931938160365_n.jpg'

// Full-width page banner: eyebrow pill + title laid over a photo with a dark
// scrim, matching the service detail pages. The copy drifts up and fades as the
// page scrolls, the same light parallax used elsewhere.
export default function PageHero({
  eyebrow,
  title,
  image = DEFAULT_BANNER,
  objectPosition = 'center 55%',
  imageScale = 1,
  imageOrigin = 'center',
  credit,
}: {
  eyebrow: string
  title: string
  image?: string
  objectPosition?: string
  imageScale?: number
  imageOrigin?: string
  credit?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const p = Math.min(Math.max(window.scrollY / 360, 0), 1)
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
    <div className="page-hero">
      <Image
        src={image}
        alt="PB Finanses"
        fill
        priority
        sizes="100vw"
        placeholder={BANNER_BLUR[image] ? 'blur' : 'empty'}
        blurDataURL={BANNER_BLUR[image]}
        style={{
          objectFit: 'cover',
          objectPosition,
          transform: imageScale !== 1 ? `scale(${imageScale})` : undefined,
          transformOrigin: imageOrigin,
        }}
      />
      <div className="page-hero-scrim" aria-hidden="true" />
      {credit && <span className="page-hero-credit">{credit}</span>}
      <div ref={ref} className="page-hero-inner" style={{ willChange: 'transform, opacity' }}>
        <span className="page-hero-eyebrow">{eyebrow}</span>
        <h1 className="page-hero-title">{title}</h1>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .page-hero {
          position: relative;
          width: 100%;
          height: clamp(140px, 22vw, 300px);
          overflow: hidden;
          /* Dark teal ground so the banner reads on-brand while the photo loads,
             instead of a grey flash from the white body under the scrim. */
          background: #001d20;
        }
        .page-hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,29,32,0.35), rgba(0,29,32,0.72));
        }
        .page-hero-credit {
          position: absolute;
          right: 14px;
          bottom: 10px;
          z-index: 2;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.8);
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
          pointer-events: none;
        }
        .page-hero-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 14px;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px clamp(20px, 3vw, 40px);
          width: 100%;
        }
        .page-hero-eyebrow {
          align-self: flex-start;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 999px;
          padding: 4px 12px;
          backdrop-filter: blur(4px);
        }
        .page-hero-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0;
        }
      `,
        }}
      />
    </div>
  )
}
