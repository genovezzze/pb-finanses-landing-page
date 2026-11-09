import { getTranslations } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Credentials from '@/components/sections/Credentials'
import Services from '@/components/sections/Services'
import Sectors from '@/components/sections/Sectors'
import Industries from '@/components/sections/Industries'
import Testimonials from '@/components/sections/Testimonials'
import Insights from '@/components/sections/Insights'
import FAQ from '@/components/sections/FAQ'
import { Reveal } from '@/components/ui/reveal'

export default async function HomePage({
  params,
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale: params.locale, namespace: 'faq' })
  const faqItems = t.raw('items') as Array<{ q: string; a: string }>
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Reveal variant="up" duration={0.8}>
        <Stats />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Services />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Sectors />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Industries />
      </Reveal>
      {/* -1px pulls the block up over the hairline compositing seam that shows
          where two same-coloured section layers meet. */}
      {/* No entrance animation here: the section ground is linen, and fading it
          in over the white body flashed white before settling to grey. */}
      <div style={{ marginTop: -1 }}>
        <Testimonials compact />
      </div>
      <Insights />
      <Reveal variant="up" duration={0.85}>
        <FAQ />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Credentials />
      </Reveal>
    </main>
  )
}
