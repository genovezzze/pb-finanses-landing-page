'use client'
import { useTranslations } from 'next-intl'
import { TestimonialsColumn, type Testimonial } from '@/components/ui/testimonials-columns-1'
import { Reveal } from '@/components/ui/reveal'

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const items = t.raw('items') as Testimonial[]

  const firstColumn = items.slice(0, 2)
  const secondColumn = items.slice(2, 4)

  return (
    <section
      className="section-gap"
      style={{ background: 'var(--color-linen-tint)' }}
    >
      <div className="section-wrap">
        {/* Header */}
        <Reveal variant="blur">
          <div style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
              }}
            >
              {t('title')}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                fontStyle: 'italic',
                color: 'var(--color-stone)',
                marginTop: 6,
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
            duration={22}
          />
        </div>
      </div>
    </section>
  )
}
