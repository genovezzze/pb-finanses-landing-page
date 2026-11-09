import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import Pricing from '@/components/sections/Pricing'
import ContactPage from '@/components/sections/ContactPage'
import PageHero from '@/components/sections/PageHero'
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

export default async function PricingPage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'pricing' })
  return (
    <main>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        image="/images/pricing-documents-wide.jpg"
        objectPosition="center 70%"
      />

      <Pricing headerInBanner />

      {/* Consultation explainer: readable copy on the left, the vertical
          (9:16) video on the right, read it or watch it. Poster is a
          placeholder until the real thumbnail lands at
          /images/konsultacija-thumb.jpg. */}
      <section className="konsult">
        <div className="section-wrap konsult-grid">
          <div className="konsult-text">
            <p className="eyebrow">Konsultācija</p>
            <h2 className="konsult-title">Pieteikties konsultācijai</h2>
            <p>
              Mūsu konsultācija nav bezmaksas, stundas likme ir 100 EUR (iespējamas atlaides).
              Taču ir veids, kā par to faktiski nemaksāt
            </p>
            <p>
              Ja pēc konsultācijas kļūstat par mūsu klientu un noslēdzat līgumu, kas ir spēkā vismaz
              vienu gadu, samaksāto konsultācijas maksu atgriežam kā atlaidi no pirmā rēķina par
              grāmatvedības pakalpojumiem
            </p>
            <p>
              Tātad, ja mūsu pakalpojumi jums šķiet piemēroti, konsultācija jums neizmaksā neko.
              Gribat pamēģināt, rakstiet uz info@pbfinanses.lv vai sazinieties sociālajos tīklos,
              un parunāsim
            </p>
            <Tappable>
              <Link href={`/${locale}/kontakti`} className="konsult-btn">
                Pieteikt konsultāciju
              </Link>
            </Tappable>
          </div>

          <figure className="konsult-media">
            <div className="konsult-embed">
              <iframe
                src="https://www.tiktok.com/embed/v2/7680849764703014146"
                title="Cik maksā mūsu konsultācija?"
                loading="lazy"
                allow="encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                scrolling="no"
                frameBorder="0"
              />
            </div>
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
            justify-content: center;
            gap: 14px;
          }
          /* TikTok's embed has a 325px min width, so it is scaled down with a
             transform; full height is kept so the whole video stays visible. */
          .konsult-embed {
            --embed-scale: 0.74;
            width: calc(325px * var(--embed-scale));
            height: calc(580px * var(--embed-scale));
            border-radius: 12px;
            overflow: hidden;
            background: #000;
            box-shadow: 0 34px 70px -32px rgba(12,10,7,0.45);
          }
          .konsult-embed iframe {
            width: 325px;
            height: 580px;
            border: 0;
            display: block;
            transform: scale(var(--embed-scale));
            transform-origin: top left;
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
            .konsult-caption { max-width: calc(325px * 0.74); }
          }
        `,
          }}
        />
      </section>

      <ContactPage />
    </main>
  )
}
