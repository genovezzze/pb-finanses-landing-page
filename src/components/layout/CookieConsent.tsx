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
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 3a13 13 0 1 0 13 13 5 5 0 0 1-5-5 4 4 0 0 1-4-4 4.2 4.2 0 0 1-4-4z"
            fill="#fff"
          />
          <circle cx="12" cy="13" r="1.7" fill="var(--color-gilt)" />
          <circle cx="18.5" cy="11" r="1.4" fill="var(--color-gilt)" />
          <circle cx="20" cy="18.5" r="1.7" fill="var(--color-gilt)" />
          <circle cx="13" cy="20" r="1.4" fill="var(--color-gilt)" />
          <circle cx="16" cy="16" r="1.2" fill="var(--color-gilt)" />
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
          right: 20px;
          bottom: 20px;
          left: auto;
          z-index: 9000;
          width: min(360px, calc(100vw - 32px));
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 22px;
          background: var(--color-gilt);
          color: #fff;
          border-radius: 16px;
          box-shadow: 0 26px 60px -26px rgba(0,29,32,0.55);
        }
        .cookie-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cookie-text {
          margin: 0;
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(255,255,255,0.92);
        }
        .cookie-link { color: #fff; text-decoration: underline; }
        .cookie-actions { display: flex; gap: 10px; width: 100%; }
        .cookie-btn {
          flex: 1;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          border-radius: 999px;
          padding: 10px 18px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: opacity 0.2s ease, background 0.2s ease;
        }
        .cookie-btn:hover { opacity: 0.9; }
        .cookie-accept { background: #fff; color: var(--color-gilt); }
        .cookie-decline { background: transparent; color: #fff; border-color: rgba(255,255,255,0.5); }
        @media (max-width: 420px) {
          .cookie-bar { right: 12px; bottom: 12px; }
        }
      `,
        }}
      />
    </div>
  )
}
