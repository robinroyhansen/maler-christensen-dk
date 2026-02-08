import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SERVICES, CITIES, COMPANY } from "@/lib/constants"
import { getServiceContent } from "@/lib/content/services"
import { getCityContent, getCityBySlug } from "@/lib/content/cities"
import { getCityFAQs } from "@/lib/content/faqs"
import { getServiceFAQs } from "@/lib/data/service-faqs"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Reviews } from "@/components/sections/Reviews"
import { CTA } from "@/components/sections/CTA"
import { FAQ } from "@/components/sections/FAQ"
import { ContactForm } from "@/components/sections/ContactForm"
import { ServiceAreas } from "@/components/sections/ServiceAreas"
import { ProjectGallery, SILKECEMENT_IMAGES } from "@/components/sections/ProjectGallery"
import { ServiceGallery } from "@/components/sections/ServiceGallery"
import { FAQSchema, ServiceSchema } from "@/components/seo"
import { Container } from "@/components/ui/Container"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { CheckCircle, MapPin, ArrowRight } from "lucide-react"

// Generate static params for all service and city pages
export async function generateStaticParams() {
  const serviceParams = SERVICES.map((service) => ({
    slug: service.slug,
  }))

  const cityParams = CITIES.map((city) => ({
    slug: city.slug,
  }))

  return [...serviceParams, ...cityParams]
}

// Generate metadata dynamically
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  
  // Check if it's a service page
  const serviceContent = getServiceContent(slug)
  if (serviceContent) {
    return {
      title: serviceContent.metaTitle,
      description: serviceContent.metaDescription,
      alternates: {
        canonical: `https://${COMPANY.domain}/${slug}/`,
      },
      openGraph: {
        title: serviceContent.metaTitle,
        description: serviceContent.metaDescription,
        url: `https://${COMPANY.domain}/${slug}/`,
      },
    }
  }

  // Check if it's a city page
  const cityContent = getCityContent(slug)
  if (cityContent) {
    return {
      title: cityContent.metaTitle,
      description: cityContent.metaDescription,
      alternates: {
        canonical: `https://${COMPANY.domain}/${slug}/`,
      },
      openGraph: {
        title: cityContent.metaTitle,
        description: cityContent.metaDescription,
        url: `https://${COMPANY.domain}/${slug}/`,
      },
    }
  }

  return {
    title: "Side ikke fundet",
  }
}

export default async function DynamicPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params

  // Check if it's a service page
  const serviceContent = getServiceContent(slug)
  if (serviceContent) {
    return <ServicePage content={serviceContent} slug={slug} />
  }

  // Check if it's a city page
  const cityContent = getCityContent(slug)
  const cityData = getCityBySlug(slug)
  if (cityContent && cityData) {
    return <CityPage content={cityContent} city={cityData} />
  }

  // Not found
  notFound()
}

