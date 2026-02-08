import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { ReviewsServer } from "@/components/sections/ReviewsServer"
import { CTA } from "@/components/sections/CTA"
import { COMPANY } from "@/lib/constants"
import { getPageMeta } from "@/lib/data/page-meta"
import { Building2, Home, Factory, TreePine, Star } from "lucide-react"
import Link from "next/link"

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta("referencer", {
    title: "Referencer — Læs 250+ kundeanmeldelser | ★ 4.9 Trustpilot",
    description: "Læs hvad vores kunder siger. 250+ anmeldelser på Trustpilot med 4.9/5 i score. Se hvorfor vi er Sjællands bedst anmeldte maler.",
  })
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://${COMPANY.domain}/referencer/` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://${COMPANY.domain}/referencer/`,
      images: [{ url: `https://${COMPANY.domain}/images/hero/hero.jpg`, width: 1200, height: 630, alt: "Referencer — Schou & Christensen" }],
    },
  }
}

const REFERENCE_PROJECTS = [
  {
    title: "Villarenovering i Slagelse",
    type: "Privat",
    description: "Komplet indvendig renovering af 180 m² villa inkl. sprøjtespartling, maling og tapetsering.",
    icon: Home,
  },
  {
    title: "Lejlighedsmaling i København",
    type: "Privat",
    description: "Maling af 85 m² lejlighed ved fraflytning. Udført på 2 dage med fuld kundetilfredshed.",
    icon: Building2,
  },
  {
    title: "Erhvervsmaleri i Roskilde",
    type: "Erhverv",
    description: "Maling af 500 m² kontorlandskab inkl. weekend-arbejde for minimal forstyrrelse.",
    icon: Factory,
  },
  {
    title: "Sommerhus i Nordsjælland",
    type: "Privat",
    description: "Udvendig og indvendig maling af sommerhus. Træbehandling og facaderenovering.",
    icon: TreePine,
  },
  {
    title: "Microcement badeværelse",
    type: "Privat",
    description: "Komplet microcement-løsning i badeværelse. Unik finish med 5 års garanti.",
    icon: Star,
  },
  {
    title: "Butiksmaling i Køge",
    type: "Erhverv",
    description: "Hurtig renovering af butikslokale på 200 m² i forbindelse med ejerskifte.",
    icon: Building2,
  },
]

export default function ReferencerPage() {
  return (
    <>
      <Hero
        title="Referencer"
        subtitle="Se hvad vores kunder siger om os"
        variant="page"
        showTrustpilot={true}
        showCTA={false}
      />

      <Breadcrumbs items={[{ label: "Referencer" }]} />

      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Udvalgte projekter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vi har udført hundredvis af projekter for både private og erhverv. 
              Her er et udvalg af vores arbejde.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REFERENCE_PROJECTS.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <project.icon className="w-6 h-6 text-[#6b9834]" />
                  </div>
                  <div>
                    <span className="text-sm text-[#6b9834] font-medium">{project.type}</span>
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/galleri/"
              className="text-[#6b9834] font-semibold hover:text-[#5a8229] transition-colors"
            >
              Se flere eksempler i vores galleri →
            </Link>
          </div>
        </Container>
      </section>

      <ReviewsServer 
        title="Kundeanmeldelser"
        subtitle={`${COMPANY.trustpilotRating}/5 stjerner baseret på ${COMPANY.trustpilotReviews}+ anmeldelser`}
      />

      <CTA />
    </>
  )
}
