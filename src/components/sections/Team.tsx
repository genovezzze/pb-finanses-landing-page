'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

type Person = {
  name: string
  role: string
  city: string
  phone: string
  photo?: string
  quick?: string
}

/**
 * The team. Names and roles are real; `quick` describes the role rather than the
 * person, so nothing is claimed about an individual that has not been confirmed.
 * Portraits: drop a square photo under /images/team/ and add `photo` - without
 * it the card falls back to a monogram tile, since an empty frame would read as
 * a broken image. The phone is the office line, the same for everyone.
 */
const OFFICE_PHONE = '+371 29716434'
// Placeholder until the direct numbers are confirmed; rendered as plain text
// rather than a tel: link, so nobody dials a number that does not exist.
const PHONE_TBD = '+371 xxxxxxxx'
const CITY = 'Ventspils, Latvija'

const PEOPLE: Person[] = [
  {
    name: 'Agnese Pastare',
    role: 'Uzņēmuma vadītāja',
    city: CITY,
    phone: OFFICE_PHONE,
    quick: 'Finanšu vadība, nodokļu stratēģija un sarežģītas uzņēmumu struktūras',
  },
  {
    name: 'Olga Mihelsone',
    role: 'Galvenā grāmatvede',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Gada pārskati, uzskaites politika un sarežģīti darījumi',
  },
  {
    name: 'Gunta Rasa',
    role: 'Grāmatvede',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Ikmēneša grāmatvedība, nodokļu atskaites un saziņa ar VID',
  },
  {
    name: 'Krista Kalniņa',
    role: 'Grāmatvede',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Ikmēneša grāmatvedība, nodokļu atskaites un saziņa ar VID',
  },
  {
    name: 'Tatjana Suzdaleva',
    role: 'Grāmatvede',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Ikmēneša grāmatvedība, nodokļu atskaites un saziņa ar VID',
  },
  {
    name: 'Daiga Zvejniece',
    role: 'Grāmatvede',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Ikmēneša grāmatvedība, nodokļu atskaites un saziņa ar VID',
  },
  {
    name: 'Eva Šmideberga',
    role: 'Grāmatvede',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Ikmēneša grāmatvedība, nodokļu atskaites un saziņa ar VID',
  },
  {
    name: 'Ieva Pētersone-Kalmane',
    role: 'Grāmatveža palīdze',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Pirmdokumentu apstrāde un dokumentu aprite',
  },
  {
    name: 'Alise Krista Asare',
    role: 'Grāmatveža palīdze',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Pirmdokumentu apstrāde un dokumentu aprite',
  },
  {
    name: 'Artemijs Mihails Lučins',
    role: 'Projekta vadītājs attīstības jautājumos',
    city: CITY,
    phone: PHONE_TBD,
    quick: 'Attīstības projekti un procesu digitalizācija',
  },
]

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('')

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 14.5S13 10.4 13 6.5a5 5 0 1 0-10 0C3 10.4 8 14.5 8 14.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="8" cy="6.4" r="1.8" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="4.5" y="1.5" width="7" height="13" rx="1.8" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 12.3h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const ExpandIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M9.5 2.5H13.5V6.5M6.5 13.5H2.5V9.5M13.5 2.5 9 7M2.5 13.5 7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Team() {
  const t = useTranslations('team')
  const locale = useLocale()

  return (
    <section id="team" className="section-gap team">
      <div className="section-wrap">
        <Reveal variant="blur" duration={0.5}>
          <div className="team-head">
            <div>
              <p className="eyebrow team-eyebrow">{t('eyebrow')}</p>
              <h2 className="team-title">{t('title')}</h2>
            </div>
          </div>

          <p className="team-intro">{t('intro')}</p>
        </Reveal>

        <div className="team-track">
          {PEOPLE.map((person, i) => (
            <Reveal
              key={`${person.name}-${i}`}
              variant="up"
              duration={0.45}
              delay={(i % 4) * 0.06}
              className="team-cell"
            >
            <article className="person">
              <div className="person-media">
                {person.photo ? (
                  <img src={person.photo} alt={person.name} className="person-photo" />
                ) : (
                  <span className="person-monogram" aria-hidden="true">{initials(person.name)}</span>
                )}
              </div>

              <div className="person-body">
                <p className="person-role">{person.role}</p>

                <Link href={`/${locale}/kontakti`} className="person-name">
                  <span className="person-name-text">{person.name}</span>
                  <span className="person-name-arrow" aria-hidden="true">&#8594;</span>
                </Link>

                <p className="person-meta">
                  <span className="person-icon"><PinIcon /></span>
                  {person.city}
                </p>
                {person.phone.includes('x') ? (
                  <p className="person-meta">
                    <span className="person-icon"><PhoneIcon /></span>
                    {person.phone}
                  </p>
                ) : (
                  <a className="person-meta is-link" href={`tel:${person.phone.replace(/\s/g, '')}`}>
                    <span className="person-icon"><PhoneIcon /></span>
                    {person.phone}
                  </a>
                )}

                {person.quick && (
                  <details className="person-quick">
                    <summary>
                      <span className="person-icon"><ExpandIcon /></span>
                      Ātrais skatījums
                    </summary>
                    <p>{person.quick}</p>
                  </details>
                )}
              </div>
            </article>
            </Reveal>
          ))}
        </div>

        <p className="team-note">{t('note')}</p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .team { background: var(--color-canvas-white); }
        .team-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
        }
        .team-eyebrow { margin-bottom: 16px; }
        .team-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 3.6vw, 46px);
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--color-ink-black);
        }
        .team-intro {
          margin-top: 14px;
          max-width: 62ch;
          font-family: var(--font-body);
          font-size: 15.5px;
          line-height: 1.6;
          color: var(--color-stone);
        }

        .team-views { display: flex; gap: 8px; flex-shrink: 0; }
        .team-view {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid var(--color-parchment-rule);
          background: var(--color-canvas-white);
          color: var(--color-stone);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .team-view:hover { color: var(--color-gilt); border-color: var(--color-gilt); }
        .team-view:hover:not(:disabled) {
          background: var(--color-gilt);
          border-color: var(--color-gilt);
          color: var(--color-canvas-white);
        }
        .team-view:disabled { opacity: 0.32; cursor: default; }
        .team-view span { font-size: 17px; line-height: 1; }

        /* All members visible at once as a matrix: a responsive grid that fits
           as many compact cards per row as the width allows and wraps the rest. */
        .team-track {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 30px;
          padding: 4px;
        }
        /* The reveal wrapper is the grid cell now; make it stretch so the card
           inside keeps equal height across a row. */
        .team-cell { display: flex; }
        .team-cell > .person { width: 100%; }
        @media (max-width: 1024px) {
          .team-track { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 720px) {
          .team-track { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 460px) {
          .team-track { grid-template-columns: 1fr; }
        }

        /* Card as on the reference: a soft grey shell holding the portrait,
           with a white panel inset over the photograph's lower edge. The panel
           is what carries the text, so the picture never has to fight it. */
        .person {
          display: flex;
          flex-direction: column;
          border-radius: 18px;
          background: var(--color-linen-tint);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .person:hover {
          transform: translateY(-4px);
          box-shadow: 0 26px 44px -28px rgba(12,10,7,0.28);
        }
        .person-media {
          position: relative;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          border-radius: 18px 18px 0 0;
          overflow: hidden;
        }
        .person-photo { width: 100%; height: 100%; object-fit: cover; display: block; }
        .person-monogram {
          margin-bottom: 20px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 36px;
          letter-spacing: -0.02em;
          color: var(--color-gilt);
          opacity: 0.4;
        }

        .person-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
          margin: -22px 8px 8px;
          padding: 16px 16px 16px;
          border-radius: 14px;
          background: var(--color-canvas-white);
          box-shadow: 0 14px 30px -22px rgba(12,10,7,0.30);
        }
        .person-role {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-stone);
          line-height: 1.45;
          min-height: 42px;
        }
        .person-name {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 5px 0 12px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.01em;
          line-height: 1.25;
          color: var(--color-gilt);
          text-decoration: none;
        }
        .person-name-text { flex: 1; }
        .person-name-arrow {
          flex-shrink: 0;
          font-size: 16px;
          line-height: 1;
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .person-name:hover .person-name-arrow { transform: translateX(4px); }

        .person-meta {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 4px 0;
          font-family: var(--font-body);
          font-size: 12.5px;
          color: var(--color-graphite);
          text-decoration: none;
        }
        .person-meta.is-link:hover { color: var(--color-gilt); }
        /* Filled badges, not tinted ones: at 24px an outline reads as noise. */
        .person-icon {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 999px;
          background: var(--color-gilt);
          color: var(--color-canvas-white);
        }

        /* Quick view as a native <details>: it opens without JavaScript, keeps
           its own state per card and is reachable from the keyboard. */
        .person-quick { margin-top: auto; padding-top: 20px; }
        .person-quick summary {
          display: flex;
          align-items: center;
          gap: 10px;
          list-style: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--color-graphite);
          transition: color 0.2s ease;
        }
        .person-quick summary::-webkit-details-marker { display: none; }
        .person-quick summary:hover { color: var(--color-gilt); }
        .person-quick summary .person-icon {
          background: transparent;
          border: 1px solid var(--color-parchment-rule);
          color: var(--color-graphite);
        }
        .person-quick summary:hover .person-icon {
          border-color: var(--color-gilt);
          color: var(--color-gilt);
        }
        .person-quick p {
          margin-top: 10px;
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.55;
          color: var(--color-stone);
        }

        .team-note {
          margin-top: 24px;
          font-family: var(--font-display);
          font-style: italic;
          font-size: 14.5px;
          color: var(--color-stone);
        }

        @media (prefers-reduced-motion: reduce) {
          .person, .person-name-arrow, .team-view { transition: none; }
          .person:hover { transform: none; }
        }
        @media (max-width: 820px) {
          .team-head { flex-direction: column; align-items: flex-start; gap: 18px; }
        }
        @media (max-width: 560px) {
          .person { flex-basis: 78vw; }
        }
      `,
        }}
      />
    </section>
  )
}
