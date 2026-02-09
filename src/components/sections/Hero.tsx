"use client"

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { COMPANY } from "@/lib/constants"
import Link from "next/link"
import Image from "next/image"
import { Star, Phone, CheckCircle } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

interface HeroProps {
  title?: string
  subtitle?: string
  showTrustpilot?: boolean
  showCTA?: boolean
  backgroundImage?: string
  variant?: "home" | "page"
  showVideo?: boolean
}

const HERO_IMAGE = "/images/hero/hero.jpg"
const HERO_VIDEO = "https://qdphnqduwgnnwvmpksrr.supabase.co/storage/v1/object/public/site-assets/hero-video-optimized.mp4"

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

// Floating Trustpilot Badge Card - responsive sizes with animation
function TrustpilotBadge() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="trustpilot-badge rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-5 inline-flex flex-col items-center"
    >
      {/* Stars */}
      <div className="flex gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          >
            <Star className="w-5 h-5 sm:w-7 sm:h-7 text-[#00b67a] fill-[#00b67a]" />
          </motion.div>
        ))}
      </div>
      {/* Score */}
      <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">
        {COMPANY.trustpilotRating} / 5
      </div>
      {/* Subtext */}
      <div className="text-white/80 text-xs sm:text-sm">
        Baseret på {COMPANY.trustpilotReviews}+ anmeldelser
      </div>
      {/* Trustpilot logo text */}
      <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-xs text-white/60">
        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#00b67a] text-[#00b67a]" />
        Trustpilot
      </div>
    </motion.div>
  )
}

// Animated text reveal for hero heading
function AnimatedHeading({ text }: { text: string }) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(" ")

  if (prefersReducedMotion) {
    return <>{text}</>
  }

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

export function Hero({
  title = `Maler i ${COMPANY.city} med ${COMPANY.trustpilotRating} på Trustpilot`,
  subtitle = "Professionelt malerarbejde til private og erhverv. Kvalitet, pålidelighed og konkurrencedygtige priser.",
  showTrustpilot = true,
  showCTA = true,
  backgroundImage = HERO_IMAGE,
  variant = "home",
  showVideo = true,
}: HeroProps) {
  const isHome = variant === "home"
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showVideoEl, setShowVideoEl] = useState(false)
  
  // Only load video on desktop (>768px) after initial paint, and respect reduced motion
  useEffect(() => {
    if (!isHome || !showVideo || prefersReducedMotion) return
    const mq = window.matchMedia("(min-width: 768px)")
    if (mq.matches) {
      // Delay video load slightly so it doesn't compete with FCP/LCP
      const timer = setTimeout(() => setShowVideoEl(true), 100)
      return () => clearTimeout(timer)
    }
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setShowVideoEl(true)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [isHome, showVideo, prefersReducedMotion])
  
  // Calculate animation delays based on title word count
  const titleWords = title.split(" ").length
  const titleAnimDuration = titleWords * 0.1
  
  return (
    <section className={`relative ${isHome ? "min-h-[480px] sm:min-h-[550px] md:min-h-[600px] py-12 sm:py-16 md:py-24 lg:py-32" : "py-12 sm:py-16 md:py-24"} text-white overflow-hidden`}>
      {/* Background: always render image as base, video overlays on desktop */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Professionelt malerarbejde udført af Schou & Christensen i Slagelse"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        {showVideoEl && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
        {/* Dark overlay */}
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
        <div className={`${isHome ? "flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8 items-center" : ""}`}>
          {/* Content */}
          <div className={isHome ? "lg:col-span-3" : "max-w-3xl"}>
            {/* Small Trustpilot indicator for page variant */}
            {showTrustpilot && !isHome && (
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#00b67a] fill-[#00b67a]" />
                  ))}
                </div>
                <span className="text-sm font-medium">{COMPANY.trustpilotRating}/5 på Trustpilot</span>
              </motion.div>
            )}

            {/* Title - with word-by-word animation on home page */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
              {isHome ? <AnimatedHeading text={title} /> : title}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: isHome ? titleAnimDuration + 0.1 : 0.1 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* USPs */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: isHome ? titleAnimDuration + 0.2 : 0.2 }}
              className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8"
            >
              {[
                { text: "Gratis tilbud", delay: 0 },
                { text: "Hurtig opstart", delay: 0.1 },
                { text: "Erfarne malere", delay: 0.2 },
              ].map((usp, i) => (
                <motion.div
                  key={usp.text}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: isHome ? titleAnimDuration + 0.3 + usp.delay : 0.3 + usp.delay }}
                  className="flex items-center gap-1.5 sm:gap-2 text-[#85bd41]"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">{usp.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs - Full width and stacked on mobile */}
            {showCTA && (
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: isHome ? titleAnimDuration + 0.5 : 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link href="/maler-tilbud/" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
                    Få et gratis tilbud
                  </Button>
                </Link>
                <a href={COMPANY.phoneLink} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 min-h-[48px]">
                    <Phone className="w-5 h-5 mr-2" />
                    Ring {COMPANY.phone}
                  </Button>
                </a>
              </motion.div>
            )}
          </div>

          {/* Trustpilot Badge - below content on mobile, to the right on desktop */}
          {showTrustpilot && isHome && (
            <div className="lg:col-span-2 flex justify-center lg:justify-end mt-6 lg:mt-0">
              <TrustpilotBadge />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
