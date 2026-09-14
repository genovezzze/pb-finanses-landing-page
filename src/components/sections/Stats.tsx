'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

// Counts up from 0 to `end` whenever `run` flips true; resets to 0 when false,
// so the whole thing replays every time the section re-enters the viewport.
function CountUp({
  end,
  prefix = '',
  suffix = '',
  run,
  duration = 1900,
}: {
  end: number
  prefix?: string
  suffix?: string
  run: boolean
  duration?: number
}) {
  const [val, setVal] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    if (!run) {
      setVal(0)
      return
    }
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVal(end)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p) // easeOutExpo - резкий старт, мягкая посадка
      setVal(Math.round(end * eased))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [run, end, duration])

  return (
    <>
      {prefix}
      {val.toLocaleString('lv-LV')}
      {suffix}
    </>
  )
}

export default function Stats({ embedded = false }: { embedded?: boolean }) {
  const m = useTranslations('metrics')

  const stats = [
    { end: 23, prefix: '', suffix: '', label: m('years') },
    { end: 571, prefix: '€', suffix: 'K', label: m('turnover') },
    { end: 12, prefix: '', suffix: '', label: m('employees') },
    { end: 120, prefix: '', suffix: '+', label: m('clients') },
  ]

  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id={embedded ? undefined : 'success-story'}
      className={embedded ? 'hero-stats' : 'stats-section'}
      style={{
        background: embedded ? 'transparent' : 'var(--color-canvas-white)',
        padding: embedded ? 0 : '44px 0 28px',
      }}
    >
      <div className={embedded ? undefined : 'section-wrap'}>
        <div id="stats-row">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`stat${inView ? ' in' : ''}`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className="stat-num" style={{ animationDelay: `${i * 110 + 120}ms` }}>
                <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} run={inView} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        #stats-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          gap: 32px 52px;
        }
        #stats-row .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 120px;
          opacity: 0;
          transform: translateY(26px) scale(0.94);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        #stats-row .stat.in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        #stats-row .stat-num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 2.8vw, 40px);
          line-height: 0.95;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          background: linear-gradient(135deg, var(--color-gilt) 0%, var(--color-gilt-dark) 55%, var(--color-gilt) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        #stats-row .stat.in .stat-num {
          animation: statPop 0.8s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        /* Same chip as the section labels: soft grey pill, sentence case, no
           letterspacing - see .eyebrow in globals.css. */
        #stats-row .stat-label {
          margin-top: 12px;
          display: inline-flex;
          align-items: center;
          padding: 7px 15px;
          border-radius: 999px;
          background: var(--color-linen-tint);
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          text-transform: none;
          letter-spacing: 0;
          color: var(--color-ink-black);
        }
        .hero-stats {
          position: absolute;
          z-index: 5;
          top: 130px;
          right: 3.8%;
          width: 310px;
        }
        .hero-stats #stats-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 38px 24px;
        }
        .hero-stats #stats-row .stat { min-width: 0; align-items: flex-start; text-align: left; }
        .hero-stats #stats-row .stat-num {
          font-size: 40px;
          background: none;
          color: #f1ede3;
          -webkit-text-fill-color: currentColor;
        }
        .hero-stats #stats-row .stat-label {
          margin-top: 8px;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: .09em;
          text-transform: uppercase;
          color: rgba(241, 237, 227, .58);
        }
        /* On the wide layout the metrics block carries more weight - it sits in
           open space to the right of the headline, where the reference size read
           as an afterthought. Kept to the same breakpoint as the rest of the
           large-screen hero tuning, so narrow screens are untouched. */
        @media (min-width: 1673px) {
          .hero-stats { width: 380px; }
          .hero-stats #stats-row { gap: 46px 28px; }
          .hero-stats #stats-row .stat-num { font-size: 54px; }
          .hero-stats #stats-row .stat-label { margin-top: 10px; font-size: 11px; }
        }
        @keyframes statPop {
          0%   { transform: scale(0.82); }
          60%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @media (max-width: 768px) {
          .hero-stats { display: none; }
          #stats-row { gap: 34px 24px; }
          #stats-row .stat { min-width: 40%; flex: 1 1 40%; }
        }
        @media (prefers-reduced-motion: reduce) {
          #stats-row .stat { transition: none; }
          #stats-row .stat.in .stat-num { animation: none; }
        }
      `,
        }}
      />
    </section>
  )
}
