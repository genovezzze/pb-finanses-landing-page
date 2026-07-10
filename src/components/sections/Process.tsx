import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

export default function Process() {
  const t = useTranslations('process')
  const steps = t.raw('steps') as Array<{
    num: string
    title: string
    body: string
  }>

  return (
    <section
      className="section-gap"
      style={{ background: 'var(--color-espresso)', color: '#fff' }}
    >
      <div className="section-wrap">
        <Reveal variant="down">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.02em',
              marginBottom: 48,
              color: '#fff',
            }}
          >
            {t('title')}
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: 'rgba(255,255,255,0.04)',
                padding: '36px 32px',
                height: '100%',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Step badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  border: '1px solid var(--color-gilt)',
                  borderRadius: 2,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--color-gilt)',
                  letterSpacing: '0.04em',
                  marginBottom: 20,
                }}
              >
                {step.num}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 24,
                  color: '#fff',
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.65,
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 768px) {
          #process-grid { grid-template-columns: 1fr !important; }
        }
      `,
        }}
      />
    </section>
  )
}
