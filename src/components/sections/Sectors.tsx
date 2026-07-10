import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

const SECTOR_IMAGES = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GG0etPk7kKigScTFkcs4Y7pOC7/hf_20260709_130046_e68e3537-dead-4fd1-97a3-e5809b7a9209.png',
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GG0etPk7kKigScTFkcs4Y7pOC7/hf_20260709_130048_c00b668c-9acd-4595-8d33-cabc172dfddd.png',
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GG0etPk7kKigScTFkcs4Y7pOC7/hf_20260709_130050_083c73a9-eda1-4d7d-8080-e656b2e7cbae.png',
]

const SECTOR_ALTS = [
  'Jauns bizness — zelta pildspalva uz krēmkrāsas papīra',
  'Holdingi un korporācijas — biroju ēkas arhitektūra',
  'Pašvaldības un NVO — klasiskā arhitektūra',
]

export default function Sectors() {
  const t = useTranslations('sectors')
  const items = t.raw('items') as Array<{ title: string; body: string }>

  return (
    <section
      style={{
        background: 'var(--color-linen-tint)',
        padding: '64px 0',
        borderTop: '1px solid var(--color-parchment-rule)',
        borderBottom: '1px solid var(--color-parchment-rule)',
      }}
    >
      <div className="section-wrap">
        <Reveal variant="left">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(36px, 4vw, 52px)',
              color: 'var(--color-ink-black)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 40,
            }}
          >
            {t('title')}
          </h2>
        </Reveal>
        <div
          className="sector-card-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              className="sector-card"
              style={{
                background: 'var(--color-canvas-white)',
                overflow: 'hidden',
                height: '100%',
                borderRadius: 12,
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Image block */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={SECTOR_IMAGES[i]}
                  alt={SECTOR_ALTS[i]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  className="sector-img"
                />
                {/* Gilt overlay on hover */}
                <div
                  className="sector-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(184,146,58,0.08) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.4s',
                  }}
                />
              </div>

              {/* Text */}
              <div style={{ padding: '24px 28px 28px' }}>
                <Reveal variant="up" duration={0.4}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      fontSize: 22,
                      color: 'var(--color-ink-black)',
                      marginBottom: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'var(--color-graphite)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item.body}
                  </p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sector-card:hover .sector-img {
          transform: scale(1.04);
        }
        .sector-card:hover .sector-overlay {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .sector-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
