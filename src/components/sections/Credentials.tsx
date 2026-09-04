import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

type Item = { tag: string; caption: string }

// Marks keyed by the item's tag: the artwork belongs in the code, the words
// stay in the translations. Sources: klutparbiedru.ltrk.lv (official line-art
// emblem on transparency) and the Rotary Brand Center masterbrand signature.
const EMBLEMS: Record<string, { src: string; alt: string }> = {
  LTRK: { src: '/images/logos/ltrk.png', alt: 'Latvijas Tirdzniecibas un rupniecibas kamera' },
  ROTARY: { src: '/images/logos/rotary.svg', alt: 'Rotary' },
}

/**
 * Licence and membership marks: a row of emblems with a caption under each,
 * the way accreditation is shown across this trade - the reader scans the marks
 * first and only then reads what they stand for.
 *
 * The VID licence has no public emblem to borrow, and state heraldry is not
 * ours to reproduce, so it is drawn as a typographic certificate plate rather
 * than faked as a scan. Plain <img> rather than next/image: one mark is an SVG,
 * which the image optimiser refuses without loosening the config for the whole
 * site.
 */
export default function Credentials() {
  const t = useTranslations('credentials')
  const items = t.raw('items') as Item[]

  return (
    <section className="credentials">
      <div className="section-wrap">
        <div className="credentials-grid">
          {items.map((item, i) => {
            const emblem = EMBLEMS[item.tag]
            return (
              <Reveal key={item.tag} variant="up" duration={0.5} delay={i * 0.07}>
                <article className="credential">
                  <div className="credential-mark">
                    {emblem ? (
                      <img className="credential-emblem" src={emblem.src} alt={emblem.alt} />
                    ) : (
                      <span className="credential-plate">
                        <span className="credential-plate-top">Licencēts</span>
                        <span className="credential-plate-main">AGL0000018</span>
                        <span className="credential-plate-rule" aria-hidden="true" />
                        <span className="credential-plate-bottom">VID · Nr. 18</span>
                      </span>
                    )}
                  </div>

                  <p className="credential-caption">{item.caption}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .credentials {
          background: var(--color-canvas-white);
          padding: 0 0 64px;
        }
        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px 20px;
          max-width: 840px;
          margin: 0 auto;
        }
        .credential { text-align: center; }
        /* One fixed row height for the marks, so a wide lockup, a square logo
           and a plate still leave their captions on the same line. */
        .credential-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 104px;
          margin-bottom: 18px;
        }
        .credential-emblem {
          max-width: 190px;
          max-height: 88px;
          width: auto;
          height: auto;
        }
        .credential-plate {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          min-width: 188px;
          padding: 14px 24px;
          border: 1px solid rgba(35, 110, 116, 0.38);
          border-radius: 12px;
          background: var(--color-canvas-white);
        }
        .credential-plate-top,
        .credential-plate-bottom {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-stone);
        }
        .credential-plate-main {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 24px;
          letter-spacing: 0.02em;
          color: var(--color-gilt);
        }
        .credential-plate-rule {
          width: 44px;
          height: 1px;
          margin: 4px 0 2px;
          background: rgba(35, 110, 116, 0.35);
        }

        /* Same chip as the stat and section labels, but these captions run to
           two or three lines: a 999px radius would blow the side caps out into
           half-circles, so the family keeps its shape at a fixed 20px. */
        .credential-caption {
          display: inline-block;
          max-width: 34ch;
          padding: 12px 20px;
          border-radius: 20px;
          background: var(--color-linen-tint);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.5;
          color: var(--color-ink-black);
          text-align: center;
        }

        @media (max-width: 860px) {
          .credentials-grid { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 720px) {
          .credentials { padding: 0 0 48px; }
        }
      `,
        }}
      />
    </section>
  )
}
