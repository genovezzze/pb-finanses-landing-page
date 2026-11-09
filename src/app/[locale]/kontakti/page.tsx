import { getTranslations } from 'next-intl/server'
import ContactPage from '@/components/sections/ContactPage'
import PageHero from '@/components/sections/PageHero'

export default async function ContactRoute({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const nav = await getTranslations({ locale, namespace: 'nav' })
  const c = await getTranslations({ locale, namespace: 'contact' })
  return (
    <main>
      <PageHero
        eyebrow={nav('contact')}
        title={c('title')}
        image="/images/ventspils-nakts.webp"
        objectPosition="center 85%"
        credit="Agnese Pastare"
      />
      <ContactPage />
    </main>
  )
}
