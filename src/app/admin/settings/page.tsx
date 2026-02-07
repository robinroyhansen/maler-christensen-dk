"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Settings, Save, RefreshCw } from "lucide-react"

interface SiteSettings {
  company_name: string
  phone: string
  email: string
  address: string
  city: string
  zip: string
  cvr: string
  trustpilot_rating: string
  trustpilot_reviews: string
}

const DEFAULT_SETTINGS: SiteSettings = {
  company_name: "Malerfirmaet Schou & Christensen",
  phone: "53 50 77 00",
  email: "jess@maler-christensen.dk",
  address: "Ydunsvej 9",
  city: "Slagelse",
  zip: "4200",
  cvr: "39187337",
  trustpilot_rating: "4.9",
  trustpilot_reviews: "200",
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
      data.forEach((item: { key: string; value: string }) => {
        settingsObj[item.key as keyof SiteSettings] = item.value
      })
      setSettings({ ...DEFAULT_SETTINGS, ...settingsObj })
    }

    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    // Upsert each setting
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
        <p className="text-gray-600">Administrer grundlæggende firmainformation</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-2xl">
        <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
          <Settings className="w-5 h-5 text-[#6b9834]" />
          <h2 className="font-semibold text-gray-900">Firmainformation</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <Input
            label="Firmanavn"
            value={settings.company_name}
            onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
          />

          <div className="grid sm:grid-cols-2 gap-6">
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
            label="Adresse"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
          />

          <div className="grid sm:grid-cols-3 gap-6">
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

          <div className="grid sm:grid-cols-2 gap-6">
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

          <div className="flex items-center gap-4 pt-4 border-t">
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Gemmer..." : saved ? "Gemt!" : "Gem ændringer"}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Nulstil
            </Button>
          </div>

          {saved && (
            <p className="text-green-600 text-sm">
              Indstillinger gemt! Bemærk: Nogle ændringer kræver en ny deployment for at træde i kraft.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
