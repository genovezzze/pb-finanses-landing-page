import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const SITE_URL = 'https://www.pbfinanses.lv'

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }))
}
