"use client"

import Image from "next/image"
import { Container } from "@/components/ui/Container"

const PARTNER_LOGOS = [
  {
    name: "Herlufmagle Skole",
    src: "https://maler-christensen.dk/wp-content/uploads/2021/06/herlufmagle-skole.png",
  },
  {
    name: "Tømrer Skovgaard",
    src: "https://maler-christensen.dk/wp-content/uploads/2021/06/Toemrer-skovgaard.png",
  },
  {
    name: "Slagelse Kommune",
    src: "https://maler-christensen.dk/wp-content/uploads/2021/06/Slagelse-kommune.png",
  },
  {
    name: "Partner",
    src: "https://maler-christensen.dk/wp-content/uploads/2021/06/Artboard-1.png",
  },
  {
    name: "Lars Printz",
    src: "https://maler-christensen.dk/wp-content/uploads/2021/06/Lars-Printz.png",
  },
  {
    name: "Lux Tag",
    src: "https://maler-christensen.dk/wp-content/uploads/2021/06/lux-tag.png",
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
  if (variant === "strip") {
    return (
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <Container>
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider font-medium mb-8">
            Betroet af lokale virksomheder og institutioner
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {PARTNER_LOGOS.map((partner, index) => (
              <div
                key={index}
                className="relative h-12 w-24 md:w-28 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 112px"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {PARTNER_LOGOS.map((partner, index) => (
            <div
              key={index}
              className="relative h-20 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { PARTNER_LOGOS }
