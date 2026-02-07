import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { COMPANY } from "@/lib/constants"
import { Target, Heart, Lightbulb, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Vores vision",
  description: `Læs om ${COMPANY.name}s vision og værdier. Vi stræber efter at være det foretrukne valg for malerarbejde i Sjælland.`,
  alternates: {
    canonical: `https://${COMPANY.domain}/vision/`,
  },
}

export default function VisionPage() {
  return (
    <>
      <Hero
        title="Vores vision"
        subtitle="At skabe smukke hjem og glade kunder"
        variant="page"
        showTrustpilot={false}
        showCTA={false}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Mission Statement */}
            <div className="text-center mb-20">
              <div className="w-20 h-20 bg-[#6b9834] rounded-full flex items-center justify-center mx-auto mb-8">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Vores mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At levere professionelt malerarbejde af højeste kvalitet, hvor kundens 
                tilfredshed altid er i centrum. Vi stræber efter at være det naturlige 
                valg for både private og erhverv, når der skal males i Sjælland.
              </p>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Vores kerneværdier
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#6b9834]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-[#6b9834]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Passion</h3>
                  <p className="text-gray-600">
                    Vi elsker vores håndværk og brænder for at levere et resultat, vi selv 
                    ville være stolte af i vores egne hjem.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#6b9834]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-8 h-8 text-[#6b9834]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Kvalitet</h3>
                  <p className="text-gray-600">
                    Vi går aldrig på kompromis med kvaliteten. Fra forberedelse til 
                    finish – alt skal være i top.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#6b9834]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-[#6b9834]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Udvikling</h3>
                  <p className="text-gray-600">
                    Vi følger med tiden og lærer konstant nye teknikker og metoder 
                    for at blive endnu bedre.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Promise */}
            <div className="bg-gradient-to-br from-[#6b9834] to-[#85bd41] rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Vores løfte til dig</h2>
              <div className="space-y-4 text-white/90 text-lg">
                <p>
                  Når du vælger {COMPANY.name}, lover vi:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>At behandle dit hjem med respekt og omhu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>At levere det arbejde, vi har lovet – til den aftalte pris</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>At rydde op efter os og efterlade et rent arbejdsområde</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>At stå ved vores arbejde og udbedre eventuelle fejl</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>At være ærlige og gennemsigtige i al vores kommunikation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Looking Forward */}
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Fremtiden
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Vi ser frem til at fortsætte vores rejse med at skabe smukke hjem 
                og glade kunder. Vores mål er at udvide vores team, investere i nye 
                teknologier og metoder, og fortsat levere malerarbejde af højeste 
                kvalitet til hele Sjælland.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTA
        title="Del vores vision?"
        subtitle="Lad os skabe noget smukt sammen"
      />
    </>
  )
}
