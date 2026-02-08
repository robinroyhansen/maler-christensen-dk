"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { SERVICES, CITIES } from "@/lib/constants"
import { SERVICE_CONTENT } from "@/lib/content/services"
import { CITY_CONTENT } from "@/lib/content/cities"
import Link from "next/link"
import { FileText, ExternalLink, Edit, Search, CheckCircle } from "lucide-react"

interface PageListItem {
  slug: string
  name: string
  type: "service" | "city" | "static"
  url: string
  hasDbOverride: boolean
}

export default function PagesPage() {
  const [pages, setPages] = useState<PageListItem[]>([])
  const [dbOverrides, setDbOverrides] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "service" | "city" | "static">("all")

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Fetch DB overrides
    const { data: pageContent } = await supabase
      .from("page_content")
      .select("slug")

    const overrides = new Set<string>()
    if (pageContent) {
      pageContent.forEach((p: { slug: string }) => overrides.add(p.slug))
    }
    setDbOverrides(overrides)

    // Build pages list
    const allPages: PageListItem[] = []

    // Service pages
    SERVICES.forEach((service) => {
      allPages.push({
        slug: service.slug,
        name: service.name,
        type: "service",
        url: `/${service.slug}/`,
        hasDbOverride: overrides.has(service.slug),
      })
    })

    // City pages
    CITIES.forEach((city) => {
      allPages.push({
        slug: city.slug,
        name: city.name,
        type: "city",
        url: `/${city.slug}/`,
        hasDbOverride: overrides.has(city.slug),
      })
    })

    // Static pages
    const staticPages = [
      { slug: "forside", name: "Forside", url: "/" },
      { slug: "kontakt", name: "Kontakt", url: "/kontakt/" },
      { slug: "om-os", name: "Om os", url: "/om-os/" },
      { slug: "galleri", name: "Galleri", url: "/galleri/" },
      { slug: "partnere", name: "Partnere", url: "/partnere/" },
      { slug: "referencer", name: "Referencer", url: "/referencer/" },
      { slug: "maler-tilbud", name: "Gratis tilbud", url: "/maler-tilbud/" },
      { slug: "vision", name: "Vision", url: "/vision/" },
    ]

    staticPages.forEach((page) => {
      allPages.push({
        slug: page.slug,
        name: page.name,
        type: "static",
        url: page.url,
        hasDbOverride: overrides.has(page.slug),
      })
    })

    setPages(allPages)
    setLoading(false)
  }

  const filteredPages = pages.filter((page) => {
    const matchesTab = activeTab === "all" || page.type === activeTab
    const matchesSearch = 
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const tabs = [
    { id: "all", label: "Alle", count: pages.length },
    { id: "service", label: "Services", count: pages.filter((p) => p.type === "service").length },
    { id: "city", label: "Byer", count: pages.filter((p) => p.type === "city").length },
    { id: "static", label: "Statiske", count: pages.filter((p) => p.type === "static").length },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Alle Sider</h1>
        <p className="text-gray-600">Klik på en side for at redigere indhold og SEO</p>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Sider med standardindhold (fra koden) kan tilpasses her.
          Ændringer gemmes i databasen og overskriver standardværdierne.
          {dbOverrides.size > 0 && (
            <span className="ml-1">
              {dbOverrides.size} sider har custom indhold.
            </span>
          )}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b">
          <div className="flex flex-wrap gap-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#6b9834] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Søg efter side..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
            />
          </div>
        </div>

        {/* Pages Grid */}
        <div className="divide-y">
          {filteredPages.map((page) => (
            <div
              key={page.slug}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    page.type === "service" 
                      ? "bg-blue-100" 
                      : page.type === "city"
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      page.type === "service" 
                        ? "text-blue-600" 
                        : page.type === "city"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{page.name}</p>
                      {page.hasDbOverride && (
                        <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{page.url}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#6b9834] hover:bg-[#6b9834]/10 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Rediger
                  </Link>
                  <a
                    href={page.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-[#6b9834] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Ingen sider matcher din søgning</p>
          </div>
        )}
      </div>
    </div>
  )
}