// Service Page Component
function ServicePage({ 
  content, 
  slug 
}: { 
  content: ReturnType<typeof getServiceContent> & {}
  slug: string 
}) {
  const relatedServices = SERVICES.filter(s => content.relatedServices.includes(s.slug))
  const showMicrocementGallery = slug === "microcement"
  const showPUGulvGallery = slug === "metallisk-pu-gulv"
  const showUdvendigGallery = slug === "udvendig-maling"
  const showTrappeGallery = slug === "maling-trappe"
  const serviceFaqs = getServiceFAQs(slug)

  return (
    <>
      {/* Schema.org structured data */}
      <ServiceSchema
        name={content.title}
        description={content.metaDescription}
        url={`https://${COMPANY.domain}/${slug}/`}
      />
      {serviceFaqs && serviceFaqs.length > 0 && (
        <FAQSchema faqs={serviceFaqs} />
      )}

      <Hero
        title={content.heroHeading}
        subtitle={content.heroSubheading}
        variant="page"
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <AnimateIn>
              <p className="text-xl text-gray-600 leading-relaxed mb-12">
                {content.intro}
              </p>
            </AnimateIn>

            {/* Sections */}
            <div className="space-y-12">
              {content.sections.map((section, index) => (
                <AnimateIn key={index} delay={index * 0.1}>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>

            {/* Benefits */}
            <AnimateIn delay={0.2}>
              <div className="mt-16 bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Derfor skal du vælge os
                </h2>
                <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.08}>
                  {content.benefits.map((benefit, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-center gap-3 list-none">
                        <CheckCircle className="w-6 h-6 text-[#6b9834] flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* Project Gallery for microcement pages */}
      {showMicrocementGallery && (
        <ProjectGallery
          images={SILKECEMENT_IMAGES}
          title="Se vores projekter"
          subtitle="Klik på billederne for at se dem i fuld størrelse"
          columns={4}
        />
      )}

      {/* Service Gallery for metallisk PU gulv from Supabase */}
      {showPUGulvGallery && (
        <ServiceGallery
          category="pu-gulv"
          title="Se vores PU gulv projekter"
          subtitle="Klik på billederne for at se dem i fuld størrelse"
          columns={3}
        />
      )}

      {/* Service Gallery for udvendig maling from Supabase */}
      {showUdvendigGallery && (
        <ServiceGallery
          category="udvendig-maling"
          title="Se vores udvendige malerarbejde"
          subtitle="Klik på billederne for at se dem i fuld størrelse"
          columns={3}
        />
      )}

      {/* Service Gallery for trappe maling from Supabase */}
      {showTrappeGallery && (
        <ServiceGallery
          category="maling-trappe"
          title="Se vores trappeopgangs-projekter"
          subtitle="Klik på billederne for at se dem i fuld størrelse"
          columns={3}
        />
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <AnimateIn>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Relaterede ydelser
              </h2>
            </AnimateIn>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {relatedServices.map((service) => (
                <StaggerItem key={service.slug}>
                  <Link
                    href={`/${service.slug}/`}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow block"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      {/* FAQ Section for Service Pages */}
      {serviceFaqs && serviceFaqs.length > 0 && (
        <FAQ
          faqs={serviceFaqs}
          cityName=""
          title={`Ofte stillede spørgsmål om ${content.title.toLowerCase()}`}
          subtitle="Find svar på de mest almindelige spørgsmål"
        />
      )}

      <CTA />

      {/* Service Areas Section - show all cities we cover */}
      <ServiceAreas />

      <ContactForm
        title="Få et gratis tilbud"
        subtitle={`Kontakt os i dag for et uforpligtende tilbud på ${content.title.toLowerCase()}.`}
        pageSlug={slug}
      />
    </>
  )
}

// City Page Component
function CityPage({ 
  content, 
  city 
}: { 
  content: ReturnType<typeof getCityContent> & {}
  city: typeof CITIES[0]
}) {
  const nearbyCity = CITIES.filter(c => content.nearbyAreas.includes(c.name))

  return (
    <>
      <Hero
        title={content.heroHeading}
        subtitle={content.heroSubheading}
        variant="page"
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimateIn>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {content.intro}
                </p>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Malerarbejde i {city.name}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {content.aboutCity}
                </p>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Hvorfor vælge os som din maler i {city.name}?
                </h2>
                <div className="prose prose-gray max-w-none mb-8" dangerouslySetInnerHTML={{ 
                  __html: content.whyChooseUs.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                }} />
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Vores ydelser i {city.name}
                </h2>
                <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ 
                  __html: content.services.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                }} />
              </AnimateIn>
            </div>

            {/* Sidebar */}
            <AnimateIn variant="fade-right" delay={0.2}>
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Contact Card */}
                  <ContactForm variant="compact" pageSlug={city.slug} />

                  {/* Nearby Areas */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#6b9834]" />
                      Nærliggende områder
                    </h3>
                    <StaggerContainer className="space-y-2" staggerDelay={0.05}>
                      {nearbyCity.map((nearby) => (
                        <StaggerItem key={nearby.slug}>
                          <Link
                            href={`/${nearby.slug}/`}
                            className="text-gray-600 hover:text-[#6b9834] transition-colors flex items-center gap-2"
                          >
                            <ArrowRight className="w-4 h-4" />
                            Maler {nearby.name}
                          </Link>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </Container>
      </section>

      <Services 
        title={`Malerydelser i ${city.name}`}
        subtitle="Vi tilbyder alle vores ydelser i dit område"
        limit={8}
      />

      <Reviews pageSlug={city.slug} />

      {/* FAQ Section with Schema.org structured data */}
      {(() => {
        const cityFaqs = getCityFAQs(city.slug)
        if (cityFaqs) {
          return (
            <FAQ
              faqs={cityFaqs.faqs}
              cityName={city.name}
              subtitle="Find svar på de mest almindelige spørgsmål om malerarbejde i dit område"
            />
          )
        }
        return null
      })()}

      <CTA 
        title={`Klar til at få malet i ${city.name}?`}
        subtitle="Kontakt os i dag for et gratis og uforpligtende tilbud"
      />
    </>
  )
}
