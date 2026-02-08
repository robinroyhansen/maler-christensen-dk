"use client"

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { COMPANY } from "@/lib/constants"
import Link from "next/link"
import { Phone, ArrowRight, Star } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

interface CTAProps {
  title?: string
  subtitle?: string
  variant?: "green" | "dark"
}

export function CTA({
  title = "Klar til at få et tilbud?",
  subtitle = "Kontakt os i dag for et uforpligtende tilbud. Vi svarer inden for 24 timer.",
  variant = "green",
}: CTAProps) {
  const bgClass = variant === "green" 
    ? "bg-gradient-to-r from-[#6b9834] to-[#85bd41]" 
    : "bg-gradient-to-r from-gray-900 to-gray-800"
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className={`py-12 sm:py-16 md:py-20 ${bgClass} text-white relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-50" />
      
      {/* Decorative circles */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-0">
          {/* Trustpilot mini badge */}
          <AnimateIn variant="scale" className="inline-block">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00b67a] fill-[#00b67a]" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">{COMPANY.trustpilotRating}/5 på Trustpilot</span>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">{title}</h2>
          </AnimateIn>
          
          <AnimateIn delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">{subtitle}</p>
          </AnimateIn>
          
          {/* Buttons: full width and stacked on mobile */}
          <AnimateIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/maler-tilbud/" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className={`w-full sm:w-auto min-h-[48px] ${variant === "green" 
                    ? "bg-white text-[#6b9834] hover:bg-gray-100" 
                    : "bg-[#6b9834] text-white hover:bg-[#5a8229]"
                  } shadow-lg hover:shadow-xl transition-all active:scale-[0.98]`}
                >
                  Få gratis tilbud
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href={COMPANY.phoneLink} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto min-h-[48px] border-white text-white hover:bg-white/10 backdrop-blur-sm active:scale-[0.98]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Ring {COMPANY.phone}
                </Button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
