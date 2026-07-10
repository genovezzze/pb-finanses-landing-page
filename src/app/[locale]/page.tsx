import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Hero from '@/components/sections/Hero'
import Sectors from '@/components/sections/Sectors'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Founder from '@/components/sections/Founder'
import Process from '@/components/sections/Process'
import Insights from '@/components/sections/Insights'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <main>
      <AnnouncementBar />
      <Hero />
      <Sectors />
      <Services />
      <Testimonials />
      <Founder />
      <Process />
      <Insights />
      <FAQ />
      <Contact />
    </main>
  )
}
