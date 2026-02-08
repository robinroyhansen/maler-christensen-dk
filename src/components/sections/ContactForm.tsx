"use client"

import { useState } from "react"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { COMPANY } from "@/lib/constants"
import { Phone, Mail, MapPin, Send, CheckCircle, Clock } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

interface ContactFormProps {
  title?: string
  subtitle?: string
  showMap?: boolean
  variant?: "full" | "compact"
  pageSlug?: string
}

export function ContactForm({
  title = "Kontakt os",
  subtitle = "Få et uforpligtende tilbud på dit projekt. Vi vender tilbage inden for 24 timer.",
  showMap = true,
  variant = "full",
  pageSlug = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.honeypot) {
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          page_slug: pageSlug,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" })
    } catch {
      setError("Der opstod en fejl. Prøv igen eller ring til os.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === "compact") {
    return (
      <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{title}</h3>
        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{subtitle}</p>

        {isSubmitted ? (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 sm:py-8"
          >
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#85bd41] mx-auto mb-3 sm:mb-4" />
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Tak for din henvendelse!</h4>
            <p className="text-gray-300 text-sm sm:text-base">Vi kontakter dig inden for 24 timer.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <Input
              id="name"
              placeholder="Dit navn"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[48px]"
            />
            <Input
              id="email"
              type="email"
              placeholder="Din e-mail"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[48px]"
            />
            <Input
              id="phone"
              type="tel"
              placeholder="Dit telefonnummer"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[48px]"
            />
            <Textarea
              id="message"
              placeholder="Beskriv dit projekt..."
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <Button type="submit" className="w-full min-h-[48px]" disabled={isSubmitting}>
              {isSubmitting ? "Sender..." : "Send besked"}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}
      </div>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white relative">
      <Container>
        <AnimateIn className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight section-heading-accent">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mt-6 px-4 sm:px-0">{subtitle}</p>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <AnimateIn variant="fade-left">
            <div>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Kontaktoplysninger</h3>
                
                <StaggerContainer className="space-y-4 sm:space-y-6" staggerDelay={0.1}>
                  {/* Phone - tappable */}
                  <StaggerItem>
                    <motion.a
                      href={COMPANY.phoneLink}
                      whileHover={prefersReducedMotion ? {} : { x: 4 }}
                      className="flex items-center gap-3 sm:gap-4 group min-h-[56px] active:opacity-80"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#6b9834]/10 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-[#6b9834] transition-colors flex-shrink-0">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#6b9834] group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">Telefon</p>
                        <p className="font-semibold text-gray-900 text-base sm:text-lg group-hover:text-[#6b9834] transition-colors">{COMPANY.phone}</p>
                      </div>
                    </motion.a>
                  </StaggerItem>

                  {/* Email - tappable */}
                  <StaggerItem>
                    <motion.a
                      href={`mailto:${COMPANY.email}`}
                      whileHover={prefersReducedMotion ? {} : { x: 4 }}
                      className="flex items-center gap-3 sm:gap-4 group min-h-[56px] active:opacity-80"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#6b9834]/10 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-[#6b9834] transition-colors flex-shrink-0">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#6b9834] group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">E-mail</p>
                        <p className="font-semibold text-gray-900 text-base sm:text-lg group-hover:text-[#6b9834] transition-colors break-all">{COMPANY.email}</p>
                      </div>
                    </motion.a>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-center gap-3 sm:gap-4 min-h-[56px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#6b9834]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#6b9834]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">Adresse</p>
                        <p className="font-semibold text-gray-900 text-base sm:text-lg">{COMPANY.fullAddress}</p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-center gap-3 sm:gap-4 min-h-[56px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#6b9834]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#6b9834]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">Svartid</p>
                        <p className="font-semibold text-gray-900 text-base sm:text-lg">Inden for 24 timer</p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>

              {showMap && (
                <AnimateIn delay={0.3}>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-sm h-48 sm:h-64 border border-gray-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2255.5!2d11.3533!3d55.4019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652e9aec6c1a0eb%3A0x1234567890abcdef!2sYdunsvej%209%2C%204200%20Slagelse!5e0!3m2!1sda!2sdk!4v1707350000000!5m2!1sda!2sdk"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Schou & Christensen - Ydunsvej 9, 4200 Slagelse"
                    />
                  </div>
                </AnimateIn>
              )}
            </div>
          </AnimateIn>

          {/* Form */}
          <AnimateIn variant="fade-right" delay={0.2}>
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 sm:py-12"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#6b9834]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#6b9834]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Tak for din henvendelse!</h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Vi har modtaget din besked og vender tilbage inden for 24 timer.</p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-[#6b9834] text-[#6b9834] hover:bg-[#6b9834] hover:text-white min-h-[48px]">
                    Send en ny besked
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <Input
                    id="fullname"
                    label="Navn *"
                    placeholder="Dit fulde navn"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="min-h-[48px]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Input
                      id="email"
                      type="email"
                      label="E-mail *"
                      placeholder="din@email.dk"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="min-h-[48px]"
                    />
                    <Input
                      id="phone"
                      type="tel"
                      label="Telefon"
                      placeholder="12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="min-h-[48px]"
                    />
                  </div>
                  <Textarea
                    id="message"
                    label="Besked *"
                    placeholder="Beskriv dit projekt. Jo flere detaljer, jo bedre kan vi give dig et præcist tilbud."
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <Button type="submit" size="lg" className="w-full min-h-[48px]" disabled={isSubmitting}>
                    {isSubmitting ? "Sender..." : "Send besked"}
                    <Send className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    Ved at sende accepterer du at vi kontakter dig vedrørende dit projekt.
                  </p>
                </form>
              )}
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
