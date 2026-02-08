"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { COMPANY, SERVICES } from "@/lib/constants"
import { Menu, X, ChevronDown, Phone } from "lucide-react"

const LOGO_URL = "https://maler-christensen.dk/wp-content/uploads/2025/10/Firmalogo-Schou-Christensen.png"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close menu on route change (when a link is clicked)
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
    setServicesOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={handleLinkClick}>
            <div className="relative h-10 sm:h-14 w-32 sm:w-48">
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
            className="lg:hidden p-2 text-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center active:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Luk menu" : "Åbn menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Full screen overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-white z-50 overflow-y-auto">
            <div className="pb-6">
              <nav className="flex flex-col py-4">
                <Link 
                  href="/" 
                  className="px-4 py-3 text-gray-700 hover:text-[#6b9834] hover:bg-gray-50 font-medium min-h-[48px] flex items-center active:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Forside
                </Link>
                
                <div>
                  <button 
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 font-medium min-h-[48px] active:bg-gray-100"
                    onClick={() => setServicesOpen(!servicesOpen)}
                  >
                    Ydelser <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesOpen && (
                    <div className="bg-gray-50 border-y border-gray-100">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/${service.slug}/`}
                          className="block px-8 py-3 text-gray-600 hover:text-[#6b9834] min-h-[48px] flex items-center active:bg-gray-100"
                          onClick={handleLinkClick}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  href="/galleri/" 
                  className="px-4 py-3 text-gray-700 hover:text-[#6b9834] hover:bg-gray-50 font-medium min-h-[48px] flex items-center active:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Galleri
                </Link>
                <Link 
                  href="/om-os/" 
                  className="px-4 py-3 text-gray-700 hover:text-[#6b9834] hover:bg-gray-50 font-medium min-h-[48px] flex items-center active:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Om os
                </Link>
                <Link 
                  href="/kontakt/" 
                  className="px-4 py-3 text-gray-700 hover:text-[#6b9834] hover:bg-gray-50 font-medium min-h-[48px] flex items-center active:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Kontakt
                </Link>
              </nav>

              {/* Prominent CTA section at bottom */}
              <div className="px-4 pt-4 mt-4 border-t border-gray-200 space-y-4">
                <a 
                  href={COMPANY.phoneLink} 
                  className="flex items-center justify-center gap-3 text-[#6b9834] font-bold text-lg py-3 min-h-[56px] bg-[#6b9834]/10 rounded-xl active:bg-[#6b9834]/20 transition-colors"
                >
                  <Phone className="w-6 h-6" />
                  {COMPANY.phone}
                </a>
                <Link href="/maler-tilbud/" className="block" onClick={handleLinkClick}>
                  <Button className="w-full min-h-[56px] text-lg">Få gratis tilbud</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
