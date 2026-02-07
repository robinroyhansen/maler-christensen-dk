import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { COMPANY } from "@/lib/constants"
import { CheckCircle, Award, Users, Clock, Star, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Om os | Malerfirmaet Schou & Christensen, Slagelse",
  description: `Mød Malerfirmaet Schou & Christensen — lokalt malerfirma i Slagelse siden 2009. Medlem af Danske Malermestre med ★ 4.9 på Trustpilot fra 200+ kunder.`,
  alternates: {
    canonical: `https://${COMPANY.domain}/om-os/`,
  },
}

export default function OmOsPage() {
  return (
    <>
      <Hero
        title="Om Schou & Christensen"
        subtitle="Lokal malerfirma med passion for kvalitet og håndværk"
        variant="page"
        showTrustpilot={true}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="lead text-xl text-gray-600">
                {COMPANY.name} er et lokalt malerfirma med base i Slagelse. Vi har specialiseret 
                os i at levere professionelt malerarbejde af højeste kvalitet til private og 
                erhvervskunder i hele Sjælland.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Vores historie</h2>
              <p className="text-gray-600 leading-relaxed">
                Med malermester Jess i spidsen har vi opbygget et solidt ry for kvalitetsbevidst 
                arbejde og personlig service. Vores rejse startede med en simpel ambition: at levere 
                malerarbejde, vi selv ville være stolte af i vores egne hjem.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I dag servicerer vi kunder fra Slagelse til København, og vores team af erfarne 
                malere håndterer alt fra små istandsættelser til store renoveringsprojekter. Vores 
                {COMPANY.trustpilotRating}/5 rating på Trustpilot vidner om vores engagement i kundetilfredshed.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Vores værdier</h2>
              <p className="text-gray-600 leading-relaxed">
                Vi tror på, at godt håndværk handler om mere end bare at male en væg. Det handler 
                om at lytte til kunden, forstå deres ønsker og levere et resultat, der overgår 
                deres forventninger. Vi rydder altid op efter os, overholder aftaler og står ved 
                vores arbejde.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-[#6b9834] text-white rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">{COMPANY.trustpilotRating}</div>
                <div className="text-white/80 text-sm">Trustpilot score</div>
              </div>
              <div className="bg-gray-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
                <div className="text-gray-600 text-sm">Tilfredse kunder</div>
              </div>
              <div className="bg-gray-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-gray-600 text-sm">Års erfaring</div>
              </div>
              <div className="bg-gray-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">37+</div>
                <div className="text-gray-600 text-sm">Byer vi dækker</div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Hvorfor vælge os?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-[#6b9834]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Høj kundetilfredshed</h3>
                    <p className="text-gray-600 text-sm">Med {COMPANY.trustpilotRating}/5 på Trustpilot er vi blandt de bedst anmeldte malerfirmaer i regionen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#6b9834]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Danske Malermestre</h3>
                    <p className="text-gray-600 text-sm">Som medlem af Danske Malermestre garanterer vi fagligt korrekt arbejde.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#6b9834]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Erfarne malere</h3>
                    <p className="text-gray-600 text-sm">Vores team består af erfarne håndværkere med mange års erfaring.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#6b9834]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Hurtig service</h3>
                    <p className="text-gray-600 text-sm">Vi svarer på henvendelser inden for 24 timer og holder altid vores deadlines.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#6b9834]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Garanti på arbejde</h3>
                    <p className="text-gray-600 text-sm">Vi står ved vores arbejde og giver garanti på alle vores ydelser.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#6b9834]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fast pris</h3>
                    <p className="text-gray-600 text-sm">Vi tilbyder fast pris, så du altid ved, hvad det kommer til at koste.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  )
}
