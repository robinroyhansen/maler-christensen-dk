import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { COMPANY, SERVICES, CITIES } from "@/lib/constants"
import { Phone, Mail, MapPin, Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#6b9834] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SC</span>
                </div>
                <div>
                  <p className="font-bold text-lg">{COMPANY.shortName}</p>
                  <p className="text-gray-400 text-sm">Malerfirma</p>
                </div>
              </div>
              
              <div className="space-y-3 text-gray-300">
                <a href={COMPANY.phoneLink} className="flex items-center gap-3 hover:text-[#85bd41] transition-colors">
                  <Phone className="w-5 h-5 text-[#85bd41]" />
                  {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 hover:text-[#85bd41] transition-colors">
                  <Mail className="w-5 h-5 text-[#85bd41]" />
                  {COMPANY.email}
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#85bd41] mt-0.5" />
                  <span>{COMPANY.fullAddress}</span>
                </div>
              </div>

              {/* Trustpilot Badge */}
              <div className="mt-6 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#00b67a] fill-[#00b67a]" />
                  ))}
                </div>
                <span className="text-gray-300">{COMPANY.trustpilotRating}/5 på Trustpilot</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-6">Ydelser</h3>
              <ul className="space-y-2">
                {SERVICES.slice(0, 10).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/${service.slug}/`} className="text-gray-300 hover:text-[#85bd41] transition-colors">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h3 className="font-bold text-lg mb-6">Områder</h3>
              <ul className="space-y-2">
                {CITIES.slice(0, 12).map((city) => (
                  <li key={city.slug}>
                    <Link href={`/${city.slug}/`} className="text-gray-300 hover:text-[#85bd41] transition-colors">
                      Maler {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Genveje</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/om-os/" className="text-gray-300 hover:text-[#85bd41] transition-colors">
                    Om os
                  </Link>
                </li>
                <li>
                  <Link href="/galleri/" className="text-gray-300 hover:text-[#85bd41] transition-colors">
                    Galleri
                  </Link>
                </li>
                <li>
                  <Link href="/referencer/" className="text-gray-300 hover:text-[#85bd41] transition-colors">
                    Referencer
                  </Link>
                </li>
                <li>
                  <Link href="/partnere/" className="text-gray-300 hover:text-[#85bd41] transition-colors">
                    Partnere
                  </Link>
                </li>
                <li>
                  <Link href="/vision/" className="text-gray-300 hover:text-[#85bd41] transition-colors">
                    Vores vision
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt/" className="text-gray-300 hover:text-[#85bd41] transition-colors">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/maler-tilbud/" className="text-gray-300 hover:text-[#85bd41] transition-colors">
                    Få tilbud
                  </Link>
                </li>
              </ul>

              {/* Danske Malermestre */}
              <div className="mt-8">
                <p className="text-sm text-gray-400 mb-2">Medlem af</p>
                <p className="font-semibold text-[#85bd41]">Danske Malermestre</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} {COMPANY.name}. Alle rettigheder forbeholdes.</p>
            <p>CVR: {COMPANY.cvr}</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
