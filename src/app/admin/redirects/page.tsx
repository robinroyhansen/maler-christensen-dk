"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { 
  Repeat, Plus, Save, X, Trash2, AlertCircle,
  ArrowRight, CheckCircle, XCircle
} from "lucide-react"

interface Redirect {
  id: string
  from_path: string
  to_path: string
  status_code: number
  is_active: boolean
  created_at: string
}

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [selectedRedirect, setSelectedRedirect] = useState<Redirect | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tableExists, setTableExists] = useState(true)
  
  const [newRedirect, setNewRedirect] = useState({
    from_path: "",
    to_path: "",
    status_code: 301,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchRedirects()
  }, [])

  const fetchRedirects = async () => {
    const { data, error } = await supabase
      .from("redirects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error && error.code === "42P01") {
      // Table doesn't exist
      setTableExists(false)
      setLoading(false)
      return
    }

    setRedirects(data || [])
    setLoading(false)
  }

  const handleCreateRedirect = async () => {
    if (!newRedirect.from_path || !newRedirect.to_path) return
    setSaving(true)

    // Normalize paths
    const fromPath = newRedirect.from_path.startsWith("/") 
      ? newRedirect.from_path 
      : `/${newRedirect.from_path}`
    const toPath = newRedirect.to_path.startsWith("/") || newRedirect.to_path.startsWith("http")
      ? newRedirect.to_path 
      : `/${newRedirect.to_path}`

    const { data, error } = await supabase
      .from("redirects")
      .insert({
        from_path: fromPath,
        to_path: toPath,
        status_code: newRedirect.status_code,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        alert("En redirect fra denne sti findes allerede")
      } else {
        console.error("Error creating redirect:", error)
      }
      setSaving(false)
      return
    }

    if (data) {
      setRedirects([data, ...redirects])
      setIsCreating(false)
      setNewRedirect({ from_path: "", to_path: "", status_code: 301 })
    }

    setSaving(false)
  }

  const handleSaveRedirect = async () => {
    if (!selectedRedirect) return
    setSaving(true)

    await supabase
      .from("redirects")
      .update({
        from_path: selectedRedirect.from_path,
        to_path: selectedRedirect.to_path,
        status_code: selectedRedirect.status_code,
        is_active: selectedRedirect.is_active,
      })
      .eq("id", selectedRedirect.id)

    setRedirects(redirects.map(r => 
      r.id === selectedRedirect.id ? selectedRedirect : r
    ))
    
    setSaving(false)
  }

  const toggleActive = async (redirect: Redirect) => {
    const newActive = !redirect.is_active
    
    await supabase
      .from("redirects")
      .update({ is_active: newActive })
      .eq("id", redirect.id)

    setRedirects(redirects.map(r => 
      r.id === redirect.id ? { ...r, is_active: newActive } : r
    ))
  }

  const handleDeleteRedirect = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne redirect?")) return

    await supabase.from("redirects").delete().eq("id", id)
    setRedirects(redirects.filter(r => r.id !== id))
    if (selectedRedirect?.id === id) setSelectedRedirect(null)
  }

  if (!tableExists) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Redirects</h1>
          <p className="text-gray-600">Administrer 301/302 redirects</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Database tabel mangler</h3>
              <p className="text-amber-700 mt-1">
                Tabellen `redirects` findes ikke i databasen endnu. 
                Kør følgende SQL i Supabase Dashboard → SQL Editor:
              </p>
              <pre className="mt-3 bg-amber-100 p-4 rounded-lg text-sm overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS redirects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_path TEXT UNIQUE NOT NULL,
  to_path TEXT NOT NULL,
  status_code INT DEFAULT 301,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Public read redirects" 
  ON redirects FOR SELECT 
  USING (is_active = true);

