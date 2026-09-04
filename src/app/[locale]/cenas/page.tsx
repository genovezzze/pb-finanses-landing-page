import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import Pricing from '@/components/sections/Pricing'
import Contact from '@/components/sections/Contact'

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
  const t = await getTranslations({ locale, namespace: 'nav' })

  return (
    <main>
      <div className="section-wrap" style={{ paddingTop: 28 }}>
        <Link href={`/${locale}`} className="page-back">
          <span aria-hidden="true">←</span> {t('home')}
        </Link>
      </div>

      <Pricing />
      <Contact />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .page-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-stone);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .page-back:hover { color: var(--color-gilt); }
      `,
        }}
      />
    </main>
  )
}
