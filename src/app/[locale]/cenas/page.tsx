import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import Pricing from '@/components/sections/Pricing'
import Contact from '@/components/sections/Contact'
import { Tappable } from '@/components/ui/tappable'

const SITE_URL = 'https://www.pbfinanses.lv'

// The route slug stays Latvian on every locale: one URL for the page keeps the
// links people share working whichever language they read it in.
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'pricing' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/cenas`,
      languages: {
        lv: '/lv/cenas',
        en: '/en/cenas',
        ru: '/ru/cenas',
        'x-default': '/lv/cenas',
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/cenas`,
      siteName: 'PB Finanses',
      type: 'website',
    },
  }
}

export default function PricingPage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  return (
    <main>
      {/* Wide banner under the navbar, same pattern as the Par mums page. */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(96px, 11vw, 150px)',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/481015454_1556450015297497_8823412931938160365_n.jpg"
          alt="PB Finanses"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 55%', transform: 'scale(1.6)' }}
        />
      </div>

      <Pricing />

      {/* Consultation explainer: readable copy on the left, the vertical
          (9:16) video on the right - read it or watch it. Poster is a
          placeholder until the real thumbnail lands at
          /images/konsultacija-thumb.jpg. */}
      <section className="konsult">
        <div className="section-wrap konsult-grid">
          <div className="konsult-text">
            <p className="eyebrow">Konsultācija</p>
            <h2 className="konsult-title">Pieteikties konsultācijai</h2>
            <p>
              Mūsu konsultācija nav bezmaksas - stundas likme ir 100 EUR (iespējamas atlaides).
              Taču ir veids, kā par to faktiski nemaksāt
            </p>
            <p>
              Ja pēc konsultācijas kļūstat par mūsu klientu un noslēdzat līgumu, kas ir spēkā vismaz
              vienu gadu, samaksāto konsultācijas maksu atgriežam kā atlaidi no pirmā rēķina par
              grāmatvedības pakalpojumiem
            </p>
            <p>
              Tātad, ja mūsu pakalpojumi jums šķiet piemēroti, konsultācija jums neizmaksā neko.
              Gribat pamēģināt - rakstiet uz info@pbfinanses.lv vai sazinieties sociālajos tīklos,
              un parunāsim
            </p>
            <Tappable>
              <Link href={`/${locale}/kontakti`} className="konsult-btn">
                Pieteikt konsultāciju <span aria-hidden="true">→</span>
              </Link>
            </Tappable>
          </div>

          <figure className="konsult-media">
            <video
              src="/videos/konsultacija.mp4"
              poster="/images/pb_finanses_konsultacija.svg"
              controls
              playsInline
              preload="metadata"
            />
            <figcaption className="konsult-caption">
              <span className="konsult-caption-play" aria-hidden="true">▶</span>
              Cik maksā mūsu konsultācija? <span className="konsult-caption-dim">1:26</span>
            </figcaption>
          </figure>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .konsult {
            background: var(--color-linen-tint);
            padding: clamp(40px, 6vw, 80px) 0;
          }
          .konsult-grid {
            display: grid;
            grid-template-columns: minmax(auto, 620px) auto;
            gap: clamp(40px, 6vw, 96px);
            align-items: stretch;
            justify-content: center;
            justify-items: start;
          }
          .konsult-title {
            font-family: var(--font-display);
            font-weight: 700;
            font-size: clamp(32px, 3.6vw, 48px);
            letter-spacing: -0.02em;
            line-height: 1.12;
            color: var(--color-ink-black);
            margin: 18px 0 24px;
          }
          .konsult-text p:not(.eyebrow) {
            font-family: var(--font-body);
            font-size: clamp(17px, 1.3vw, 20px);
            line-height: 1.75;
            color: var(--color-graphite);
            max-width: 60ch;
          }
          .konsult-text p:not(.eyebrow) + p { margin-top: 18px; }
          .konsult-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 24px;
            background: var(--color-gilt);
            color: #fff;
            font-family: var(--font-body);
            font-size: 15px;
            font-weight: 600;
            padding: 13px 24px;
            border-radius: 10px;
            text-decoration: none;
          }
          .konsult-media {
            justify-self: end;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            gap: 14px;
          }
          .konsult-media video {
            height: 100%;
            width: auto;
            max-height: 400px;
            aspect-ratio: 9 / 16;
            object-fit: cover;
            border-radius: 22px;
            background: #001d20;
            box-shadow: 0 34px 70px -32px rgba(12,10,7,0.45);
            display: block;
          }
          .konsult-caption {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            max-width: 300px;
            font-family: var(--font-body);
            font-size: 14px;
            font-weight: 600;
            line-height: 1.35;
            color: var(--color-ink-black);
            text-align: center;
          }
          .konsult-caption-play {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: var(--color-gilt);
            color: #fff;
            font-size: 9px;
            padding-left: 1px;
          }
          .konsult-caption-dim {
            color: var(--color-graphite);
            font-weight: 500;
          }
          @media (max-width: 860px) {
            .konsult-grid { grid-template-columns: 1fr; }
            .konsult-media { justify-self: center; }
            .konsult-media video {
              width: min(50vw, 210px);
            }
            .konsult-caption { max-width: min(50vw, 210px); }
          }
        `,
          }}
        />
      </section>

      <Contact />
    </main>
  )
}
