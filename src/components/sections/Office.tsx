import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

export default function Office() {
  const t = useTranslations('office')
  const c = useTranslations('contact')

  return (
    <section
      id="office"
      className="section-gap"
      style={{ background: 'var(--color-linen-tint)' }}
    >
      <div className="section-wrap">
        <div
          id="office-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <Reveal variant="left">
            <p className="eyebrow" style={{ marginBottom: 20 }}>
              {t('eyebrow')}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              {t('title')}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'var(--color-graphite)',
                lineHeight: 1.65,
                maxWidth: 440,
              }}
            >
              {t('intro')}
            </p>
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            <div
              style={{
                background: 'var(--color-canvas-white)',
                border: '1px solid var(--color-parchment-rule)',
                borderRadius: 12,
                padding: '36px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    color: 'var(--color-gilt)',
                    marginBottom: 6,
                  }}
                >
                  {t('addressLabel')}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 17,
                    color: 'var(--color-ink-black)',
                  }}
                >
                  {c('address')}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    color: 'var(--color-gilt)',
                    marginBottom: 6,
                  }}
                >
                  {t('hoursLabel')}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 17,
                    color: 'var(--color-ink-black)',
                  }}
                >
                  {t('hours')}
                </div>
              </div>
              <a
                href={`tel:${c('phone').replace(/\s/g, '')}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--color-gilt)',
                  textDecoration: 'none',
                }}
              >
                {c('phone')} →
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 768px) {
          #office-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `,
        }}
      />
    </section>
  )
}
