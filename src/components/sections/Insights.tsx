import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

export default function Insights() {
  const t = useTranslations('insights')
  const items = t.raw('items') as Array<{
    date: string
    tag: string
    title: string
    excerpt: string
  }>

  return (
    <section
      id="insights"
      className="section-gap"
      style={{ background: 'var(--color-canvas-white)' }}
    >
      <div className="section-wrap">
        {/* Header */}
        <Reveal variant="scale">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 40,
              paddingBottom: 20,
              borderBottom: '1px solid var(--color-parchment-rule)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
              }}
            >
              {t('title')}
            </h2>
            <a
              href="#"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-gilt)',
                textDecoration: 'none',
              }}
            >
              {t('all')}
            </a>
          </div>
        </Reveal>

        {/* 3-col cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {items.map((item) => (
            <article
              key={item.title}
              className="insight-card"
              style={{
                border: '1px solid var(--color-parchment-rule)',
                borderRadius: 12,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Color block header */}
              <div
                style={{
                  height: 6,
                  background: 'linear-gradient(to right, var(--color-gilt), var(--color-gilt-dark))',
                }}
              />
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 13,
                      letterSpacing: '0.03em',
                      color: 'var(--color-stone)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.date}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      fontWeight: 500,
                      color: 'var(--color-gilt)',
                      border: '1px solid var(--color-gilt)',
                      borderRadius: 937,
                      padding: '2px 10px',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                <Reveal variant="left">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      fontSize: 20,
                      color: 'var(--color-ink-black)',
                      lineHeight: 1.3,
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'var(--color-graphite)',
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    {item.excerpt}
                  </p>
                </Reveal>
                <a
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--color-gilt)',
                    textDecoration: 'none',
                  }}
                >
                  {t('readMore')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .insight-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -20px rgba(12, 10, 7, 0.18);
        }
        @media (max-width: 768px) {
          #insights .section-wrap > div:last-child { grid-template-columns: 1fr !important; }
        }
      `,
        }}
      />
    </section>
  )
}
