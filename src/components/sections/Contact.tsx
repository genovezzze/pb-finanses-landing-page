'use client'
import { useTranslations } from 'next-intl'
import { useState, type FormEvent } from 'react'
import { Reveal } from '@/components/ui/reveal'

export default function Contact() {
  const t = useTranslations('contact')
  const labels = useTranslations('contact.labels')
  const form = useTranslations('contact.form')

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const phone = String(data.get('phone') || '')
    const message = String(data.get('message') || '')

    const subject = `Pieprasījums no ${name || 'mājaslapas'}`
    const body = [
      `Vārds: ${name}`,
      `E-pasts: ${email}`,
      phone ? `Tālrunis: ${phone}` : null,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${t('email')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 2,
    padding: '12px 14px',
    color: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  } as const

  return (
    <section
      id="contact"
      className="section-gap"
      style={{ background: 'var(--color-ink-black)', color: '#fff' }}
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
          {/* Left */}
          <Reveal variant="left">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 4vw, 56px)',
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              {t('title')}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.65,
                maxWidth: 400,
                marginBottom: 36,
              }}
            >
              {t('body')}
            </p>

            {/* Phone + address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {labels('phone')}
                </div>
                <a
                  href={`tel:${t('phone').replace(/\s/g, '')}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 18,
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                  }}
                >
                  {t('phone')}
                </a>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {labels('address')}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  {t('address')}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right: contact form */}
          <Reveal variant="right" delay={0.1}>
            {submitted ? (
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  color: 'var(--color-gilt)',
                  lineHeight: 1.4,
                }}
              >
                {form('success')}
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder={form('namePlaceholder')}
                  className="contact-input"
                  style={inputStyle}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={form('emailPlaceholder')}
                  className="contact-input"
                  style={inputStyle}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder={form('phonePlaceholder')}
                  className="contact-input"
                  style={inputStyle}
                />
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={form('messagePlaceholder')}
                  className="contact-input"
                  style={{ ...inputStyle, resize: 'vertical' as const }}
                />
                <button type="submit" className="contact-cta btn-teal" style={{
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  alignSelf: 'flex-start',
                }}>
                  {form('submit')}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .contact-cta:hover {
          background: var(--color-gilt-dark);
          transform: translateY(-2px);
        }
        .contact-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .contact-input:focus {
          border-color: var(--color-gilt) !important;
        }
        @media (max-width: 768px) {
          #contact .section-wrap > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `,
        }}
      />
    </section>
  )
}
