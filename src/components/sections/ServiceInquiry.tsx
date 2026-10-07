'use client'
import { useTranslations } from 'next-intl'
import { useState, type FormEvent } from 'react'
import { Tappable } from '@/components/ui/tappable'

// Light contact card shown in the right column of a service detail page -
// styled after the old site's "Sazinieties ar mums" form. The dark Contact
// section is kept for full-width page footers; this one sits inside content.
export default function ServiceInquiry({ serviceName }: { serviceName: string }) {
  const t = useTranslations('contact')
  const form = useTranslations('contact.form')
  const detail = useTranslations('services.detail')

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const phone = String(data.get('phone') || '')
    const message = String(data.get('message') || '')

    const subject = `Pieprasījums: ${serviceName}`
    const body = [
      `Pakalpojums: ${serviceName}`,
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

  return (
    <aside className="svc-inquiry">
      <div className="svc-inquiry-head">{detail('formHeading')}</div>
      <form className="svc-inquiry-body" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder={form('namePlaceholder')} required />
        <input name="email" type="email" placeholder={form('emailPlaceholder')} required />
        <input name="phone" type="tel" placeholder={form('phonePlaceholder')} />
        <textarea name="message" rows={5} placeholder={form('messagePlaceholder')} required />
        <Tappable>
          <button type="submit">{form('submit')}</button>
        </Tappable>
        {submitted && <p className="svc-inquiry-success">{form('success')}</p>}
      </form>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .svc-inquiry {
          border: 1px solid var(--color-parchment-rule);
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 24px 50px -34px rgba(12,10,7,0.3);
        }
        .svc-inquiry-head {
          background: #001d20;
          color: #fff;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.01em;
          padding: 18px 22px;
        }
        .svc-inquiry-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 22px;
        }
        .svc-inquiry-body input,
        .svc-inquiry-body textarea {
          width: 100%;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--color-ink-black);
          background: #fff;
          border: 1px solid rgba(12,10,7,0.15);
          border-radius: 9px;
          padding: 12px 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .svc-inquiry-body textarea { resize: vertical; }
        .svc-inquiry-body input:focus,
        .svc-inquiry-body textarea:focus {
          border-color: var(--color-gilt);
          box-shadow: 0 0 0 3px rgba(197,160,89,0.18);
        }
        .svc-inquiry-body button {
          margin-top: 4px;
          background: var(--color-gilt);
          color: #fff;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          padding: 13px 20px;
          cursor: pointer;
        }
        .svc-inquiry-success {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--color-gilt);
          margin: 0;
        }
      `,
        }}
      />
    </aside>
  )
}
