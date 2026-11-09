import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const SITE_URL = 'https://www.pbfinanses.lv'

const SERVICE_SLUGS = [
  'biznesa-konsultacijas',
  'nodoklu-konsultacijas',
  'gramatvedibas-pakalpojumi',
  'start-up-risinajumi',
  'finansu-planosana',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const isDefault = (locale: string) => locale === routing.defaultLocale

  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: isDefault(locale) ? 1 : 0.8,
    })

    for (const path of ['cenas', 'par-mums', 'kontakti', 'klienti']) {
      entries.push({
        url: `${SITE_URL}/${locale}/${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: isDefault(locale) ? 0.8 : 0.6,
      })
    }

    for (const slug of SERVICE_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/pakalpojumi/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: isDefault(locale) ? 0.9 : 0.7,
      })
    }
  }

  return entries
}
