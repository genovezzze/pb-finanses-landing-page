import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

// Article art. Deliberately thematic rather than portraits of the team - these
// headlines are placeholders, and a real colleague's face next to one would read
// as a byline they never wrote. Swap per article once the blog is real.
const COVERS = [
  '/images/2003.webp',
  '/images/2011.webp',
  '/images/industries/business-services-education.png',
  '/images/industries/it-robotics.png',
  '/images/industries/construction-development.png',
]

type Item = {
  date: string
  tag: string
  title: string
  excerpt: string
  readTime: string
}

export default function Insights({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('insights')
  const locale = useLocale()
  const allItems = t.raw('items') as Item[]
  const items = compact ? allItems.slice(0, 3) : allItems

  const [featured, ...rest] = items

  return (
    <section
      id="insights"
      style={{ background: 'var(--color-linen-tint)', padding: '36px 0 48px' }}
    >
      <div className="section-wrap insights-wrap">
        {/* Header */}
        <Reveal variant="scale">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 30,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(26px, 2.6vw, 36px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
              }}
            >
              {t('title')}
            </h2>
            <a href={`/${locale}/jaunumi`} className="insights-all">
              {t('all')}
            </a>
          </div>
        </Reveal>

        <div className="insights-layout">
          {/* ── Latest article, played large ── */}
          <Reveal variant="up" duration={0.5} className="insight-feature-wrap">
            <article className="insight-card insight-feature">
              <div className="insight-media">
                <Image
                  src={COVERS[0]}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="insight-panel">
                <span className="insight-tag">{featured.tag}</span>
                <h3 className="insight-title">{featured.title}</h3>
                <p className="insight-excerpt">{featured.excerpt}</p>
                <p className="insight-meta">
                  {featured.readTime} <span>|</span> {featured.date}
                </p>
              </div>
            </article>
          </Reveal>

          {/* ── The rest, 2 × 2 ── */}
          <div className="insight-grid">
            {rest.map((item, i) => (
              <Reveal key={item.title} variant="up" duration={0.45} delay={0.05 * (i + 1)}>
                <article className="insight-card insight-small">
                  <div className="insight-media">
                    <Image
                      src={COVERS[i + 1]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="insight-panel">
                    <span className="insight-tag">{item.tag}</span>
                    <h3 className="insight-title">{item.title}</h3>
                    <p className="insight-meta">
                      {item.readTime} <span>|</span> {item.date}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .insights-all {
          font-family: var(--font-body);
          font-size: 17px;
          font-weight: 500;
          color: var(--color-gilt);
          text-decoration: none;
          white-space: nowrap;
        }
        .insights-all:hover { text-decoration: underline; }

        .insights-layout {
          display: grid;
          grid-template-columns: 1.04fr 1fr;
          gap: 20px;
          align-items: stretch;
          height: clamp(600px, 42vw, 720px);
        }
        .insights-wrap { max-width: 1672px; }
        .insight-feature-wrap { height: 100%; }
        .insight-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 1fr;
          gap: 20px;
        }
        .insight-grid > * { min-width: 0; height: 100%; }

        /* The white panel is pulled up over the photo, so the image reads as a
           backdrop the card sits on rather than a banner stuck above it. */
        .insight-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-radius: 22px;
          background: var(--color-linen-tint);
          cursor: pointer;
        }
        .insight-media {
          position: relative;
          width: 100%;
          border-radius: 22px;
          overflow: hidden;
          background: var(--color-parchment-wash);
        }
        .insight-panel {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: var(--color-canvas-white);
          border-radius: 22px;
          box-shadow: 0 14px 34px -22px rgba(12,10,7,0.24);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .insight-card:hover .insight-panel {
          transform: translateY(-6px);
          box-shadow: 0 26px 44px -22px rgba(12,10,7,0.34);
        }
        .insight-card:hover .insight-title { color: var(--color-gilt-dark); }

        .insight-tag {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-stone);
          opacity: 0.62;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .insight-title {
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--color-gilt);
          line-height: 1.32;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }
        .insight-excerpt {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.55;
          color: var(--color-graphite);
        }
        .insight-meta {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--color-gilt-dark);
          margin-top: auto;
        }
        .insight-meta span { opacity: 0.45; margin: 0 2px; }

        /* Featured */
        .insight-feature .insight-media {
          height: 52%;
          flex: 0 0 52%;
        }
        .insight-feature .insight-panel {
          margin: -70px 26px 0;
          padding: 28px 32px 24px;
        }
        .insight-feature .insight-title {
          max-width: 26ch;
          font-size: clamp(20px, 1.7vw, 26px);
          margin: 12px 0 12px;
        }
        .insight-feature .insight-meta { padding-top: 24px; }

        /* Small */
        .insight-small .insight-media {
          height: 58%;
          flex: 0 0 58%;
        }
        .insight-small .insight-panel {
          margin: -34px 16px 0;
          padding: 18px 22px 16px;
        }
        .insight-small .insight-title {
          font-size: clamp(15px, 1.2vw, 19px);
          margin: 10px 0 12px;
        }

        @media (max-width: 900px) {
          .insights-layout { grid-template-columns: 1fr; height: auto; }
          .insight-feature .insight-media { height: auto; min-height: 320px; aspect-ratio: 16 / 10; flex: none; }
          .insight-grid { grid-auto-rows: minmax(340px, auto); }
        }
        @media (max-width: 560px) {
          .insight-grid { grid-template-columns: 1fr; }
          .insight-feature .insight-media { min-height: 230px; }
          .insight-feature .insight-panel { margin: -42px 12px 0; padding: 22px 20px; }
          .insight-feature .insight-title { font-size: 22px; }
          .insight-excerpt { font-size: 15px; }
          .insight-small .insight-panel { margin: -34px 10px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .insight-panel { transition: none; }
          .insight-card:hover .insight-panel { transform: none; }
        }
      `,
        }}
      />
    </section>
  )
}
