import Link from 'next/link'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('footer')
  const nav = await getTranslations('footer.nav')
  const locale = await getLocale()

  const links = ['services', 'about', 'insights', 'contact'] as const
  const pages = { services: 'pakalpojumi', about: 'par-mums', insights: 'jaunumi', contact: 'kontakti' }

  const socials = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/PBFinanses/',
      icon: (
        <path d="M15 3h-2.9A4.1 4.1 0 0 0 8 7.1V10H5.6v3H8v8h3v-8h2.6l.5-3H11V7.3a1 1 0 0 1 1-1h3V3z" fill="currentColor" />
      ),
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/pbfinanses/',
      icon: (
        <>
          <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16.5" cy="7.5" r="1.05" fill="currentColor" />
        </>
      ),
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@pb.finanses',
      icon: (
        <path d="M14 4c.3 2 1.6 3.4 3.6 3.6v2.4c-1.2 0-2.4-.4-3.6-1.1v5.6a4.9 4.9 0 1 1-4.9-4.9c.3 0 .6 0 .9.1v2.5a2.4 2.4 0 1 0 1.6 2.3V4H14z" fill="currentColor" />
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/pb-finanses/',
      icon: (
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6 0h3.8v1.64h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21h-4v-5.35c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9V9z" fill="currentColor" />
      ),
    },
  ]

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
          <Image
            src="/images/PBFinanses_LOGO_500.png"
            alt="PB Finanses"
            width={500}
            height={270}
            style={{
              width: 'auto',
              height: 64,
              display: 'block',
              marginBottom: 16,
              /* logo is teal + grey; knock it out to white on the dark footer */
              filter: 'brightness(0) invert(1)',
              opacity: 0.92,
            }}
          />

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

          {/* Social profiles */}
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
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
                href={`/${locale}/${pages[key]}`}
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
          {' · '}
          {/* Licence number is a legal credential, so it stays in view on
              every page rather than only in the block under the hero. */}
          SIA &quot;PB Finanses&quot;, reģ. Nr. 41203042116 · VID licence AGL0000018
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          color: rgba(255,255,255,0.72);
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .footer-social:hover {
          color: #001d20;
          background: #f1ede3;
          border-color: #f1ede3;
          transform: translateY(-2px);
        }
      `,
        }}
      />
    </footer>
  )
}
