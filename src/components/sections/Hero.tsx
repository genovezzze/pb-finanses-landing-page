'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import Stats from '@/components/sections/Stats'

const HERO_PORTRAIT = '/images/demo.png'

// The stage is drawn at this width and scaled up to fill the screen.
const DESIGN_W = 1500
// How far down the stage the composition actually reaches: the lower headline
// sits at 452 and runs two lines. The scale is capped so this never passes the
// bottom of the hero — that is what was cutting "lēmumos." in half.
const DESIGN_CONTENT_H = 740

export default function Hero() {
  const locale = useLocale()
  const heroRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  // One observer for the whole section rather than one per element: the pieces
  // are staggered in CSS instead. Keeping the switch on a single, full-height
  // element is also what stops the reveal from flickering at the threshold.
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    let raf = 0
    const apply = () => {
      raf = 0
      // Width drives the scale, height only caps it. Measuring the height against
      // the content rather than the whole stage is the difference between a cap
      // and a shrink — the stage is taller than the drawing inside it.
      const k = Math.min(el.clientWidth / DESIGN_W, el.clientHeight / DESIGN_CONTENT_H)
      el.style.setProperty('--hero-k', String(Math.min(1.8, Math.max(1, k))))
    }
    apply()
    const onResize = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="hero" className={`editorial-hero${inView ? ' is-in' : ''}`} ref={heroRef}>
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
          /* The sticky header animates on translateY, so while it slides back in
             its 72px slot in the flow is briefly uncovered and the white body
             shows through. This paints that band in the hero's own ground.
             A shadow rather than a pseudo-element: overflow:hidden would clip
             the latter, and the shadow sits behind the header either way. */
          box-shadow: 0 -96px 0 0 #001d20;
        }
        /* Entrance. Everything starts hidden and is let in one piece at a time;
           the state is driven by the section being in view, so scrolling back up
           to the hero plays it again rather than showing a finished frame. */
        .editorial-hero .hero-title,
        .editorial-hero .hero-portrait,
        .editorial-hero .hero-support,
        .editorial-hero .hero-ornament {
          opacity: 0;
          transition: opacity .9s cubic-bezier(.16,1,.3,1),
                      transform .9s cubic-bezier(.16,1,.3,1),
                      clip-path 1.1s cubic-bezier(.16,1,.3,1);
        }
        .editorial-hero .hero-title { transform: translateY(28px); }
        .editorial-hero .hero-support { transform: translateY(18px); }
        /* The portrait is wiped in from the top instead of moved, so the headline
           crossing it never appears to slide. */
        .editorial-hero .hero-portrait { clip-path: inset(0 0 100% 0); }

        .editorial-hero.is-in .hero-ornament { opacity: 1; transition-delay: .05s; }
        .editorial-hero.is-in .hero-title-back { opacity: 1; transform: none; transition-delay: .12s; }
        .editorial-hero.is-in .hero-portrait { opacity: 1; clip-path: inset(0 0 0 0); transition-delay: .24s; }
        .editorial-hero.is-in .hero-title-front { opacity: 1; transform: none; transition-delay: .36s; }
        .editorial-hero.is-in .hero-support { opacity: 1; transform: none; transition-delay: .5s; }

        @media (prefers-reduced-motion: reduce) {
          .editorial-hero .hero-title,
          .editorial-hero .hero-portrait,
          .editorial-hero .hero-support,
          .editorial-hero .hero-ornament {
            opacity: 1;
            transform: none;
            clip-path: none;
            transition: none;
          }
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
          overflow: hidden;
        }
        /* Hover lives on a copy of the photo laid over the frame: the frame stays
           put while the image inside it drifts closer, so the headline running
           across the portrait never shifts. */
        .hero-portrait::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: inherit;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          transform: scale(1);
          transition: transform 1s cubic-bezier(.16,1,.3,1);
        }
        .hero-portrait::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          box-shadow: inset 0 0 0 1px rgba(241,237,227,0);
          background: linear-gradient(to top, rgba(0,29,32,.42), transparent 55%);
          opacity: 0;
          transition: opacity .55s ease, box-shadow .55s ease;
        }
        .hero-portrait:hover::after { transform: scale(1.055); }
        .hero-portrait:hover::before {
          opacity: 1;
          box-shadow: inset 0 0 0 1px rgba(241,237,227,.34);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-portrait::after, .hero-portrait::before { transition: none; }
          .hero-portrait:hover::after { transform: none; }
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
        /* Past the design width the stage stops being a layout and becomes a
           picture: a fixed 1672-wide block scaled up until it spans the screen.
           Nothing inside moves relative to anything else — only the scale
           changes. Anchored at the top, so growth runs downwards the way it
           already does on the reference screen. Narrower windows never reach
           this rule and keep the layout they had. */
        @media (min-width: 1673px) {
          .hero-stage {
            width: 1500px;
            height: calc(100% / var(--hero-k, 1));
            transform: scale(var(--hero-k, 1));
            transform-origin: top center;
          }
          /* Given the room a large screen has, the portrait carries more weight
             than the scale alone gives it. It grows from its top-left corner, so
             the headline keeps the same entry point across it. */
          .hero-portrait {
            top: 96px;
            width: 384px;
            height: min(540px, 92%);
          }
          /* The lower headline follows the portrait down by the same step, so the
             gap between "naudā." and "Pārliecība" stays as drawn. */
          .hero-title-front { top: 452px; }
        }
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
