import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { ReviewsServer } from "@/components/sections/ReviewsServer"
import { About } from "@/components/sections/About"
import { GalleryPreview } from "@/components/sections/GalleryPreview"
import { Cities } from "@/components/sections/Cities"
import { CTA } from "@/components/sections/CTA"
import { ContactForm } from "@/components/sections/ContactForm"
import { Partners } from "@/components/sections/Partners"
import { COMPANY } from "@/lib/constants"
import { getPageMeta } from "@/lib/data/page-meta"

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta("forside", {
    title: `Malerfirma Slagelse — ★ ${COMPANY.trustpilotRating} på Trustpilot | ${COMPANY.trustpilotReviews}+ anmeldelser`,
    description: `Professionelt malerfirma i Slagelse. Indvendig og udvendig maling, spartling, tapetsering og microcement. Gratis tilbud — ring ${COMPANY.phone}`,
  })
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://${COMPANY.domain}/` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://${COMPANY.domain}/`,
      images: [{
        url: `https://${COMPANY.domain}/images/hero/hero.jpg`,
        width: 1200, height: 630,
        alt: `${COMPANY.name} — professionelt malerarbejde i Slagelse`,
      }],
    },
  }
}

export default function HomePage() {
  return (
    <>
      <Hero 
        title={`Maler i ${COMPANY.city} med ${COMPANY.trustpilotRating} på Trustpilot`}
        subtitle="Professionelt malerarbejde til private og erhverv. Vi leverer kvalitet, pålidelighed og konkurrencedygtige priser – hver gang."
        variant="home"
      />
      
      <Services />
      
      <About />
      
      <GalleryPreview />
      
      <ReviewsServer pageSlug="homepage" />
      
      <Partners variant="strip" />
      
      <Cities />
      
      <CTA />
      
      <ContactForm 
        title="Få et gratis tilbud"
        subtitle="Kontakt os i dag for et uforpligtende tilbud på dit malerarbejde. Vi vender tilbage inden for 24 timer."
        pageSlug="homepage"
      />
    </>
  )
}
