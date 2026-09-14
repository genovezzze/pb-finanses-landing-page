import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { editorialSerif, playfair, inter, neueHaasDisplayBlack, posterDisplay, poppins } from '@/lib/fonts'
import '../globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const SITE_URL = 'https://www.pbfinanses.lv'
const OG_LOCALES: Record<string, string> = { lv: 'lv_LV', en: 'en_US', ru: 'ru_RU' }

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        lv: '/lv',
        en: '/en',
        ru: '/ru',
        'x-default': '/lv',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      siteName: 'PB Finanses',
      locale: OG_LOCALES[locale] ?? 'lv_LV',
      type: 'website',
      images: [{ url: '/images/founder-agnese.jpg', width: 1100, height: 1100 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params

  if (!routing.locales.includes(locale as 'lv' | 'en' | 'ru')) {
    notFound()
  }

  const messages = await getMessages()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'PB Finanses',
    image: `${SITE_URL}/images/founder-agnese.jpg`,
    url: SITE_URL,
    telephone: '+37129716434',
    email: 'info@pbfinanses.lv',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lielais prospekts 54-9',
      addressLocality: 'Ventspils',
      postalCode: 'LV-3601',
      addressCountry: 'LV',
    },
    areaServed: 'LV',
    priceRange: '$$',
    foundingDate: '2011',
    founder: {
      '@type': 'Person',
      name: 'Agnese Pastare',
      jobTitle: 'Owner and Board Member',
      email: 'agnese.pastare@pbfinanses.lv',
      telephone: '+37129716434',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Riga Technical University',
      },
      knowsLanguage: ['lv', 'ru', 'en', 'de', 'it'],
    },
    sameAs: [],
    taxID: '41203042116',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: 'Outsourced accountant licence AGL0000018',
      identifier: 'AGL0000018',
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Valsts ieņēmumu dienests',
      },
      validFrom: '2021-07-14',
      expires: '2031-07-13',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Latvijas Tirdzniecības un rūpniecības kamera',
      alternateName: 'LTRK',
    },
  }

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} ${neueHaasDisplayBlack.variable} ${posterDisplay.variable} ${editorialSerif.variable} ${poppins.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
