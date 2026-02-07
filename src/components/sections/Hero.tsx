import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { COMPANY } from "@/lib/constants"
import Link from "next/link"
import Image from "next/image"
import { Star, Phone, CheckCircle } from "lucide-react"

interface HeroProps {
  title?: string
  subtitle?: string
  showTrustpilot?: boolean
  showCTA?: boolean
  backgroundImage?: string
  variant?: "home" | "page"
}

const HERO_IMAGE = "https://maler-christensen.dk/wp-content/uploads/2022/09/0U2A3895-09.22.38.jpg"

export function Hero({
  title = `Maler i ${COMPANY.city} med ${COMPANY.trustpilotRating} på Trustpilot`,
  subtitle = "Professionelt malerarbejde til private og erhverv. Kvalitet, pålidelighed og konkurrencedygtige priser.",
  showTrustpilot = true,
  showCTA = true,
  backgroundImage = HERO_IMAGE,
  variant = "home",
}: HeroProps) {
  return (
    <section className={`relative ${variant === "home" ? "py-20 md:py-32" : "py-16 md:py-24"} text-white overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Professionelt malerarbejde"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70" />
      </div>

      {/* Green Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6b9834]/20 to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Trustpilot Badge */}
          {showTrustpilot && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#00b67a] fill-[#00b67a]" />
                ))}
              </div>
              <span className="text-sm font-medium">{COMPANY.trustpilotRating}/5 baseret på {COMPANY.trustpilotReviews}+ anmeldelser</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {subtitle}
          </p>

          {/* USPs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-[#85bd41]">
              <CheckCircle className="w-5 h-5" />
              <span>Gratis tilbud</span>
            </div>
            <div className="flex items-center gap-2 text-[#85bd41]">
              <CheckCircle className="w-5 h-5" />
              <span>Hurtig opstart</span>
            </div>
            <div className="flex items-center gap-2 text-[#85bd41]">
              <CheckCircle className="w-5 h-5" />
              <span>Erfarne malere</span>
            </div>
          </div>

          {/* CTAs */}
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/maler-tilbud/">
                <Button size="lg" className="w-full sm:w-auto">
                  Få et gratis tilbud
                </Button>
              </Link>
              <a href={COMPANY.phoneLink}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">
                  <Phone className="w-5 h-5 mr-2" />
                  Ring {COMPANY.phone}
                </Button>
              </a>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
