"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { SERVICES, CITIES } from "@/lib/constants"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Star, Plus, Save, X, Trash2, Eye, EyeOff, CheckCircle } from "lucide-react"

interface Review {
  id: string
  author_name: string
  review_text: string
  rating: number
  source: string
  is_featured: boolean
  is_visible: boolean
  page_slugs: string[]
  sort_order: number
  created_at: string
}

const SOURCES = [
  { id: "trustpilot", name: "Trustpilot", color: "bg-green-100 text-green-700" },
  { id: "anmeldhaandvaerker", name: "Anmeld Håndværker", color: "bg-blue-100 text-blue-700" },
  { id: "google", name: "Google", color: "bg-red-100 text-red-700" },
  { id: "facebook", name: "Facebook", color: "bg-indigo-100 text-indigo-700" },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filterSource, setFilterSource] = useState<string>("all")
  
  const [newReview, setNewReview] = useState({
    author_name: "",
    review_text: "",
    rating: 5,
    source: "trustpilot",
    is_featured: false,
    page_slugs: [] as string[],
  })

  const supabase = createClient()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("sort_order", { ascending: true })

    if (data) {
      // Handle case where new columns might not exist
      const reviewsWithDefaults = data.map((r: any) => ({
        ...r,
        is_visible: r.is_visible ?? true,
        page_slugs: r.page_slugs || [],
      }))
      setReviews(reviewsWithDefaults)
    }
    setLoading(false)
  }

  const handleCreateReview = async () => {
    if (!newReview.author_name || !newReview.review_text) return
    setSaving(true)

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        author_name: newReview.author_name,
        review_text: newReview.review_text,
        rating: newReview.rating,
        source: newReview.source,
        is_featured: newReview.is_featured,
        is_visible: true,
        page_slugs: newReview.page_slugs,
        sort_order: reviews.length,
      })
      .select()
      .single()

    if (data) {
      setReviews([...reviews, { ...data, is_visible: true, page_slugs: data.page_slugs || [] }])
      setIsCreating(false)
      setNewReview({ author_name: "", review_text: "", rating: 5, source: "trustpilot", is_featured: false, page_slugs: [] })
    }

    setSaving(false)
  }

  const handleSaveReview = async () => {
    if (!selectedReview) return
    setSaving(true)

    await supabase
      .from("reviews")
      .update({
        author_name: selectedReview.author_name,
        review_text: selectedReview.review_text,
        rating: selectedReview.rating,
        source: selectedReview.source,
        is_featured: selectedReview.is_featured,
        is_visible: selectedReview.is_visible,
        page_slugs: selectedReview.page_slugs,
        sort_order: selectedReview.sort_order,
      })
      .eq("id", selectedReview.id)

    setReviews(reviews.map(r => r.id === selectedReview.id ? selectedReview : r))
    setSaving(false)
  }

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne anmeldelse?")) return

    await supabase.from("reviews").delete().eq("id", id)
    setReviews(reviews.filter(r => r.id !== id))
    if (selectedReview?.id === id) setSelectedReview(null)
  }

  const toggleVisibility = async (review: Review) => {
    const newVisibility = !review.is_visible
    
    await supabase
      .from("reviews")
      .update({ is_visible: newVisibility })
      .eq("id", review.id)

    setReviews(reviews.map(r => 
      r.id === review.id ? { ...r, is_visible: newVisibility } : r
    ))
  }

  const StarRating = ({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          disabled={!onChange}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star 
            className={`w-5 h-5 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
          />
        </button>
      ))}
    </div>
  )

  const PageSelector = ({ 
    selected, 
    onChange 
  }: { 
    selected: string[]
    onChange: (slugs: string[]) => void 
  }) => {
    const allPages = [
      ...SERVICES.map(s => ({ slug: s.slug, name: s.name, type: "service" })),
      ...CITIES.slice(0, 20).map(c => ({ slug: c.slug, name: c.name, type: "city" })),
    ]

    const togglePage = (slug: string) => {
      if (selected.includes(slug)) {
        onChange(selected.filter(s => s !== slug))
      } else {
        onChange([...selected, slug])
      }
    }

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Vis på sider</label>
        <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-1">
          {allPages.map((page) => (
            <label key={page.slug} className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(page.slug)}
                onChange={() => togglePage(page.slug)}
                className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
              />
              <span className="text-sm text-gray-700">{page.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                page.type === "service" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
              }`}>
                {page.type === "service" ? "Service" : "By"}
              </span>
            </label>
          ))}
        </div>
        {selected.length > 0 && (
          <p className="text-xs text-gray-500">{selected.length} sider valgt</p>
        )}
      </div>
    )
  }

  const filteredReviews = filterSource === "all" 
    ? reviews 
    : reviews.filter(r => r.source === filterSource)

  const stats = {
    total: reviews.length,
    visible: reviews.filter(r => r.is_visible).length,
    featured: reviews.filter(r => r.is_featured).length,
    avgRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0",
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Anmeldelser</h1>
          <p className="text-gray-600">Administrer kundeudtalelser</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tilføj anmeldelse
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-green-600">{stats.visible}</p>
          <p className="text-sm text-gray-600">Synlige</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-purple-600">{stats.featured}</p>
          <p className="text-sm text-gray-600">Featured</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
            <p className="text-sm text-gray-600">Gns. rating</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reviews List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Alle anmeldelser ({reviews.length})</h2>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
            >
              <option value="all">Alle kilder</option>
              {SOURCES.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Ingen anmeldelser fundet</p>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredReviews.map((review) => {
                const sourceConfig = SOURCES.find(s => s.id === review.source) || SOURCES[0]
                
                return (
                  <div
                    key={review.id}
                    onClick={() => setSelectedReview(review)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedReview?.id === review.id ? "bg-[#6b9834]/5" : ""
                    } ${!review.is_visible ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{review.author_name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sourceConfig.color}`}>
                          {sourceConfig.name}
                        </span>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{review.review_text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {review.is_featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      {review.page_slugs.length > 0 && (
                        <span className="text-xs text-gray-400">
                          {review.page_slugs.length} sider
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleVisibility(review); }}
                        className={`ml-auto p-1 rounded transition-colors ${
                          review.is_visible 
                            ? "text-green-600 hover:bg-green-50" 
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        {review.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Review Editor */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              {isCreating ? "Tilføj anmeldelse" : selectedReview ? "Rediger anmeldelse" : "Vælg en anmeldelse"}
            </h2>
            {(isCreating || selectedReview) && (
              <button onClick={() => { setIsCreating(false); setSelectedReview(null); }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {isCreating ? (
            <div className="p-6 space-y-4">
              <Input
                label="Kundens navn"
                value={newReview.author_name}
                onChange={(e) => setNewReview({ ...newReview, author_name: e.target.value })}
                placeholder="F.eks. Michael Hansen"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <StarRating 
                    rating={newReview.rating} 
                    onChange={(r) => setNewReview({ ...newReview, rating: r })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kilde</label>
                  <select
                    value={newReview.source}
                    onChange={(e) => setNewReview({ ...newReview, source: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
                  >
                    {SOURCES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Textarea
                label="Anmeldelse tekst"
                rows={4}
                value={newReview.review_text}
                onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                placeholder="Anmeldelsens indhold..."
              />

              <PageSelector
                selected={newReview.page_slugs}
                onChange={(slugs) => setNewReview({ ...newReview, page_slugs: slugs })}
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newReview.is_featured}
                  onChange={(e) => setNewReview({ ...newReview, is_featured: e.target.checked })}
                  className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                />
                <span className="text-sm text-gray-700">Vis på forside (featured)</span>
              </label>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleCreateReview} disabled={saving || !newReview.author_name}>
                  {saving ? "Gemmer..." : "Opret anmeldelse"}
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Annuller
                </Button>
              </div>
            </div>
          ) : selectedReview ? (
            <div className="p-6 space-y-4">
              <Input
                label="Kundens navn"
                value={selectedReview.author_name}
                onChange={(e) => setSelectedReview({ ...selectedReview, author_name: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <StarRating 
                    rating={selectedReview.rating} 
                    onChange={(r) => setSelectedReview({ ...selectedReview, rating: r })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kilde</label>
                  <select
                    value={selectedReview.source}
                    onChange={(e) => setSelectedReview({ ...selectedReview, source: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
                  >
                    {SOURCES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Textarea
                label="Anmeldelse tekst"
                rows={4}
                value={selectedReview.review_text}
                onChange={(e) => setSelectedReview({ ...selectedReview, review_text: e.target.value })}
              />

              <PageSelector
                selected={selectedReview.page_slugs}
                onChange={(slugs) => setSelectedReview({ ...selectedReview, page_slugs: slugs })}
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedReview.is_featured}
                    onChange={(e) => setSelectedReview({ ...selectedReview, is_featured: e.target.checked })}
                    className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedReview.is_visible}
                    onChange={(e) => setSelectedReview({ ...selectedReview, is_visible: e.target.checked })}
                    className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                  />
                  <span className="text-sm text-gray-700">Synlig</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSaveReview} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Gemmer..." : "Gem ændringer"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDeleteReview(selectedReview.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Slet
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en anmeldelse for at redigere</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
