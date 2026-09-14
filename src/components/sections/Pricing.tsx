import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

type Plan = {
  name: string
  price: string
  priceSuffix: string
  priceNote: string
  body: string
  featured: boolean
  features: string[]
  fine: string
}
type Extra = { name: string; price: string }
type Term = { title: string; body: string }

const Tick = () => (
  <span className="tick" aria-hidden="true">
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path
        d="m2.5 7.4 3 3L11.5 4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)

/**
 * Pricing and terms. Published transparently on purpose: in outsourced
 * accounting almost nobody names a number before a meeting, so the two models,
 * the surcharge list and the working rules do more selling here than another
 * page of promises. The individual fixed fee stays out - it is quoted per
 * company once the document volume is known.
 */
export default function Pricing() {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const plans = t.raw('plans') as Plan[]
  const included = t.raw('included') as string[]
  const extras = t.raw('extras') as Extra[]
  const terms = t.raw('terms') as Term[]

  return (
    <section id="pricing" className="section-gap pricing">
      <div className="section-wrap">
        {/* Header, centred over the cards the way a price table expects */}
        <Reveal variant="blur">
          <div className="pricing-head">
            <p className="eyebrow pricing-eyebrow">{t('eyebrow')}</p>
            <h2 className="pricing-title">{t('title')}</h2>
            <p className="pricing-subtitle">{t('subtitle')}</p>
          </div>
        </Reveal>

        {/* The two contract models */}
        <div className="pricing-plans">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} variant="up" duration={0.5} delay={i * 0.08}>
              <div className={`plan${plan.featured ? ' is-featured' : ''}`}>
                <div className="plan-head">
                  <h3 className="plan-name">{plan.name}</h3>
                  {plan.featured && <span className="plan-flag">{t('badge')}</span>}
                </div>

                <p className="plan-price">
                  {plan.price}
                  <span className="plan-per">{plan.priceSuffix || plan.priceNote}</span>
                </p>

                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Tick />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="plan-fine">{plan.fine}</p>

                <Link href={`/${locale}/kontakti`} className="plan-link">
                  {t('cta')} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* What both models cover, and what is billed on top */}
        <div className="pricing-columns">
          <Reveal variant="up" duration={0.5}>
            <div className="pricing-col">
              <h3 className="pricing-col-title">{t('includedTitle')}</h3>
              <ul className="included-list">
                {included.map((item) => (
                  <li key={item}>
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="up" duration={0.5} delay={0.08}>
            <div className="pricing-col">
              <h3 className="pricing-col-title">{t('extrasTitle')}</h3>
              <dl className="extras-list">
                {extras.map((extra) => (
                  <div key={extra.name} className="extra-row">
                    <dt>{extra.name}</dt>
                    <dd>{extra.price}</dd>
                  </div>
                ))}
              </dl>
              <p className="extras-note">{t('extrasNote')}</p>
            </div>
          </Reveal>
        </div>

        {/* The rules of the engagement - the questions clients ask anyway */}
        <Reveal variant="up" duration={0.5}>
          <h3 className="terms-title">{t('termsTitle')}</h3>
        </Reveal>
        <div className="terms-grid">
          {terms.map((term, i) => (
            <Reveal key={term.title} variant="up" duration={0.45} delay={i * 0.05}>
              <div className="term">
                <span className="term-num">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="term-title">{term.title}</h4>
                <p className="term-body">{term.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" duration={0.45}>
          <p className="pricing-cta-note">{t('ctaNote')}</p>
        </Reveal>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pricing { background: var(--color-canvas-white); }

        .pricing-head {
          max-width: 660px;
          margin: 0 0 56px;
          text-align: left;
        }
        .pricing-eyebrow { margin-bottom: 18px; }
        .pricing-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(36px, 4.2vw, 54px);
          color: var(--color-ink-black);
          letter-spacing: -0.025em;
          line-height: 1.08;
        }
        .pricing-subtitle {
          margin-top: 16px;
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.6;
          color: var(--color-stone);
        }

        /* Two models side by side as plain typography: no boxes, just a rule
           between the columns. Boxed cards were pulling more weight than the
           choice deserves - there are two models, not two products. */
        .pricing-plans {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0 56px;
          align-items: start;
          margin: 0 0 48px;
        }
        .plan {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .pricing-plans > *:last-child .plan {
          padding-left: 56px;
          border-left: 1px solid var(--color-parchment-rule);
          margin-left: -56px;
        }
        .plan-head {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }
        .plan-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 17px;
          letter-spacing: -0.01em;
          color: var(--color-ink-black);
        }
        .plan-flag {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gilt);
        }
        .plan-price {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 3.4vw, 42px);
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--color-ink-black);
        }
        .plan-per {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0;
          color: var(--color-stone);
        }
        .plan-features {
          list-style: none;
          margin-top: 18px;
        }
        .plan-features li,
        .included-list li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--color-graphite);
          padding: 6px 0;
        }
        .tick {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          margin-top: 1px;
          border-radius: 999px;
          background: rgba(35, 110, 116, 0.10);
          color: var(--color-gilt);
        }
        .plan-fine {
          margin-top: 14px;
          font-family: var(--font-body);
          font-size: 12px;
          line-height: 1.55;
          color: var(--color-stone);
        }
        .plan-link {
          margin-top: 18px;
          align-self: flex-start;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--color-gilt);
          text-decoration: none;
          border-bottom: 1px solid rgba(35, 110, 116, 0.35);
          padding-bottom: 2px;
          transition: border-color 0.2s ease;
        }
        .plan-link span {
          display: inline-block;
          margin-left: 6px;
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .plan-link:hover { border-bottom-color: var(--color-gilt); }
        .plan-link:hover span { transform: translateX(4px); }
        .plan-fine + .plan-link { margin-top: 18px; }
        @media (prefers-reduced-motion: reduce) {
          .plan-link, .plan-link span { transition: none; }
        }

        .pricing-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 56px;
          margin-bottom: 56px;
        }
        .pricing-col-title,
        .terms-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.01em;
          color: var(--color-ink-black);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--color-parchment-rule);
        }
        .included-list { list-style: none; }

        .extras-list { display: block; }
        .extra-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding: 11px 0;
          border-bottom: 1px dashed var(--color-parchment-rule);
        }
        .extra-row dt {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.5;
          color: var(--color-graphite);
        }
        .extra-row dd {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14.5px;
          letter-spacing: -0.01em;
          color: var(--color-ink-black);
          text-align: right;
          white-space: nowrap;
        }
        .extras-note {
          margin-top: 16px;
          font-family: var(--font-body);
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--color-stone);
        }

        .terms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px 40px;
        }
        .term-num {
          display: block;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.02em;
          color: var(--color-gilt);
          opacity: 0.55;
          margin-bottom: 8px;
        }
        .term-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.01em;
          color: var(--color-ink-black);
          margin-bottom: 8px;
        }
        .term-body {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.62;
          color: var(--color-graphite);
        }

        .pricing-cta-note {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid var(--color-parchment-rule);
          font-family: var(--font-display);
          font-size: 15px;
          font-style: italic;
          color: var(--color-stone);
          text-align: center;
        }

        @media (max-width: 1024px) {
          .terms-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 860px) {
          .pricing-plans { grid-template-columns: 1fr; gap: 32px; }
          .pricing-plans > *:last-child .plan {
            padding-left: 0;
            margin-left: 0;
            border-left: none;
            padding-top: 32px;
            border-top: 1px solid var(--color-parchment-rule);
          }
          .pricing-columns { grid-template-columns: 1fr; gap: 40px; }
          .terms-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `,
        }}
      />
    </section>
  )
}
