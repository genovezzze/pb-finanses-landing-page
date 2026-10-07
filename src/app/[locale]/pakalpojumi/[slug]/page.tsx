import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import ServiceInquiry from '@/components/sections/ServiceInquiry'
import ServiceHero from '@/components/sections/ServiceHero'
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

  return (
    <main>
      {/* Banner under the navbar, same pattern as /cenas and /par-mums. */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(140px, 22vw, 300px)',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/481015454_1556450015297497_8823412931938160365_n.jpg"
          alt="PB Finanses"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,29,32,0.35), rgba(0,29,32,0.72))',
          }}
        />
        <ServiceHero badge={item.badge} name={item.name} />
      </div>

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
        .svc-banner-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 12px;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px clamp(20px, 3vw, 40px);
          width: 100%;
        }
        .svc-badge {
          align-self: flex-start;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 999px;
          padding: 4px 12px;
          backdrop-filter: blur(4px);
        }
        .svc-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0;
        }
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
