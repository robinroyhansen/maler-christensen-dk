"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { SERVICES } from "@/lib/constants"
import { SERVICE_CONTENT } from "@/lib/content/services"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import Link from "next/link"
import { 
  Wrench, Plus, Save, X, Trash2, Eye, EyeOff, 
  GripVertical, ExternalLink, Edit
} from "lucide-react"

interface ServiceItem {
  id: string | null
  slug: string
  name: string
  description: string
  icon: string
  is_visible: boolean
  sort_order: number
  isFromCode: boolean
  metaTitle: string
  metaDescription: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [newService, setNewService] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "Wrench",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    // Fetch DB services
    const { data: dbServices } = await supabase
      .from("services")
      .select("*")
      .order("sort_order")

    const dbServiceMap = new Map<string, any>()
    if (dbServices) {
      dbServices.forEach((s: any) => dbServiceMap.set(s.slug, s))
    }

    // Merge with code services
    const allServices: ServiceItem[] = SERVICES.map((service, index) => {
      const dbService = dbServiceMap.get(service.slug)
      const content = SERVICE_CONTENT[service.slug]
      return {
        id: dbService?.id || null,
        slug: service.slug,
        name: dbService?.name || service.name,
        description: dbService?.description || service.description,
        icon: dbService?.icon || "Wrench",
        is_visible: dbService?.is_visible ?? true,
        sort_order: dbService?.sort_order ?? index,
        isFromCode: true,
        metaTitle: dbService?.meta_title || content?.metaTitle || "",
        metaDescription: dbService?.meta_description || content?.metaDescription || "",
      }
    })

    // Add any DB-only services
    if (dbServices) {
      dbServices.forEach((s: any) => {
        if (!SERVICES.find(cs => cs.slug === s.slug)) {
          allServices.push({
            id: s.id,
            slug: s.slug,
            name: s.name,
            description: s.description,
            icon: s.icon || "Wrench",
            is_visible: s.is_visible,
            sort_order: s.sort_order,
            isFromCode: false,
            metaTitle: s.meta_title || "",
            metaDescription: s.meta_description || "",
          })
        }
      })
    }

    // Sort by sort_order
    allServices.sort((a, b) => a.sort_order - b.sort_order)
    
