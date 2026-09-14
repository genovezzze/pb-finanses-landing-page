import type { Metadata } from 'next'
import Image from 'next/image'
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

export default function PricingPage() {
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

      {/* Vertical (9:16) video block. Poster is a placeholder until the real
          thumbnail is added at /images/konsultacija-thumb.jpg. */}
      <section
        style={{
          background: 'var(--color-linen-tint)',
          padding: 'clamp(40px, 6vw, 72px) 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <video
          src="/videos/konsultacija.mp4"
          poster="/images/konsultacija-thumb.jpg"
          controls
          playsInline
          preload="metadata"
          style={{
            width: 'min(340px, 82vw)',
            aspectRatio: '9 / 16',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 18,
            background: '#001d20',
            boxShadow: '0 30px 60px -30px rgba(12,10,7,0.4)',
          }}
        />
      </section>

      <Contact />
    </main>
  )
}
