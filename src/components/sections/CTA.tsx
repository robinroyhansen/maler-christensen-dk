import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { COMPANY } from "@/lib/constants"
import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"

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

  return (
    <section className={`py-16 md:py-20 ${bgClass} text-white`}>
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-white/90 mb-8">{subtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/maler-tilbud/">
              <Button 
                size="lg" 
                className={variant === "green" 
                  ? "bg-white text-[#6b9834] hover:bg-gray-100" 
                  : "bg-[#6b9834] text-white hover:bg-[#5a8229]"
                }
              >
                Få gratis tilbud
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href={COMPANY.phoneLink}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Phone className="w-5 h-5 mr-2" />
                Ring {COMPANY.phone}
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
