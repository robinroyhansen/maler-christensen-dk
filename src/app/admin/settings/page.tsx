"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Settings, Save, RefreshCw, Building2, Phone, Star, Globe } from "lucide-react"

interface SiteSettings {
  company_name: string
  short_name: string
  phone: string
  email: string
  address: string
  city: string
  zip: string
  cvr: string
  trustpilot_rating: string
  trustpilot_reviews: string
  trustpilot_url: string
  anmeld_haandvaerker_url: string
  google_maps_url: string
  facebook_url: string
  instagram_url: string
}

const DEFAULT_SETTINGS: SiteSettings = {
  company_name: "Malerfirmaet Schou & Christensen",
  short_name: "Schou & Christensen",
  phone: "53 50 77 00",
  email: "jess@maler-christensen.dk",
  address: "Ydunsvej 9",
  city: "Slagelse",
  zip: "4200",
  cvr: "39187337",
  trustpilot_rating: "4.9",
  trustpilot_reviews: "250",
  trustpilot_url: "https://dk.trustpilot.com/review/maler-christensen.dk",
  anmeld_haandvaerker_url: "",
  google_maps_url: "",
  facebook_url: "",
  instagram_url: "",
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")

    if (data && data.length > 0) {
      const settingsObj: Partial<SiteSettings> = {}
      data.forEach((item: { key: string; value: any }) => {
        // Handle both string values and JSON values
        const value = typeof item.value === 'string' ? item.value : JSON.stringify(item.value)
        settingsObj[item.key as keyof SiteSettings] = value
      })
      setSettings({ ...DEFAULT_SETTINGS, ...settingsObj })
    }

    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    const settingsToSave = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
    }))

    for (const setting of settingsToSave) {
      await supabase
        .from("site_settings")
        .upsert({ key: setting.key, value: setting.value }, { onConflict: "key" })
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    if (confirm("Er du sikker på at du vil nulstille alle indstillinger?")) {
      setSettings(DEFAULT_SETTINGS)
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Indstillinger</h1>
        <p className="text-gray-600">Administrer firma- og kontaktinformation</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Company Info */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-[#6b9834]" />
            <h2 className="font-semibold text-gray-900">Firmainformation</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Firmanavn"
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              />
              <Input
                label="Kort navn"
                value={settings.short_name}
                onChange={(e) => setSettings({ ...settings, short_name: e.target.value })}
              />
            </div>

            <Input
              label="Adresse"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />

            <div className="grid sm:grid-cols-3 gap-4">
              <Input
                label="Postnummer"
                value={settings.zip}
                onChange={(e) => setSettings({ ...settings, zip: e.target.value })}
              />
              <Input
                label="By"
                value={settings.city}
                onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              />
              <Input
                label="CVR"
                value={settings.cvr}
                onChange={(e) => setSettings({ ...settings, cvr: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#6b9834]" />
            <h2 className="font-semibold text-gray-900">Kontaktinformation</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Telefon"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            
            <Input
              label="Google Maps URL"
              value={settings.google_maps_url}
              onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>

        {/* Review Platforms */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
            <Star className="w-5 h-5 text-[#6b9834]" />
            <h2 className="font-semibold text-gray-900">Anmeldelser</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Trustpilot rating"
                value={settings.trustpilot_rating}
                onChange={(e) => setSettings({ ...settings, trustpilot_rating: e.target.value })}
              />
              <Input
                label="Antal anmeldelser"
                value={settings.trustpilot_reviews}
                onChange={(e) => setSettings({ ...settings, trustpilot_reviews: e.target.value })}
              />
            </div>
            
            <Input
              label="Trustpilot URL"
              value={settings.trustpilot_url}
              onChange={(e) => setSettings({ ...settings, trustpilot_url: e.target.value })}
              placeholder="https://dk.trustpilot.com/review/..."
            />
            
            <Input
              label="Anmeld Håndværker URL"
              value={settings.anmeld_haandvaerker_url}
              onChange={(e) => setSettings({ ...settings, anmeld_haandvaerker_url: e.target.value })}
              placeholder="https://anmeldhaandvaerker.dk/..."
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#6b9834]" />
            <h2 className="font-semibold text-gray-900">Sociale medier</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <Input
              label="Facebook URL"
              value={settings.facebook_url}
              onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
              placeholder="https://facebook.com/..."
            />
            
            <Input
              label="Instagram URL"
              value={settings.instagram_url}
              onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Gemmer..." : saved ? "Gemt!" : "Gem alle ændringer"}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Nulstil
          </Button>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm">
              ✓ Indstillinger gemt! Nogle ændringer kræver en ny deployment for at træde i kraft.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
