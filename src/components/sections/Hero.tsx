"use client"

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

// Paint brush SVG decoration
function PaintBrushDecor() {
  return (
    <svg 
      className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.06] pointer-events-none hidden lg:block"
      viewBox="0 0 200 200" 
      fill="none"
    >
      <path 
        d="M40 160C40 160 50 140 70 130C90 120 120 115 140 100C160 85 170 60 165 40C160 20 140 10 120 15C100 20 80 40 70 60C60 80 55 100 50 120C45 140 40 160 40 160Z"
        fill="currentColor"
      />
      <rect x="30" y="155" width="25" height="40" rx="3" fill="currentColor"/>
    </svg>
  )
}

// Floating Trustpilot Badge Card
function TrustpilotBadge() {
  return (
    <div className="trustpilot-badge rounded-2xl px-6 py-5 inline-flex flex-col items-center animate-fade-in animation-delay-300">
      {/* Stars */}
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-7 h-7 text-[#00b67a] fill-[#00b67a]" />
        ))}
      </div>
      {/* Score */}
      <div className="text-3xl font-bold text-white mb-1">
        {COMPANY.trustpilotRating} / 5
      </div>
      {/* Subtext */}
      <div className="text-white/80 text-sm">
        Baseret på {COMPANY.trustpilotReviews}+ anmeldelser
      </div>
      {/* Trustpilot logo text */}
      <div className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
        <Star className="w-3.5 h-3.5 fill-[#00b67a] text-[#00b67a]" />
        Trustpilot
      </div>
    </div>
  )
}

export function Hero({
  title = `Maler i ${COMPANY.city} med ${COMPANY.trustpilotRating} på Trustpilot`,
  subtitle = "Professionelt malerarbejde til private og erhverv. Kvalitet, pålidelighed og konkurrencedygtige priser.",
  showTrustpilot = true,
  showCTA = true,
  backgroundImage = HERO_IMAGE,
  variant = "home",
}: HeroProps) {
  const isHome = variant === "home"
  
  return (
    <section className={`relative ${isHome ? "min-h-[550px] md:min-h-[600px] py-24 md:py-32" : "py-16 md:py-24"} text-white overflow-hidden`}>
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
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/70" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 hero-pattern" />
      </div>

      {/* Green Accent Glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6b9834]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-t from-[#6b9834]/10 to-transparent" />

      {/* Paint brush decoration */}
      <PaintBrushDecor />

      <Container className="relative z-10">
        <div className={`${isHome ? "grid lg:grid-cols-5 gap-8 items-center" : ""}`}>
          {/* Content */}
          <div className={isHome ? "lg:col-span-3" : "max-w-3xl"}>
            {/* Small Trustpilot indicator for page variant */}
            {showTrustpilot && !isHome && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#00b67a] fill-[#00b67a]" />
                  ))}
                </div>
                <span className="text-sm font-medium">{COMPANY.trustpilotRating}/5 på Trustpilot</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight animate-slide-in-left">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in-up animation-delay-100">
              {subtitle}
            </p>

            {/* USPs */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-8 animate-fade-in-up animation-delay-200">
              <div className="flex items-center gap-2 text-[#85bd41]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Gratis tilbud</span>
              </div>
              <div className="flex items-center gap-2 text-[#85bd41]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Hurtig opstart</span>
              </div>
              <div className="flex items-center gap-2 text-[#85bd41]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Erfarne malere</span>
              </div>
            </div>

            {/* CTAs */}
            {showCTA && (
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
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

          {/* Trustpilot Badge - only on home */}
          {showTrustpilot && isHome && (
            <div className="lg:col-span-2 flex justify-center lg:justify-end mt-8 lg:mt-0">
              <TrustpilotBadge />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
