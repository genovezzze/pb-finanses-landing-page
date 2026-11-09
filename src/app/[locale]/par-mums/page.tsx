import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import Founder from '@/components/sections/Founder'
import Team from '@/components/sections/Team'
import Office from '@/components/sections/Office'
import PageHero from '@/components/sections/PageHero'

export default async function AboutPage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'founder' })
  const nav = await getTranslations({ locale, namespace: 'nav' })
  const team = await getTranslations({ locale, namespace: 'team' })
  return (
    <main>
      <PageHero
        eyebrow={t('eyebrow')}
        title={nav('about')}
        image="/images/pricing-folders.jpg"
        objectPosition="center 48%"
      />

      <Founder headerInBanner />
      <section
        className="section-wrap team-feature-section"
        aria-label={nav('aboutMenu.team')}
      >
        <div className="team-feature">
          <div className="team-feature-media">
            <Image
              src="/images/team-full-new.jpg"
              alt="PB Finanses komanda"
              width={1940}
              height={2048}
              sizes="(max-width: 800px) calc(100vw - 40px), 760px"
              className="team-feature-photo"
            />
          </div>
          <div className="team-feature-copy">
            <p className="eyebrow team-feature-eyebrow">{team('eyebrow')}</p>
            <h2>{team('title')}</h2>
            <p>{team('intro')}</p>
          </div>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{ __html: `
        .team-feature-section {
          padding-top: clamp(36px, 5vw, 72px);
          padding-bottom: 8px;
        }
        .team-feature {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(300px, .65fr);
          gap: 24px;
          align-items: stretch;
        }
        .team-feature-media {
          height: clamp(380px, 30vw, 480px);
          overflow: hidden;
        }
        .team-feature-photo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 55%;
        }
        .team-feature-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: clamp(28px, 3vw, 44px);
          background: var(--color-linen-tint);
        }
        .team-feature-eyebrow { margin-bottom: 22px; }
        .team-feature-copy h2 {
          margin: 0 0 20px;
          font-family: var(--font-display);
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--color-ink-black);
        }
        .team-feature-copy > p:last-child {
          margin: 0;
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.7;
          color: var(--color-stone);
        }
        @media (max-width: 800px) {
          .team-feature { grid-template-columns: 1fr; }
          .team-feature-media {
            height: auto;
            aspect-ratio: 4 / 3;
          }
          .team-feature-copy { padding: 30px 24px; }
        }
      ` }} />
      <Team showHeader={false} />
      <Office />
    </main>
  )
}
