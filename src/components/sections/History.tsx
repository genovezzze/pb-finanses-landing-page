'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

// Placeholder imagery per milestone — swap these for your own photos.
const MILESTONE_IMAGES = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GG0etPk7kKigScTFkcs4Y7pOC7/hf_20260709_130046_e68e3537-dead-4fd1-97a3-e5809b7a9209.png',
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GG0etPk7kKigScTFkcs4Y7pOC7/hf_20260709_130048_c00b668c-9acd-4595-8d33-cabc172dfddd.png',
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GG0etPk7kKigScTFkcs4Y7pOC7/hf_20260709_130050_083c73a9-eda1-4d7d-8080-e656b2e7cbae.png',
]

type Milestone = { year: string; title: string; body: string }

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

// Clamped piecewise-linear interpolation
function interp(x: number, xs: number[], ys: number[]) {
  if (x <= xs[0]) return ys[0]
  if (x >= xs[xs.length - 1]) return ys[ys.length - 1]
  for (let i = 1; i < xs.length; i++) {
    if (x <= xs[i]) {
      const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1])
      return ys[i - 1] + (ys[i] - ys[i - 1]) * t
    }
  }
  return ys[ys.length - 1]
}

export default function History() {
  const t = useTranslations('history')
  const milestones = t.raw('milestones') as Milestone[]
  const n = milestones.length

  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0
      setProgress(p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const seg = 1 / n
  const fade = seg * 0.35
  const active = Math.min(n - 1, Math.floor(progress * n))

  return (
    <section id="history" style={{ background: 'var(--color-linen-tint)' }}>
      {/* Scroll-driven pinned timeline: each milestone holds the full screen */}
      <div
        ref={containerRef}
        style={{ position: 'relative', height: `${n * 100}vh` }}
      >
        <div className="pin-sticky">
          {/* Section label, stays in the corner while pinned */}
          <div className="pin-heading section-wrap">
            <div className="pin-label">
              <span className="pin-label-bar" />
              {t('eyebrow')} · {t('title')}
            </div>
          </div>

          {/* Milestone panels */}
          {milestones.map((m, i) => {
            const s = i * seg
            const e = (i + 1) * seg
            const first = i === 0
            const last = i === n - 1
            const xs = [s - fade, s + fade, e - fade, e + fade]
            const opacity = interp(progress, xs, [first ? 1 : 0, 1, 1, last ? 1 : 0])
            const scale = interp(progress, xs, [first ? 1 : 0.92, 1, 1, last ? 1 : 0.92])
            const y = interp(progress, xs, [first ? 0 : 60, 0, 0, last ? 0 : -60])

            return (
              <div
                key={m.title}
                className="pin-panel"
                style={{
                  opacity,
                  transform: `translateY(${y}px) scale(${scale})`,
                  pointerEvents: i === active ? 'auto' : 'none',
                  willChange: 'opacity, transform',
                }}
              >
                <div className="section-wrap pin-inner">
                  <div className="pin-text">
                    <div className="pin-year">{m.year}</div>
                    <h3 className="pin-title">{m.title}</h3>
                    <p className="pin-body">{m.body}</p>
                  </div>
                  <div className="pin-image">
                    <Image
                      src={MILESTONE_IMAGES[i % MILESTONE_IMAGES.length]}
                      alt={m.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 46vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pin-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: var(--color-linen-tint);
        }
        .pin-heading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding-top: 132px;
          z-index: 3;
          pointer-events: none;
        }
        .pin-label {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--color-ink-black);
        }
        .pin-label-bar {
          width: 40px;
          height: 2px;
          background: var(--color-gilt);
        }
        .pin-panel {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding-top: 140px;
        }
        .pin-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
          width: 100%;
        }
        .pin-year {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(64px, 10vw, 132px);
          line-height: 1.12;
          padding-top: 0.06em;
          letter-spacing: -0.03em;
          background: linear-gradient(120deg, var(--color-gilt), var(--color-gilt-dark));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }
        .pin-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(24px, 3vw, 40px);
          color: var(--color-ink-black);
          letter-spacing: -0.01em;
          line-height: 1.15;
          margin-bottom: 18px;
        }
        .pin-body {
          font-family: var(--font-body);
          font-size: clamp(15px, 1.3vw, 18px);
          color: var(--color-graphite);
          line-height: 1.7;
          max-width: 520px;
        }
        .pin-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 40px 80px -32px rgba(12,10,7,0.45);
        }
        @media (max-width: 900px) {
          .pin-inner {
            grid-template-columns: 1fr;
            gap: 28px;
            padding-top: 96px;
          }
          .pin-image { max-width: 460px; order: -1; }
        }
      `,
        }}
      />
    </section>
  )
}
