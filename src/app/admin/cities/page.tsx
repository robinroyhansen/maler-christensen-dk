"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { CITIES } from "@/lib/constants"
import { MapPin, Plus, Save, X, Trash2 } from "lucide-react"

interface CityPage {
  id: string
  slug: string
  title: string
  meta_title: string
  meta_description: string
  city_name: string
  hero_heading: string
  hero_subheading: string
  content: {
    intro?: string
    aboutCity?: string
    whyChooseUs?: string
  }
  is_published: boolean
}

export default function CitiesPage() {
  const [cities, setCities] = useState<CityPage[]>([])
  const [selectedCity, setSelectedCity] = useState<CityPage | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // New city form
  const [newCity, setNewCity] = useState({
    name: "",
    slug: "",
    distance: 0,
    intro: "",
    aboutCity: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = async () => {
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("page_type", "city")
      .order("city_name")

    setCities(data || [])
    setLoading(false)
  }

  const generateSlug = (name: string) => {
    return `maler-${name.toLowerCase()
      .replace(/æ/g, "ae")
      .replace(/ø/g, "oe")
      .replace(/å/g, "aa")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}`
  }

  const handleCreateCity = async () => {
    if (!newCity.name) return
    setSaving(true)

    const slug = newCity.slug || generateSlug(newCity.name)

    const { data, error } = await supabase
      .from("pages")
      .insert({
        slug,
        title: `Maler ${newCity.name}`,
        meta_title: `Maler ${newCity.name} | Professionelt malerarbejde`,
        meta_description: `Søger du en maler i ${newCity.name}? Vi tilbyder professionelt malerarbejde med 4.9/5 på Trustpilot. Gratis tilbud!`,
        page_type: "city",
        city_name: newCity.name,
        hero_heading: `Maler i ${newCity.name}`,
        hero_subheading: `Professionelt malerarbejde til private og erhverv i ${newCity.name}`,
        content: {
          intro: newCity.intro || `Søger du en pålidelig maler i ${newCity.name}? Vi tilbyder professionelt malerarbejde til både private og erhverv.`,
          aboutCity: newCity.aboutCity || `Vi servicerer ${newCity.name} og omegn med kvalitetsmalerarbejde.`,
          distance: newCity.distance,
        },
        is_published: true,
      })
      .select()
      .single()

    if (data) {
      setCities([...cities, data])
      setIsCreating(false)
      setNewCity({ name: "", slug: "", distance: 0, intro: "", aboutCity: "" })
    }

    setSaving(false)
  }

  const handleSaveCity = async () => {
    if (!selectedCity) return
    setSaving(true)

    await supabase
      .from("pages")
      .update({
        title: selectedCity.title,
        meta_title: selectedCity.meta_title,
        meta_description: selectedCity.meta_description,
        hero_heading: selectedCity.hero_heading,
        hero_subheading: selectedCity.hero_subheading,
        content: selectedCity.content,
        is_published: selectedCity.is_published,
      })
      .eq("id", selectedCity.id)

    setCities(cities.map(c => c.id === selectedCity.id ? selectedCity : c))
    setSaving(false)
  }

  const handleDeleteCity = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne by?")) return

    await supabase.from("pages").delete().eq("id", id)
    setCities(cities.filter(c => c.id !== id))
    if (selectedCity?.id === id) setSelectedCity(null)
  }

  // Get cities that are in the hardcoded list but not in DB
  const existingCitySlugs = cities.map(c => c.slug)
  const missingCities = CITIES.filter(c => !existingCitySlugs.includes(c.slug))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Byer</h1>
          <p className="text-gray-600">Administrer bysider og tilføj nye</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tilføj by
        </Button>
      </div>

      {/* Info about static cities */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> {CITIES.length} byer er defineret i koden og vises automatisk. 
          Her kan du redigere indholdet og tilføje nye byer. {cities.length} byer har custom indhold i databasen.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Cities List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">Alle byer ({CITIES.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {CITIES.map((city) => {
                const dbCity = cities.find(c => c.slug === city.slug)
                return (
                  <div
                    key={city.slug}
                    onClick={() => dbCity && setSelectedCity(dbCity)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedCity?.slug === city.slug ? "bg-[#6b9834]/5" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#6b9834]" />
                        <div>
                          <p className="font-medium text-gray-900">{city.name}</p>
                          <p className="text-sm text-gray-500">/{city.slug}/</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">{city.distance} km</p>
                        {dbCity ? (
                          <span className="text-xs text-green-600">Custom</span>
                        ) : (
                          <span className="text-xs text-gray-400">Standard</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* City Editor / Create Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              {isCreating ? "Tilføj ny by" : selectedCity ? `Rediger ${selectedCity.city_name}` : "Vælg en by"}
            </h2>
            {(isCreating || selectedCity) && (
              <button onClick={() => { setIsCreating(false); setSelectedCity(null); }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {isCreating ? (
            <div className="p-6 space-y-4">
              <Input
                label="Bynavn"
                value={newCity.name}
                onChange={(e) => setNewCity({ ...newCity, name: e.target.value, slug: generateSlug(e.target.value) })}
                placeholder="F.eks. Næstved"
              />
              <Input
                label="URL slug"
                value={newCity.slug}
                onChange={(e) => setNewCity({ ...newCity, slug: e.target.value })}
                placeholder="maler-naestved"
              />
              <Input
                label="Afstand fra Slagelse (km)"
                type="number"
                value={newCity.distance}
                onChange={(e) => setNewCity({ ...newCity, distance: parseInt(e.target.value) })}
              />
              <Textarea
                label="Intro tekst"
                rows={3}
                value={newCity.intro}
                onChange={(e) => setNewCity({ ...newCity, intro: e.target.value })}
                placeholder="Introduktion til bysiden..."
              />
              <Textarea
                label="Om byen"
                rows={3}
                value={newCity.aboutCity}
                onChange={(e) => setNewCity({ ...newCity, aboutCity: e.target.value })}
                placeholder="Tekst om arbejde i denne by..."
              />

              <div className="flex gap-4 pt-4">
                <Button onClick={handleCreateCity} disabled={saving || !newCity.name}>
                  {saving ? "Gemmer..." : "Opret by"}
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Annuller
                </Button>
              </div>
            </div>
          ) : selectedCity ? (
            <div className="p-6 space-y-4">
              <Input
                label="Sidetitel"
                value={selectedCity.title}
                onChange={(e) => setSelectedCity({ ...selectedCity, title: e.target.value })}
              />
              <Input
                label="Meta titel"
                value={selectedCity.meta_title}
                onChange={(e) => setSelectedCity({ ...selectedCity, meta_title: e.target.value })}
              />
              <Textarea
                label="Meta beskrivelse"
                rows={2}
                value={selectedCity.meta_description}
                onChange={(e) => setSelectedCity({ ...selectedCity, meta_description: e.target.value })}
              />
              <Input
                label="Hero overskrift"
                value={selectedCity.hero_heading}
                onChange={(e) => setSelectedCity({ ...selectedCity, hero_heading: e.target.value })}
              />
              <Textarea
                label="Intro tekst"
                rows={3}
                value={selectedCity.content?.intro || ""}
                onChange={(e) => setSelectedCity({ 
                  ...selectedCity, 
                  content: { ...selectedCity.content, intro: e.target.value } 
                })}
              />
              <Textarea
                label="Om byen tekst"
                rows={3}
                value={selectedCity.content?.aboutCity || ""}
                onChange={(e) => setSelectedCity({ 
                  ...selectedCity, 
                  content: { ...selectedCity.content, aboutCity: e.target.value } 
                })}
              />

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCity.is_published}
                    onChange={(e) => setSelectedCity({ ...selectedCity, is_published: e.target.checked })}
                    className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                  />
                  <span className="text-sm text-gray-700">Publiceret</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSaveCity} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Gemmer..." : "Gem ændringer"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDeleteCity(selectedCity.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Slet
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en by for at redigere, eller tilføj en ny</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
