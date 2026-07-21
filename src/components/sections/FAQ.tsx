'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Reveal } from '@/components/ui/reveal'

export default function FAQ() {
  const t = useTranslations('faq')
  const items = t.raw('items') as Array<{ q: string; a: string }>
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="section-gap"
      style={{ background: 'var(--color-canvas-white)' }}
    >
      <div className="section-wrap" style={{ maxWidth: 800 }}>
        <Reveal variant="up">
          <div
            style={{
              marginBottom: 32,
              paddingBottom: 18,
              borderBottom: '1px solid var(--color-parchment-rule)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.2vw, 40px)',
                color: 'var(--color-ink-black)',
                letterSpacing: '-0.02em',
              }}
            >
              {t('title')}
            </h2>
          </div>
        </Reveal>

        <div>
          {items.map((item, i) => {
            const isOpen = i === openIndex
            return (
              <Reveal variant="up" delay={i * 0.05} key={item.q}>
                <div
                  style={{
                    borderBottom: '1px solid var(--color-parchment-rule)',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        fontSize: 18,
                        color: isOpen ? 'var(--color-gilt)' : 'var(--color-ink-black)',
                        lineHeight: 1.35,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.q}
                    </span>
                  </button>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.3s ease',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 15,
                          color: 'var(--color-graphite)',
                          lineHeight: 1.65,
                          paddingBottom: 20,
                          maxWidth: 680,
                        }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
