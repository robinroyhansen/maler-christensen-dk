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
    <section className="py-12 sm:py-16 md:py-24 bg-[#f9f8f6] relative">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image/Stats Side */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-[#6b9834] to-[#85bd41] rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Hvorfor vælge os?</h3>
              
              {/* Stats Grid - equal sized cells */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl aspect-square sm:aspect-auto flex flex-col items-center justify-center">
                  <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{COMPANY.trustpilotRating}</div>
                  <div className="text-white/80 text-xs sm:text-sm">Trustpilot score</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl aspect-square sm:aspect-auto flex flex-col items-center justify-center">
                  <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">250+</div>
                  <div className="text-white/80 text-xs sm:text-sm">Anmeldelser</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl aspect-square sm:aspect-auto flex flex-col items-center justify-center">
                  <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">15+</div>
                  <div className="text-white/80 text-xs sm:text-sm">Års erfaring</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl aspect-square sm:aspect-auto flex flex-col items-center justify-center">
                  <div className="text-xl sm:text-4xl font-bold mb-1 sm:mb-2">1700+</div>
                  <div className="text-white/80 text-xs sm:text-sm">Tilfredse kunder</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6b9834]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#6b9834]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Certificeret</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">Danske Malermestre</p>
                </div>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6b9834]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#6b9834]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Hurtig service</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">Svar inden 24 timer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight section-heading-accent section-heading-accent-left">
              {title}
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed mt-8 sm:mt-10">
              Malerfirmaet Schou & Christensen er et lokalt malerfirma med base i Slagelse. 
              Vi har specialiseret os i alt fra indvendig og udvendig maling til 
              sprøjtespartling, tapetsering og specialbehandlinger.
            </p>

            {showFull && (
              <>
                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Med malermester Jess i spidsen, sikrer vi altid at arbejdet udføres med 
                  den højeste kvalitet og professionalisme. Vi er stolte medlemmer af 
                  Danske Malermestre, hvilket garanterer vores kunder fagligt korrekt arbejde.
                </p>

                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Vi servicerer hele Sjælland, fra Slagelse til København, og tilbyder 
                  konkurrencedygtige priser uden at gå på kompromis med kvaliteten.
                </p>
              </>
            )}

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6b9834]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#6b9834]" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Gratis og uforpligtende tilbud</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6b9834]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#6b9834]" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Erfarne og professionelle malere</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6b9834]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#6b9834]" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Konkurrencedygtige priser</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6b9834]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#6b9834]" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Medlem af Danske Malermestre</span>
              </li>
            </ul>

            {!showFull && (
              <Link href="/om-os/">
                <Button variant="outline" className="border-[#6b9834] text-[#6b9834] hover:bg-[#6b9834] hover:text-white min-h-[44px]">
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
