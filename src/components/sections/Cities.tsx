import { Container } from "@/components/ui/Container"
import { CITIES } from "@/lib/constants"
import Link from "next/link"
import { MapPin } from "lucide-react"

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
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayedCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/`}
              className="group flex items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-[#6b9834] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#6b9834] group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-sm">
                {city.name}
              </span>
            </Link>
          ))}
        </div>

        {CITIES.length > limit && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              + {CITIES.length - limit} flere byer.{" "}
              <Link href="/maler-slagelse/" className="text-[#6b9834] font-semibold hover:underline">
                Se alle områder
              </Link>
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
