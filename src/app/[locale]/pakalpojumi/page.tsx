import Services from '@/components/sections/Services'
import Sectors from '@/components/sections/Sectors'
import Industries from '@/components/sections/Industries'
import PricingCta from '@/components/sections/PricingCta'
import FAQ from '@/components/sections/FAQ'
import { Reveal } from '@/components/ui/reveal'

export default function ServicesPage() {
  return (
    <main>
      <Reveal variant="up" duration={0.8}>
        <Services />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Sectors />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <Industries />
      </Reveal>
      <Reveal variant="up" duration={0.8}>
        <PricingCta />
      </Reveal>
      <Reveal variant="up" duration={0.85}>
        <FAQ />
      </Reveal>
    </main>
  )
}
