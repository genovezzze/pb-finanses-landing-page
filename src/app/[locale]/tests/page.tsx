import type { Metadata } from 'next'
import Quiz from '@/components/sections/Quiz'

export const metadata: Metadata = {
  title: 'Vai tava grāmatvedība tev maksā par daudz? | PB Finanses',
  description:
    '7 jautājumi, 2 minūtes - uzzini, vai tava grāmatvedība strādā tavā labā vai tev izmaksā par daudz. Personīga analīze un bezmaksas konsultācija.',
  // Funnel landing for video traffic - keep it out of the index so it does not
  // compete with the real content pages.
  robots: { index: false, follow: false },
}

export default function TestsPage() {
  return (
    <main>
      <Quiz />
    </main>
  )
}
