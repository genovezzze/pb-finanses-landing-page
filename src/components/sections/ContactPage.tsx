'use client'

import { useTranslations } from 'next-intl'
import { useState, type FormEvent } from 'react'

/**
 * Contacts page, modelled on the Numeri layout: a light two-column block with
 * the map + firm details on one side and the enquiry form on the other, plus a
 * details strip (hours, phone, e-mail, registration).
 *
 * The form posts to /api/lead (funnel: contact) so enquiries land in Brevo
 * alongside the other funnels, instead of opening a mail client.
 */

const MAP_QUERY = 'Lielais prospekts 54-9, Ventspils, LV-3601'

export default function ContactPage() {
  const t = useTranslations('contact')
  const form = useTranslations('contact.form')

  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: String(data.get('name') || ''),
          company: String(data.get('company') || ''),
          email: String(data.get('email') || ''),
          phone: String(data.get('phone') || ''),
          message: String(data.get('message') || ''),
          funnel: 'contact',
        }),
      })
      const json = await res.json().catch(() => ({ ok: false }))
      if (!res.ok || !json.ok) throw new Error(json.error || 'failed')
      setDone(true)
    } catch {
      setError('Neizdevās nosūtīt. Lūdzu, mēģini vēlreiz vai zvani +371 29 716 434.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="ck">
      <div className="section-wrap">
        <h1 className="ck-title">Kontakti</h1>

        <div className="ck-grid">
          {/* Left: map + details */}
          <div className="ck-info">
            <div className="ck-map">
              <iframe
                title="PB Finanses birojs"
                src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="ck-details">
              <div className="ck-detail">
                <span className="ck-detail-label">Darba laiks</span>
                <span className="ck-detail-value">Darba dienās: 09:00 - 17:00</span>
                <span className="ck-detail-sub">Brīvdienās slēgts</span>
              </div>

              <div className="ck-detail">
                <span className="ck-detail-label">{t('labels.phone')}</span>
                <a className="ck-detail-value ck-link" href={`tel:${t('phone').replace(/\s/g, '')}`}>
                  {t('phone')}
                </a>
              </div>

              <div className="ck-detail">
                <span className="ck-detail-label">{t('labels.email')}</span>
                <a className="ck-detail-value ck-link" href={`mailto:${t('email')}`}>
                  {t('email')}
                </a>
              </div>

              <div className="ck-detail">
                <span className="ck-detail-label">{t('labels.address')}</span>
                <span className="ck-detail-value">{t('address')}</span>
              </div>

              <div className="ck-detail">
                <span className="ck-detail-label">Rekvizīti</span>
                <span className="ck-detail-value">SIA &ldquo;PB Finanses&rdquo;</span>
                <span className="ck-detail-sub">Reģ. Nr. 41203042116 · PVN LV41203042116</span>
                <span className="ck-detail-sub">Licencēts grāmatvedis: VID licence Nr. AGL0000018</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="ck-form-wrap">
            {done ? (
              <div className="ck-thanks">
                <span className="ck-thanks-mark">✓</span>
                <p>Paldies! Saņēmām jūsu pieprasījumu un sazināsimies tuvākajā laikā.</p>
              </div>
            ) : (
              <form className="ck-form" onSubmit={handleSubmit}>
                <input name="name" required placeholder={form('namePlaceholder')} className="ck-input" />
                <input name="email" type="email" required placeholder={form('emailPlaceholder')} className="ck-input" />
                <input name="phone" type="tel" placeholder={form('phonePlaceholder')} className="ck-input" />
                <input name="company" placeholder="Uzņēmuma nosaukums" className="ck-input" />
                <textarea name="message" required rows={4} placeholder={form('messagePlaceholder')} className="ck-input ck-textarea" />
                <button type="submit" className="ck-submit" disabled={submitting}>
                  {submitting ? 'Sūta...' : form('submit')}
                </button>
                {error && <p className="ck-error">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ck {
          background: var(--color-canvas-white);
          padding: clamp(28px, 4vw, 56px) 0 clamp(40px, 5vw, 72px);
        }
        .ck-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(24px, 2.4vw, 34px);
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--color-ink-black);
          margin-bottom: 28px;
        }
        .ck-lead {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-graphite);
          max-width: 58ch;
          margin-bottom: 28px;
        }
        .ck-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }

        .ck-map {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--color-parchment-rule);
          margin-bottom: 20px;
          background: var(--color-linen-tint);
        }
        .ck-map iframe { width: 100%; height: 100%; border: 0; display: block; }

        .ck-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 24px;
        }
        .ck-detail { display: flex; flex-direction: column; gap: 3px; }
        .ck-detail-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gilt);
          margin-bottom: 2px;
        }
        .ck-detail-value {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--color-ink-black);
          text-decoration: none;
        }
        .ck-detail-sub {
          font-family: var(--font-body);
          font-size: 12px;
          line-height: 1.4;
          color: var(--color-stone);
        }
        .ck-link { transition: color 0.2s ease; }
        .ck-link:hover { color: var(--color-gilt); }

        .ck-form-wrap {
          background: var(--color-linen-tint);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 16px;
          padding: clamp(18px, 2.4vw, 28px);
        }
        .ck-form { display: flex; flex-direction: column; gap: 10px; }
        .ck-input {
          width: 100%;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--color-ink-black);
          background: var(--color-canvas-white);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 10px;
          padding: 10px 13px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .ck-input::placeholder { color: var(--color-stone); }
        .ck-input:focus { border-color: var(--color-gilt); }
        .ck-textarea { resize: vertical; min-height: 88px; }
        .ck-submit {
          margin-top: 3px;
          align-self: flex-start;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          background: var(--color-gilt);
          border: none;
          border-radius: 10px;
          padding: 12px 22px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .ck-submit:hover:not(:disabled) { background: var(--color-gilt-dark); transform: translateY(-2px); }
        .ck-submit:disabled { opacity: 0.6; cursor: default; }
        .ck-error { font-family: var(--font-body); font-size: 13px; color: #a13636; }

        .ck-thanks { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; }
        .ck-thanks-mark {
          display: inline-flex; align-items: center; justify-content: center;
          width: 48px; height: 48px; border-radius: 999px;
          background: var(--color-gilt); color: #fff; font-size: 26px;
        }
        .ck-thanks p {
          font-family: var(--font-body); font-size: 16px; line-height: 1.6;
          color: var(--color-ink-black);
        }

        @media (max-width: 860px) {
          .ck-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 480px) {
          .ck-details { grid-template-columns: 1fr; }
        }
      `,
        }}
      />
    </section>
  )
}
