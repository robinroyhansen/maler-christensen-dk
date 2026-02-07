import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { ContactForm } from "@/components/sections/ContactForm"
import { Container } from "@/components/ui/Container"
import { Reviews } from "@/components/sections/Reviews"
import { COMPANY } from "@/lib/constants"
import { CheckCircle, Clock, Shield, Banknote } from "lucide-react"

export const metadata: Metadata = {
  title: "Få gratis tilbud | Maler Slagelse — Schou & Christensen",
  description: `Få et gratis og uforpligtende tilbud på malerarbejde i Slagelse og Sjælland. Svar inden 24 timer. Ring ${COMPANY.phone} eller udfyld formularen.`,
  alternates: {
    canonical: `https://${COMPANY.domain}/maler-tilbud/`,
  },
}

export default function MalerTilbudPage() {
  return (
    <>
      <Hero
        title="Få et gratis tilbud"
        subtitle="Udfyld formularen, og modtag et uforpligtende tilbud inden for 24 timer"
        variant="page"
        showCTA={false}
      />

      <section className="py-12 bg-gray-50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#6b9834] rounded-full flex items-center justify-center flex-shrink-0">
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Gratis tilbud</p>
                <p className="text-sm text-gray-600">Ingen bindinger</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#6b9834] rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Svar inden 24 timer</p>
                <p className="text-sm text-gray-600">Hurtig respons</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#6b9834] rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Fast pris</p>
                <p className="text-sm text-gray-600">Ingen overraskelser</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#6b9834] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Garanti</p>
                <p className="text-sm text-gray-600">Vi står ved vores arbejde</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactForm
        title="Beskriv dit projekt"
        subtitle="Jo flere detaljer du giver os, jo mere præcist kan vi give dig et tilbud."
        showMap={false}
        pageSlug="maler-tilbud"
      />

      <Reviews />
    </>
  )
}
