import { MetadataRoute } from "next"
import { SERVICES, CITIES, COMPANY } from "@/lib/constants"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${COMPANY.domain}`

  // Static pages with different priorities and frequencies
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/kontakt/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/om-os/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/galleri/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/referencer/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/maler-tilbud/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/partnere/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/vision/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privatlivspolitik/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookiepolitik/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]

  // Service pages (priority 0.9)
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  // City pages (priority 0.8)
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${baseUrl}/${city.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Blog posts from Supabase (dynamic)
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (supabaseUrl && supabaseKey) {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/blog_posts?status=eq.published&select=slug,updated_at`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      )
      
      if (res.ok) {
        const posts = await res.json()
        blogPages = (posts || []).map((p: { slug: string; updated_at: string }) => ({
          url: `${baseUrl}/blog/${p.slug}/`,
          lastModified: new Date(p.updated_at),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
      }
    }
  } catch (error) {
    // Silently fail - sitemap will still work without dynamic blog posts
    console.error("Failed to fetch blog posts for sitemap:", error)
  }

  return [...staticPages, ...servicePages, ...cityPages, ...blogPages]
}
