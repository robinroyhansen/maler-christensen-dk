import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { ProjectGallery, SILKECEMENT_IMAGES } from "@/components/sections/ProjectGallery"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Galleri | Schou & Christensen — Se vores malerarbejde",
  description: `Se billeder af vores malerarbejde — microcement, sprøjtespartling, indvendig maling og meget mere. Hundredvis af færdige projekter i Slagelse og Sjælland.`,
  alternates: {
    canonical: `https://${COMPANY.domain}/galleri/`,
  },
}

export default function GalleriPage() {
  return (
    <>
      <Hero
        title="Galleri"
        subtitle="Se eksempler på vores arbejde"
        variant="page"
        showTrustpilot={false}
        showCTA={false}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Microcement & Microcement projekter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Se vores nyeste microcement projekter. Klik på billederne for at se dem i fuld størrelse.
            </p>
          </div>

          <ProjectGallery
            images={SILKECEMENT_IMAGES}
            columns={4}
            showContainer={false}
          />

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Galleriet opdateres løbende med nye projekter. Kontakt os for at se flere eksempler på vores arbejde.
            </p>
          </div>
        </Container>
      </section>

      <CTA
        title="Inspireret til dit eget projekt?"
        subtitle="Kontakt os i dag for et gratis tilbud"
      />
    </>
  )
}
