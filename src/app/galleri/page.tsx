import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { ProjectGallery, SILKECEMENT_IMAGES, GalleryImage } from "@/components/sections/ProjectGallery"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Galleri — Se vores malerarbejde | Før og efter billeder",
  description: `Se eksempler på vores malerarbejde. Microcement, husmaling, lejligheder og erhverv. Lad dig inspirere til dit næste projekt.`,
  alternates: {
    canonical: `https://${COMPANY.domain}/galleri/`,
  },
}

// Indoor gallery images from WordPress (only verified working URLs)
const INDOOR_WORKING_IDS = [1, 2, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 23, 24]
const INDOOR_GALLERY_IMAGES: GalleryImage[] = INDOOR_WORKING_IDS.map((id, i) => ({
  src: `https://maler-christensen.dk/wp-content/uploads/2021/06/${id}-300x225-1.jpg`,
  alt: `Indvendigt malerarbejde — vægge og lofter, projekt ${i + 1}`,
  caption: "Indvendigt malerarbejde",
}))

// Outdoor gallery images from WordPress (only verified working URLs)
const OUTDOOR_WORKING_IDS = [33, 34, 35, 36, 37, 38, 39, 43]
const OUTDOOR_GALLERY_IMAGES: GalleryImage[] = OUTDOOR_WORKING_IDS.map((id, i) => ({
  src: `https://maler-christensen.dk/wp-content/uploads/2021/06/${id}-300x225-1.jpg`,
  alt: `Udvendigt malerarbejde — facade og vinduer, projekt ${i + 1}`,
  caption: "Udvendigt malerarbejde",
}))

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

      {/* Microcement Gallery */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Microcement projekter
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
        </Container>
      </section>

      {/* Indoor Gallery */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Indvendigt malerarbejde
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fra stuer og soveværelser til køkkener og badeværelser – vi maler alle rum.
            </p>
          </div>

          <ProjectGallery
            images={INDOOR_GALLERY_IMAGES}
            columns={4}
            showContainer={false}
          />
        </Container>
      </section>

      {/* Outdoor Gallery */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Udvendigt malerarbejde
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Facademaling, vinduer, døre og meget mere – vi holder dit hus flot udvendigt.
            </p>
          </div>

          <ProjectGallery
            images={OUTDOOR_GALLERY_IMAGES}
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
