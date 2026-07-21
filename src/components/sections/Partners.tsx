import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/reveal'

// Served from public/images/logos — remote logo CDNs 404'd on several of these,
// so the marks are vendored to keep the strip from rendering broken images.
const logos = [
  { src: '/images/logos/microsoft.svg', alt: 'Microsoft' },
  { src: '/images/logos/sap.svg', alt: 'SAP' },
  { src: '/images/logos/xero.svg', alt: 'Xero' },
  { src: '/images/logos/quickbooks.svg', alt: 'QuickBooks' },
  { src: '/images/logos/excel.svg', alt: 'Excel' },
  { src: '/images/logos/stripe.svg', alt: 'Stripe' },
  { src: '/images/logos/salesforce.svg', alt: 'Salesforce' },
  { src: '/images/logos/revolut.svg', alt: 'Revolut' },
]

export default function Partners() {
  const t = useTranslations('partners')

  return (
    <div
      style={{
        background: 'var(--color-canvas-white)',
        borderTop: '1px solid var(--color-parchment-rule)',
        borderBottom: '1px solid var(--color-parchment-rule)',
        padding: '24px 0',
      }}
    >
      <Reveal variant="blur">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-stone)',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          {t('label')}
        </p>
      </Reveal>

      <Reveal variant="up" delay={0.05}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px 56px',
            padding: '0 24px',
          }}
        >
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="partner-logo"
            />
          ))}
        </div>
      </Reveal>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .partner-logo {
          height: 26px;
          width: auto;
          user-select: none;
          opacity: 0.55;
          filter: grayscale(1);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .partner-logo:hover {
          opacity: 0.9;
          filter: grayscale(0);
        }
        @media (max-width: 768px) {
          .partner-logo { height: 22px; }
        }
      `,
        }}
      />
    </div>
  )
}
