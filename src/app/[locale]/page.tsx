import AnnouncementBar from '@/components/layout/AnnouncementBar'
import FloatingContact from '@/components/layout/FloatingContact'
import Hero from '@/components/sections/Hero'
import Partners from '@/components/sections/Partners'
import Sectors from '@/components/sections/Sectors'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Founder from '@/components/sections/Founder'
import History from '@/components/sections/History'
import Team from '@/components/sections/Team'
import Office from '@/components/sections/Office'
import Process from '@/components/sections/Process'
import Insights from '@/components/sections/Insights'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <main>
      <AnnouncementBar />
      <Hero />
      <Partners />
      <Sectors />
      <Services />
      <Testimonials />
      <Founder />
      <History />
      <Team />
      <Office />
      <Process />
      <Insights />
      <FAQ />
      <Contact />
      <FloatingContact />
    </main>
  )
}
