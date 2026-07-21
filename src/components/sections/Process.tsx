import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

const IllustrationAssess = () => (
  <svg viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 8, marginBottom: 24, display: 'block' }}>
    <rect width="360" height="180" rx="8" fill="rgba(255,255,255,0.03)" />
    {/* Document */}
    <rect x="90" y="30" width="100" height="128" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <rect x="103" y="50" width="74" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
    <rect x="103" y="62" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
    <rect x="103" y="74" width="68" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
    {/* Mini chart bars */}
    <rect x="103" y="102" width="12" height="30" rx="2" fill="#236E74" opacity="0.7" />
    <rect x="120" y="114" width="12" height="18" rx="2" fill="#236E74" opacity="0.5" />
    <rect x="137" y="96" width="12" height="36" rx="2" fill="#236E74" opacity="0.9" />
    <rect x="154" y="108" width="12" height="24" rx="2" fill="#236E74" opacity="0.6" />
    {/* Magnifier */}
    <circle cx="230" cy="88" r="38" fill="rgba(255,255,255,0.04)" stroke="#236E74" strokeWidth="2" />
    <circle cx="230" cy="88" r="26" fill="rgba(35,110,116,0.08)" stroke="#236E74" strokeWidth="1.5" />
    {/* Chart line inside magnifier */}
    <polyline points="212,98 221,84 230,90 239,76 248,82" stroke="#236E74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="239" cy="76" r="3" fill="#236E74" />
    {/* Magnifier handle */}
    <line x1="252" y1="110" x2="268" y2="130" stroke="#236E74" strokeWidth="3" strokeLinecap="round" />
    {/* Sparkle dots */}
    <circle cx="60" cy="50" r="2" fill="#236E74" opacity="0.4" />
    <circle cx="310" cy="140" r="2" fill="#236E74" opacity="0.4" />
    <circle cx="300" cy="40" r="1.5" fill="rgba(255,255,255,0.2)" />
    <circle cx="50" cy="140" r="1.5" fill="rgba(255,255,255,0.2)" />
  </svg>
)

const IllustrationSolve = () => (
  <svg viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 8, marginBottom: 24, display: 'block' }}>
    <rect width="360" height="180" rx="8" fill="rgba(255,255,255,0.03)" />
    {/* Grid lines */}
    {[60, 120, 180, 240, 300].map(x => (
      <line key={x} x1={x} y1="20" x2={x} y2="160" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    ))}
    {[45, 90, 135].map(y => (
      <line key={y} x1="20" y1={y} x2="340" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    ))}
    {/* Central hexagon */}
    <polygon points="180,55 210,72 210,106 180,123 150,106 150,72" fill="rgba(35,110,116,0.1)" stroke="#236E74" strokeWidth="1.5" />
    <polygon points="180,68 200,79 200,101 180,112 160,101 160,79" fill="rgba(35,110,116,0.15)" stroke="#236E74" strokeWidth="1" />
    {/* Gear teeth suggestion */}
    <circle cx="180" cy="89" r="10" fill="rgba(35,110,116,0.3)" stroke="#236E74" strokeWidth="1.5" />
    <circle cx="180" cy="89" r="4" fill="#236E74" />
    {/* Connecting lines to satellite nodes */}
    <line x1="150" y1="72" x2="100" y2="50" stroke="#236E74" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
    <line x1="210" y1="72" x2="260" y2="50" stroke="#236E74" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
    <line x1="150" y1="106" x2="100" y2="130" stroke="#236E74" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
    <line x1="210" y1="106" x2="260" y2="130" stroke="#236E74" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
    <line x1="180" y1="55" x2="180" y2="28" stroke="#236E74" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
    <line x1="180" y1="123" x2="180" y2="150" stroke="#236E74" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
    {/* Satellite nodes */}
    {[[100,50],[260,50],[100,130],[260,130],[180,25],[180,153]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="10" fill="rgba(35,110,116,0.12)" stroke="#236E74" strokeWidth="1" />
    ))}
    {[[100,50],[260,50],[100,130],[260,130],[180,25],[180,153]].map(([cx,cy],i) => (
      <circle key={i+10} cx={cx} cy={cy} r="3.5" fill="#236E74" opacity="0.8" />
    ))}
    {/* Corner accents */}
    <circle cx="40" cy="160" r="1.5" fill="rgba(255,255,255,0.15)" />
    <circle cx="320" cy="20" r="1.5" fill="rgba(255,255,255,0.15)" />
  </svg>
)

