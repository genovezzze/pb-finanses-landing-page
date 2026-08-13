'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import Stats from '@/components/sections/Stats'

const HERO_PORTRAIT = '/images/demo.png'

export default function Hero() {
  const locale = useLocale()

  return (
    <section id="hero" className="editorial-hero">
      <div className="hero-stage">
        <div className="hero-ornament hero-ornament-left" aria-hidden="true">
          <span className="hero-star">✦</span>
        </div>

        <h1 className="hero-title hero-title-back">
          <span>Skaidrība</span>
          <span>naudā.</span>
        </h1>

        <div
          className="hero-portrait"
          role="img"
          aria-label="PB Finanses vadītājas portrets"
          style={{ backgroundImage: `url('${HERO_PORTRAIT}')` }}
        />

        <h1 className="hero-title hero-title-front" aria-label="Pārliecība lēmumos.">
          <span>Pārliecība</span>
          <span>lēmumos.</span>
        </h1>

        <div className="hero-support">
          <p>
            Ārpakalpojuma grāmatvedība<br />
            uzņēmumiem, kuri vēlas<br />
            redzēt vairāk nekā tikai ciparus.
          </p>
          <div className="hero-actions">
            <Link href={`/${locale}#contact`} className="hero-button hero-button-primary">
              Pieteikt konsultāciju
            </Link>
            <Link href={`/${locale}#about`} className="hero-button hero-button-secondary">
              Uzzināt vairāk <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <Stats embedded />

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .editorial-hero {
          --hero-ivory: #f1ede3;
          position: relative;
          height: calc(100svh - 72px);
          min-height: 620px;
          background: #001d20;
          color: var(--hero-ivory);
          overflow: hidden;
        }
        .hero-stage {
          position: relative;
          width: min(100%, 1672px);
          height: 100%;
          min-height: 620px;
          margin: 0 auto;
          overflow: hidden;
        }
        .editorial-hero .hero-title {
          position: absolute;
          margin: 0;
          color: var(--hero-ivory);
          font-family: var(--font-editorial-serif), 'Bodoni 72', 'Bodoni MT', Didot, Georgia, serif !important;
          font-size: clamp(104px, 9.25vw, 154px);
          font-weight: 400 !important;
          line-height: .82;
          letter-spacing: -.045em;
          white-space: nowrap;
        }
        .hero-title span { display: block; }
        .hero-title-back {
          z-index: 3;
          top: 6px;
          left: 17%;
        }
        .hero-title-back span + span { margin-top: 14px; }
        .hero-portrait {
          position: absolute;
          z-index: 2;
          top: 52px;
          left: 38.25%;
          width: 320px;
          height: min(450px, 76%);
          background-color: #a9a397;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .hero-title-front {
          z-index: 3;
          top: 345px;
          left: 30%;
        }
        .hero-title-front span + span {
          margin-top: 10px;
          margin-left: 16%;
        }
        .hero-support {
          position: absolute;
          z-index: 4;
          left: 4.65%;
          top: 350px;
          width: 370px;
          font-family: var(--font-body);
        }
        .hero-support p {
          margin: 0 0 28px;
          max-width: 310px;
          font-size: 14px;
          line-height: 1.62;
          color: rgba(241, 237, 227, .82);
        }
        .hero-actions { display: flex; gap: 12px; align-items: center; }
        .hero-button {
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 19px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity .2s ease;
        }
        .hero-button:hover { opacity: .75; }
        .hero-button-primary { color: #001d20; background: var(--hero-ivory); }
        .hero-button-secondary { color: var(--hero-ivory); border: 1px solid rgba(241,237,227,.72); }
        .hero-button-secondary span { margin-left: 14px; font-size: 18px; }
        .hero-ornament { position: absolute; z-index: 4; width: 1px; background: rgba(241,237,227,.38); }
        .hero-ornament-left { top: 34px; left: 4.75%; height: 150px; }
        .hero-star { position: absolute; left: 50%; top: 34px; transform: translate(-50%, -50%); font-size: 16px; }
        @media (max-width: 1100px) {
          .hero-title { font-size: clamp(86px, 11.5vw, 124px) !important; }
          .hero-title-back { left: 8%; }
          .hero-portrait { left: 42%; width: 300px; height: min(430px, 76%); }
          .hero-title-front { left: 21%; }
        }
        @media (max-width: 768px) {
          .editorial-hero { min-height: 900px; }
          .hero-stage { min-height: 900px; }
          .hero-title { font-size: clamp(62px, 19vw, 94px) !important; line-height: .88; }
          .hero-title-back { top: 42px; left: 22px; }
          .hero-title-back span + span { margin-top: 6px; }
          .hero-portrait { top: 218px; left: 19%; width: 72%; height: 465px; }
          .hero-title-front { top: 556px; left: 6%; }
          .hero-title-front span + span { margin: 4px 0 0 7%; }
          .hero-support { top: 748px; left: 24px; width: calc(100% - 48px); }
          .hero-support p { margin-bottom: 22px; font-size: 15px; line-height: 1.5; }
          .hero-actions { flex-wrap: wrap; }
          .hero-button { min-height: 44px; padding: 0 18px; font-size: 13px; }
          .hero-ornament-left { display: none; }
        }
      ` }} />
    </section>
  )
}
