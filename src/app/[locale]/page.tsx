import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Credentials from '@/components/sections/Credentials'
import Services from '@/components/sections/Services'
import Sectors from '@/components/sections/Sectors'
import Industries from '@/components/sections/Industries'
import Testimonials from '@/components/sections/Testimonials'
import Insights from '@/components/sections/Insights'
import { Reveal } from '@/components/ui/reveal'

export default function HomePage() {
  return (
    <main className="home-page">
      <Hero />
      <Reveal variant="up" duration={0.8} className="home-stats">
        <Stats />
      </Reveal>
      <Reveal variant="up" duration={0.8} className="home-services">
        <Services />
      </Reveal>
      <Reveal variant="up" duration={0.8} className="home-sectors">
        <Sectors />
      </Reveal>
      <Reveal variant="up" duration={0.8} className="home-industries">
        <Industries />
      </Reveal>
      {/* -1px pulls the block up over the hairline compositing seam that shows
          where two same-coloured section layers meet. */}
      {/* No entrance animation here: the section ground is linen, and fading it
          in over the white body flashed white before settling to grey. */}
      <div className="home-testimonials">
        <Testimonials compact />
      </div>
      <div className="home-insights">
        <Insights />
      </div>
      <Reveal variant="up" duration={0.8} className="home-credentials">
        <Credentials />
      </Reveal>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Only the homepage spacing rhythm is changed here. Components,
           grids, surfaces and content keep their existing design. */
        .home-stats .stats-section {
          padding: 28px 0 18px !important;
        }

        .home-services #services {
          padding-top: 84px !important;
          padding-bottom: 52px !important;
        }
        .home-services #services-header {
          margin-bottom: 24px !important;
        }

        .home-sectors > section {
          padding-top: 48px !important;
          padding-bottom: 88px !important;
        }
        .home-sectors #sectors-title {
          margin-bottom: 30px !important;
        }

        .home-industries #industries {
          padding-top: 104px !important;
          padding-bottom: 68px !important;
        }
        .home-industries .ind-statement {
          margin-bottom: 42px !important;
        }

        .home-testimonials {
          margin-top: -1px;
        }
        .home-testimonials #testimonials {
          padding-top: 56px !important;
          padding-bottom: 82px !important;
        }
        .home-testimonials .testimonials-head {
          margin-bottom: 30px !important;
        }

        .home-insights #insights {
          padding-top: 92px !important;
          padding-bottom: 54px !important;
        }
        .home-insights #insights .section-wrap > div:first-child > div {
          margin-bottom: 24px !important;
        }

        .home-credentials .credentials {
          padding-top: 46px !important;
          padding-bottom: 64px !important;
        }
        .home-credentials .credentials-title {
          margin-bottom: 22px !important;
        }

        @media (max-width: 768px) {
          .home-stats .stats-section {
            padding: 22px 0 14px !important;
          }
          .home-services #services {
            padding-top: 56px !important;
            padding-bottom: 38px !important;
          }
          .home-sectors > section {
            padding-top: 38px !important;
            padding-bottom: 62px !important;
          }
          .home-industries #industries {
            padding-top: 68px !important;
            padding-bottom: 46px !important;
          }
          .home-testimonials #testimonials {
            padding-top: 46px !important;
            padding-bottom: 64px !important;
          }
          .home-insights #insights {
            padding-top: 66px !important;
            padding-bottom: 42px !important;
          }
          .home-credentials .credentials {
            padding-top: 34px !important;
            padding-bottom: 48px !important;
          }
        }
      ` }} />
    </main>
  )
}
