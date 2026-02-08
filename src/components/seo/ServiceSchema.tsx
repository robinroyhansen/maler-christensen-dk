import { COMPANY } from "@/lib/constants"

interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  image?: string
}

export function ServiceSchema({ name, description, url, image }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "provider": {
      "@type": "LocalBusiness",
      "name": COMPANY.name,
      "image": "https://maler-christensen.dk/wp-content/uploads/2025/10/Firmalogo-Schou-Christensen.png",
      "telephone": COMPANY.phone,
      "email": COMPANY.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": COMPANY.address,
        "addressLocality": COMPANY.city,
        "postalCode": COMPANY.zip,
        "addressCountry": "DK"
      },
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": COMPANY.trustpilotRating.toString(),
        "reviewCount": COMPANY.trustpilotReviews.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Sjælland, Danmark"
    },
    ...(image && { "image": image })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
