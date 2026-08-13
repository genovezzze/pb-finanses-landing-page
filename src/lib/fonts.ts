import { Bodoni_Moda, Cormorant_Garamond, Inter } from 'next/font/google'
import localFont from 'next/font/local'

// Editorial display face used ONLY for the hero poster wordmark.
// Covers Latvian diacritics (latin-ext) and Cyrillic for the ru locale.
export const posterDisplay = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-poster',
  display: 'swap',
})

// High-contrast Didone face for the oversized editorial HERO typography.
export const editorialSerif = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  variable: '--font-editorial-serif',
  display: 'swap',
})

export const neueHaasDisplayBlack = localFont({
  src: '../../public/images/NeueHaasDisplayBlack.ttf',
  variable: '--font-neue-haas-display-black',
  display: 'swap',
  weight: '900',
})

// Inter: modern geometric sans-serif for both display and body.
// Supports Latvian diacritics (latin-ext) and Cyrillic (ru locale).
// Display uses weight 700 for bold headings; body uses 400-500.
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
