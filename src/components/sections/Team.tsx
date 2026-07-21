import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

export default function Team() {
  const t = useTranslations('team')

  return (
    <section
      id="team"
      className="section-gap"
      style={{ background: 'var(--color-canvas-white)' }}
    >
      <div className="section-wrap" style={{ maxWidth: 720, textAlign: 'center', margin: '0 auto' }}>
        <Reveal variant="blur">
          <p className="eyebrow" style={{ marginBottom: 20, justifyContent: 'center', display: 'flex' }}>
            {t('eyebrow')}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--color-ink-black)',
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            {t('title')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: 'var(--color-graphite)',
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {t('intro')}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 15,
              color: 'var(--color-stone)',
            }}
          >
            {t('note')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
