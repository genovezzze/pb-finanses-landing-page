'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const TEAM_PHOTO = '/images/team-hero.jpg'

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

  return (
    <section id="hero" className={`photo-hero${inView ? ' is-in' : ''}`} ref={heroRef}>
      {/* The photograph is the hero. It is a background rather than an <img> so
          that a missing file degrades to the brand ground instead of a broken
          frame, and so the slow zoom can run without touching layout. */}
      <div
        className="photo-hero-media"
        role="img"
        aria-label="PB Finanses komanda Ventspils birojā"
        style={{ backgroundImage: `url('${TEAM_PHOTO}')` }}
      />
      <div className="photo-hero-scrim" aria-hidden="true" />

      <div className="photo-hero-copy">
        <h1 className="photo-hero-title">Grāmatvedība ir intīms bizness</h1>

        <p className="photo-hero-sub">
          Mēs par tavu biznesu bieži zinām vairāk nekā tu pats.
          Tāpēc tā ir uzticības lieta - un mēs to sargājam.
        </p>

        <div className="photo-hero-actions">
          <Link href={`/${locale}#contact`} className="photo-hero-button is-primary">
            Pieteikt konsultāciju
          </Link>
          <Link href={`/${locale}#services`} className="photo-hero-button is-secondary">
            Pakalpojumi
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .photo-hero {
          --hero-ivory: #ffffff;
          --hero-ground: #001d20;
          position: relative;
          height: calc(100svh - 72px);
          min-height: 620px;
          background: var(--hero-ground);
          color: var(--hero-ivory);
          overflow: hidden;
          /* The sticky header animates on translateY, so while it slides back in
             its 72px slot in the flow is briefly uncovered and the white body
             shows through. This paints that band in the hero's own ground. */
          box-shadow: 0 -96px 0 0 #001d20;
        }

        .photo-hero-media {
          position: absolute;
          inset: 0;
          background-color: var(--hero-ground);
          background-repeat: no-repeat;
          background-size: cover;
          /* Faces sit in the upper half of the frame, so the crop is held above
             centre - at hero proportions a centred crop cuts them in half. */
          background-position: center 28%;
          transform: scale(1.06);
          opacity: 0;
          transition: opacity 1.2s ease, transform 6s cubic-bezier(.16,1,.3,1);
        }
        .photo-hero.is-in .photo-hero-media { opacity: 1; transform: scale(1); }

        /* Two washes: one across the copy side, one along the bottom. Together
           they carry the text at AA contrast over a bright, busy photograph
           without turning the picture into a grey sheet. */
        .photo-hero-scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(100deg,
              rgba(0,29,32,.94) 0%,
              rgba(0,29,32,.86) 26%,
              rgba(0,29,32,.55) 52%,
              rgba(0,29,32,.30) 74%,
              rgba(0,29,32,.52) 100%),
            linear-gradient(to top, rgba(0,29,32,.72) 0%, rgba(0,29,32,0) 42%);
        }

        /* Copy sits on the left, vertically centred, and is kept off the right
           half so the group photograph is never covered by text. The metrics
           used to sit top right; they now run as their own band under the hero,
           where they are read against paper instead of faces. */
        .photo-hero-copy {
          position: absolute;
          z-index: 4;
          left: 4.65%;
          top: auto;
          bottom: 18%;
          width: min(620px, 52%);
        }
        .photo-hero-title,
        .photo-hero-sub,
        .photo-hero-actions {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .9s cubic-bezier(.16,1,.3,1),
                      transform .9s cubic-bezier(.16,1,.3,1);
        }
        .photo-hero.is-in .photo-hero-title { opacity: 1; transform: none; transition-delay: .2s; }
        .photo-hero.is-in .photo-hero-sub { opacity: 1; transform: none; transition-delay: .34s; }
        .photo-hero.is-in .photo-hero-actions { opacity: 1; transform: none; transition-delay: .46s; }

        .photo-hero-title {
          margin: 0;
          color: var(--hero-ivory);
          /* Same face and weight as the section headings further down the page,
             so the hero opens in the page's own voice rather than a second one. */
          font-family: var(--font-display) !important;
          font-size: clamp(30px, 3.6vw, 54px);
          font-weight: 700 !important;
          line-height: 1.1;
          letter-spacing: -.02em;
        }

        .photo-hero-sub {
          margin-top: 22px;
          max-width: 46ch;
          font-family: var(--font-body);
          font-size: 15.5px;
          font-weight: 500;
          line-height: 1.65;
          color: rgba(255,255,255,.92);
        }

        .photo-hero-actions { margin-top: 32px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .photo-hero-button {
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 26px;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity .2s ease, transform .3s cubic-bezier(.16,1,.3,1);
        }
        .photo-hero-button:hover { opacity: .85; transform: translateY(-1px); }
        .photo-hero-button.is-primary { color: #001d20; background: var(--hero-ivory); }
        .photo-hero-button.is-secondary {
          color: var(--hero-ivory);
          border: 1px solid rgba(255,255,255,.7);
          backdrop-filter: blur(2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .photo-hero-media,
          .photo-hero-title,
          .photo-hero-sub,
          .photo-hero-actions {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 1100px) {
          .photo-hero-copy { width: min(560px, 64%); }
        }
        @media (max-width: 768px) {
          .photo-hero { min-height: 640px; }
          /* No room to share the frame: the copy drops to the bottom and the
             photograph keeps the upper half to itself. */
          .photo-hero-copy {
            left: 24px;
            right: 24px;
            width: auto;
            top: auto;
            bottom: 48px;
          }
          .photo-hero-media { background-position: center 22%; }
          .photo-hero-scrim {
            background:
              linear-gradient(to top,
                rgba(0,29,32,.95) 0%,
                rgba(0,29,32,.88) 38%,
                rgba(0,29,32,.42) 68%,
                rgba(0,29,32,.30) 100%);
          }
          .photo-hero-title { font-size: clamp(28px, 7vw, 40px); }
          .photo-hero-sub { margin-top: 16px; font-size: 15px; }
          .photo-hero-button { width: 100%; }
        }
      ` }} />
    </section>
  )
}
