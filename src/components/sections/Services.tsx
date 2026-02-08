import { Container } from "@/components/ui/Container"
import { SERVICES } from "@/lib/constants"
import Link from "next/link"
import { 
  PaintBucket, Home, Building2, Warehouse, TreePine, 
  Brush, Layers, Shield, Sparkles, BadgePercent,
  SprayCan, Grid2X2Plus, CircleDot, ArrowRight
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
  "microcement": Grid2X2Plus,
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
    <section className="py-16 md:py-24 bg-gray-50 relative">
      <Container>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight section-heading-accent">
            {title}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-6">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedServices.map((service, index) => {
            const Icon = iconMap[service.slug] || PaintBucket
            return (
              <Link
                key={service.slug}
                href={`/${service.slug}/`}
                className="group service-card-hover bg-white rounded-xl p-6 md:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#6b9834]/30 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Top accent strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b9834] to-[#85bd41] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="w-14 h-14 bg-[#6b9834]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#6b9834] transition-all duration-300 group-hover:scale-105">
                  <Icon className="w-7 h-7 text-[#6b9834] group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-[#6b9834] transition-colors flex items-center gap-2">
                  {service.name}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed">
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
              className="inline-flex items-center gap-2 text-[#6b9834] font-semibold hover:text-[#5a8229] transition-colors group"
            >
              Se alle ydelser
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  )
}
