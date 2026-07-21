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
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p) // easeOutExpo — резкий старт, мягкая посадка
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

export default function Stats() {
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
      style={{
        background: 'var(--color-canvas-white)',
        borderTop: '1px solid var(--color-parchment-rule)',
        padding: '72px 0',
      }}
    >
      <div className="section-wrap">
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
          gap: 40px 76px;
        }
        #stats-row .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 140px;
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
          font-weight: 800;
          font-size: clamp(40px, 4.6vw, 60px);
          line-height: 0.95;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          background: linear-gradient(135deg, var(--color-gilt) 0%, var(--color-gilt-dark) 55%, var(--color-gilt) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        #stats-row .stat.in .stat-num {
          animation: statPop 0.8s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        #stats-row .stat-label {
          margin-top: 14px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--color-stone);
        }
        @keyframes statPop {
          0%   { transform: scale(0.82); }
          60%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @media (max-width: 768px) {
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
