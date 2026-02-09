import type { Metadata } from "next"
import Image from "next/image"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { CTA } from "@/components/sections/CTA"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { CountUp } from "@/components/ui/CountUp"
import { COMPANY } from "@/lib/constants"
import { getPageMeta } from "@/lib/data/page-meta"
import { getPageContent } from "@/lib/data/page-content"
import { CheckCircle, Award, Users, Clock, Star, Shield } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta("om-os", {
    title: "Om os — Malerfirmaet Schou & Christensen | Slagelse",
    description: `Mød Jess og Stefan — ejerne af Schou & Christensen, lokalt malerfirma i Slagelse med 25+ års samlet erfaring. Medlem af Danske Malermestre. ★ 4.9 på Trustpilot`,
  })
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://${COMPANY.domain}/om-os/` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://${COMPANY.domain}/om-os/`,
      images: [{ url: `https://${COMPANY.domain}/images/historie-1892.jpg`, width: 1200, height: 630, alt: "Om Schou & Christensen" }],
    },
  }
}

// Default sections that can be overridden from admin
const DEFAULT_SECTIONS = [
  {
    title: "Vores historie",
    content: `${COMPANY.name} drives af Jess og Stefan, som sammen har over 25 års erfaring inden for malerarbejde. Med deres kombinerede ekspertise og passion for håndværk har de opbygget et solidt ry for kvalitetsbevidst arbejde og personlig service.\n\nJess og Stefan startede firmaet med en simpel ambition: at levere malerarbejde, de selv ville være stolte af i deres egne hjem. Den filosofi gennemsyrer stadig alt, hvad vi gør i dag — fra de små detaljer til de store projekter.\n\nI dag servicerer vi kunder i hele Sjælland med et team af erfarne malere. Vi håndterer alt fra små istandsættelser til store renoveringsprojekter, og vores ${COMPANY.trustpilotRating}/5 rating på Trustpilot med over 250 anmeldelser vidner om vores engagement i kundetilfredshed.`,
  },
  {
    title: "Vores værdier",
    content: "Vi tror på, at godt håndværk handler om mere end bare at male en væg. Det handler om at lytte til kunden, forstå deres ønsker og levere et resultat, der overgår deres forventninger. Vi rydder altid op efter os, overholder aftaler og står ved vores arbejde.",
  },
]

export default async function OmOsPage() {
  const pageContent = await getPageContent("om-os", {
    page_type: "static",
    hero_title: "Om Schou & Christensen",
    hero_subtitle: "Lokal malerfirma med passion for kvalitet og håndværk",
    intro: `${COMPANY.name} er et lokalt malerfirma med base i Slagelse. Vi har specialiseret os i at levere professionelt malerarbejde af højeste kvalitet til private og erhvervskunder i hele Sjælland. Med 25+ års samlet erfaring dækker vi alle opgaver — fra små istandsættelser til store renoveringsprojekter.`,
    sections: DEFAULT_SECTIONS,
  })

  const sections = pageContent.sections.length > 0 ? pageContent.sections : DEFAULT_SECTIONS

  return (
    <>
      <Hero
        title={pageContent.hero_title || "Om Schou & Christensen"}
        subtitle={pageContent.hero_subtitle || "Lokal malerfirma med passion for kvalitet og håndværk"}
        variant="page"
        showTrustpilot={true}
      />

      <Breadcrumbs items={[{ label: "Om os" }]} />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimateIn>
              <div className="prose prose-lg prose-gray max-w-none">
                <p className="lead text-xl text-gray-600">
                  {pageContent.intro}
                </p>
              </div>
            </AnimateIn>

            {/* Dynamic sections from DB */}
            {sections.map((section, index) => (
              <div key={index}>
                {index === 1 && (
                  <AnimateIn delay={0.2} variant="scale">
                    <figure className="mt-8 mb-4">
                      <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src="/images/historie-1892.jpg"
                          alt="Malere fra 1892 — den stærke danske håndværkstradition"
                          width={2018}
                          height={2835}
                          className="w-full h-auto grayscale"
                        />
                      </div>
                      <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                        Malere anno 1892 — vi bygger videre på en stolt dansk håndværkstradition
                      </figcaption>
                    </figure>
                  </AnimateIn>
                )}
                <AnimateIn delay={0.1 * index}>
                  <div className="prose prose-lg prose-gray max-w-none">
                    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">{section.title}</h2>
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-600 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </AnimateIn>
              </div>
            ))}

            {/* Stats Grid with CountUp */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12" staggerDelay={0.1}>
              <StaggerItem>
                <div className="bg-[#6b9834] text-white rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold mb-2">
                    <CountUp target={COMPANY.trustpilotRating} decimals={1} />
                  </div>
                  <div className="text-white/80 text-sm">Trustpilot score</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <CountUp target={250} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">Anmeldelser</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <CountUp target={25} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">Års samlet erfaring</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <CountUp target={1700} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">Tilfredse kunder</div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Why Choose Us */}
            <div className="mt-16">
              <AnimateIn>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Hvorfor vælge os?
                </h2>
              </AnimateIn>
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-[#6b9834]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Høj kundetilfredshed</h3>
                      <p className="text-gray-600 text-sm">Med {COMPANY.trustpilotRating}/5 på Trustpilot er vi blandt de bedst anmeldte malerfirmaer i regionen.</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-[#6b9834]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Danske Malermestre</h3>
                      <p className="text-gray-600 text-sm">Som medlem af Danske Malermestre garanterer vi fagligt korrekt arbejde.</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-[#6b9834]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Erfarne malere</h3>
                      <p className="text-gray-600 text-sm">Vores team består af erfarne håndværkere med mange års erfaring.</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#6b9834]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Hurtig service</h3>
                      <p className="text-gray-600 text-sm">Vi svarer på henvendelser inden for 24 timer og holder altid vores deadlines.</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-[#6b9834]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Garanti på arbejde</h3>
                      <p className="text-gray-600 text-sm">Vi står ved vores arbejde og giver garanti på alle vores ydelser.</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-[#6b9834]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Fast pris</h3>
                      <p className="text-gray-600 text-sm">Vi tilbyder fast pris, så du altid ved, hvad det kommer til at koste.</p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  )
}
