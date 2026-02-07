import { MetadataRoute } from "next"
import { SERVICES, CITIES, COMPANY } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${COMPANY.domain}`

  // Static pages
  const staticPages = [
    "",
    "/om-os",
    "/kontakt",
    "/galleri",
    "/referencer",
    "/partnere",
    "/vision",
    "/maler-tilbud",
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Service pages
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  // City pages
  const cityPages = CITIES.map((city) => ({
    url: `${baseUrl}/${city.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages, ...cityPages]
}
