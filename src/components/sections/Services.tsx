import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

export default function Services() {
  const t = useTranslations('services')
  const locale = useLocale()
  const items = t.raw('items') as Array<{
    name: string
    badge: string
    description: string
    premium: boolean
  }>

  // Геометрические маркеры как SVG: юникод-глифы вроде ◻ на части систем
  // подменяются цветными emoji-шрифтами.
  const icons = [
    // ромб в ромбе
    <>
      <path d="M12 2 22 12 12 22 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.5 16.5 12 12 16.5 7.5 12Z" fill="currentColor" />
    </>,
    // закрашенный ромб
    <path d="M12 2 22 12 12 22 2 12Z" fill="currentColor" />,
    // круг с точкой
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
    </>,
    // квадрат
    <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    // контурный ромб
    <path d="M12 2 22 12 12 22 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    // кольцо
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>,
  ]

  return (
    <section id="services" className="section-gap" style={{ background: 'var(--color-canvas-white)' }}>
      <div className="section-wrap">
        {/* Header */}
        <Reveal variant="right">
          <div
            id="services-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 48,
              paddingBottom: 24,
              borderBottom: '1px solid var(--color-parchment-rule)',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  color: 'var(--color-ink-black)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                {t('title')}
              </h2>
            </div>
            <p
              id="services-subtitle"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                fontStyle: 'italic',
                color: 'var(--color-stone)',
                textAlign: 'right',
                lineHeight: 1.5,
                whiteSpace: 'nowrap',
              }}
            >
              {t('subtitle')}
            </p>
          </div>
        </Reveal>

        {/* 3×2 grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0 40px',
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.name}
              className="service-card"
              style={{
                position: 'relative',
                borderTop: `1px solid var(--color-parchment-rule)`,
                paddingTop: 24,
                paddingBottom: 32,
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{ display: 'block', flexShrink: 0, color: 'var(--color-gilt)' }}
                >
                  {icons[i % icons.length]}
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    color: item.premium ? '#fff' : 'var(--color-gilt)',
                    background: item.premium ? 'var(--color-gilt)' : 'transparent',
                    border: item.premium ? 'none' : '1px solid var(--color-gilt)',
                    borderRadius: 999,
                    padding: '4px 12px',
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <Reveal variant="scale" duration={0.4}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 22,
                    color: 'var(--color-ink-black)',
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--color-graphite)',
                    lineHeight: 1.65,
                    marginBottom: 16,
                  }}
                >
                  {item.description}
                </p>
              </Reveal>
              <a
                href={`/${locale}#contact`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--color-gilt)',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                {t('learnMore')}
              </a>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Gilt accent line that sweeps across the top border on hover */
        .service-card::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-gilt);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .service-card:hover::before {
          transform: scaleX(1);
        }
        .service-card:hover {
          transform: translateY(-6px);
        }
        .service-card:hover h3 {
          color: var(--color-gilt) !important;
        }
        /* Icon nudges up and scales slightly */
        .service-card svg {
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .service-card:hover svg {
          transform: scale(1.15) translateY(-2px);
        }
        /* "Uzzināt vairāk" link slides right */
        .service-card a {
          display: inline-block;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.25s ease;
        }
        .service-card:hover a {
          transform: translateX(5px);
          color: var(--color-gilt-dark) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .service-card, .service-card::before, .service-card svg, .service-card a {
            transition: none;
          }
        }
        @media (max-width: 768px) {
          #services .section-wrap > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `,
        }}
      />
    </section>
  )
}
