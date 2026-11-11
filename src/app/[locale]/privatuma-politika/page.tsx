import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PageHero from '@/components/sections/PageHero'

const SITE_URL = 'https://www.pbfinanses.lv'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return {
    title: `${t('title')} | PB Finanses`,
    description: t('title'),
    alternates: {
      canonical: `/${locale}/privatuma-politika`,
      languages: {
        lv: '/lv/privatuma-politika',
        en: '/en/privatuma-politika',
        'x-default': '/lv/privatuma-politika',
      },
    },
    robots: { index: false, follow: true },
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  const sections = t.raw('sections') as Array<{ h: string; p: string }>

  return (
    <main>
      <PageHero eyebrow={t('updated')} title={t('title')} />
      <section className="section-gap" style={{ background: 'var(--color-canvas-white)' }}>
        <div className="section-wrap" style={{ maxWidth: 820 }}>
          {sections.map((s) => (
            <div key={s.h} style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-ink-black)',
                  marginBottom: 8,
                }}
              >
                {s.h}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  color: 'var(--color-graphite)',
                  margin: 0,
                }}
              >
                {s.p}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
