"use client"

import { useState, useEffect, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { CITIES } from "@/lib/constants"
import { CITY_CONTENT } from "@/lib/content/cities"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import Link from "next/link"
import { 
  MapPin, Plus, Save, X, Trash2, Eye, EyeOff, 
  ExternalLink, Edit, Search, SortAsc
} from "lucide-react"

interface CityItem {
  id: string | null
  slug: string
  name: string
  distance: number
  custom_description: string
  is_visible: boolean
  isFromCode: boolean
  metaTitle: string
  metaDescription: string
}

export default function CitiesPage() {
  const [cities, setCities] = useState<CityItem[]>([])
  const [selectedCity, setSelectedCity] = useState<CityItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "distance">("distance")
  
  const [newCity, setNewCity] = useState({
    name: "",
    slug: "",
    distance: 0,
    custom_description: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = async () => {
    // Fetch DB cities
    const { data: dbCities } = await supabase
      .from("cities")
      .select("*")

    const dbCityMap = new Map<string, any>()
    if (dbCities) {
      dbCities.forEach((c: any) => dbCityMap.set(c.slug, c))
    }

    // Merge with code cities
    const allCities: CityItem[] = CITIES.map((city) => {
      const dbCity = dbCityMap.get(city.slug)
      const content = CITY_CONTENT[city.slug]
      
      return {
        id: dbCity?.id || null,
        slug: city.slug,
        name: dbCity?.name || city.name,
        distance: dbCity?.distance ?? city.distance,
        custom_description: dbCity?.custom_description || "",
        is_visible: dbCity?.is_visible ?? true,
        isFromCode: true,
        metaTitle: dbCity?.meta_title || content?.metaTitle || "",
        metaDescription: dbCity?.meta_description || content?.metaDescription || "",
      }
    })

    // Add any DB-only cities
    if (dbCities) {
      dbCities.forEach((c: any) => {
        if (!CITIES.find(cc => cc.slug === c.slug)) {
          allCities.push({
            id: c.id,
            slug: c.slug,
            name: c.name,
            distance: c.distance,
            custom_description: c.custom_description || "",
            is_visible: c.is_visible,
            isFromCode: false,
            metaTitle: "",
            metaDescription: "",
          })
        }
      })
    }

    setCities(allCities)
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
      .from("cities")
      .insert({
        name: newCity.name,
        slug,
        distance: newCity.distance,
        custom_description: newCity.custom_description,
        is_visible: true,
        sort_order: cities.length,
      })
      .select()
      .single()

    if (data) {
      setCities([...cities, {
        id: data.id,
        slug: data.slug,
        name: data.name,
        distance: data.distance,
        custom_description: data.custom_description || "",
        is_visible: data.is_visible,
        isFromCode: false,
        metaTitle: "",
        metaDescription: "",
      }])
      setIsCreating(false)
      setNewCity({ name: "", slug: "", distance: 0, custom_description: "" })
    }

    setSaving(false)
  }

  const handleSaveCity = async () => {
    if (!selectedCity) return
    setSaving(true)

    const cityData = {
      name: selectedCity.name,
      slug: selectedCity.slug,
      distance: selectedCity.distance,
      custom_description: selectedCity.custom_description,
      is_visible: selectedCity.is_visible,
      meta_title: selectedCity.metaTitle || null,
      meta_description: selectedCity.metaDescription || null,
    }

    if (selectedCity.id) {
      await supabase
        .from("cities")
        .update(cityData)
        .eq("id", selectedCity.id)
    } else {
      const { data } = await supabase
        .from("cities")
        .insert({ ...cityData, sort_order: cities.length })
        .select()
        .single()
      
      if (data) {
        selectedCity.id = data.id
      }
    }

    setCities(cities.map(c => 
      c.slug === selectedCity.slug ? selectedCity : c
    ))
    
    setSaving(false)
  }

  const toggleVisibility = async (city: CityItem) => {
    const newVisibility = !city.is_visible
    
    if (city.id) {
      await supabase
        .from("cities")
        .update({ is_visible: newVisibility })
        .eq("id", city.id)
    } else {
      const { data } = await supabase
        .from("cities")
        .insert({
          slug: city.slug,
          name: city.name,
          distance: city.distance,
          is_visible: newVisibility,
          sort_order: cities.length,
        })
        .select()
        .single()
      
      if (data) {
        city.id = data.id
      }
    }

    setCities(cities.map(c => 
      c.slug === city.slug ? { ...c, is_visible: newVisibility } : c
    ))
  }

  const handleDeleteCity = async (city: CityItem) => {
    if (city.isFromCode) {
      alert("Denne by er defineret i koden og kan ikke slettes. Brug 'Skjul' i stedet.")
      return
    }
    
    if (!confirm("Er du sikker på at du vil slette denne by?")) return

    if (city.id) {
      await supabase.from("cities").delete().eq("id", city.id)
    }

    setCities(cities.filter(c => c.slug !== city.slug))
    if (selectedCity?.slug === city.slug) setSelectedCity(null)
  }

  // Filter and sort cities
  const filteredCities = useMemo(() => {
    let result = cities

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.slug.toLowerCase().includes(query)
      )
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name, "da")
      }
      return a.distance - b.distance
    })

    return result
  }, [cities, searchQuery, sortBy])

  const stats = {
    total: cities.length,
    visible: cities.filter(c => c.is_visible).length,
    local: cities.filter(c => c.distance <= 30).length,
    regional: cities.filter(c => c.distance > 30 && c.distance <= 60).length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Byer</h1>
          <p className="text-gray-600">Administrer by-sider og deres synlighed</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tilføj by
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
          <p className="text-2xl font-bold text-blue-600">{stats.local}</p>
          <p className="text-sm text-gray-600">Lokale (≤30 km)</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-purple-600">{stats.regional}</p>
          <p className="text-sm text-gray-600">Regionale (30-60 km)</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Cities List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Søg efter by..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "distance")}
                className="text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
              >
                <option value="distance">Sorter efter afstand</option>
                <option value="name">Sorter efter navn</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredCities.map((city) => (
                <div
                  key={city.slug}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    selectedCity?.slug === city.slug ? "bg-[#6b9834]/5" : ""
                  } ${!city.is_visible ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => setSelectedCity(city)}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#6b9834]" />
                        <p className="font-medium text-gray-900">{city.name}</p>
                        {city.isFromCode && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                            Kode
                          </span>
                        )}
                        {city.custom_description && (
                          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                            Custom
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{city.distance} km fra Slagelse</span>
                        <span className="text-xs text-gray-400">•</span>
                        <code className="text-xs text-gray-400">/{city.slug}/</code>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleVisibility(city)}
                        className={`p-2 rounded-lg transition-colors ${
                          city.is_visible 
                            ? "text-green-600 hover:bg-green-50" 
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                        title={city.is_visible ? "Synlig" : "Skjult"}
                      >
                        {city.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      
                      <Link
                        href={`/${city.slug}/`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-[#6b9834] hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              {isCreating ? "Tilføj by" : selectedCity ? `Rediger: ${selectedCity.name}` : "Vælg en by"}
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
                onChange={(e) => setNewCity({ 
                  ...newCity, 
                  name: e.target.value,
                  slug: generateSlug(e.target.value)
                })}
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
                onChange={(e) => setNewCity({ ...newCity, distance: parseInt(e.target.value) || 0 })}
              />
              <Textarea
                label="Custom beskrivelse (valgfri)"
                rows={4}
                value={newCity.custom_description}
                onChange={(e) => setNewCity({ ...newCity, custom_description: e.target.value })}
                placeholder="Tilføj en brugerdefineret beskrivelse for denne by..."
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
                label="Bynavn"
                value={selectedCity.name}
                onChange={(e) => setSelectedCity({ ...selectedCity, name: e.target.value })}
              />
              <Input
                label="URL slug"
                value={selectedCity.slug}
                onChange={(e) => setSelectedCity({ ...selectedCity, slug: e.target.value })}
                disabled={selectedCity.isFromCode}
              />
              <Input
                label="Afstand fra Slagelse (km)"
                type="number"
                value={selectedCity.distance}
                onChange={(e) => setSelectedCity({ ...selectedCity, distance: parseInt(e.target.value) || 0 })}
              />
              <Textarea
                label="Custom beskrivelse"
                rows={4}
                value={selectedCity.custom_description}
                onChange={(e) => setSelectedCity({ ...selectedCity, custom_description: e.target.value })}
                placeholder="Tilføj en brugerdefineret beskrivelse for denne by..."
              />

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCity.is_visible}
                    onChange={(e) => setSelectedCity({ ...selectedCity, is_visible: e.target.checked })}
                    className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                  />
                  <span className="text-sm text-gray-700">Synlig på hjemmesiden</span>
                </label>
              </div>

              {/* SEO Fields */}
              <div className="border-t pt-4 mt-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">SEO</p>
                <div className="space-y-3">
                  <div>
                    <Input
                      label={`Meta titel (${(selectedCity.metaTitle || '').length}/60)`}
                      value={selectedCity.metaTitle}
                      onChange={(e) => setSelectedCity({ ...selectedCity, metaTitle: e.target.value })}
                      placeholder={CITY_CONTENT[selectedCity.slug]?.metaTitle || "Auto-genereret titel..."}
                      maxLength={60}
                    />
                    {selectedCity.metaTitle && (
                      <p className="text-xs text-gray-400 mt-1">Tom = bruger auto-genereret titel</p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      label={`Meta beskrivelse (${(selectedCity.metaDescription || '').length}/160)`}
                      rows={2}
                      value={selectedCity.metaDescription}
                      onChange={(e) => setSelectedCity({ ...selectedCity, metaDescription: e.target.value })}
                      placeholder={CITY_CONTENT[selectedCity.slug]?.metaDescription || "Auto-genereret beskrivelse..."}
                      maxLength={160}
                    />
                  </div>
                  {/* SERP Preview */}
                  <div className="bg-white border rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Google forhåndsvisning:</p>
                    <p className="text-blue-700 text-sm font-medium truncate">
                      {selectedCity.metaTitle || CITY_CONTENT[selectedCity.slug]?.metaTitle || `Maler ${selectedCity.name}`}
                    </p>
                    <p className="text-green-700 text-xs">maler-christensen.dk/{selectedCity.slug}/</p>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {selectedCity.metaDescription || CITY_CONTENT[selectedCity.slug]?.metaDescription || `Professionel maler i ${selectedCity.name}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSaveCity} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Gemmer..." : "Gem ændringer"}
                </Button>
                {!selectedCity.isFromCode && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeleteCity(selectedCity)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Slet
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en by for at redigere</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
