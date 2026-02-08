"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { SERVICES, CITIES } from "@/lib/constants"
import { SERVICE_CONTENT } from "@/lib/content/services"
import { CITY_CONTENT } from "@/lib/content/cities"
import { 
  Search, CheckCircle, AlertCircle, AlertTriangle, 
  Loader2, ChevronDown, ChevronUp, RefreshCw
} from "lucide-react"

interface SEOIssue {
  page: string
  pageUrl: string
  field: string
  currentValue: string | null
  recommendation: string
  severity: "error" | "warning" | "pass"
}

interface SEOCheckCategory {
  name: string
  icon: "error" | "warning" | "pass"
  issues: SEOIssue[]
}

interface BlogPost {
  id: string
  title: string
  slug: string
  meta_title: string | null
  meta_description: string | null
  content: string | null
  featured_image: string | null
}

interface GalleryImage {
  id: string
  url: string
  alt_text: string | null
  category: string
}

export default function SEOCheckPage() {
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<SEOCheckCategory[] | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (name: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(name)) {
      newExpanded.delete(name)
    } else {
      newExpanded.add(name)
    }
    setExpandedCategories(newExpanded)
  }

  const runSEOCheck = async () => {
    setRunning(true)
    const issues: SEOIssue[] = []

    // Fetch blog posts
    let blogPosts: BlogPost[] = []
    try {
      const res = await fetch("/api/admin/blog")
      const data = await res.json()
      if (data.success) {
        blogPosts = data.posts
      }
    } catch (e) {
      console.error("Failed to fetch blog posts:", e)
    }

    // Fetch gallery images
    let galleryImages: GalleryImage[] = []
    try {
      const res = await fetch("/api/admin/gallery")
      const data = await res.json()
      if (data.success && data.categories) {
        galleryImages = data.categories.flatMap((cat: { images: GalleryImage[] }) => cat.images || [])
      }
    } catch (e) {
      console.error("Failed to fetch gallery images:", e)
    }

    // === CHECK 1: Title Length ===
    const titleIssues: SEOIssue[] = []
    
    // Check services
    SERVICES.forEach((service) => {
      const content = SERVICE_CONTENT[service.slug]
      const metaTitle = content?.metaTitle || ""
      
      if (metaTitle.length > 60) {
        titleIssues.push({
          page: `Service: ${service.name}`,
          pageUrl: `/${service.slug}/`,
          field: "meta_title",
          currentValue: `${metaTitle.length} tegn: "${metaTitle}"`,
          recommendation: "Meta titel bør være maks 60 tegn",
          severity: "error"
        })
      } else if (metaTitle.length < 30 && metaTitle.length > 0) {
        titleIssues.push({
          page: `Service: ${service.name}`,
          pageUrl: `/${service.slug}/`,
          field: "meta_title",
          currentValue: `${metaTitle.length} tegn: "${metaTitle}"`,
          recommendation: "Meta titel bør være mindst 30 tegn",
          severity: "warning"
        })
      }
    })

    // Check cities
    CITIES.forEach((city) => {
      const content = CITY_CONTENT[city.slug]
      const metaTitle = content?.metaTitle || ""
      
      if (metaTitle.length > 60) {
        titleIssues.push({
          page: `By: ${city.name}`,
          pageUrl: `/${city.slug}/`,
          field: "meta_title",
          currentValue: `${metaTitle.length} tegn: "${metaTitle}"`,
          recommendation: "Meta titel bør være maks 60 tegn",
          severity: "error"
        })
      } else if (metaTitle.length < 30 && metaTitle.length > 0) {
        titleIssues.push({
          page: `By: ${city.name}`,
          pageUrl: `/${city.slug}/`,
          field: "meta_title",
          currentValue: `${metaTitle.length} tegn: "${metaTitle}"`,
          recommendation: "Meta titel bør være mindst 30 tegn",
          severity: "warning"
        })
      }
    })

    // Check blog posts
    blogPosts.forEach((post) => {
      const metaTitle = post.meta_title || post.title
      
      if (metaTitle.length > 60) {
        titleIssues.push({
          page: `Blog: ${post.title}`,
          pageUrl: `/blog/${post.slug}/`,
          field: "meta_title",
          currentValue: `${metaTitle.length} tegn`,
          recommendation: "Meta titel bør være maks 60 tegn",
          severity: "error"
        })
      } else if (metaTitle.length < 30) {
        titleIssues.push({
          page: `Blog: ${post.title}`,
          pageUrl: `/blog/${post.slug}/`,
          field: "meta_title",
          currentValue: `${metaTitle.length} tegn`,
          recommendation: "Meta titel bør være mindst 30 tegn",
          severity: "warning"
        })
      }
    })

    // === CHECK 2: Description Length ===
    const descriptionIssues: SEOIssue[] = []
    
    SERVICES.forEach((service) => {
      const content = SERVICE_CONTENT[service.slug]
      const metaDesc = content?.metaDescription || ""
      
      if (metaDesc.length > 160) {
        descriptionIssues.push({
          page: `Service: ${service.name}`,
          pageUrl: `/${service.slug}/`,
          field: "meta_description",
          currentValue: `${metaDesc.length} tegn`,
          recommendation: "Meta beskrivelse bør være maks 160 tegn",
          severity: "error"
        })
      } else if (metaDesc.length < 70 && metaDesc.length > 0) {
        descriptionIssues.push({
          page: `Service: ${service.name}`,
          pageUrl: `/${service.slug}/`,
          field: "meta_description",
          currentValue: `${metaDesc.length} tegn`,
          recommendation: "Meta beskrivelse bør være mindst 70 tegn",
          severity: "warning"
        })
      }
    })

    CITIES.forEach((city) => {
      const content = CITY_CONTENT[city.slug]
      const metaDesc = content?.metaDescription || ""
      
      if (metaDesc.length > 160) {
        descriptionIssues.push({
          page: `By: ${city.name}`,
          pageUrl: `/${city.slug}/`,
          field: "meta_description",
          currentValue: `${metaDesc.length} tegn`,
          recommendation: "Meta beskrivelse bør være maks 160 tegn",
          severity: "error"
        })
      } else if (metaDesc.length < 70 && metaDesc.length > 0) {
        descriptionIssues.push({
          page: `By: ${city.name}`,
          pageUrl: `/${city.slug}/`,
          field: "meta_description",
          currentValue: `${metaDesc.length} tegn`,
          recommendation: "Meta beskrivelse bør være mindst 70 tegn",
          severity: "warning"
        })
      }
    })

    blogPosts.forEach((post) => {
      const metaDesc = post.meta_description || ""
      
      if (metaDesc.length > 160) {
        descriptionIssues.push({
          page: `Blog: ${post.title}`,
          pageUrl: `/blog/${post.slug}/`,
          field: "meta_description",
          currentValue: `${metaDesc.length} tegn`,
          recommendation: "Meta beskrivelse bør være maks 160 tegn",
          severity: "error"
        })
      } else if (metaDesc.length < 70 && metaDesc.length > 0) {
        descriptionIssues.push({
          page: `Blog: ${post.title}`,
          pageUrl: `/blog/${post.slug}/`,
          field: "meta_description",
          currentValue: `${metaDesc.length} tegn`,
          recommendation: "Meta beskrivelse bør være mindst 70 tegn",
          severity: "warning"
        })
      }
    })

    // === CHECK 3: Missing Meta ===
    const missingMetaIssues: SEOIssue[] = []
    
    SERVICES.forEach((service) => {
      const content = SERVICE_CONTENT[service.slug]
      if (!content?.metaTitle) {
        missingMetaIssues.push({
          page: `Service: ${service.name}`,
          pageUrl: `/${service.slug}/`,
          field: "meta_title",
          currentValue: "Mangler",
          recommendation: "Tilføj meta titel til denne service",
          severity: "error"
        })
      }
      if (!content?.metaDescription) {
        missingMetaIssues.push({
          page: `Service: ${service.name}`,
          pageUrl: `/${service.slug}/`,
          field: "meta_description",
          currentValue: "Mangler",
          recommendation: "Tilføj meta beskrivelse til denne service",
          severity: "error"
        })
      }
    })

    blogPosts.forEach((post) => {
      if (!post.meta_title) {
        missingMetaIssues.push({
          page: `Blog: ${post.title}`,
          pageUrl: `/blog/${post.slug}/`,
          field: "meta_title",
          currentValue: "Mangler (bruger standard titel)",
          recommendation: "Tilføj unik meta titel",
          severity: "warning"
        })
      }
      if (!post.meta_description) {
        missingMetaIssues.push({
          page: `Blog: ${post.title}`,
          pageUrl: `/blog/${post.slug}/`,
          field: "meta_description",
          currentValue: "Mangler",
          recommendation: "Tilføj meta beskrivelse",
          severity: "warning"
        })
      }
    })

    // === CHECK 4: Duplicate Titles ===
    const duplicateTitleIssues: SEOIssue[] = []
    const seenTitles = new Map<string, string[]>()
    
    SERVICES.forEach((service) => {
      const content = SERVICE_CONTENT[service.slug]
      const title = content?.metaTitle || ""
      if (title) {
        if (!seenTitles.has(title)) {
          seenTitles.set(title, [])
        }
        seenTitles.get(title)!.push(`Service: ${service.name}`)
      }
    })
    
    CITIES.forEach((city) => {
      const content = CITY_CONTENT[city.slug]
      const title = content?.metaTitle || ""
      if (title) {
        if (!seenTitles.has(title)) {
          seenTitles.set(title, [])
        }
        seenTitles.get(title)!.push(`By: ${city.name}`)
      }
    })

    blogPosts.forEach((post) => {
      const title = post.meta_title || post.title
      if (!seenTitles.has(title)) {
        seenTitles.set(title, [])
      }
      seenTitles.get(title)!.push(`Blog: ${post.title}`)
    })

    seenTitles.forEach((pages, title) => {
      if (pages.length > 1) {
        duplicateTitleIssues.push({
          page: pages.join(", "),
          pageUrl: "#",
          field: "meta_title",
          currentValue: `"${title}"`,
          recommendation: `Denne meta titel bruges på ${pages.length} sider`,
          severity: "error"
        })
      }
    })

    // === CHECK 5: Missing Alt Text ===
    const missingAltIssues: SEOIssue[] = []
    
    galleryImages.forEach((image) => {
      if (!image.alt_text || image.alt_text.trim() === "") {
        missingAltIssues.push({
          page: `Galleri: ${image.category}`,
          pageUrl: `/admin/gallery`,
          field: "alt_text",
          currentValue: "Mangler",
          recommendation: "Tilføj alt tekst til billedet for bedre SEO",
          severity: "warning"
        })
      }
    })

    // === CHECK 6: H1 Check (Services & Cities have proper headings) ===
    const h1Issues: SEOIssue[] = []
    
    SERVICES.forEach((service) => {
      const content = SERVICE_CONTENT[service.slug]
      if (!content?.heroHeading) {
        h1Issues.push({
          page: `Service: ${service.name}`,
          pageUrl: `/${service.slug}/`,
          field: "H1 overskrift",
          currentValue: "Mangler heroHeading",
          recommendation: "Tilføj en klar H1 overskrift",
          severity: "error"
        })
      }
    })

    CITIES.forEach((city) => {
      const content = CITY_CONTENT[city.slug]
      if (!content?.heroHeading) {
        h1Issues.push({
          page: `By: ${city.name}`,
          pageUrl: `/${city.slug}/`,
          field: "H1 overskrift",
          currentValue: "Mangler heroHeading",
          recommendation: "Tilføj en klar H1 overskrift",
          severity: "error"
        })
      }
    })

    // Categorize results
    const categories: SEOCheckCategory[] = [
      {
        name: "Titel-længde",
        icon: titleIssues.some(i => i.severity === "error") ? "error" : 
              titleIssues.some(i => i.severity === "warning") ? "warning" : "pass",
        issues: titleIssues
      },
      {
        name: "Beskrivelse-længde",
        icon: descriptionIssues.some(i => i.severity === "error") ? "error" : 
              descriptionIssues.some(i => i.severity === "warning") ? "warning" : "pass",
        issues: descriptionIssues
      },
      {
        name: "Manglende meta",
        icon: missingMetaIssues.some(i => i.severity === "error") ? "error" : 
              missingMetaIssues.some(i => i.severity === "warning") ? "warning" : "pass",
        issues: missingMetaIssues
      },
      {
        name: "Duplikerede titler",
        icon: duplicateTitleIssues.length > 0 ? "error" : "pass",
        issues: duplicateTitleIssues
      },
      {
        name: "Manglende alt-tekst",
        icon: missingAltIssues.length > 0 ? "warning" : "pass",
        issues: missingAltIssues
      },
      {
        name: "H1 overskrifter",
        icon: h1Issues.some(i => i.severity === "error") ? "error" : 
              h1Issues.some(i => i.severity === "warning") ? "warning" : "pass",
        issues: h1Issues
      },
    ]

    setResults(categories)
    setRunning(false)
    // Auto-expand categories with issues
    setExpandedCategories(new Set(categories.filter(c => c.issues.length > 0).map(c => c.name)))
  }

  const totalErrors = results?.reduce((sum, cat) => 
    sum + cat.issues.filter(i => i.severity === "error").length, 0) || 0
  const totalWarnings = results?.reduce((sum, cat) => 
    sum + cat.issues.filter(i => i.severity === "warning").length, 0) || 0
  const totalPassed = results?.filter(cat => cat.issues.length === 0).length || 0

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Tjek</h1>
          <p className="text-gray-600">Automatisk scanning af SEO-problemer på hjemmesiden</p>
        </div>
        <Button onClick={runSEOCheck} disabled={running}>
          {running ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scanner...
            </>
          ) : (
            <>
              {results ? <RefreshCw className="w-4 h-4 mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              {results ? "Kør igen" : "Kør SEO-tjek"}
            </>
          )}
        </Button>
      </div>

      {/* Summary Cards */}
      {results && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalErrors}</p>
                <p className="text-sm text-gray-500">Fejl</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalWarnings}</p>
                <p className="text-sm text-gray-500">Advarsler</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalPassed}</p>
                <p className="text-sm text-gray-500">Bestået</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results ? (
        <div className="space-y-4">
          {results.map((category) => (
            <div key={category.name} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {category.icon === "error" && (
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                  )}
                  {category.icon === "warning" && (
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    </div>
                  )}
                  {category.icon === "pass" && (
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {category.issues.length === 0 
                        ? "Ingen problemer fundet" 
                        : `${category.issues.length} ${category.issues.length === 1 ? "problem" : "problemer"}`}
                    </p>
                  </div>
                </div>
                {category.issues.length > 0 && (
                  expandedCategories.has(category.name) 
                    ? <ChevronUp className="w-5 h-5 text-gray-400" />
                    : <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Issues list */}
              {expandedCategories.has(category.name) && category.issues.length > 0 && (
                <div className="border-t divide-y">
                  {category.issues.map((issue, idx) => (
                    <div key={idx} className="p-4 pl-16 bg-gray-50">
                      <div className="flex items-start gap-3">
                        {issue.severity === "error" && (
                          <span className="text-lg">🔴</span>
                        )}
                        {issue.severity === "warning" && (
                          <span className="text-lg">🟡</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{issue.page}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">{issue.field}:</span> {issue.currentValue}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            💡 {issue.recommendation}
                          </p>
                        </div>
                        {issue.pageUrl !== "#" && (
                          <a
                            href={issue.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6b9834] hover:underline text-sm"
                          >
                            Åbn →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Klar til at scanne</h3>
          <p className="text-gray-500 mb-4">
            Klik på knappen ovenfor for at køre en SEO-scanning af alle sider.
          </p>
          <p className="text-sm text-gray-400">
            Scanningen tjekker {SERVICES.length} services, {CITIES.length} byer, og alle blogposts.
          </p>
        </div>
      )}
    </div>
  )
}
