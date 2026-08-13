'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import NavSearch from './NavSearch'

const LANGUAGES = ['lv', 'en', 'ru'] as const

export default function Navbar() {
  const t = useTranslations('nav')
  const h = useTranslations('hero')
  const c = useTranslations('contact')
  const s = useTranslations('services')
  const serviceItems = s.raw('items') as { name: string; description: string }[]
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  // True while the header is still sitting on top of the dark hero, where it
  // has to invert to cream-on-teal instead of the usual ink-on-white.
  const [overHero, setOverHero] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const lastY = useRef(0)

  // Hide the header on scroll down, reveal on scroll up (always shown near the top)
  useEffect(() => {
    lastY.current = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const delta = y - lastY.current
      if (y < 80) setHidden(false)
      else if (delta > 4) setHidden(true)
      else if (delta < -4) setHidden(false)
      const hero = document.getElementById('hero')
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 72)
      lastY.current = y
    }
    update()
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

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

  const navLinks = ['services', 'about', 'clients', 'insights', 'contact'] as const
  // "Klienti" points at the industries block — that is where the client base lives
  const anchorFor = (key: string) => (key === 'clients' ? 'industries' : key)

  return (
    <>
      {/* Blurred backdrop behind the mega panel — kept OUTSIDE <header> so its
          position:fixed resolves against the viewport (a transform on the header
          would otherwise make it its containing block and collapse this to ~0px). */}
      <div className="mega-backdrop" data-open={servicesOpen} aria-hidden="true" />

      <header
        data-over-hero={overHero && !menuOpen ? 'true' : undefined}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          /* matches the hero ground, so bar and hero read as one dark band */
          background: overHero && !menuOpen ? '#001d20' : 'var(--color-canvas-white)',
          borderBottom:
            overHero && !menuOpen ? 'none' : '1px solid var(--color-parchment-rule)',
          transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
          transition:
            'transform 0.55s cubic-bezier(0.22,1,0.36,1), background 0.35s ease, border-color 0.35s ease',
        }}
      >
        <nav
          style={{
            maxWidth: 1672,
            margin: '0 auto',
            padding: '0 40px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Typographic wordmark — the company name set in the editorial serif */}
          <Link href={`/${locale}`} aria-label="PB Finanses" className="brand-mark">
            PB Finanses
          </Link>

          {/* Desktop nav links */}
          <div
            className="desktop-nav"
            style={{ display: 'flex', gap: 36, alignItems: 'center', marginLeft: 'auto', marginRight: 42 }}
          >
            {navLinks.map((key) => {
              if (key === 'services') {
                return (
                  <div
                    key={key}
                    className="mega-wrap"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={`/${locale}#services`}
                      className="nav-link"
                      style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                    >
                      {t(key)}
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 10 6"
                        fill="none"
                        style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    {/* Full-width mega panel */}
                    <div className="mega-panel" data-open={servicesOpen}>
                      <div className="mega-inner">
                        {serviceItems.map((item, i) => (
                          <Link
                            key={i}
                            href={`/${locale}#services`}
                            onClick={() => setServicesOpen(false)}
                            className="mega-item"
                          >
                            <span className="mega-item-name">{item.name}</span>
                            <span className="mega-item-desc">{item.description}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={key}
                  href={`/${locale}#${anchorFor(key)}`}
                  className="nav-link"
                >
                  {t(key)}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Search (desktop) */}
            <div className="reference-nav-tools"><NavSearch /></div>

            {/* Language dropdown (desktop) */}
            <div ref={langRef} className="desktop-lang" style={{ position: 'relative' }}>
              <button className="lang-btn" onClick={() => setLangOpen((v) => !v)}>
                {locale.toUpperCase()}
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 10 6"
                  fill="none"
                  style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {langOpen && (
                <div className="nav-dropdown lang-dropdown">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => switchLocale(lang)}
                      className={`lang-item${locale === lang ? ' is-active' : ''}`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Consultation pill */}
            <Link href={`/${locale}#contact`} className="nav-pill">
              {h('ctaPrimary')}
            </Link>

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
        top: 72,
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
                fontFamily: 'var(--font-body)',
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
          {c('cta')}
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

      <style dangerouslySetInnerHTML={{ __html: `
        .brand-mark {
          font-family: var(--font-editorial-serif), 'Bodoni 72', Didot, Georgia, serif;
          font-size: 25px;
          font-weight: 400;
          letter-spacing: 0.005em;
          color: var(--color-ink-black);
          text-decoration: none;
          flex-shrink: 0;
          transition: color 0.35s ease;
        }
        .nav-pill {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          min-width: 164px;
          min-height: 42px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          background: var(--color-gilt);
          color: var(--color-canvas-white);
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-pill:hover { transform: translateY(-1px); }

        /* Sitting on the dark hero: the whole bar inverts to ivory. */
        header[data-over-hero='true'] .brand-mark,
        header[data-over-hero='true'] .nav-link,
        header[data-over-hero='true'] .lang-btn { color: #EFE9DC; }
        header[data-over-hero='true'] .nav-pill {
          background: #EFE9DC;
          color: #001d20;
        }
        header[data-over-hero='true'] .hamburger span { background: #EFE9DC !important; }
        header[data-over-hero='true'] .nav-search-btn,
        header[data-over-hero='true'] .nav-search-toggle { color: #EFE9DC; }

        .nav-link {
          position: relative;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.01em;
          color: var(--color-gilt);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.18s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1.5px;
          background: var(--color-gilt);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover,
        .nav-link.is-active { color: var(--color-gilt); }
        .nav-link:hover::after,
        .nav-link.is-active::after { transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) {
          .nav-link::after { transition: none; }
        }

        .nav-dropdown {
          min-width: 216px;
          background: var(--color-canvas-white);
          border: 1px solid var(--color-parchment-rule);
          border-top: 2px solid var(--color-gilt);
          box-shadow: 0 18px 40px -20px rgba(12,10,7,0.30);
          padding: 6px 0;
        }
        .nav-sub {
          position: relative;
          display: block;
          padding: 13px 24px;
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.01em;
          color: #2C2C2E;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.18s ease, padding-left 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-sub + .nav-sub { border-top: 1px solid var(--color-parchment-rule); }
        .nav-sub::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          bottom: 10px;
          width: 2px;
          background: var(--color-gilt);
          transform: scaleY(0);
          transform-origin: center;
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-sub:hover,
        .nav-sub.is-active { color: var(--color-gilt); }
        .nav-sub:hover::before,
        .nav-sub.is-active::before { transform: scaleY(1); }
        .nav-sub:hover,
        .nav-sub.is-active { padding-left: 30px; }
        @media (prefers-reduced-motion: reduce) {
          .nav-sub, .nav-sub::before { transition: none; }
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid var(--color-gilt);
          color: var(--color-gilt);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          padding: 10px 18px;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .nav-cta-arrow {
          display: inline-block;
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-cta:hover {
          background: var(--color-gilt);
          color: #fff;
        }
        .nav-cta:hover .nav-cta-arrow { transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) {
          .nav-cta-arrow { transition: none; }
        }

        .lang-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          padding: 6px 2px;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #2C2C2E;
          transition: color 0.18s ease;
        }
        .lang-btn:hover { color: var(--color-gilt); }

        .lang-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 86px;
          z-index: 200;
        }
        .lang-item {
          position: relative;
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px 18px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #2C2C2E;
          transition: color 0.18s ease, padding-left 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .lang-item + .lang-item { border-top: 1px solid var(--color-parchment-rule); }
        .lang-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: var(--color-gilt);
          transform: scaleY(0);
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .lang-item:hover,
        .lang-item.is-active { color: var(--color-gilt); padding-left: 24px; }
        .lang-item:hover::before,
        .lang-item.is-active::before { transform: scaleY(1); }
        @media (prefers-reduced-motion: reduce) {
          .lang-item, .lang-item::before { transition: none; }
        }

        /* ===== Mega menu (Services) ===== */
        .mega-wrap {
          height: 72px;
          display: flex;
          align-items: center;
        }
        .mega-backdrop {
          position: fixed;
          left: 0;
          right: 0;
          top: 72px;
          bottom: 0;
          background: rgba(20,16,12,0.16);
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.28s ease, visibility 0.28s ease;
          z-index: 80;
        }
        .mega-backdrop[data-open="true"] {
          opacity: 1;
          visibility: visible;
        }
        .mega-panel {
          position: fixed;
          left: 0;
          right: 0;
          top: 72px;
          background: var(--color-canvas-white);
          border-top: 2px solid var(--color-gilt);
          border-bottom: 1px solid var(--color-parchment-rule);
          box-shadow: 0 30px 60px -28px rgba(12,10,7,0.35);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16,1,0.3,1), visibility 0.22s ease;
          z-index: 90;
        }
        .mega-panel[data-open="true"] {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }
        .mega-inner {
          max-width: 1672px;
          margin: 0 auto;
          padding: 40px 40px 44px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px 40px;
        }
        .mega-item {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 16px 18px;
          text-decoration: none;
          border-left: 2px solid transparent;
          transition: border-color 0.2s ease, background 0.2s ease, padding-left 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .mega-item:hover {
          border-left-color: var(--color-gilt);
          background: var(--color-linen-tint);
          padding-left: 24px;
        }
        .mega-item-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--color-ink-black);
          transition: color 0.18s ease;
        }
        .mega-item:hover .mega-item-name { color: var(--color-gilt); }
        .mega-item-desc {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-stone);
        }
        @media (prefers-reduced-motion: reduce) {
          .mega-panel, .mega-item, .mega-backdrop { transition: none; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-cta { display: none !important; }
          .desktop-lang { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          nav { padding: 0 20px !important; }
          .brand-mark { font-size: 19px; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
          .hamburger { display: none !important; }
          .reference-nav-tools, .desktop-lang { display: none !important; }
        }
      ` }} />
    </>
  )
}
