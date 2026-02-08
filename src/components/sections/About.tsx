import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { COMPANY } from "@/lib/constants"
import Link from "next/link"
import { CheckCircle, Award, Users, Clock } from "lucide-react"

interface AboutProps {
  title?: string
  showFull?: boolean
}

export function About({ 
  title = "Om Schou & Christensen",
  showFull = false 
}: AboutProps) {
  return (
    <section className="py-16 md:py-24 bg-[#f9f8f6] relative">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Stats Side */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#6b9834] to-[#85bd41] rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Hvorfor vælge os?</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-4xl font-bold mb-2">{COMPANY.trustpilotRating}</div>
                  <div className="text-white/80 text-sm">Trustpilot score</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-4xl font-bold mb-2">250+</div>
                  <div className="text-white/80 text-sm">Anmeldelser</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-white/80 text-sm">Års erfaring</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-4xl font-bold mb-2">1700+</div>
                  <div className="text-white/80 text-sm">Tilfredse kunder</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#6b9834]/10 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#6b9834]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Certificeret</p>
                  <p className="text-sm text-gray-500">Danske Malermestre</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#6b9834]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#6b9834]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Hurtig service</p>
                  <p className="text-sm text-gray-500">Svar inden 24 timer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight section-heading-accent section-heading-accent-left">
              {title}
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed mt-10">
              Malerfirmaet Schou & Christensen er et lokalt malerfirma med base i Slagelse. 
              Vi har specialiseret os i alt fra indvendig og udvendig maling til 
              sprøjtespartling, tapetsering og specialbehandlinger.
            </p>

            {showFull && (
              <>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Med malermester Jess i spidsen, sikrer vi altid at arbejdet udføres med 
                  den højeste kvalitet og professionalisme. Vi er stolte medlemmer af 
                  Danske Malermestre, hvilket garanterer vores kunder fagligt korrekt arbejde.
                </p>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Vi servicerer hele Sjælland, fra Slagelse til København, og tilbyder 
                  konkurrencedygtige priser uden at gå på kompromis med kvaliteten.
                </p>
              </>
            )}

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#6b9834]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#6b9834]" />
                </div>
                <span className="text-gray-700 font-medium">Gratis og uforpligtende tilbud</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#6b9834]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#6b9834]" />
                </div>
                <span className="text-gray-700 font-medium">Erfarne og professionelle malere</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#6b9834]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#6b9834]" />
                </div>
                <span className="text-gray-700 font-medium">Konkurrencedygtige priser</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#6b9834]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#6b9834]" />
                </div>
                <span className="text-gray-700 font-medium">Medlem af Danske Malermestre</span>
              </li>
            </ul>

            {!showFull && (
              <Link href="/om-os/">
                <Button variant="outline" className="border-[#6b9834] text-[#6b9834] hover:bg-[#6b9834] hover:text-white">
                  Læs mere om os
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
