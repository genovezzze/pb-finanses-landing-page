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
  return (
    <main>
      <PageHero eyebrow={t('eyebrow')} title={nav('about')} />

      <Founder headerInBanner />
      <Team />
      <Office />
    </main>
  )
}