-- Auth manage policy  
CREATE POLICY "Auth manage redirects" 
  ON redirects FOR ALL 
  USING (auth.role() = 'authenticated');`}
              </pre>
              <Button 
                onClick={fetchRedirects} 
                className="mt-4"
              >
                Prøv igen
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Redirects</h1>
          <p className="text-gray-600">Administrer 301/302 redirects</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tilføj redirect
        </Button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Redirects håndteres af Next.js middleware. 
          Ændringer træder i kraft ved næste deployment eller efter cache timeout.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Redirects List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">
              Alle redirects ({redirects.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : redirects.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Repeat className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Ingen redirects oprettet endnu</p>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {redirects.map((redirect) => (
                <div
                  key={redirect.id}
                  onClick={() => setSelectedRedirect(redirect)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedRedirect?.id === redirect.id ? "bg-[#6b9834]/5" : ""
                  } ${!redirect.is_active ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded font-mono ${
                        redirect.status_code === 301 
                          ? "bg-green-100 text-green-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {redirect.status_code}
                      </span>
                      {redirect.is_active ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(redirect.created_at).toLocaleDateString("da-DK")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <code className="text-gray-900 truncate max-w-[150px]">
                      {redirect.from_path}
                    </code>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <code className="text-[#6b9834] truncate max-w-[150px]">
                      {redirect.to_path}
                    </code>
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
              {isCreating ? "Tilføj redirect" : selectedRedirect ? "Rediger redirect" : "Vælg en redirect"}
            </h2>
            {(isCreating || selectedRedirect) && (
              <button onClick={() => { setIsCreating(false); setSelectedRedirect(null); }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {isCreating ? (
            <div className="p-6 space-y-4">
              <Input
                label="Fra sti"
                value={newRedirect.from_path}
                onChange={(e) => setNewRedirect({ ...newRedirect, from_path: e.target.value })}
                placeholder="/gammel-side"
              />
              <Input
                label="Til sti"
                value={newRedirect.to_path}
                onChange={(e) => setNewRedirect({ ...newRedirect, to_path: e.target.value })}
                placeholder="/ny-side eller https://..."
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status kode</label>
                <select
                  value={newRedirect.status_code}
                  onChange={(e) => setNewRedirect({ ...newRedirect, status_code: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
                >
                  <option value={301}>301 - Permanent redirect</option>
                  <option value={302}>302 - Midlertidig redirect</option>
                  <option value={307}>307 - Temporary redirect</option>
                  <option value={308}>308 - Permanent redirect</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleCreateRedirect} disabled={saving || !newRedirect.from_path || !newRedirect.to_path}>
                  {saving ? "Gemmer..." : "Opret redirect"}
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Annuller
                </Button>
              </div>
            </div>
          ) : selectedRedirect ? (
            <div className="p-6 space-y-4">
              <Input
                label="Fra sti"
                value={selectedRedirect.from_path}
                onChange={(e) => setSelectedRedirect({ ...selectedRedirect, from_path: e.target.value })}
              />
              <Input
                label="Til sti"
                value={selectedRedirect.to_path}
                onChange={(e) => setSelectedRedirect({ ...selectedRedirect, to_path: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status kode</label>
                <select
                  value={selectedRedirect.status_code}
                  onChange={(e) => setSelectedRedirect({ ...selectedRedirect, status_code: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
                >
                  <option value={301}>301 - Permanent redirect</option>
                  <option value={302}>302 - Midlertidig redirect</option>
                  <option value={307}>307 - Temporary redirect</option>
                  <option value={308}>308 - Permanent redirect</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedRedirect.is_active}
                    onChange={(e) => setSelectedRedirect({ ...selectedRedirect, is_active: e.target.checked })}
                    className="rounded border-gray-300 text-[#6b9834] focus:ring-[#6b9834]"
                  />
                  <span className="text-sm text-gray-700">Aktiv</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSaveRedirect} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Gemmer..." : "Gem ændringer"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDeleteRedirect(selectedRedirect.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Slet
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Repeat className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en redirect for at redigere</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
