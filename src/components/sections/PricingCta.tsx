import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'
import { Tappable } from '@/components/ui/tappable'

/**
 * Stands in for the pricing block on the landing page now that the numbers live
 * on their own page. It names the models and the entry price rather than just
 * saying "see pricing" - the point of publishing a price is that the reader
 * learns something before they click.
 */
export default function PricingCta() {
  const t = useTranslations('pricingCta')
  const locale = useLocale()

  return (
    <section className="section-gap pricing-cta-band">
      <div className="section-wrap">
        <Reveal variant="up" duration={0.5}>
          <div className="pcb-inner">
            <div className="pcb-copy">
              <p className="eyebrow pcb-eyebrow">{t('eyebrow')}</p>
              <h2 className="pcb-title">{t('title')}</h2>
              <p className="pcb-body">{t('body')}</p>
            </div>

            <div className="pcb-actions">
              <Tappable>
                <Link href={`/${locale}/cenas`} className="pcb-button is-primary">
                  {t('button')}
                </Link>
              </Tappable>
              <Tappable>
                <Link href={`/${locale}/kontakti`} className="pcb-button is-secondary">
                  {t('secondary')}
                </Link>
              </Tappable>
            </div>
          </div>
        </Reveal>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pricing-cta-band { background: var(--color-canvas-white); }
        .pcb-inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 48px;
          padding: 34px 0 0;
          border-top: 1px solid var(--color-parchment-rule);
        }
        .pcb-copy { max-width: 620px; }
        .pcb-eyebrow { margin-bottom: 16px; }
        .pcb-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(26px, 3vw, 38px);
          letter-spacing: -0.025em;
          line-height: 1.12;
          color: var(--color-ink-black);
        }
        .pcb-body {
          margin-top: 14px;
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-stone);
        }
        .pcb-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .pcb-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 26px;
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .pcb-button:hover { opacity: 0.9; transform: translateY(-1px); }
        .pcb-button.is-primary {
          background: var(--color-gilt);
          color: var(--color-canvas-white);
        }
        .pcb-button.is-secondary {
          border: 1px solid var(--color-gilt);
          color: var(--color-gilt);
        }
        @media (prefers-reduced-motion: reduce) {
          .pcb-button { transition: none; }
        }
        @media (max-width: 900px) {
          .pcb-inner { flex-direction: column; align-items: flex-start; gap: 26px; }
          .pcb-actions { width: 100%; }
          .pcb-button { flex: 1 1 auto; }
        }
      `,
        }}
      />
    </section>
  )
}
