import { Container } from "@/components/ui/Container"
import { SERVICES } from "@/lib/constants"
import Link from "next/link"
import { 
  PaintBucket, Home, Building2, Warehouse, TreePine, 
  Brush, Layers, Shield, Sparkles, BadgePercent,
  Droplets, SprayCan, Grid2X2Plus, CircleDot
} from "lucide-react"

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "malerarbejde": PaintBucket,
  "maling-af-carport": Warehouse,
  "maling-af-lejlighed": Building2,
  "maling-af-sommerhus": TreePine,
  "maling-flyttelejlighed": Home,
  "maling-hus": Home,
  "maling-trappe": Layers,
  "tapetsering": Brush,
  "traemaling": TreePine,
  "pcbforsegling": Shield,
  "metallisk-pu-gulv": Sparkles,
  "billig-maler": BadgePercent,
  "sprojtespartling": SprayCan,
  "sproejtmaling": SprayCan,
  "flisecement": Grid2X2Plus,
  "pu-gulve": CircleDot,
}

interface ServicesProps {
  title?: string
  subtitle?: string
  showAll?: boolean
  limit?: number
}

export function Services({ 
  title = "Vores ydelser", 
  subtitle = "Vi tilbyder et bredt udvalg af professionelle malerydelser til private og erhverv",
  showAll = false,
  limit = 8
}: ServicesProps) {
  const displayedServices = showAll ? SERVICES : SERVICES.slice(0, limit)

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedServices.map((service) => {
            const Icon = iconMap[service.slug] || PaintBucket
            return (
              <Link
                key={service.slug}
                href={`/${service.slug}/`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#6b9834]/30"
              >
                <div className="w-14 h-14 bg-[#6b9834]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#6b9834] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#6b9834] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-[#6b9834] transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </Link>
            )
          })}
        </div>

        {!showAll && SERVICES.length > limit && (
          <div className="text-center mt-12">
            <Link
              href="/malerarbejde/"
              className="inline-flex items-center gap-2 text-[#6b9834] font-semibold hover:text-[#5a8229] transition-colors"
            >
              Se alle ydelser
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </Container>
    </section>
  )
}
