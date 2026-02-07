import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { COMPANY } from "@/lib/constants"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Galleri",
  description: `Se eksempler på vores malerarbejde. ${COMPANY.name} har udført hundredvis af projekter - fra små istandsættelser til store renoveringer.`,
  alternates: {
    canonical: `https://${COMPANY.domain}/galleri/`,
  },
}

// Gallery categories and images
const GALLERY_CATEGORIES = [
  { id: "all", name: "Alle" },
  { id: "indendors", name: "Indendørs" },
  { id: "udendors", name: "Udendørs" },
  { id: "silkecement", name: "Silkecement" },
  { id: "erhverv", name: "Erhverv" },
]

// Placeholder images - will be replaced with real images from Supabase
const GALLERY_IMAGES = [
  { id: 1, category: "indendors", alt: "Malet stue med hvide vægge", caption: "Komplet maling af stue i villa" },
  { id: 2, category: "indendors", alt: "Malet soveværelse", caption: "Nyistandsat soveværelse" },
  { id: 3, category: "udendors", alt: "Malet facade", caption: "Udvendig husmaling" },
  { id: 4, category: "udendors", alt: "Malet træværk", caption: "Træmaling af vinduer og døre" },
  { id: 5, category: "silkecement", alt: "Silkecement badeværelse", caption: "Silkecement i badeværelse" },
  { id: 6, category: "silkecement", alt: "Silkecement vægge", caption: "Silkecement finish" },
  { id: 7, category: "indendors", alt: "Malet køkken", caption: "Renoveret køkken" },
  { id: 8, category: "erhverv", alt: "Malet butik", caption: "Butiksmaleri" },
  { id: 9, category: "indendors", alt: "Malet trappe", caption: "Trappemaling" },
  { id: 10, category: "udendors", alt: "Malet carport", caption: "Carport maling" },
  { id: 11, category: "silkecement", alt: "Silkecement entré", caption: "Silkecement i entré" },
  { id: 12, category: "erhverv", alt: "Malet kontor", caption: "Kontormaling" },
]

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
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                className="px-6 py-2 rounded-full border-2 border-[#6b9834] text-[#6b9834] hover:bg-[#6b9834] hover:text-white transition-colors font-medium"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {GALLERY_IMAGES.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Placeholder - will be replaced with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6b9834]/20 to-[#85bd41]/20 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-[#6b9834]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#6b9834]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">{image.caption}</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-semibold">{image.caption}</p>
                    <p className="text-sm text-white/80">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
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
