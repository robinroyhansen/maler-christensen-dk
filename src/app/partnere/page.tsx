import type { Metadata } from "next"
import Image from "next/image"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { COMPANY } from "@/lib/constants"
import { getPageMeta } from "@/lib/data/page-meta"
import { Handshake, Building, Users, Award } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta("partnere", {
    title: "Partnere — Danske Malermestre & samarbejdspartnere",
    description: "Vi samarbejder med Danske Malermestre og førende leverandører. Kvalitetsmaling og professionelt udstyr til ethvert projekt.",
  })
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://${COMPANY.domain}/partnere/` },
  }
}

const PARTNERS = [
  {
    name: "Herlufmagle Skole",
    type: "Offentlig institution",
    description: "Langvarigt samarbejde om vedligeholdelse og renovering af skolens bygninger.",
    logo: "/images/partners/herlufmagle-skole.png",
  },
  {
    name: "Slagelse Kommune",
    type: "Offentlig institution",
    description: "Udførsel af malerarbejde på kommunale bygninger og institutioner.",
    logo: "/images/partners/Slagelse-kommune.png",
  },
  {
    name: "Lars Printz",
    type: "Erhvervspartner",
    description: "Samarbejde om erhvervsprojekter og industrimaleri.",
    logo: "/images/partners/Lars-Printz.png",
  },
  {
    name: "Lux Tag",
    type: "Samarbejdspartner",
    description: "Partnerskab om boligrenovering og istandsættelse.",
    logo: "/images/partners/lux-tag.png",
  },
  {
    name: "Danske Malermestre",
    type: "Brancheforening",
    description: "Vi er stolte medlemmer af Danske Malermestre, som sikrer fagligt korrekt arbejde.",
    logo: "/images/partners/danskemalermestre-hvid.png",
  },
  {
    name: "Tømrermester Henrik Hjorth Harboe",
    type: "Håndværkspartner",
    description: "Professionelt tømrer- og snedkerarbejde siden 1998. Samarbejde om tilbygninger, renoveringer og totalentrepriser.",
    logo: "/images/partners/hhharboe.png",
    url: "https://www.hhharboe.dk",
  },
  {
    name: "Beck & Jørgensen",
    type: "Kvalitetsmaling",
    description: "Dansk malingsproducent med kvalitetsprodukter til professionelle. Leverandør af bygningsmaling og specialprodukter.",
    logo: "/images/partners/bj-logo.png",
    url: "http://www.bj.dk",
  },
  {
    name: "Dyrup",
    type: "Kvalitetsmaling",
    description: "Et af Danmarks mest kendte malingsmærker med et bredt sortiment af indendørs og udendørs maling i høj kvalitet.",
    logo: "/images/partners/dyrup-logo.png",
    url: "https://dyrup.dk",
  },
  {
    name: "Flügger",
    type: "Kvalitetsmaling",
    description: "Skandinavisk malingsleverandør med over 240 års erfaring. Professionelle produkter til alle overflader.",
    logo: "/images/partners/flugger-logo.svg",
    url: "https://www.flugger.dk",
  },
  {
    name: "Silkecement",
    type: "Materialeproducent",
    description: "Specialist i microcement og dekorative overfladeløsninger til vægge, gulve og badeværelser.",
    logo: "/images/partners/silkecement-logo.svg",
    url: "https://silkecement.dk",
  },
  {
    name: "Deko Design Systems",
    type: "Gulvløsninger",
    description: "Unikke dekorative metalliske polyurethan-gulve. Hver gulv er et kunstværk med levende farver og holdbare overflader.",
    logo: "/images/partners/deko-logo.svg",
    url: "https://dekodesignsystems.com/da/",
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
            {PARTNERS.map((partner, index) => {
              const content = (
                <>
                  <div className={`relative h-16 w-full mb-6 ${partner.name === "Danske Malermestre" ? "bg-gray-900 rounded-lg p-3" : ""}`}>
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo - samarbejdspartner med Schou & Christensen`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <span className="text-sm text-[#6b9834] font-medium">{partner.type}</span>
                  <h3 className="font-bold text-xl text-gray-900 mt-1 mb-3">{partner.name}</h3>
                  <p className="text-gray-600">{partner.description}</p>
                </>
              )
              const cardClass = "bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow block"
              return "url" in partner && partner.url ? (
                <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className={cardClass}>{content}</a>
              ) : (
                <div key={index} className={cardClass}>{content}</div>
              )
            })}
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
