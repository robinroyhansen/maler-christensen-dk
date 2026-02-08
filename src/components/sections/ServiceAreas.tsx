import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { CITIES } from "@/lib/constants"
import { MapPin } from "lucide-react"

// Sort cities: existing first, then by distance
const sortedCities = [...CITIES].sort((a, b) => {
  if (a.existing && !b.existing) return -1
  if (!a.existing && b.existing) return 1
  return a.distance - b.distance
})

interface ServiceAreasProps {
  excludeSlug?: string
}

export function ServiceAreas({ excludeSlug }: ServiceAreasProps) {
  // Filter out the current city if provided
  const citiesToShow = excludeSlug 
    ? sortedCities.filter(city => city.slug !== excludeSlug)
    : sortedCities

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[#6b9834] font-medium mb-4">
            <MapPin className="w-5 h-5" />
            <span>Dækningsområde</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vi dækker hele Sjælland
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uanset hvor du bor på Sjælland, kan vi hjælpe dig med professionelt malerarbejde
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {citiesToShow.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/`}
              className="group bg-white rounded-lg px-4 py-3 text-center shadow-sm hover:shadow-md border border-gray-100 hover:border-[#6b9834]/30 transition-all"
            >
              <span className="text-gray-700 group-hover:text-[#6b9834] font-medium transition-colors">
                {city.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