const IllustrationTeam = () => (
  <svg viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', borderRadius: 8, marginBottom: 24, display: 'block' }}>
    <rect width="360" height="180" rx="8" fill="rgba(255,255,255,0.03)" />
    {/* Left figure */}
    <circle cx="130" cy="58" r="22" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <circle cx="130" cy="52" r="11" fill="rgba(255,255,255,0.08)" />
    <path d="M100 110 Q130 92 160 110 L160 148 Q130 160 100 148 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    {/* Right figure */}
    <circle cx="230" cy="58" r="22" fill="rgba(35,110,116,0.12)" stroke="#236E74" strokeWidth="1" />
    <circle cx="230" cy="52" r="11" fill="rgba(35,110,116,0.2)" />
    <path d="M200 110 Q230 92 260 110 L260 148 Q230 160 200 148 Z" fill="rgba(35,110,116,0.1)" stroke="#236E74" strokeWidth="1" />
    {/* Handshake / link in center */}
    <path d="M160 115 Q180 102 200 115" stroke="#236E74" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="180" cy="104" r="7" fill="rgba(35,110,116,0.25)" stroke="#236E74" strokeWidth="1.5" />
    <circle cx="180" cy="104" r="3" fill="#236E74" />
    {/* Connection arcs */}
    <path d="M152 72 Q180 60 208 72" stroke="#236E74" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    {/* Result arrow upward */}
    <line x1="180" y1="155" x2="180" y2="135" stroke="#236E74" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <polyline points="174,141 180,135 186,141" stroke="#236E74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    {/* Checkmark badge */}
    <circle cx="290" cy="45" r="16" fill="rgba(35,110,116,0.15)" stroke="#236E74" strokeWidth="1" />
    <polyline points="283,45 288,51 298,38" stroke="#236E74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Dots */}
    <circle cx="50" cy="40" r="2" fill="#236E74" opacity="0.3" />
    <circle cx="60" cy="155" r="1.5" fill="rgba(255,255,255,0.15)" />
    <circle cx="320" cy="150" r="2" fill="#236E74" opacity="0.3" />
  </svg>
)

const illustrations = [IllustrationAssess, IllustrationSolve, IllustrationTeam]

export default function Process() {
  const t = useTranslations('process')
  const steps = t.raw('steps') as Array<{
    num: string
    title: string
    body: string
  }>

  return (
    <section
      className="section-gap"
      style={{ background: 'var(--color-espresso)', color: '#fff' }}
    >
      <div className="section-wrap">
        <Reveal variant="down">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.02em',
              marginBottom: 48,
              color: '#fff',
            }}
          >
            {t('title')}
          </h2>
        </Reveal>

        <div
          id="process-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {steps.map((step, idx) => {
            const Illustration = illustrations[idx]
            return (
              <div
                key={step.num}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  padding: '28px 28px 36px',
                  height: '100%',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {Illustration && <Illustration />}

                {/* Step badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    border: '1px solid var(--color-gilt)',
                    borderRadius: 2,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--color-gilt)',
                    letterSpacing: '0.04em',
                    marginBottom: 20,
                  }}
                >
                  {step.num}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 24,
                    color: '#fff',
                    marginBottom: 12,
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.65,
                  }}
                >
                  {step.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 768px) {
          #process-grid { grid-template-columns: 1fr !important; }
        }
      `,
        }}
      />
    </section>
  )
}
