import { Container } from "@/components/ui/Container"
import { CITIES } from "@/lib/constants"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

interface CitiesProps {
  title?: string
  subtitle?: string
  limit?: number
}

export function Cities({
  title = "Vi dækker hele Sjælland",
  subtitle = "Professionelt malerarbejde i dit lokalområde",
  limit = 12,
}: CitiesProps) {
  const displayedCities = limit ? CITIES.slice(0, limit) : CITIES

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#6b9834]/5 relative">
      {/* Subtle top wave */}
      <div className="wave-divider-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      <Container>
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight section-heading-accent">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mt-6 px-4 sm:px-0">{subtitle}</p>
        </div>

        {/* Responsive grid: 2 cols on very small, 3 on small, then scales up */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {displayedCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/`}
              className="group flex items-center gap-1.5 sm:gap-2 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl hover:bg-[#6b9834] transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] active:scale-[0.98]"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6b9834] group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs sm:text-sm truncate">
                {city.name}
              </span>
            </Link>
          ))}
        </div>

        {CITIES.length > limit && (
          <div className="text-center mt-8 sm:mt-10">
            <Link 
              href="/maler-slagelse/" 
              className="inline-flex items-center gap-2 text-[#6b9834] font-semibold hover:text-[#5a8229] transition-colors group min-h-[44px] text-sm sm:text-base"
            >
              <span className="text-center">+ {CITIES.length - limit} flere byer — Se alle områder</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
          </div>
        )}
      </Container>

      {/* Subtle bottom wave */}
      <div className="wave-divider-bottom">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  )
}
