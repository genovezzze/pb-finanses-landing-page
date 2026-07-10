import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('footer')
  const nav = await getTranslations('footer.nav')
  const locale = await getLocale()

  const links = ['services', 'about', 'insights', 'contact'] as const

  return (
    <footer
      style={{
        background: 'var(--color-espresso)',
        color: 'var(--color-canvas-white)',
        padding: '56px 0 32px',
      }}
    >
      <div
        className="section-wrap footer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 40,
          paddingBottom: 40,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 22,
              letterSpacing: '0.12em',
              marginBottom: 12,
            }}
          >
            PB FINANSES
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
            }}
          >
            {t('tagline')}
          </p>
        </div>

        {/* Nav */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: 16,
            }}
          >
            Pakalpojumi
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {links.map((key) => (
              <Link
                key={key}
                href={`/${locale}#${key}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
              >
                {nav(key)}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: 16,
            }}
          >
            Kontakti
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: '+371 29716434', href: 'tel:+37129716434' },
              { label: 'info@pbfinanses.lv', href: 'mailto:info@pbfinanses.lv' },
              { label: 'Lielais prospekts 54-9, Ventspils', href: '#' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="section-wrap footer-bottom"
        style={{
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          {t('copyright')}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.06em',
          }}
        >
          pbfinanses.lv
        </span>
      </div>
    </footer>
  )
}
