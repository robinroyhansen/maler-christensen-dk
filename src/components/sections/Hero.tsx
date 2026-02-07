import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { COMPANY } from "@/lib/constants"
import Link from "next/link"
import { Star, Phone, CheckCircle } from "lucide-react"

interface HeroProps {
  title?: string
  subtitle?: string
  showTrustpilot?: boolean
  showCTA?: boolean
  backgroundImage?: string
  variant?: "home" | "page"
}

export function Hero({
  title = `Maler i ${COMPANY.city} med ${COMPANY.trustpilotRating} på Trustpilot`,
  subtitle = "Professionelt malerarbejde til private og erhverv. Kvalitet, pålidelighed og konkurrencedygtige priser.",
  showTrustpilot = true,
  showCTA = true,
  backgroundImage,
  variant = "home",
}: HeroProps) {
  return (
    <section className={`relative ${variant === "home" ? "py-20 md:py-32" : "py-16 md:py-24"} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
