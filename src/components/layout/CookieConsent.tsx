'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

/**
 * GDPR cookie consent banner. Shows until the visitor accepts or declines;
 * the choice is remembered in localStorage so it does not reappear.
 */
export default function CookieConsent() {
  const t = useTranslations('cookies')
  const locale = useLocale()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('pb-cookie-consent')) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const choose = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem('pb-cookie-consent', value)
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-bar" role="dialog" aria-live="polite" aria-label={t('title')}>
      <span className="cookie-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 3a13 13 0 1 0 13 13 5 5 0 0 1-5-5 4 4 0 0 1-4-4 4.2 4.2 0 0 1-4-4z"
            fill="var(--color-gilt)"
          />
          <circle cx="12" cy="13" r="1.7" fill="#fff" />
          <circle cx="18.5" cy="11" r="1.4" fill="#fff" />
          <circle cx="20" cy="18.5" r="1.7" fill="#fff" />
          <circle cx="13" cy="20" r="1.4" fill="#fff" />
          <circle cx="16" cy="16" r="1.2" fill="#fff" />
        </svg>
      </span>
      <p className="cookie-text">
        {t('text')}{' '}
        <Link href={`/${locale}/privatuma-politika`} className="cookie-link">
          {t('policy')}
        </Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn cookie-decline" onClick={() => choose('declined')}>
          {t('decline')}
        </button>
        <button type="button" className="cookie-btn cookie-accept" onClick={() => choose('accepted')}>
          {t('accept')}
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .cookie-bar {
          position: fixed;
          right: 18px;
          bottom: 18px;
          left: auto;
          z-index: 9000;
          width: min(320px, calc(100vw - 28px));
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 18px;
          background: #ffffff;
          color: var(--color-ink-black);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 14px;
          box-shadow: 0 20px 48px -24px rgba(0,29,32,0.4);
        }
        .cookie-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cookie-text {
          margin: 0;
          font-family: var(--font-body);
          font-size: 12.5px;
          line-height: 1.55;
          color: var(--color-graphite);
        }
        .cookie-link { color: var(--color-gilt); text-decoration: underline; }
        .cookie-actions { display: flex; gap: 8px; width: 100%; }
        .cookie-btn {
          flex: 1;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 600;
          border-radius: 999px;
          padding: 9px 14px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: opacity 0.2s ease, background 0.2s ease;
        }
        .cookie-btn:hover { opacity: 0.9; }
        .cookie-accept { background: var(--color-gilt); color: #fff; }
        .cookie-decline {
          background: transparent;
          color: var(--color-graphite);
          border-color: var(--color-parchment-rule);
        }
        @media (max-width: 420px) {
          .cookie-bar { right: 12px; bottom: 12px; }
        }
      `,
        }}
      />
    </div>
  )
}
