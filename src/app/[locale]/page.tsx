import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Credentials from '@/components/sections/Credentials'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import Testimonials from '@/components/sections/Testimonials'
import Insights from '@/components/sections/Insights'
import { Reveal } from '@/components/ui/reveal'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Reveal variant="up" duration={0.8}>
        <Stats />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Services />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Industries />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Insights />
      </Reveal>
      {/* -1px pulls the block up over the hairline compositing seam that shows
          where two same-coloured section layers meet. */}
      <Reveal variant="up" duration={0.85} style={{ marginTop: -1 }}>
        <Testimonials compact />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Credentials />
      </Reveal>
    </main>
  )
}
