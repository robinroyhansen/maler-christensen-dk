import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { ContactForm } from "@/components/sections/ContactForm"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Kontakt os — Ring 53 50 77 00 | Gratis tilbud inden 24 timer",
  description: `Kontakt Schou & Christensen for et gratis maletilbud. Ring ${COMPANY.phone} eller udfyld formularen. Vi vender tilbage inden 24 timer.`,
  alternates: {
    canonical: `https://${COMPANY.domain}/kontakt/`,
  },
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
