import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

export default function Founder() {
  const t = useTranslations('founder')

  return (
    <section
      id="about"
      className="section-gap"
      style={{ background: 'var(--color-canvas-white)' }}
    >
      <div className="section-wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* Left: text */}
          <Reveal variant="left">
            <p className="eyebrow" style={{ marginBottom: 20 }}>
              {t('eyebrow')}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(36px, 4vw, 52px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              {t('name')}
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--color-gilt)',
                letterSpacing: '0.04em',
                marginBottom: 24,
              }}
            >
              {t('credentials')}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'var(--color-graphite)',
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              {t('bio')}
            </p>

            {/* Pull quote */}
            <blockquote
              style={{
                borderLeft: '2px solid var(--color-gilt)',
                paddingLeft: 20,
                margin: '0 0 28px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 22,
                  color: 'var(--color-ink-black)',
                  lineHeight: 1.4,
                }}
              >
                &ldquo;{t('quote')}&rdquo;
              </p>
            </blockquote>

            <a
              href="mailto:info@pbfinanses.lv"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-gilt)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              {t('contact')} →
            </a>
          </Reveal>

          {/* Right: photo */}
          <Reveal variant="scale" delay={0.1}>
            <div
              style={{
                position: 'relative',
                width: '75%',
                aspectRatio: '1 / 1',
                borderRadius: 2,
                overflow: 'hidden',
                alignSelf: 'center',
                justifySelf: 'center',
                marginTop: 40,
              }}
            >
              <Image
                src="/images/founder-agnese.jpg"
                alt="Agnese Pastare"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 768px) {
          #about .section-wrap > div {
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
