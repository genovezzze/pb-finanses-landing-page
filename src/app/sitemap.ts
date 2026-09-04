import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const SITE_URL = 'https://www.pbfinanses.lv'

export default function sitemap(): MetadataRoute.Sitemap {
  const home = routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }))

  const pricing = routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/cenas`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === routing.defaultLocale ? 0.9 : 0.7,
  }))

  return [...home, ...pricing]
}
