import Link from "next/link"
import { SERVICES } from "@/lib/constants"
import { Container } from "@/components/ui/Container"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { ArrowRight, Paintbrush, Home, Sparkles } from "lucide-react"

interface RelatedServicesProps {
  currentSlug: string
}

// Define related service categories
const RELATED_SERVICES_MAP: Record<string, string[]> = {
  // Indvendig services
  "indvendig-maling": ["maling-af-loft", "spartling", "maling-af-lejlighed", "maling-hus"],
  "maling-af-loft": ["indvendig-maling", "spartling", "sprojtespartling", "maling-af-lejlighed"],
  "spartling": ["indvendig-maling", "maling-af-loft", "sprojtespartling", "maling-af-lejlighed"],
  "maling-af-lejlighed": ["indvendig-maling", "maling-af-loft", "spartling", "maling-flyttelejlighed"],
  "maling-flyttelejlighed": ["maling-af-lejlighed", "indvendig-maling", "spartling", "billig-maler"],
  "tapetsering": ["indvendig-maling", "spartling", "maling-af-lejlighed", "maling-hus"],
  "maling-trappe": ["indvendig-maling", "maling-af-lejlighed", "spartling", "maling-hus"],
  "maling-af-radiator": ["indvendig-maling", "maling-af-lejlighed", "maling-hus", "maling-trappe"],
  
  // Udvendig services
  "udvendig-maling": ["maling-af-facade", "maling-af-vinduer", "traemaling", "maling-hus"],
  "maling-af-facade": ["udvendig-maling", "maling-af-vinduer", "traemaling", "maling-hus"],
  "maling-af-vinduer": ["udvendig-maling", "maling-af-facade", "traemaling", "maling-hus"],
  "traemaling": ["udvendig-maling", "maling-af-vinduer", "maling-af-carport", "maling-af-sommerhus"],
  "maling-af-carport": ["traemaling", "udvendig-maling", "maling-hus", "maling-af-sommerhus"],
  "maling-af-sommerhus": ["traemaling", "maling-hus", "udvendig-maling", "maling-af-carport"],
  
  // Specialydelser
  "microcement": ["metallisk-pu-gulv", "pu-gulve", "sprojtespartling", "sproejtmaling"],
  "metallisk-pu-gulv": ["pu-gulve", "microcement", "sprojtespartling", "sproejtmaling"],
  "pu-gulve": ["metallisk-pu-gulv", "microcement", "malerarbejde", "erhvervsmaling"],
  "sprojtespartling": ["sproejtmaling", "spartling", "maling-af-loft", "indvendig-maling"],
  "sproejtmaling": ["sprojtespartling", "indvendig-maling", "maling-af-facade", "erhvervsmaling"],
  "pcbforsegling": ["malerarbejde", "indvendig-maling", "erhvervsmaling", "maling-af-lejlighed"],
  
  // General / Hus
  "maling-hus": ["indvendig-maling", "udvendig-maling", "maling-af-facade", "traemaling"],
  "malerarbejde": ["indvendig-maling", "udvendig-maling", "maling-hus", "erhvervsmaling"],
  "erhvervsmaling": ["malerarbejde", "sproejtmaling", "maling-hus", "sprojtespartling"],
  "nybyg-maling": ["sprojtespartling", "indvendig-maling", "malerarbejde", "erhvervsmaling"],
  "billig-maler": ["malerarbejde", "maling-af-lejlighed", "maling-flyttelejlighed", "indvendig-maling"],
  "maler-sjaelland": ["malerarbejde", "indvendig-maling", "udvendig-maling", "maling-hus"],
}

// Get icon for a service based on its category
function getServiceIcon(slug: string) {
  const udvendigServices = ["udvendig-maling", "maling-af-facade", "maling-af-vinduer", "traemaling", "maling-af-carport", "maling-af-sommerhus"]
  const specialServices = ["microcement", "metallisk-pu-gulv", "pu-gulve", "sprojtespartling", "sproejtmaling"]
  
  if (udvendigServices.includes(slug)) {
    return Home
  } else if (specialServices.includes(slug)) {
    return Sparkles
  }
  return Paintbrush
}

export function RelatedServices({ currentSlug }: RelatedServicesProps) {
  // Get related slugs from mapping, or fallback to random services
  let relatedSlugs = RELATED_SERVICES_MAP[currentSlug] || []
  
  // Filter to only include services that exist in SERVICES array
  const validSlugs = relatedSlugs.filter(slug => 
    SERVICES.some(s => s.slug === slug)
  )
  
  // If we don't have enough, add random services (excluding current)
  if (validSlugs.length < 3) {
    const otherServices = SERVICES
      .filter(s => s.slug !== currentSlug && !validSlugs.includes(s.slug))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 - validSlugs.length)
      .map(s => s.slug)
    
    validSlugs.push(...otherServices)
  }
  
  // Get the first 3 and map to full service objects
  const relatedServices = validSlugs
    .slice(0, 3)
    .map(slug => SERVICES.find(s => s.slug === slug))
    .filter((s): s is typeof SERVICES[0] => s !== undefined)
  
  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <AnimateIn>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Se også
          </h2>
        </AnimateIn>
        
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {relatedServices.map((service) => {
            const Icon = getServiceIcon(service.slug)
            
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/${service.slug}/`}
                  className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all block h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#6b9834] transition-colors">
                      <Icon className="w-6 h-6 text-[#6b9834] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#6b9834] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-[#6b9834] text-sm font-medium">
                        <span>Læs mere</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
