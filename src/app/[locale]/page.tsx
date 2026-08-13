import Hero from '@/components/sections/Hero'
import Sectors from '@/components/sections/Sectors'
import Industries from '@/components/sections/Industries'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Founder from '@/components/sections/Founder'
import History from '@/components/sections/History'
import Team from '@/components/sections/Team'
import Office from '@/components/sections/Office'
import Insights from '@/components/sections/Insights'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Sectors />
      <Industries />
      <Services />
      <Testimonials />
      <Founder />
      <History />
      <Team />
      <Office />
      <Insights />
      <FAQ />
      <Contact />
    </main>
  )
}
