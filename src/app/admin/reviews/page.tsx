"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Star, Plus, Save, X, Trash2 } from "lucide-react"

interface Review {
  id: string
  author_name: string
  review_text: string
  rating: number
  source: string
  is_featured: boolean
  sort_order: number
  created_at: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [newReview, setNewReview] = useState({
    author_name: "",
    review_text: "",
    rating: 5,
    is_featured: false,
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

    setReviews(data || [])
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
        source: "trustpilot",
        is_featured: newReview.is_featured,
        sort_order: reviews.length,
      })
      .select()
      .single()

    if (data) {
      setReviews([...reviews, data])
      setIsCreating(false)
      setNewReview({ author_name: "", review_text: "", rating: 5, is_featured: false })
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
        is_featured: selectedReview.is_featured,
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

  const StarRating = ({ rating, onChange }: { rating: number, onChange?: (r: number) => void }) => (
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
            className={`w-6 h-6 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
          />
        </button>
      ))}
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Anmeldelser</h1>
          <p className="text-gray-600">Administrer Trustpilot anmeldelser</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tilføj anmeldelse
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reviews List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">Alle anmeldelser ({reviews.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Ingen anmeldelser endnu</p>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  onClick={() => setSelectedReview(review)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedReview?.id === review.id ? "bg-[#6b9834]/5" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-gray-900">{review.author_name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{review.review_text}</p>
                  {review.is_featured && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-[#6b9834] text-white text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              ))}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <StarRating 
                  rating={newReview.rating} 
                  onChange={(r) => setNewReview({ ...newReview, rating: r })}
                />
              </div>
              <Textarea
                label="Anmeldelse tekst"
                rows={4}
                value={newReview.review_text}
                onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                placeholder="Anmeldelsens indhold..."
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newReview.is_featured}
                  onChange={(e) => setNewReview({ ...newReview, is_featured: e.target.checked })}
                  className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                />
                <span className="text-sm text-gray-700">Vis på forside</span>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <StarRating 
                  rating={selectedReview.rating} 
                  onChange={(r) => setSelectedReview({ ...selectedReview, rating: r })}
                />
              </div>
              <Textarea
                label="Anmeldelse tekst"
                rows={4}
                value={selectedReview.review_text}
                onChange={(e) => setSelectedReview({ ...selectedReview, review_text: e.target.value })}
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedReview.is_featured}
                  onChange={(e) => setSelectedReview({ ...selectedReview, is_featured: e.target.checked })}
                  className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                />
                <span className="text-sm text-gray-700">Vis på forside</span>
              </label>

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
