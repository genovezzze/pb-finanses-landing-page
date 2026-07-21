'use client'
import { useEffect, useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'

export default function FloatingContact() {
  const c = useTranslations('contact')
  const form = useTranslations('contact.form')
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Reveal after the hero, hide again near the footer/contact section
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const doc = document.documentElement.scrollHeight
      const vh = window.innerHeight
      const nearBottom = y + vh > doc - 900
      setShow(y > 700 && !nearBottom)
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')

    const subject = `Pieprasījums no ${name || 'mājaslapas'}`
    const body = [`Vārds: ${name}`, `E-pasts: ${email}`, '', message].join('\n')
    window.location.href = `mailto:${c('email')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  const visible = show && !dismissed

  return (
    <aside className="fc" data-show={visible} aria-hidden={!visible}>
      <button
        type="button"
        className="fc-close"
        onClick={() => setDismissed(true)}
        aria-label="✕"
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <p className="fc-title">{c('floatingTitle')}</p>
      <p className="fc-sub">{c('body')}</p>

      {submitted ? (
        <p className="fc-success">{form('success')}</p>
      ) : (
        <form className="fc-form" onSubmit={handleSubmit}>
          <input
            className="fc-input"
            name="name"
            type="text"
            placeholder={form('namePlaceholder')}
            required
          />
          <input
            className="fc-input"
            name="email"
            type="email"
            placeholder={form('emailPlaceholder')}
            required
          />
          <textarea
            className="fc-input"
            name="message"
            rows={3}
            placeholder={form('messagePlaceholder')}
          />
          <button type="submit" className="fc-btn">
            {form('submit').replace(/→/g, '').trim()}
          </button>
        </form>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .fc {
          position: fixed;
          left: 24px;
          bottom: 24px;
          z-index: 90;
          width: 360px;
          max-width: calc(100vw - 32px);
          background: var(--color-canvas-white);
          border: 1px solid var(--color-parchment-rule);
          border-top: 3px solid var(--color-gilt);
          border-radius: 18px;
          box-shadow: 0 34px 70px -26px rgba(12,10,7,0.42);
          padding: 26px 26px 28px;
          opacity: 0;
          transform: translateX(-120%) scale(0.98);
          pointer-events: none;
          transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .fc[data-show="true"] {
          opacity: 1;
          transform: translateX(0) scale(1);
          pointer-events: auto;
        }
        .fc-close {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, var(--color-gilt), var(--color-gilt-dark));
          color: #fff;
          cursor: pointer;
          box-shadow: 0 8px 18px -8px rgba(35,110,116,0.6);
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s ease;
        }
        .fc-close:hover {
          transform: rotate(90deg) scale(1.05);
          box-shadow: 0 12px 24px -8px rgba(35,110,116,0.7);
        }
        .fc-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 24px;
          letter-spacing: -0.015em;
          color: var(--color-ink-black);
          margin-bottom: 6px;
          padding-right: 44px;
        }
        .fc-sub {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--color-graphite);
          margin-bottom: 18px;
        }
        .fc-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fc-input {
          width: 100%;
          background: var(--color-canvas-white);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 10px;
          padding: 12px 14px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--color-ink-black);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          resize: vertical;
        }
        .fc-input::placeholder { color: var(--color-stone); }
        .fc-input:focus {
          border-color: var(--color-gilt);
          box-shadow: 0 0 0 3px rgba(35,110,116,0.12);
        }
        .fc-btn {
          margin-top: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: linear-gradient(135deg, var(--color-gilt), var(--color-gilt-dark));
          color: #fff;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          padding: 13px 18px;
          border-radius: 10px;
          box-shadow: 0 8px 18px -8px rgba(35,110,116,0.55);
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s ease;
        }
        .fc-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 26px -8px rgba(35,110,116,0.62);
        }
        .fc-success {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-gilt);
        }
        @media (prefers-reduced-motion: reduce) {
          .fc, .fc-btn, .fc-close { transition: none; }
        }
        @media (max-width: 560px) {
          .fc { left: 16px; right: 16px; bottom: 16px; width: auto; }
        }
      `,
        }}
      />
    </aside>
  )
}
