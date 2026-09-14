/**
 * Route-level loading screen. Next renders this while a page in this segment is
 * still streaming, so a slow load shows the brand splash instead of a blank
 * frame: the PB logo breathing on the brand ground with a rotating accent ring
 * and a sweeping shimmer.
 */
export default function Loading() {
  return (
    <div className="pb-loader" role="status" aria-live="polite" aria-label="Ielādē">
      <div className="pb-loader-mark">
        <span className="pb-loader-ring" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/PBFinanses_LOGO_500.png"
          alt="PB Finanses"
          className="pb-loader-logo"
        />
      </div>

      <span className="pb-loader-bar" aria-hidden="true">
        <span />
      </span>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 34px;
          background: #001d20;
          animation: pbLoaderIn 0.3s ease both;
        }
        .pb-loader-mark {
          position: relative;
          width: 168px;
          height: 168px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* The teal/grey logo is knocked out to ivory to read on the dark ground,
           and breathes in scale + opacity. */
        .pb-loader-logo {
          width: 132px;
          height: auto;
          filter: brightness(0) invert(1);
          opacity: 0.94;
          animation: pbLoaderBreath 2.2s ease-in-out infinite;
        }
        /* Rotating accent ring: a single gilt arc chasing around the mark. */
        .pb-loader-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(241, 237, 227, 0.12);
          border-top-color: #f1ede3;
          border-right-color: rgba(241, 237, 227, 0.5);
          animation: pbLoaderSpin 1s linear infinite;
        }
        .pb-loader-bar {
          position: relative;
          width: 168px;
          height: 3px;
          border-radius: 999px;
          background: rgba(241, 237, 227, 0.14);
          overflow: hidden;
        }
        .pb-loader-bar > span {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 40%;
          border-radius: 999px;
          background: #f1ede3;
          animation: pbLoaderSweep 1.25s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        @keyframes pbLoaderIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pbLoaderSpin { to { transform: rotate(360deg); } }
        @keyframes pbLoaderBreath {
          0%, 100% { transform: scale(0.96); opacity: 0.82; }
          50% { transform: scale(1.04); opacity: 1; }
        }
        @keyframes pbLoaderSweep {
          0% { left: -40%; }
          100% { left: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pb-loader-logo, .pb-loader-ring, .pb-loader-bar > span { animation: none; }
          .pb-loader-ring { border-top-color: #f1ede3; }
        }
      `,
        }}
      />
    </div>
  )
}
