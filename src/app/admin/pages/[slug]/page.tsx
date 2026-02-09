"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { SERVICES, CITIES, COMPANY } from "@/lib/constants"
import { SERVICE_CONTENT } from "@/lib/content/services"
import { CITY_CONTENT } from "@/lib/content/cities"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import Link from "next/link"
import { ArrowLeft, Save, Eye, ExternalLink, RotateCcw } from "lucide-react"

interface PageContent {
  slug: string
  page_type: string
  meta_title: string
  meta_description: string
  hero_title: string
  hero_subtitle: string
  intro: string
  sections: Array<{ title: string; content: string }>
}

function CharCounter({ current, max, label }: { current: number; max: number; label: string }) {
  const isOver = current > max
  const percentage = Math.min((current / max) * 100, 100)
  
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all ${isOver ? "bg-red-500" : current > max * 0.8 ? "bg-amber-500" : "bg-green-500"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-xs font-mono ${isOver ? "text-red-600" : "text-gray-500"}`}>
        {current}/{max} {label}
      </span>
    </div>
  )
}

function SerpPreview({ title, description, url }: { title: string; description: string; url: string }) {
  const displayTitle = title || "Meta titel mangler"
  const displayDesc = description || "Meta beskrivelse mangler"
  
  return (
    <div className="bg-white rounded-lg border p-4">
      <p className="text-xs text-gray-500 mb-2">Google søgeresultat forhåndsvisning</p>
      <div className="font-sans">
        <p className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight">
          {displayTitle.length > 60 ? displayTitle.substring(0, 60) + "..." : displayTitle}
        </p>
        <p className="text-sm text-[#006621] mt-0.5">
          https://{COMPANY.domain}{url}
        </p>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {displayDesc.length > 155 ? displayDesc.substring(0, 155) + "..." : displayDesc}
        </p>
      </div>
    </div>
  )
}

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [pageType, setPageType] = useState<"service" | "city" | "static">("service")
  const [pageName, setPageName] = useState("")
  const [pageUrl, setPageUrl] = useState("")
  
  // Form data
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [heroTitle, setHeroTitle] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [intro, setIntro] = useState("")
  const [sections, setSections] = useState<Array<{ title: string; content: string }>>([])
  
  // Original defaults from code
  const [defaults, setDefaults] = useState<Partial<PageContent>>({})

  useEffect(() => {
    loadPageData()
  }, [slug])

  const loadPageData = async () => {
    // Find the page in our constants
    const service = SERVICES.find((s) => s.slug === slug)
    const city = CITIES.find((c) => c.slug === slug)
    
    let defaultData: Partial<PageContent> = {}
    
    if (service) {
      setPageType("service")
      setPageName(service.name)
      setPageUrl(`/${slug}/`)
      
      const content = SERVICE_CONTENT[slug]
      if (content) {
        defaultData = {
          meta_title: content.metaTitle,
          meta_description: content.metaDescription,
          hero_title: content.heroHeading,
          hero_subtitle: content.heroSubheading,
          intro: content.intro,
          sections: content.sections,
        }
      }
    } else if (city) {
      setPageType("city")
      setPageName(city.name)
      setPageUrl(`/${slug}/`)
      
      const content = CITY_CONTENT[slug]
      if (content) {
        defaultData = {
          meta_title: content.metaTitle,
          meta_description: content.metaDescription,
          hero_title: content.heroHeading,
          hero_subtitle: content.heroSubheading,
          intro: content.intro,
        }
      }
    } else {
      // Static page
      setPageType("static")
      const staticPages: Record<string, { name: string; url: string }> = {
        "forside": { name: "Forside", url: "/" },
        "kontakt": { name: "Kontakt", url: "/kontakt/" },
        "om-os": { name: "Om os", url: "/om-os/" },
        "galleri": { name: "Galleri", url: "/galleri/" },
        "partnere": { name: "Partnere", url: "/partnere/" },
        "referencer": { name: "Referencer", url: "/referencer/" },
        "maler-tilbud": { name: "Gratis tilbud", url: "/maler-tilbud/" },
        "vision": { name: "Vision", url: "/vision/" },
      }
      const staticPage = staticPages[slug]
      if (staticPage) {
        setPageName(staticPage.name)
        setPageUrl(staticPage.url)
      }
    }
    
    setDefaults(defaultData)

    // Check for DB override
    const { data: dbContent } = await supabase
      .from("page_content")
      .select("*")
      .eq("slug", slug)
      .single()

    if (dbContent) {
      setMetaTitle(dbContent.meta_title || defaultData.meta_title || "")
      setMetaDescription(dbContent.meta_description || defaultData.meta_description || "")
      setHeroTitle(dbContent.hero_title || defaultData.hero_title || "")
      setHeroSubtitle(dbContent.hero_subtitle || defaultData.hero_subtitle || "")
      setIntro(dbContent.intro || defaultData.intro || "")
      setSections(dbContent.sections || defaultData.sections || [])
    } else {
      setMetaTitle(defaultData.meta_title || "")
      setMetaDescription(defaultData.meta_description || "")
      setHeroTitle(defaultData.hero_title || "")
      setHeroSubtitle(defaultData.hero_subtitle || "")
      setIntro(defaultData.intro || "")
      setSections(defaultData.sections || [])
    }

    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    const pageData = {
      slug,
      page_type: pageType,
      meta_title: metaTitle,
      meta_description: metaDescription,
      hero_title: heroTitle,
      hero_subtitle: heroSubtitle,
      intro,
      sections,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
      .from("page_content")
      .upsert(pageData, { onConflict: "slug" })

    if (error) {
      console.error("Save error:", error)
      // If table doesn't exist, show message
      if (error.code === "42P01") {
        alert("Databasetabellen 'page_content' findes ikke endnu. Kør migreringer først.")
      }
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }

    setSaving(false)
  }

  const handleReset = () => {
    if (!confirm("Er du sikker på at du vil nulstille til standardværdierne?")) return
    
    setMetaTitle(defaults.meta_title || "")
    setMetaDescription(defaults.meta_description || "")
    setHeroTitle(defaults.hero_title || "")
    setHeroSubtitle(defaults.hero_subtitle || "")
    setIntro(defaults.intro || "")
    setSections(defaults.sections || [])
  }

  const updateSection = (index: number, field: "title" | "content", value: string) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], [field]: value }
    setSections(newSections)
  }

  const addSection = () => {
    setSections([...sections, { title: "", content: "" }])
  }

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pageName}</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                pageType === "service" 
                  ? "bg-blue-100 text-blue-700" 
                  : pageType === "city"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {pageType === "service" ? "Service" : pageType === "city" ? "By" : "Statisk"}
              </span>
              <span>{pageUrl}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Se side
          </a>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Nulstil
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Gemmer..." : saved ? "Gemt!" : "Gem"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Column */}
        <div className="space-y-6">
          {/* SEO Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Indstillinger</h2>
            
            <div className="space-y-4">
              <div>
                <Input
                  label="Meta titel"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Sidens titel til søgemaskiner"
                />
                <CharCounter current={metaTitle.length} max={60} label="tegn" />
              </div>

              <div>
                <Textarea
                  label="Meta beskrivelse"
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Sidens beskrivelse til søgemaskiner"
                />
                <CharCounter current={metaDescription.length} max={155} label="tegn" />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Sektion</h2>
            
            <div className="space-y-4">
              <Input
                label="Hero overskrift"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="Hovedoverskrift på siden"
              />

              <Input
                label="Hero undertekst"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="Undertekst under hovedoverskriften"
              />
            </div>
          </div>

          {/* Intro */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Introduktion</h2>
            
            <Textarea
              label="Intro tekst"
              rows={5}
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Introduktionstekst til siden"
            />
          </div>

          {/* Sections */}
          {(pageType === "service" || pageType === "static" || pageType === "city") && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Indholdssektioner</h2>
                <button
                  onClick={addSection}
                  className="text-sm text-[#6b9834] hover:underline"
                >
                  + Tilføj sektion
                </button>
              </div>
              
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-500">
                        Sektion {index + 1}
                      </span>
                      <button
                        onClick={() => removeSection(index)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Fjern
                      </button>
                    </div>
                    <div className="space-y-3">
                      <Input
                        label="Titel"
                        value={section.title}
                        onChange={(e) => updateSection(index, "title", e.target.value)}
                      />
                      <Textarea
                        label="Indhold"
                        rows={4}
                        value={section.content}
                        onChange={(e) => updateSection(index, "content", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                
                {sections.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Ingen sektioner endnu. Klik "Tilføj sektion" for at starte.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Preview Column */}
        <div className="space-y-6">
          <div className="sticky top-8">
            {/* SERP Preview */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Google Forhåndsvisning
              </h2>
              
              <SerpPreview
                title={metaTitle}
                description={metaDescription}
                url={pageUrl}
              />

              <div className="mt-4 text-sm text-gray-500">
                <p className="mb-2">Tips til bedre SEO:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Hold meta titel under 60 tegn</li>
                  <li>Hold meta beskrivelse under 155 tegn</li>
                  <li>Inkluder primære søgeord i titlen</li>
                  <li>Brug en handlingsopfordring i beskrivelsen</li>
                </ul>
              </div>
            </div>

            {/* Defaults Info */}
            {defaults.meta_title && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm font-medium text-blue-800 mb-2">Standardværdier fra koden:</p>
                <p className="text-xs text-blue-700 mb-1">
                  <strong>Titel:</strong> {defaults.meta_title?.substring(0, 50)}...
                </p>
                <p className="text-xs text-blue-700">
                  <strong>Beskrivelse:</strong> {defaults.meta_description?.substring(0, 60)}...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
