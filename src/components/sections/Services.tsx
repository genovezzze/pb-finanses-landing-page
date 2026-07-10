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

  const icons = ['◈', '◆', '◉', '◻', '◇', '◎']

  return (
    <section id="services" className="section-gap" style={{ background: 'var(--color-canvas-white)' }}>
      <div className="section-wrap">
        {/* Header */}
        <Reveal variant="right">
          <div
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
                  fontWeight: 300,
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
                <span
                  style={{
                    fontSize: 26,
                    lineHeight: 1,
                    color: 'var(--color-gilt)',
                  }}
                >
                  {icons[i % icons.length]}
                </span>
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
                    fontWeight: 400,
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
        .service-card:hover {
          transform: translateY(-4px);
        }
        .service-card:hover h3 {
          color: var(--color-gilt) !important;
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
