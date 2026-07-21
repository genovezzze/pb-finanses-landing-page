'use client'
import { useTranslations } from 'next-intl'
import { TestimonialsColumn, type Testimonial } from '@/components/ui/testimonials-columns-1'
import { Reveal } from '@/components/ui/reveal'

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const items = t.raw('items') as Testimonial[]

  const firstColumn = items.slice(0, 3)
  const secondColumn = items.slice(3, 6)
  const thirdColumn = items.slice(6, 8)

  return (
    <section
      className="section-gap"
      style={{ background: 'var(--color-linen-tint)' }}
    >
      <div className="section-wrap">
        {/* Header */}
        <Reveal variant="blur">
          <div className="flex flex-col items-center text-center max-w-[560px] mx-auto" style={{ marginBottom: 48 }}>
            <span
              className="inline-flex items-center gap-2"
              style={{
                border: '1.5px solid var(--color-gilt)',
                borderRadius: 100,
                padding: '7px 18px 7px 14px',
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-gilt)',
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              {t('eyebrow')}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(34px, 4.4vw, 52px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginTop: 20,
              }}
            >
              {t('title')}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                color: 'var(--color-stone)',
                marginTop: 14,
              }}
            >
              {t('subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Scrolling testimonial columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={25}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={21}
          />
        </div>
      </div>
    </section>
  )
}