    setServices(allServices)
    setLoading(false)
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/æ/g, "ae")
      .replace(/ø/g, "oe")
      .replace(/å/g, "aa")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  const handleCreateService = async () => {
    if (!newService.name) return
    setSaving(true)

    const slug = newService.slug || generateSlug(newService.name)
    
    const { data, error } = await supabase
      .from("services")
      .insert({
        name: newService.name,
        slug,
        description: newService.description,
        icon: newService.icon,
        is_visible: true,
        sort_order: services.length,
      })
      .select()
      .single()

    if (data) {
      setServices([...services, {
        id: data.id,
        slug: data.slug,
        name: data.name,
        description: data.description,
        icon: data.icon,
        is_visible: data.is_visible,
        sort_order: data.sort_order,
        isFromCode: false,
        metaTitle: "",
        metaDescription: "",
      }])
      setIsCreating(false)
      setNewService({ name: "", slug: "", description: "", icon: "Wrench" })
    }

    setSaving(false)
  }

  const handleSaveService = async () => {
    if (!selectedService) return
    setSaving(true)

    const serviceData = {
      name: selectedService.name,
      slug: selectedService.slug,
      description: selectedService.description,
      icon: selectedService.icon,
      is_visible: selectedService.is_visible,
      sort_order: selectedService.sort_order,
      meta_title: selectedService.metaTitle || null,
      meta_description: selectedService.metaDescription || null,
    }

    if (selectedService.id) {
      // Update existing
      await supabase
        .from("services")
        .update(serviceData)
        .eq("id", selectedService.id)
    } else {
      // Create new (for code-defined services)
      const { data } = await supabase
        .from("services")
        .insert(serviceData)
        .select()
        .single()
      
      if (data) {
        selectedService.id = data.id
      }
    }

    setServices(services.map(s => 
      s.slug === selectedService.slug ? selectedService : s
    ))
    
    setSaving(false)
  }

  const toggleVisibility = async (service: ServiceItem) => {
    const newVisibility = !service.is_visible
    
    if (service.id) {
      await supabase
        .from("services")
        .update({ is_visible: newVisibility })
        .eq("id", service.id)
    } else {
      // Need to create DB entry first
      const { data } = await supabase
        .from("services")
        .insert({
          slug: service.slug,
          name: service.name,
          description: service.description,
          icon: service.icon,
          is_visible: newVisibility,
          sort_order: service.sort_order,
        })
        .select()
        .single()
      
      if (data) {
        service.id = data.id
      }
    }

    setServices(services.map(s => 
      s.slug === service.slug ? { ...s, is_visible: newVisibility } : s
    ))
  }

  const handleDeleteService = async (service: ServiceItem) => {
    if (service.isFromCode) {
      alert("Denne service er defineret i koden og kan ikke slettes. Brug 'Skjul' i stedet.")
      return
    }
    
    if (!confirm("Er du sikker på at du vil slette denne service?")) return

    if (service.id) {
      await supabase.from("services").delete().eq("id", service.id)
    }

    setServices(services.filter(s => s.slug !== service.slug))
    if (selectedService?.slug === service.slug) setSelectedService(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Administrer services og deres synlighed</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tilføj service
        </Button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> {SERVICES.length} services er defineret i koden.
          Du kan ændre deres synlighed og beskrivelse her. Nye services kan også tilføjes.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Services List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">
              Alle services ({services.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {services.map((service, index) => (
                <div
                  key={service.slug}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    selectedService?.slug === service.slug ? "bg-[#6b9834]/5" : ""
                  } ${!service.is_visible ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="cursor-grab text-gray-400">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{service.name}</p>
                        {service.isFromCode && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                            Kode
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">/{service.slug}/</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleVisibility(service)}
                        className={`p-2 rounded-lg transition-colors ${
                          service.is_visible 
                            ? "text-green-600 hover:bg-green-50" 
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                        title={service.is_visible ? "Synlig" : "Skjult"}
                      >
                        {service.is_visible ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                      
                      <Link
                        href={`/${service.slug}/`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-[#6b9834] hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
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
              {isCreating ? "Tilføj service" : selectedService ? `Rediger: ${selectedService.name}` : "Vælg en service"}
            </h2>
            {(isCreating || selectedService) && (
              <button onClick={() => { setIsCreating(false); setSelectedService(null); }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {isCreating ? (
            <div className="p-6 space-y-4">
              <Input
                label="Navn"
                value={newService.name}
                onChange={(e) => setNewService({ 
                  ...newService, 
                  name: e.target.value,
                  slug: generateSlug(e.target.value)
                })}
                placeholder="F.eks. Gulvspartling"
              />
              <Input
                label="URL slug"
                value={newService.slug}
                onChange={(e) => setNewService({ ...newService, slug: e.target.value })}
                placeholder="gulvspartling"
              />
              <Textarea
                label="Beskrivelse"
                rows={3}
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Kort beskrivelse af servicen..."
              />

              <div className="flex gap-4 pt-4">
                <Button onClick={handleCreateService} disabled={saving || !newService.name}>
                  {saving ? "Gemmer..." : "Opret service"}
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Annuller
                </Button>
              </div>
            </div>
          ) : selectedService ? (
            <div className="p-6 space-y-4">
              <Input
                label="Navn"
                value={selectedService.name}
                onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
              />
              <Input
                label="URL slug"
                value={selectedService.slug}
                onChange={(e) => setSelectedService({ ...selectedService, slug: e.target.value })}
                disabled={selectedService.isFromCode}
              />
              <Textarea
                label="Beskrivelse"
                rows={3}
                value={selectedService.description}
                onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
              />

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedService.is_visible}
                    onChange={(e) => setSelectedService({ ...selectedService, is_visible: e.target.checked })}
                    className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                  />
                  <span className="text-sm text-gray-700">Synlig på hjemmesiden</span>
                </label>
              </div>

              {/* SEO Fields */}
              <div className="border-t pt-4 mt-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">SEO</p>
                <div className="space-y-3">
                  <Input
                    label={`Meta titel (${(selectedService.metaTitle || '').length}/60)`}
                    value={selectedService.metaTitle}
                    onChange={(e) => setSelectedService({ ...selectedService, metaTitle: e.target.value })}
                    placeholder={SERVICE_CONTENT[selectedService.slug]?.metaTitle || "Auto-genereret titel..."}
                    maxLength={60}
                  />
                  <Textarea
                    label={`Meta beskrivelse (${(selectedService.metaDescription || '').length}/160)`}
                    rows={2}
                    value={selectedService.metaDescription}
                    onChange={(e) => setSelectedService({ ...selectedService, metaDescription: e.target.value })}
                    placeholder={SERVICE_CONTENT[selectedService.slug]?.metaDescription || "Auto-genereret beskrivelse..."}
                    maxLength={160}
                  />
                  {/* SERP Preview */}
                  <div className="bg-white border rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Google forhåndsvisning:</p>
                    <p className="text-blue-700 text-sm font-medium truncate">
                      {selectedService.metaTitle || SERVICE_CONTENT[selectedService.slug]?.metaTitle || selectedService.name}
                    </p>
                    <p className="text-green-700 text-xs">maler-christensen.dk/{selectedService.slug}/</p>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {selectedService.metaDescription || SERVICE_CONTENT[selectedService.slug]?.metaDescription || selectedService.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSaveService} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Gemmer..." : "Gem ændringer"}
                </Button>
                {!selectedService.isFromCode && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeleteService(selectedService)}
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
              <Wrench className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en service for at redigere</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
