import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { COMPANY } from "@/lib/constants"
import { Handshake, Building, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Partnere",
  description: `Se vores samarbejdspartnere. ${COMPANY.name} samarbejder med lokale virksomheder og leverandører for at levere det bedste resultat.`,
  alternates: {
    canonical: `https://${COMPANY.domain}/partnere/`,
  },
}

const PARTNERS = [
  {
    name: "Herlufmagle Skole",
    type: "Offentlig institution",
    description: "Langvarigt samarbejde om vedligeholdelse og renovering af skolens bygninger.",
  },
  {
    name: "Tømrer Skovgaard",
    type: "Håndværkspartner",
    description: "Samarbejde om totalrenoveringsprojekter, hvor vi kombinerer tømrer- og malerarbejde.",
  },
  {
    name: "Slagelse Kommune",
    type: "Offentlig institution",
    description: "Udførsel af malerarbejde på kommunale bygninger og institutioner.",
  },
  {
    name: "Lars Printz",
    type: "Erhvervspartner",
    description: "Samarbejde om erhvervsprojekter og industrimaleri.",
  },
  {
    name: "Lux Tag",
    type: "Samarbejdspartner",
    description: "Partnerskab om boligrenovering og istandsættelse.",
  },
  {
    name: "Danske Malermestre",
    type: "Brancheforening",
    description: "Vi er stolte medlemmer af Danske Malermestre, som sikrer fagligt korrekt arbejde.",
  },
]

export default function PartnerePage() {
  return (
    <>
      <Hero
        title="Vores partnere"
        subtitle="Stærke samarbejder for bedre resultater"
        variant="page"
        showTrustpilot={false}
        showCTA={false}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-600">
              Hos {COMPANY.name} tror vi på værdien af stærke partnerskaber. Vi samarbejder med 
              lokale virksomheder, institutioner og leverandører for at sikre de bedste resultater 
              for vores kunder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#6b9834]/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-[#6b9834]">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-[#6b9834] font-medium">{partner.type}</span>
                <h3 className="font-bold text-xl text-gray-900 mt-1 mb-3">{partner.name}</h3>
                <p className="text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>

          {/* Partnership Benefits */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Fordele ved vores partnerskaber
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#6b9834] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Samarbejde</h3>
                <p className="text-gray-600 text-sm">Tæt samarbejde med andre fagfolk for bedre løsninger</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#6b9834] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Totalløsninger</h3>
                <p className="text-gray-600 text-sm">Vi kan tilbyde komplette renoveringsløsninger</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#6b9834] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lokalt netværk</h3>
                <p className="text-gray-600 text-sm">Stærkt lokalt netværk af pålidelige partnere</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#6b9834] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Kvalitetssikring</h3>
                <p className="text-gray-600 text-sm">Alle partnere lever op til vores kvalitetskrav</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTA
        title="Interesseret i samarbejde?"
        subtitle="Kontakt os for at høre mere om vores partnermuligheder"
      />
    </>
  )
}
