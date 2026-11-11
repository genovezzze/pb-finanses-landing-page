import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { playfair, inter, poppins } from '@/lib/fonts'
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

  if (!routing.locales.includes(locale as 'lv' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': `${SITE_URL}/#organization`,
    name: 'PB Finanses',
    legalName: 'SIA "PB Finanses"',
    description:
      'Pilna servisa finanšu ārpakalpojumi Latvijā: grāmatvedība, nodokļu konsultācijas, biznesa konsultācijas un finanšu direktors ārpakalpojumā. Licencēts grāmatvedis Ventspilī.',
    image: `${SITE_URL}/images/founder-agnese.jpg`,
    logo: `${SITE_URL}/images/PBFinanses_LOGO_500.png`,
    url: SITE_URL,
    telephone: '+37129716434',
    email: 'info@pbfinanses.lv',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Bank transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lielais prospekts 54-9',
      addressLocality: 'Ventspils',
      postalCode: 'LV-3601',
      addressCountry: 'LV',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 57.3937,
      longitude: 21.5647,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Latvia',
    },
    knowsAbout: [
      'Grāmatvedība',
      'Nodokļu konsultācijas',
      'Biznesa konsultācijas',
      'Finanšu direktors ārpakalpojumā',
      'Finanšu plānošana un budžetēšana',
      'Start-up risinājumi',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pakalpojumi',
      itemListElement: [
        'Grāmatvedības pakalpojumi',
        'Nodokļu konsultācijas',
        'Biznesa konsultācijas',
        'Finanšu plānošana un budžetēšana',
        'Start-up risinājumi',
      ].map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s },
      })),
    },
    priceRange: '€€',
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
    sameAs: [
      'https://www.facebook.com/PBFinanses/',
      'https://www.instagram.com/pbfinanses/',
      'https://www.tiktok.com/@pb.finanses',
      'https://www.linkedin.com/company/pb-finanses/',
    ],
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
      className={`${playfair.variable} ${inter.variable} ${poppins.variable}`}
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
