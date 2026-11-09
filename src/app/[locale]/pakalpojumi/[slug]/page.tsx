import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import ServiceInquiry from '@/components/sections/ServiceInquiry'
import PageHero from '@/components/sections/PageHero'
import Testimonials from '@/components/sections/Testimonials'

const SITE_URL = 'https://www.pbfinanses.lv'

type ServiceItem = {
  name: string
  badge: string
  description: string
  premium: boolean
  slug: string
  intro: string
  points: string[]
}

async function getItem(locale: string, slug: string) {
  const t = await getTranslations({ locale, namespace: 'services' })
  const items = t.raw('items') as ServiceItem[]
  return items.find((it) => it.slug === slug) ?? null
}

// The route slug stays Latvian on every locale, same as /cenas - one URL per
// service keeps shared links working whichever language is read.
export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = []
  for (const locale of routing.locales) {
    const t = await getTranslations({ locale, namespace: 'services' })
    const items = t.raw('items') as ServiceItem[]
    for (const it of items) params.push({ locale, slug: it.slug })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const { locale, slug } = params
  const item = await getItem(locale, slug)
  if (!item) return {}

  return {
    title: `${item.name} | PB Finanses`,
    description: item.intro ?? item.description,
    alternates: {
      canonical: `/${locale}/pakalpojumi/${slug}`,
      languages: {
        lv: `/lv/pakalpojumi/${slug}`,
        en: `/en/pakalpojumi/${slug}`,
        ru: `/ru/pakalpojumi/${slug}`,
        'x-default': `/lv/pakalpojumi/${slug}`,
      },
    },
    openGraph: {
      title: `${item.name} | PB Finanses`,
      description: item.intro ?? item.description,
      url: `${SITE_URL}/${locale}/pakalpojumi/${slug}`,
      siteName: 'PB Finanses',
      type: 'website',
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const { locale, slug } = params
  const item = await getItem(locale, slug)
  if (!item) notFound()

  const t = await getTranslations({ locale, namespace: 'services' })
  const detail = await getTranslations({ locale, namespace: 'services.detail' })
  const isStartup = slug === 'start-up-risinajumi'

  // Per-service banner photos (Agnese Pastare). Services without an entry fall
  // back to the default flowers banner.
  const chess = {
    image: '/images/strategy-chess.webp',
    objectPosition: 'center 32%',
    imageScale: 1.35,
    imageOrigin: 'left center',
  }
  const BANNERS: Record<string, { image: string; objectPosition?: string; imageScale?: number; imageOrigin?: string }> = {
    'biznesa-konsultacijas': chess,
    'finansu-planosana': chess,
    'start-up-risinajumi': { image: '/images/startup-ezers.webp', objectPosition: 'center 42%' },
    'gramatvedibas-pakalpojumi': { image: '/images/gramatvediba-ziedi.webp', objectPosition: 'center 45%' },
    'nodoklu-konsultacijas': { image: '/images/nodokli-magones.webp', objectPosition: 'center 50%' },
  }
  const banner = BANNERS[slug]

  return (
    <main>
      {/* Shared banner: identical size/style to /cenas and /par-mums. */}
      <PageHero
        eyebrow={item.badge}
        title={item.name}
        image={banner?.image}
        objectPosition={banner?.objectPosition}
        imageScale={banner?.imageScale}
        imageOrigin={banner?.imageOrigin}
        credit={banner ? 'Agnese Pastare' : undefined}
      />

      <section className="svc-detail">
        <div className="section-wrap">
          <div className="svc-grid">
            <div className="svc-content">
              <p className="svc-intro">{item.intro}</p>

              <h2 className="svc-points-heading">
                {isStartup ? detail('startupPointsHeading') : detail('pointsHeading')}
              </h2>
              <ul className="svc-points">
                {item.points.map((p) => (
                  <li key={p}>
                    <span className="svc-point-mark" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path
                          d="M5 12.5 10 17.5 19 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="svc-aside">
              <ServiceInquiry serviceName={item.name} />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .svc-detail {
          background: var(--color-canvas-white);
          padding: clamp(32px, 5vw, 64px) 0 clamp(48px, 7vw, 90px);
        }
        .svc-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(320px, 32%, 400px);
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }
        .svc-intro {
          font-family: var(--font-body);
          font-size: clamp(17px, 1.4vw, 20px);
          line-height: 1.65;
          color: var(--color-graphite);
          margin: 0 0 clamp(28px, 3.5vw, 44px);
          max-width: 60ch;
        }
        .svc-points-heading {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(20px, 2vw, 26px);
          letter-spacing: -0.01em;
          color: var(--color-ink-black);
          margin: 0 0 20px;
        }
        .svc-points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .svc-points li {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.55;
          color: var(--color-ink-black);
        }
        .svc-point-mark {
          flex: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(35,110,116,0.1);
          color: var(--color-gilt);
          margin-top: 1px;
        }
        @media (max-width: 860px) {
          .svc-grid { grid-template-columns: 1fr; }
        }
      `,
        }}
      />
    </main>
  )
}
