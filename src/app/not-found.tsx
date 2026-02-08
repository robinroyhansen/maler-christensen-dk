import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"
import { Home, Phone, Image, Mail, Paintbrush, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: `Side ikke fundet — ${COMPANY.shortName}`,
  description: "Vi kunne desværre ikke finde den side, du leder efter. Se vores populære sider eller kontakt os.",
  robots: {
    index: false,
    follow: true,
  },
}

const POPULAR_LINKS = [
  { 
    name: "Kontakt os", 
    href: "/kontakt/", 
    icon: Mail,
    description: "Send os en besked"
  },
  { 
    name: "Galleri", 
    href: "/galleri/", 
    icon: Image,
    description: "Se vores projekter"
  },
  { 
    name: "Gratis tilbud", 
    href: "/maler-tilbud/", 
    icon: Paintbrush,
    description: "Få et uforpligtende tilbud"
  },
  { 
    name: "Indvendig maling", 
    href: "/indvendig-maling/", 
    icon: Home,
    description: "Vægge, lofter & træværk"
  },
  { 
    name: "Udvendig maling", 
    href: "/udvendig-maling/", 
    icon: Building2,
    description: "Facade, vinduer & træværk"
  },
]

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center py-16 md:py-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Visual */}
          <div className="mb-8">
            <span className="text-8xl md:text-9xl font-bold text-[#6b9834]/20">
              404
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Siden blev ikke fundet
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8">
            Vi kunne desværre ikke finde den side, du leder efter. 
            Måske er siden blevet flyttet eller slettet.
          </p>

          {/* Phone CTA */}
          <div className="bg-[#6b9834]/10 rounded-xl p-6 mb-10 inline-block">
            <p className="text-gray-700 mb-3">Har du brug for hjælp?</p>
            <a 
              href={COMPANY.phoneLink}
              className="inline-flex items-center gap-2 text-2xl font-bold text-[#6b9834] hover:text-[#5a8229] transition-colors"
            >
              <Phone className="w-6 h-6" />
              Ring til os på {COMPANY.phone}
            </a>
          </div>

          {/* Popular Links */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Populære sider
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {POPULAR_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-[#6b9834]/30 transition-all group text-left"
                >
                  <div className="w-10 h-10 bg-[#6b9834]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#6b9834] transition-colors">
                    <link.icon className="w-5 h-5 text-[#6b9834] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 group-hover:text-[#6b9834] transition-colors block">
                      {link.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {link.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Back to home button */}
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-lg bg-[#6b9834] text-white hover:bg-[#5a8229] transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Gå til forsiden
          </Link>
        </div>
      </Container>
    </main>
  )
}
