"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { SERVICES } from "@/lib/constants"
import { FileText, Save, X, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Page {
  id: string
  slug: string
  title: string
  meta_title: string
  meta_description: string
  page_type: string
  hero_heading: string
  hero_subheading: string
  content: Record<string, unknown>
  is_published: boolean
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    const { data } = await supabase
      .from("pages")
      .select("*")
      .order("title")

    setPages(data || [])
    setLoading(false)
  }

  const handleSavePage = async () => {
    if (!selectedPage) return
    setSaving(true)

    await supabase
      .from("pages")
      .update({
        title: selectedPage.title,
        meta_title: selectedPage.meta_title,
        meta_description: selectedPage.meta_description,
        hero_heading: selectedPage.hero_heading,
        hero_subheading: selectedPage.hero_subheading,
        content: selectedPage.content,
        is_published: selectedPage.is_published,
      })
      .eq("id", selectedPage.id)

    setPages(pages.map(p => p.id === selectedPage.id ? selectedPage : p))
    setSaving(false)
  }

  // All pages including hardcoded services
  const allPages = [
    ...SERVICES.map(s => ({ slug: s.slug, title: s.name, type: "service" })),
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sider</h1>
        <p className="text-gray-600">Rediger indhold på service- og informationssider</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Service-sider har standardindhold defineret i koden. 
          Her kan du tilføje tilpasset indhold, der overskriver standardteksten.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pages List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">Service sider ({SERVICES.length})</h2>
          </div>
          
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {SERVICES.map((service) => {
              const dbPage = pages.find(p => p.slug === service.slug)
              return (
                <div
                  key={service.slug}
                  onClick={() => dbPage && setSelectedPage(dbPage)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedPage?.slug === service.slug ? "bg-[#6b9834]/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#6b9834]" />
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-500">/{service.slug}/</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {dbPage ? (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Custom</span>
                      ) : (
                        <span className="text-xs text-gray-400">Standard</span>
                      )}
                      <Link 
                        href={`/${service.slug}/`} 
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Page Editor */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              {selectedPage ? `Rediger: ${selectedPage.title}` : "Vælg en side"}
            </h2>
            {selectedPage && (
              <button onClick={() => setSelectedPage(null)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {selectedPage ? (
            <div className="p-6 space-y-4">
              <Input
                label="Sidetitel"
                value={selectedPage.title}
                onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
              />
              <Input
                label="Meta titel (SEO)"
                value={selectedPage.meta_title || ""}
                onChange={(e) => setSelectedPage({ ...selectedPage, meta_title: e.target.value })}
              />
              <Textarea
                label="Meta beskrivelse (SEO)"
                rows={2}
                value={selectedPage.meta_description || ""}
                onChange={(e) => setSelectedPage({ ...selectedPage, meta_description: e.target.value })}
              />
              <Input
                label="Hero overskrift"
                value={selectedPage.hero_heading || ""}
                onChange={(e) => setSelectedPage({ ...selectedPage, hero_heading: e.target.value })}
              />
              <Input
                label="Hero undertitel"
                value={selectedPage.hero_subheading || ""}
                onChange={(e) => setSelectedPage({ ...selectedPage, hero_subheading: e.target.value })}
              />

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPage.is_published}
                    onChange={(e) => setSelectedPage({ ...selectedPage, is_published: e.target.checked })}
                    className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                  />
                  <span className="text-sm text-gray-700">Publiceret</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSavePage} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Gemmer..." : "Gem ændringer"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en side for at redigere</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
