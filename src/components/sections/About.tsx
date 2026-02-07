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
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Stats Side */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#6b9834] to-[#85bd41] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Hvorfor vælge os?</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{COMPANY.trustpilotRating}</div>
                  <div className="text-white/80 text-sm">Trustpilot score</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">200+</div>
                  <div className="text-white/80 text-sm">Tilfredse kunder</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-white/80 text-sm">Års erfaring</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">37+</div>
                  <div className="text-white/80 text-sm">Dækkede byer</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-6 flex items-center gap-4">
                <Award className="w-10 h-10 text-[#6b9834]" />
                <div>
                  <p className="font-semibold text-gray-900">Certificeret</p>
                  <p className="text-sm text-gray-600">Danske Malermestre</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 flex items-center gap-4">
                <Clock className="w-10 h-10 text-[#6b9834]" />
                <div>
                  <p className="font-semibold text-gray-900">Hurtig service</p>
                  <p className="text-sm text-gray-600">Svar inden 24 timer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
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
                <CheckCircle className="w-6 h-6 text-[#6b9834] flex-shrink-0" />
                <span className="text-gray-700">Gratis og uforpligtende tilbud</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#6b9834] flex-shrink-0" />
                <span className="text-gray-700">Erfarne og professionelle malere</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#6b9834] flex-shrink-0" />
                <span className="text-gray-700">Konkurrencedygtige priser</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#6b9834] flex-shrink-0" />
                <span className="text-gray-700">Medlem af Danske Malermestre</span>
              </li>
            </ul>

            {!showFull && (
              <Link href="/om-os/">
                <Button variant="outline">
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
