import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { ContactForm } from "@/components/sections/ContactForm"
import { COMPANY } from "@/lib/constants"
import { getPageMeta } from "@/lib/data/page-meta"

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta("kontakt", {
    title: "Kontakt os — Ring 53 50 77 00 | Gratis tilbud inden 24 timer",
    description: `Kontakt Schou & Christensen for et gratis maletilbud. Ring ${COMPANY.phone} eller udfyld formularen. Vi vender tilbage inden 24 timer.`,
  })
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://${COMPANY.domain}/kontakt/` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://${COMPANY.domain}/kontakt/`,
      images: [{ url: `https://${COMPANY.domain}/images/hero/hero.jpg`, width: 1200, height: 630, alt: "Kontakt Schou & Christensen" }],
    },
  }
}

export default function KontaktPage() {
  return (
    <>
      <Hero
        title="Kontakt os"
        subtitle="Vi er klar til at hjælpe dig med dit næste malerprojekt"
        variant="page"
        showTrustpilot={false}
        showCTA={false}
      />

      <ContactForm
        title="Få et gratis tilbud"
        subtitle="Udfyld formularen, og vi vender tilbage inden for 24 timer med et uforpligtende tilbud."
        showMap={true}
        pageSlug="kontakt"
      />
    </>
  )
}
