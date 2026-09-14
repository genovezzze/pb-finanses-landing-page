import Image from 'next/image'
import Founder from '@/components/sections/Founder'
import Team from '@/components/sections/Team'
import Office from '@/components/sections/Office'

export default function AboutPage() {
  return (
    <main>
      {/* Wide banner under the navbar, then the rest of the page unchanged. */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(96px, 11vw, 150px)',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/team-hero.jpg"
          alt="PB Finanses komanda"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <Founder />
      <Team />
      <Office />
    </main>
  )
}
