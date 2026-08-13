import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

// Article art. Deliberately thematic rather than portraits of the team — these
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

export default function Insights() {
  const t = useTranslations('insights')
  const items = t.raw('items') as Item[]

  const [featured, ...rest] = items

  return (
    <section
      id="insights"
      style={{ background: 'var(--color-linen-tint)', padding: '52px 0 56px' }}
    >
      <div className="section-wrap">
        {/* Header */}
        <Reveal variant="scale">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 22,
              paddingBottom: 14,
              borderBottom: '1px solid var(--color-parchment-rule)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(26px, 3vw, 36px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
              }}
            >
              {t('title')}
            </h2>
            <a href="#" className="insights-all">
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
          font-size: 13px;
          font-weight: 500;
          color: var(--color-gilt);
          text-decoration: none;
          white-space: nowrap;
        }
        .insights-all:hover { text-decoration: underline; }

        .insights-layout {
          display: grid;
          grid-template-columns: 1.02fr 1fr;
          gap: 14px;
          align-items: stretch;
        }
        .insight-feature-wrap { height: 100%; }
        .insight-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 1fr;
          gap: 14px;
        }
        .insight-grid > * { min-width: 0; height: 100%; }

        /* The white panel is pulled up over the photo, so the image reads as a
           backdrop the card sits on rather than a banner stuck above it. */
        .insight-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-radius: 16px;
          background: var(--color-linen-tint);
          cursor: pointer;
        }
        .insight-media {
          position: relative;
          width: 100%;
          border-radius: 16px;
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
          border-radius: 16px;
          box-shadow: 0 10px 30px -18px rgba(12,10,7,0.28);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .insight-card:hover .insight-panel {
          transform: translateY(-6px);
          box-shadow: 0 26px 44px -22px rgba(12,10,7,0.34);
        }
        .insight-card:hover .insight-title { color: var(--color-gilt-dark); }

        .insight-tag {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.13em;
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
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-graphite);
        }
        .insight-meta {
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--color-gilt-dark);
          margin-top: auto;
        }
        .insight-meta span { opacity: 0.45; margin: 0 2px; }

        /* Featured */
        .insight-feature .insight-media {
          flex: 1;
          min-height: 190px;
        }
        .insight-feature .insight-panel {
          margin: -48px 18px 0;
          padding: 18px 22px 18px;
        }
        .insight-feature .insight-title {
          font-size: clamp(18px, 1.55vw, 21px);
          margin: 8px 0 9px;
        }
        .insight-feature .insight-meta { padding-top: 16px; }

        /* Small */
        .insight-small .insight-media { aspect-ratio: 16 / 9; }
        .insight-small .insight-panel {
          margin: -30px 11px 0;
          padding: 13px 15px 14px;
        }
        .insight-small .insight-title {
          font-size: 14.5px;
          margin: 7px 0 10px;
        }

        @media (max-width: 900px) {
          .insights-layout { grid-template-columns: 1fr; }
          .insight-feature .insight-media { min-height: 200px; aspect-ratio: 16 / 10; flex: none; }
        }
        @media (max-width: 560px) {
          .insight-grid { grid-template-columns: 1fr; }
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
