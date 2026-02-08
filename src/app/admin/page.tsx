"use client"

import { useState, useEffect, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { SERVICES, CITIES } from "@/lib/constants"
import { SERVICE_CONTENT } from "@/lib/content/services"
import { CITY_CONTENT } from "@/lib/content/cities"
import Link from "next/link"
import { 
  Search, ExternalLink, Edit, AlertTriangle, CheckCircle, 
  ChevronDown, ChevronUp, Filter
} from "lucide-react"

interface PageData {
  slug: string
  name: string
  type: "service" | "city" | "static"
  metaTitle: string
  metaDescription: string
  hasDbOverride: boolean
  url: string
}

interface DbContent {
  slug: string
  meta_title: string
  meta_description: string
}

// Character count color helper
function charCountColor(count: number, max: number) {
  if (count === 0) return "text-gray-400"
  if (count <= max) return "text-green-600"
  return "text-red-600"
}

// Character count badge
function CharBadge({ count, max }: { count: number; max: number }) {
  return (
    <span className={`text-xs font-mono ${charCountColor(count, max)}`}>
      {count}/{max}
    </span>
  )
}

export default function SEODashboard() {
  const [pages, setPages] = useState<PageData[]>([])
  const [dbContent, setDbContent] = useState<Map<string, DbContent>>(new Map())
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "service" | "city" | "static">("all")
  const [sortField, setSortField] = useState<"name" | "metaTitle" | "metaDescription">("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Fetch any DB overrides
    const { data: pageContent } = await supabase
      .from("page_content")
      .select("slug, meta_title, meta_description")

    const contentMap = new Map<string, DbContent>()
    if (pageContent) {
      pageContent.forEach((p: DbContent) => {
        contentMap.set(p.slug, p)
      })
    }
    setDbContent(contentMap)

    // Build pages list from constants + DB
    const allPages: PageData[] = []

    // Add service pages
    SERVICES.forEach((service) => {
      const content = SERVICE_CONTENT[service.slug]
      const dbOverride = contentMap.get(service.slug)
      
      allPages.push({
        slug: service.slug,
        name: service.name,
        type: "service",
        metaTitle: dbOverride?.meta_title || content?.metaTitle || "",
        metaDescription: dbOverride?.meta_description || content?.metaDescription || "",
        hasDbOverride: !!dbOverride,
        url: `/${service.slug}/`,
      })
    })

    // Add city pages
    CITIES.forEach((city) => {
      const content = CITY_CONTENT[city.slug]
      const dbOverride = contentMap.get(city.slug)
      
      allPages.push({
        slug: city.slug,
        name: city.name,
        type: "city",
        metaTitle: dbOverride?.meta_title || content?.metaTitle || "",
        metaDescription: dbOverride?.meta_description || content?.metaDescription || "",
        hasDbOverride: !!dbOverride,
        url: `/${city.slug}/`,
      })
    })

    // Add static pages
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
      const dbOverride = contentMap.get(page.slug)
      allPages.push({
        slug: page.slug,
        name: page.name,
        type: "static",
        metaTitle: dbOverride?.meta_title || "",
        metaDescription: dbOverride?.meta_description || "",
        hasDbOverride: !!dbOverride,
        url: page.url,
      })
    })

    setPages(allPages)
    setLoading(false)
  }

  // Filter and sort pages
  const filteredPages = useMemo(() => {
    let result = pages

    // Filter by type
    if (filterType !== "all") {
      result = result.filter((p) => p.type === filterType)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.slug.toLowerCase().includes(query) ||
          p.metaTitle.toLowerCase().includes(query)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      let aVal = "", bVal = ""
      if (sortField === "name") {
        aVal = a.name
        bVal = b.name
      } else if (sortField === "metaTitle") {
        aVal = a.metaTitle
        bVal = b.metaTitle
      } else {
        aVal = a.metaDescription
        bVal = b.metaDescription
      }
      
      const comparison = aVal.localeCompare(bVal, "da")
      return sortDirection === "asc" ? comparison : -comparison
    })

    return result
  }, [pages, filterType, searchQuery, sortField, sortDirection])

  // Count pages needing attention
  const pagesNeedingAttention = useMemo(() => {
    return pages.filter((p) => {
      const titleLen = p.metaTitle.length
      const descLen = p.metaDescription.length
      return titleLen === 0 || titleLen > 60 || descLen === 0 || descLen > 155
    }).length
  }, [pages])

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    )
  }

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
        <h1 className="text-2xl font-bold text-gray-900">SEO Oversigt</h1>
        <p className="text-gray-600">Administrer meta titler og beskrivelser for alle sider</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-3xl font-bold text-gray-900">{pages.length}</p>
          <p className="text-sm text-gray-600">Totale sider</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-3xl font-bold text-gray-900">
            {pages.filter((p) => p.type === "service").length}
          </p>
          <p className="text-sm text-gray-600">Service sider</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-3xl font-bold text-gray-900">
            {pages.filter((p) => p.type === "city").length}
          </p>
          <p className="text-sm text-gray-600">By-sider</p>
        </div>
        <div className={`rounded-xl p-4 shadow-sm ${pagesNeedingAttention > 0 ? "bg-red-50" : "bg-green-50"}`}>
          <p className={`text-3xl font-bold ${pagesNeedingAttention > 0 ? "text-red-600" : "text-green-600"}`}>
            {pagesNeedingAttention}
          </p>
          <p className={`text-sm ${pagesNeedingAttention > 0 ? "text-red-600" : "text-green-600"}`}>
            {pagesNeedingAttention > 0 ? "Sider behøver opmærksomhed" : "Alle sider OK"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Søg efter side..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
            >
              <option value="all">Alle typer</option>
              <option value="service">Services</option>
              <option value="city">Byer</option>
              <option value="static">Statiske</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th 
                  className="text-left px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Side
                    <SortIcon field="name" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th 
                  className="text-left px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("metaTitle")}
                >
                  <div className="flex items-center gap-1">
                    Meta titel
                    <SortIcon field="metaTitle" />
                  </div>
                </th>
                <th 
                  className="text-left px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("metaDescription")}
                >
                  <div className="flex items-center gap-1">
                    Meta beskrivelse
                    <SortIcon field="metaDescription" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 w-20">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 w-28">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPages.map((page) => {
                const titleLen = page.metaTitle.length
                const descLen = page.metaDescription.length
                const hasIssues = titleLen === 0 || titleLen > 60 || descLen === 0 || descLen > 155

                return (
                  <tr key={page.slug} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{page.name}</p>
                        <p className="text-xs text-gray-500">{page.url}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        page.type === "service" 
                          ? "bg-blue-100 text-blue-700" 
                          : page.type === "city"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {page.type === "service" ? "Service" : page.type === "city" ? "By" : "Statisk"}
                      </span>
                      {page.hasDbOverride && (
                        <span className="ml-1 inline-block px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                          Custom
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-700 truncate" title={page.metaTitle}>
                          {page.metaTitle || <span className="text-gray-400 italic">Ikke sat</span>}
                        </p>
                        <CharBadge count={titleLen} max={60} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-sm">
                        <p className="text-sm text-gray-600 truncate" title={page.metaDescription}>
                          {page.metaDescription || <span className="text-gray-400 italic">Ikke sat</span>}
                        </p>
                        <CharBadge count={descLen} max={155} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {hasIssues ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/pages/${page.slug}`}
                          className="p-2 text-gray-600 hover:text-[#6b9834] hover:bg-gray-100 rounded-lg transition-colors"
                          title="Rediger"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <a
                          href={page.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:text-[#6b9834] hover:bg-gray-100 rounded-lg transition-colors"
                          title="Se side"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredPages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Ingen sider matcher dine søgekriterier
          </div>
        )}
      </div>
    </div>
  )
}
