"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Users, Plus, Save, X, Trash2, ExternalLink } from "lucide-react"

interface Partner {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  sort_order: number
  created_at: string
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [newPartner, setNewPartner] = useState({
    name: "",
    logo_url: "",
    website_url: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    const { data } = await supabase
      .from("partners")
      .select("*")
      .order("sort_order", { ascending: true })

    setPartners(data || [])
    setLoading(false)
  }

  const handleCreatePartner = async () => {
    if (!newPartner.name) return
    setSaving(true)

    const { data, error } = await supabase
      .from("partners")
      .insert({
        name: newPartner.name,
        logo_url: newPartner.logo_url || null,
        website_url: newPartner.website_url || null,
        sort_order: partners.length,
      })
      .select()
      .single()

    if (data) {
      setPartners([...partners, data])
      setIsCreating(false)
      setNewPartner({ name: "", logo_url: "", website_url: "" })
    }

    setSaving(false)
  }

  const handleSavePartner = async () => {
    if (!selectedPartner) return
    setSaving(true)

    await supabase
      .from("partners")
      .update({
        name: selectedPartner.name,
        logo_url: selectedPartner.logo_url,
        website_url: selectedPartner.website_url,
        sort_order: selectedPartner.sort_order,
      })
      .eq("id", selectedPartner.id)

    setPartners(partners.map(p => p.id === selectedPartner.id ? selectedPartner : p))
    setSaving(false)
  }

  const handleDeletePartner = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne partner?")) return

    await supabase.from("partners").delete().eq("id", id)
    setPartners(partners.filter(p => p.id !== id))
    if (selectedPartner?.id === id) setSelectedPartner(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partnere</h1>
          <p className="text-gray-600">Administrer samarbejdspartnere</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tilføj partner
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Partners List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">Alle partnere ({partners.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : partners.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Ingen partnere tilføjet endnu</p>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedPartner?.id === partner.id ? "bg-[#6b9834]/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-400">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{partner.name}</p>
                        {partner.website_url && (
                          <a 
                            href={partner.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-[#6b9834] hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Partner Editor */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              {isCreating ? "Tilføj partner" : selectedPartner ? `Rediger: ${selectedPartner.name}` : "Vælg en partner"}
            </h2>
            {(isCreating || selectedPartner) && (
              <button onClick={() => { setIsCreating(false); setSelectedPartner(null); }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {isCreating ? (
            <div className="p-6 space-y-4">
              <Input
                label="Partner navn"
                value={newPartner.name}
                onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                placeholder="F.eks. Tømrer Skovgaard"
              />
              <Input
                label="Logo URL (valgfri)"
                value={newPartner.logo_url}
                onChange={(e) => setNewPartner({ ...newPartner, logo_url: e.target.value })}
                placeholder="https://..."
              />
              <Input
                label="Website URL (valgfri)"
                value={newPartner.website_url}
                onChange={(e) => setNewPartner({ ...newPartner, website_url: e.target.value })}
                placeholder="https://..."
              />

              <div className="flex gap-4 pt-4">
                <Button onClick={handleCreatePartner} disabled={saving || !newPartner.name}>
                  {saving ? "Gemmer..." : "Opret partner"}
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Annuller
                </Button>
              </div>
            </div>
          ) : selectedPartner ? (
            <div className="p-6 space-y-4">
              <Input
                label="Partner navn"
                value={selectedPartner.name}
                onChange={(e) => setSelectedPartner({ ...selectedPartner, name: e.target.value })}
              />
              <Input
                label="Logo URL"
                value={selectedPartner.logo_url || ""}
                onChange={(e) => setSelectedPartner({ ...selectedPartner, logo_url: e.target.value })}
              />
              <Input
                label="Website URL"
                value={selectedPartner.website_url || ""}
                onChange={(e) => setSelectedPartner({ ...selectedPartner, website_url: e.target.value })}
              />

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSavePartner} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Gemmer..." : "Gem ændringer"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDeletePartner(selectedPartner.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Slet
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en partner for at redigere</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
