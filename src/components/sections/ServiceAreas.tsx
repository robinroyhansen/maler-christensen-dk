"use client"

import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { CITIES } from "@/lib/constants"
import { MapPin } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

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
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <Container>
        <AnimateIn className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[#6b9834] font-medium mb-4">
            <MapPin className="w-5 h-5" />
            <span>Dækningsområde</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vi dækker hele Sjælland
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Uanset hvor du bor på Sjælland, kan vi hjælpe dig med professionelt malerarbejde
          </p>
        </AnimateIn>

        {/* Responsive grid: 2 cols on mobile, scales up on larger screens */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3" staggerDelay={0.03}>
          {citiesToShow.map((city) => (
            <StaggerItem key={city.slug}>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href={`/${city.slug}/`}
                  className="group bg-white rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-center shadow-sm hover:shadow-md border border-gray-100 hover:border-[#6b9834]/30 transition-all min-h-[44px] flex items-center justify-center"
                >
                  <span className="text-gray-700 group-hover:text-[#6b9834] font-medium transition-colors text-xs sm:text-sm">
                    {city.name}
                  </span>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
