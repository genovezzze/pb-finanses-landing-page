import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-black': '#000000',
        'canvas-white': '#ffffff',
        'parchment-rule': '#EAEAEA',
        graphite: '#484F5E',
        stone: '#78797C',
        espresso: '#32373A',
        gilt: '#236E74',
        'gilt-dark': '#517272',
        'linen-tint': '#F5F5F5',
        'parchment-wash': '#F9F9F9',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
