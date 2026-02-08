import { MetadataRoute } from "next"
import { SERVICES, CITIES, COMPANY } from "@/lib/constants"
import { BLOG_POSTS } from "@/lib/data/blog-posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${COMPANY.domain}`

  // Static pages
  const staticPages = [
    "",
    "/om-os",
    "/kontakt",
    "/galleri",
    "/blog",
    "/referencer",
    "/partnere",
    "/vision",
    "/maler-tilbud",
    "/privatlivspolitik",
    "/cookiepolitik",
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.8,
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

  // Blog posts
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...cityPages, ...blogPages]
}
