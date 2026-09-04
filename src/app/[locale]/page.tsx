import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Credentials from '@/components/sections/Credentials'
import Sectors from '@/components/sections/Sectors'
import Industries from '@/components/sections/Industries'
import Services from '@/components/sections/Services'
import PricingCta from '@/components/sections/PricingCta'
import Testimonials from '@/components/sections/Testimonials'
import Founder from '@/components/sections/Founder'
import Team from '@/components/sections/Team'
import Office from '@/components/sections/Office'
import Insights from '@/components/sections/Insights'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Credentials />
      <Sectors />
      <Industries />
      <Services />
      <PricingCta />
      <Testimonials />
      <Founder />
      <Team />
      <Office />
      <Insights />
      <FAQ />
      <Contact />
    </main>
  )
}
