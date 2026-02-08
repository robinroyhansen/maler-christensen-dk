import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { ServiceGallery } from "@/components/sections/ServiceGallery"
import { COMPANY } from "@/lib/constants"
import { getPageMeta } from "@/lib/data/page-meta"

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta("galleri", {
    title: "Galleri — Se vores malerarbejde | Før og efter billeder",
    description: "Se eksempler på vores malerarbejde. Microcement, husmaling, lejligheder og erhverv. Lad dig inspirere til dit næste projekt.",
  })
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://${COMPANY.domain}/galleri/` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://${COMPANY.domain}/galleri/`,
      images: [{ url: `https://${COMPANY.domain}/images/hero/hero.jpg`, width: 1200, height: 630, alt: "Galleri — Schou & Christensen malerarbejde" }],
    },
  }
}

const GALLERY_SECTIONS = [
  {
    category: "microcement",
    title: "Microcement projekter",
    subtitle: "Se vores nyeste microcement projekter — vægge, gulve og badeværelser.",
  },
  {
    category: "indvendig-maling",
    title: "Indvendigt malerarbejde",
    subtitle: "Fra stuer og soveværelser til køkkener og erhvervslokaler — vi maler alle rum.",
  },
  {
    category: "udvendig-maling",
    title: "Udvendigt malerarbejde",
    subtitle: "Facademaling, kirker, vinduer og døre — vi holder dit hus flot udvendigt.",
  },
  {
    category: "pu-gulv",
    title: "Metallisk PU gulv",
    subtitle: "Unikke epoxygulve med metallisk finish — hvert gulv er et kunstværk.",
  },
  {
    category: "sprojtespartling",
    title: "Sprøjtespartling",
    subtitle: "Professionel sprøjtespartling af lofter og vægge i nybyggeri og renovering.",
  },
  {
    category: "sproejtmaling",
    title: "Sprøjtemaling",
    subtitle: "Effektiv sprøjtemaling af trælofter, paneler og store flader — før og efter.",
  },
  {
    category: "maling-trappe",
    title: "Trappeopgange",
    subtitle: "Maling af trappeopgange i etageejendomme — fra afdækning til flot resultat.",
  },
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

      {GALLERY_SECTIONS.map((section, index) => (
        <section
          key={section.category}
          className={`py-16 md:py-24 ${index % 2 === 1 ? "bg-gray-50" : ""}`}
        >
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {section.subtitle}
              </p>
            </div>

            <ServiceGallery
              category={section.category}
              title=""
              subtitle=""
              columns={4}
            />
          </Container>
        </section>
      ))}

      <CTA
        title="Inspireret til dit eget projekt?"
        subtitle="Kontakt os i dag for et gratis tilbud"
      />
    </>
  )
}
