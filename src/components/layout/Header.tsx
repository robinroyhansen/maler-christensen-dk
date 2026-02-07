"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { COMPANY, SERVICES, CITIES } from "@/lib/constants"
import { Menu, X, ChevronDown, Phone } from "lucide-react"

const LOGO_URL = "https://maler-christensen.dk/wp-content/uploads/2025/10/Firmalogo-Schou-Christensen.png"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [citiesOpen, setCitiesOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-14 w-40 sm:w-48">
              <Image
                src={LOGO_URL}
                alt="Schou & Christensen - Malerfirma"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors">
              Forside
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Ydelser <ChevronDown className="w-4 h-4" />
              </button>
              <div 
                className={`absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 transition-all duration-200 ${servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}/`}
                    className="block px-4 py-2 text-gray-700 hover:bg-[#6b9834]/10 hover:text-[#6b9834] transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cities Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors"
                onMouseEnter={() => setCitiesOpen(true)}
                onMouseLeave={() => setCitiesOpen(false)}
              >
                Områder <ChevronDown className="w-4 h-4" />
              </button>
              <div 
                className={`absolute top-full left-0 w-64 max-h-96 overflow-y-auto bg-white shadow-lg rounded-lg py-2 transition-all duration-200 ${citiesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onMouseEnter={() => setCitiesOpen(true)}
                onMouseLeave={() => setCitiesOpen(false)}
              >
                {CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}/`}
                    className="block px-4 py-2 text-gray-700 hover:bg-[#6b9834]/10 hover:text-[#6b9834] transition-colors"
                  >
                    Maler {city.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/galleri/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors">
              Galleri
            </Link>
            <Link href="/om-os/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors">
              Om os
            </Link>
            <Link href="/kontakt/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* CTA & Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={COMPANY.phoneLink} className="flex items-center gap-2 text-gray-700 hover:text-[#6b9834] transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">{COMPANY.phone}</span>
            </a>
            <Link href="/maler-tilbud/">
              <Button>Få tilbud</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t">
            <nav className="flex flex-col py-4 space-y-2">
              <Link href="/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium">
                Forside
              </Link>
              
              <div>
                <button 
                  className="flex items-center justify-between w-full px-4 py-2 text-gray-700 font-medium"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  Ydelser <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="pl-8 space-y-1">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/${service.slug}/`}
                        className="block py-2 text-gray-600 hover:text-[#6b9834]"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button 
                  className="flex items-center justify-between w-full px-4 py-2 text-gray-700 font-medium"
                  onClick={() => setCitiesOpen(!citiesOpen)}
                >
                  Områder <ChevronDown className={`w-4 h-4 transition-transform ${citiesOpen ? 'rotate-180' : ''}`} />
                </button>
                {citiesOpen && (
                  <div className="pl-8 space-y-1 max-h-48 overflow-y-auto">
                    {CITIES.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${city.slug}/`}
                        className="block py-2 text-gray-600 hover:text-[#6b9834]"
                      >
                        Maler {city.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/galleri/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium">
                Galleri
              </Link>
              <Link href="/om-os/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium">
                Om os
              </Link>
              <Link href="/kontakt/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium">
                Kontakt
              </Link>
            </nav>

            <div className="px-4 space-y-3">
              <a href={COMPANY.phoneLink} className="flex items-center gap-2 text-[#6b9834] font-semibold">
                <Phone className="w-5 h-5" />
                {COMPANY.phone}
              </a>
              <Link href="/maler-tilbud/" className="block">
                <Button className="w-full">Få tilbud</Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
