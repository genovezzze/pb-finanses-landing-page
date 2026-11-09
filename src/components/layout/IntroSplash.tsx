'use client'
import { useEffect, useState } from 'react'

/**
 * Brand intro shown once per browser session on site entry: the native logo
 * fades up on a white ground with a teal underline that draws across, then the
 * splash wipes away. Kept short and clean.
 */
export default function IntroSplash() {
  const [mounted, setMounted] = useState(false)
  const [hiding, setHiding] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('pb-intro-shown') === '1'
    } catch {}
    if (seen) {
      setDone(true)
      return
    }
    setMounted(true)
    // Flag written only when fading out, so StrictMode's double-run effect does
    // not make the second pass skip the splash.
    const hideAt = setTimeout(() => {
      setHiding(true)
      try {
        sessionStorage.setItem('pb-intro-shown', '1')
      } catch {}
    }, 850)
    const doneAt = setTimeout(() => setDone(true), 1300)
    return () => {
      clearTimeout(hideAt)
      clearTimeout(doneAt)
    }
  }, [])

  if (done || !mounted) return null

  return (
    <div className={`pb-intro${hiding ? ' is-hiding' : ''}`} aria-hidden="true">
      <div className="pb-intro-mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/PBFinanses_LOGO_500.png" alt="" className="pb-intro-logo" />
        <span className="pb-intro-line" />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-intro {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          opacity: 1;
          transition: opacity 0.45s ease;
        }
        .pb-intro.is-hiding { opacity: 0; }
        .pb-intro-mark {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .pb-intro-logo {
          width: clamp(150px, 30vw, 190px);
          height: auto;
          opacity: 0;
          transform: translateY(10px);
          animation: pbIntroLogo 0.55s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .pb-intro-line {
          width: clamp(150px, 30vw, 190px);
          height: 3px;
          border-radius: 999px;
          background: var(--color-gilt);
          transform: scaleX(0);
          transform-origin: left;
          animation: pbIntroLine 0.5s cubic-bezier(0.16,1,0.3,1) 0.25s forwards;
        }
        @keyframes pbIntroLogo {
          to { opacity: 0.98; transform: translateY(0); }
        }
        @keyframes pbIntroLine {
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pb-intro-logo { animation: none; opacity: 0.98; transform: none; }
          .pb-intro-line { animation: none; transform: scaleX(1); }
        }
      `,
        }}
      />
    </div>
  )
}
