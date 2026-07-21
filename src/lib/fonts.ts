import { Inter } from 'next/font/google'

// Inter: modern geometric sans-serif for both display and body.
// Supports Latvian diacritics (latin-ext) and Cyrillic (ru locale).
// Display uses weight 700-800 for bold headings; body uses 400-500.
export const playfair = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

