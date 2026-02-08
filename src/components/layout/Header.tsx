"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { COMPANY } from "@/lib/constants"
import { SERVICE_CATEGORIES } from "@/lib/serviceCategories"
import { Menu, X, ChevronDown, Phone } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const LOGO_URL = "/images/logo.png"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

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
    setExpandedCategory(null)
  }

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(prev => prev === categoryName ? null : categoryName)
  }

  // Mega menu animation variants
  const megaMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.15 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        staggerChildren: prefersReducedMotion ? 0 : 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.15 }
    }
  }

  const columnVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
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
                alt="Malerfirmaet Schou & Christensen logo - din lokale maler i Slagelse"
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

            {/* Services Mega Menu */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Ydelser 
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
              
              {/* Mega Menu Dropdown with AnimatePresence */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={megaMenuVariants}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-xl rounded-xl py-6 px-8"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="grid grid-cols-4 gap-8">
                      {SERVICE_CATEGORIES.map((category, catIndex) => (
                        <motion.div
                          key={category.name}
                          variants={prefersReducedMotion ? {} : columnVariants}
                        >
                          <h3 className="font-bold text-[#6b9834] mb-3 text-sm uppercase tracking-wide">
                            {category.name}
                          </h3>
                          <ul className="space-y-1.5">
                            {category.services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/${service.slug}/`}
                                  className="block text-gray-600 hover:text-[#6b9834] transition-colors text-sm py-0.5"
                                  onClick={handleLinkClick}
                                >
                                  {service.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/galleri/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors">
              Galleri
            </Link>
            <Link href="/blog/" className="px-4 py-2 text-gray-700 hover:text-[#6b9834] font-medium transition-colors">
              Blog
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
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu - Full screen overlay with animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-white z-50 overflow-y-auto"
            >
              <div className="pb-6">
                <nav className="flex flex-col py-4">
                  <Link 
                    href="/" 
                    className="px-4 py-3 text-gray-700 hover:text-[#6b9834] hover:bg-gray-50 font-medium min-h-[48px] flex items-center active:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Forside
                  </Link>
                  
                  {/* Services with categories */}
                  <div>
                    <button 
                      className="flex items-center justify-between w-full px-4 py-3 text-gray-700 font-medium min-h-[48px] active:bg-gray-100"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      Ydelser 
                      <motion.span
                        animate={{ rotate: servicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.span>
                    </button>
                    
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="bg-gray-50 border-y border-gray-100 overflow-hidden"
                        >
                          {SERVICE_CATEGORIES.map((category) => (
                            <div key={category.name}>
                              <button
                                className="flex items-center justify-between w-full px-6 py-3 text-[#6b9834] font-semibold text-sm min-h-[44px] active:bg-gray-100"
                                onClick={() => toggleCategory(category.name)}
                              >
                                {category.name}
                                <motion.span
                                  animate={{ rotate: expandedCategory === category.name ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </motion.span>
                              </button>
                              
                              <AnimatePresence>
                                {expandedCategory === category.name && (
                                  <motion.div
                                    initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white border-t border-gray-100 overflow-hidden"
                                  >
                                    {category.services.map((service) => (
                                      <Link
                                        key={service.slug}
                                        href={`/${service.slug}/`}
                                        className="block px-10 py-2.5 text-gray-600 hover:text-[#6b9834] min-h-[44px] flex items-center active:bg-gray-50 text-sm"
                                        onClick={handleLinkClick}
                                      >
                                        {service.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link 
                    href="/galleri/" 
                    className="px-4 py-3 text-gray-700 hover:text-[#6b9834] hover:bg-gray-50 font-medium min-h-[48px] flex items-center active:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Galleri
                  </Link>
                  <Link 
                    href="/blog/" 
                    className="px-4 py-3 text-gray-700 hover:text-[#6b9834] hover:bg-gray-50 font-medium min-h-[48px] flex items-center active:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Blog
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
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  )
}
