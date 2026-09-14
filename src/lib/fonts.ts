import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'

// Geometric humanist sans in the spirit of Acre - used for display headings.
// latin-ext covers the Latvian diacritics; Cyrillic (ru headings) falls back to
// Inter via the CSS font stack, since Poppins ships no Cyrillic.
export const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

// Editorial display face used ONLY for the hero poster wordmark.
// Covers Latvian diacritics (latin-ext) and Cyrillic for the ru locale.
export const posterDisplay = localFont({
  src: [
    { path: '../assets/fonts/cormorant-garamond-400.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/cormorant-garamond-500.ttf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/cormorant-garamond-600.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-poster',
  display: 'swap',
})

// High-contrast Didone face for the oversized editorial HERO typography.
export const editorialSerif = localFont({
  src: '../assets/fonts/bodoni-moda-400.ttf',
  variable: '--font-editorial-serif',
  display: 'swap',
  weight: '400',
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
export const playfair = localFont({
  src: [
    { path: '../assets/fonts/inter-300.ttf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/inter-400.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/inter-500.ttf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/inter-600.ttf', weight: '600', style: 'normal' },
    { path: '../assets/fonts/inter-700.ttf', weight: '700', style: 'normal' },
    { path: '../assets/fonts/inter-800.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-playfair',
  display: 'swap',
})

export const inter = localFont({
  src: [
    { path: '../assets/fonts/inter-300.ttf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/inter-400.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/inter-500.ttf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/inter-600.ttf', weight: '600', style: 'normal' },
    { path: '../assets/fonts/inter-700.ttf', weight: '700', style: 'normal' },
    { path: '../assets/fonts/inter-800.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})
