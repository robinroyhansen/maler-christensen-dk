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

// LocalBusiness Schema for homepage
function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Malerfirmaet Schou & Christensen ApS",
    "image": `https://${COMPANY.domain}/images/hero.jpg`,
    "url": `https://${COMPANY.domain}`,
    "telephone": "+4553507700",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Enighedsvej 2",
      "addressLocality": "Slagelse",
      "postalCode": "4200",
      "addressCountry": "DK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 55.4028,
      "longitude": 11.3547
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": COMPANY.trustpilotRating.toString(),
      "reviewCount": COMPANY.trustpilotReviews.toString(),
      "bestRating": "5"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 07:00-16:00"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
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
