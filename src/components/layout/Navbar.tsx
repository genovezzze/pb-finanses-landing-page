'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const LANGUAGES = ['lv', 'en', 'ru'] as const

export default function Navbar() {
  const t = useTranslations('nav')
  const c = useTranslations('contact')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setLangOpen(false)
  }

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = ['services', 'about', 'insights', 'contact'] as const

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--color-canvas-white)',
          borderBottom: '1px solid var(--color-parchment-rule)',
        }}
      >
        <nav
          style={{
            maxWidth: 1600,
            margin: '0 auto',
            padding: '0 40px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href={`/${locale}`}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 20,
              letterSpacing: '0.12em',
              color: 'var(--color-ink-black)',
              textDecoration: 'none',
            }}
          >
            PB FINANSES
          </Link>

          {/* Desktop nav links */}
          <div
            className="desktop-nav"
            style={{ display: 'flex', gap: 32, alignItems: 'center' }}
          >
            {navLinks.map((key) => (
              <Link
                key={key}
                href={`/${locale}#${key}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--color-graphite)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink-black)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-graphite)')}
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Phone + address (desktop) */}
            <div
              className="navbar-contact"
              style={{ display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <a
                  href={`tel:${c('phone').replace(/\s/g, '')}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--color-ink-black)',
                    textDecoration: 'none',
                    lineHeight: 1.3,
                  }}
                >
                  {c('phone')}
                </a>
                <span
                  className="navbar-address"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    color: 'var(--color-stone)',
                    lineHeight: 1.3,
                  }}
                >
                  {c('address')}
                </span>
              </div>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z"
                  fill="var(--color-ink-black)"
                />
              </svg>
            </div>

            {/* Language dropdown (desktop) */}
            <div ref={langRef} className="desktop-lang" style={{ position: 'relative', marginLeft: -4 }}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'none',
                  border: '1px solid var(--color-parchment-rule)',
                  borderRadius: 3,
                  padding: '3px 7px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: 'var(--color-ink-black)',
                  transition: 'border-color 0.15s',
                }}
              >
                {locale.toUpperCase()}
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 10 6"
                  fill="none"
                  style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                >
                  <path d="M1 1l4 4 4-4" stroke="var(--color-stone)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {langOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    background: 'var(--color-canvas-white)',
                    border: '1px solid var(--color-parchment-rule)',
                    borderRadius: 4,
                    boxShadow: '0 12px 24px -12px rgba(12,10,7,0.25)',
                    overflow: 'hidden',
                    minWidth: 80,
                    zIndex: 200,
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => switchLocale(lang)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        background: locale === lang ? 'var(--color-parchment-wash)' : 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        fontWeight: locale === lang ? 600 : 400,
                        letterSpacing: '0.06em',
                        color: locale === lang ? 'var(--color-gilt)' : 'var(--color-graphite)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-parchment-wash)')}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = locale === lang ? 'var(--color-parchment-wash)' : 'none')
                      }
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger (mobile only) */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Izvēlne"
              style={{
                display: 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 5,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 6,
                width: 36,
                height: 36,
              }}
            >
              <span style={{
                display: 'block', height: 1.5, background: 'var(--color-ink-black)',
                borderRadius: 2,
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                transition: 'transform 0.25s ease',
              }} />
              <span style={{
                display: 'block', height: 1.5, background: 'var(--color-ink-black)',
                borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s',
              }} />
              <span style={{
                display: 'block', height: 1.5, background: 'var(--color-ink-black)',
                borderRadius: 2,
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                transition: 'transform 0.25s ease',
              }} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          top: 64,
          background: 'var(--color-canvas-white)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 28px 48px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
          overflowY: 'auto',
        }}
      >
        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 40 }}>
          {navLinks.map((key) => (
            <Link
              key={key}
              href={`/${locale}#${key}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                fontWeight: 300,
                color: 'var(--color-ink-black)',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid var(--color-parchment-rule)',
                letterSpacing: '-0.01em',
              }}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Contact info */}
        <div style={{ marginBottom: 32 }}>
          <a
            href={`tel:${c('phone').replace(/\s/g, '')}`}
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--color-ink-black)',
              textDecoration: 'none',
              marginBottom: 6,
            }}
          >
            {c('phone')}
          </a>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--color-stone)',
          }}>
            {c('address')}
          </span>
        </div>

        {/* CTA button */}
        <Link
          href={`/${locale}#contact`}
          onClick={() => setMenuOpen(false)}
          className="btn-primary"
          style={{ alignSelf: 'flex-start', marginBottom: 32 }}
        >
          Pieteikties konsultācijai →
        </Link>

        {/* Language switcher */}
        <div style={{ display: 'flex', gap: 8 }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => { switchLocale(lang); setMenuOpen(false) }}
              style={{
                background: locale === lang ? 'var(--color-gilt)' : 'transparent',
                color: locale === lang ? '#fff' : 'var(--color-graphite)',
                border: `1px solid ${locale === lang ? 'var(--color-gilt)' : 'var(--color-parchment-rule)'}`,
                borderRadius: 4,
                padding: '6px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.06em',
                cursor: 'pointer',
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .navbar-address { display: none !important; }
          .navbar-contact { display: none !important; }
          .desktop-lang { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          nav { padding: 0 20px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
