"use client"

import { useState } from "react"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { COMPANY } from "@/lib/constants"
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react"

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
      <div className="bg-gray-900 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{subtitle}</p>

        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-[#85bd41] mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Tak for din henvendelse!</h4>
            <p className="text-gray-300">Vi kontakter dig inden for 24 timer.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
            <Input
              id="email"
              type="email"
              placeholder="Din e-mail"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
            <Input
              id="phone"
              type="tel"
              placeholder="Dit telefonnummer"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sender..." : "Send besked"}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}
      </div>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Kontaktoplysninger</h3>
              
              <div className="space-y-6">
                <a href={COMPANY.phoneLink} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center group-hover:bg-[#6b9834] transition-colors">
                    <Phone className="w-6 h-6 text-[#6b9834] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <p className="font-semibold text-gray-900 group-hover:text-[#6b9834] transition-colors">{COMPANY.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center group-hover:bg-[#6b9834] transition-colors">
                    <Mail className="w-6 h-6 text-[#6b9834] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p className="font-semibold text-gray-900 group-hover:text-[#6b9834] transition-colors">{COMPANY.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#6b9834]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#6b9834]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="font-semibold text-gray-900">{COMPANY.fullAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {showMap && (
              <div className="rounded-2xl overflow-hidden shadow-sm h-64">
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
            )}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-[#6b9834] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tak for din henvendelse!</h3>
                <p className="text-gray-600 mb-8">Vi har modtaget din besked og vender tilbage inden for 24 timer.</p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Send en ny besked
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                />
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    id="email"
                    type="email"
                    label="E-mail *"
                    placeholder="din@email.dk"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    id="phone"
                    type="tel"
                    label="Telefon"
                    placeholder="12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sender..." : "Send besked"}
                  <Send className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Ved at sende accepterer du at vi kontakter dig vedrørende dit projekt.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
