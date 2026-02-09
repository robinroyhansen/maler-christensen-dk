"use client"

import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { motion, useReducedMotion } from "framer-motion"

const PARTNER_LOGOS = [
  {
    name: "Herlufmagle Skole",
    src: "/images/partners/herlufmagle-skole.png",
  },
  {
    name: "Slagelse Kommune",
    src: "/images/partners/Slagelse-kommune.png",
  },
  {
    name: "Partner",
    src: "/images/partners/Artboard-1.png",
  },
  {
    name: "Lars Printz",
    src: "/images/partners/Lars-Printz.png",
  },
  {
    name: "Lux Tag",
    src: "/images/partners/lux-tag.png",
  },
  {
    name: "Tømrermester Henrik Hjorth Harboe",
    src: "/images/partners/hhharboe.png",
  },
  {
    name: "Beck & Jørgensen",
    src: "/images/partners/bj-logo.png",
  },
  {
    name: "Dyrup",
    src: "/images/partners/dyrup-logo.png",
  },
  {
    name: "Flügger",
    src: "/images/partners/flugger-logo.svg",
  },
  {
    name: "Silkecement",
    src: "/images/partners/silkecement-logo.svg",
  },
  {
    name: "Deko Design Systems",
    src: "/images/partners/deko-logo.svg",
  },
]

interface PartnersProps {
  title?: string
  subtitle?: string
  variant?: "full" | "strip"
}

export function Partners({
  title = "Vores samarbejdspartnere",
  subtitle,
  variant = "strip",
}: PartnersProps) {
  const prefersReducedMotion = useReducedMotion()

  if (variant === "strip") {
    return (
      <section className="py-8 sm:py-12 bg-gray-50 border-y border-gray-100">
        <Container>
          <AnimateIn>
            <p className="text-center text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium mb-6 sm:mb-8 px-4">
              Betroet af lokale virksomheder og institutioner
            </p>
          </AnimateIn>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12" staggerDelay={0.1}>
            {PARTNER_LOGOS.map((partner, index) => (
              <StaggerItem key={index} variant="fade">
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  className="relative h-10 sm:h-12 w-20 sm:w-24 md:w-28 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo - samarbejdspartner`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <Container>
        <AnimateIn className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">{subtitle}</p>}
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center">
          {PARTNER_LOGOS.map((partner, index) => (
            <StaggerItem key={index} variant="scale">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                className="relative h-16 sm:h-20 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={partner.src}
                  alt={`${partner.name} logo - samarbejdspartner`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 33vw, 16vw"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export { PARTNER_LOGOS }
