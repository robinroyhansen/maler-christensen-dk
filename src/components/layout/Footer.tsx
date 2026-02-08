import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { COMPANY, SERVICES, CITIES } from "@/lib/constants"
import { Phone, Mail, MapPin, Star } from "lucide-react"

const LOGO_URL = "https://maler-christensen.dk/wp-content/uploads/2025/10/Firmalogo-Schou-Christensen.png"
const DANSKE_MALERMESTRE_URL = "https://maler-christensen.dk/wp-content/uploads/2021/06/danskemalermestre-hvid.png"

// Sort cities: existing first, then by distance
const sortedCities = [...CITIES].sort((a, b) => {
  if (a.existing && !b.existing) return -1
  if (!a.existing && b.existing) return 1
  return a.distance - b.distance
})

export function Footer() {
  // Split cities into 3 columns
  const citiesPerColumn = Math.ceil(sortedCities.length / 3)
  const cityColumns = [
    sortedCities.slice(0, citiesPerColumn),
    sortedCities.slice(citiesPerColumn, citiesPerColumn * 2),
    sortedCities.slice(citiesPerColumn * 2),
  ]

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Wave divider */}
      <div className="absolute -top-10 left-0 right-0 h-10 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-16" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#1f2937"
          />
        </svg>
      </div>

      {/* Main Footer */}
      <div className="py-16 pt-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative h-12 w-36">
                  <Image
                    src={LOGO_URL}
                    alt={COMPANY.shortName}
                    fill
                    className="object-contain object-left brightness-0 invert"
                  />
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
              <a 
                href="https://www.trustpilot.com/review/www.maler-christensen.dk?languages=all"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-[#00b67a]/10 hover:bg-[#00b67a]/20 transition-colors px-4 py-2 rounded-full"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#00b67a] fill-[#00b67a]" />
                  ))}
                </div>
                <span className="text-gray-300 text-sm">{COMPANY.trustpilotRating}/5</span>
              </a>
            </div>

            {/* Services */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-lg mb-6 text-white">Ydelser</h3>
              <ul className="space-y-2">
                {SERVICES.slice(0, 10).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/${service.slug}/`} className="text-gray-400 hover:text-[#85bd41] transition-colors text-sm">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities - spans 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-6 text-white">Vi dækker hele Sjælland</h3>
              <div className="grid grid-cols-3 gap-x-6">
                {cityColumns.map((column, colIndex) => (
                  <div 
                    key={colIndex} 
                    className={`space-y-1 ${colIndex > 0 ? 'border-l border-gray-700/50 pl-6' : ''}`}
                  >
                    {column.map((city) => (
                      <Link 
                        key={city.slug} 
                        href={`/${city.slug}/`} 
                        className="block text-sm text-gray-400 hover:text-[#85bd41] transition-colors py-0.5"
                      >
                        Maler {city.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-lg mb-6 text-white">Genveje</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/om-os/" className="text-gray-400 hover:text-[#85bd41] transition-colors text-sm">
                    Om os
                  </Link>
                </li>
                <li>
                  <Link href="/galleri/" className="text-gray-400 hover:text-[#85bd41] transition-colors text-sm">
                    Galleri
                  </Link>
                </li>
                <li>
                  <Link href="/referencer/" className="text-gray-400 hover:text-[#85bd41] transition-colors text-sm">
                    Referencer
                  </Link>
                </li>
                <li>
                  <Link href="/partnere/" className="text-gray-400 hover:text-[#85bd41] transition-colors text-sm">
                    Partnere
                  </Link>
                </li>
                <li>
                  <Link href="/vision/" className="text-gray-400 hover:text-[#85bd41] transition-colors text-sm">
                    Vores vision
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt/" className="text-gray-400 hover:text-[#85bd41] transition-colors text-sm">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/maler-tilbud/" className="text-gray-400 hover:text-[#85bd41] transition-colors text-sm font-medium">
                    Få tilbud
                  </Link>
                </li>
              </ul>

              {/* Danske Malermestre */}
              <div className="mt-8">
                <p className="text-xs text-gray-500 mb-3">Medlem af</p>
                <div className="relative h-10 w-32">
                  <Image
                    src={DANSKE_MALERMESTRE_URL}
                    alt="Danske Malermestre"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {COMPANY.name}. Alle rettigheder forbeholdes.</p>
            <p>CVR: {COMPANY.cvr}</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
