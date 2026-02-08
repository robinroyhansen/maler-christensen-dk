"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { 
  Repeat, Plus, Trash2, AlertCircle, Upload,
  ArrowRight, CheckCircle, XCircle, ExternalLink, FileText
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
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  // Single redirect form
  const [newFrom, setNewFrom] = useState("")
  const [newTo, setNewTo] = useState("")
  
  // Bulk import
  const [bulkText, setBulkText] = useState("")
  const [showBulkImport, setShowBulkImport] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchRedirects()
  }, [])

  const fetchRedirects = async () => {
    try {
      const res = await fetch("/api/admin/redirects")
      if (!res.ok) throw new Error("Failed to fetch redirects")
      const data = await res.json()
      setRedirects(data.redirects || [])
    } catch (err) {
      console.error("Error fetching redirects:", err)
      setError("Kunne ikke hente redirects")
    } finally {
      setLoading(false)
    }
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const handleAddSingle = async () => {
    if (!newFrom.trim() || !newTo.trim()) return
    setSaving(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_path: newFrom.trim(), to_path: newTo.trim() })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create redirect")
      }

      const data = await res.json()
      if (data.redirect) {
        setRedirects([data.redirect, ...redirects])
      } else {
        await fetchRedirects()
      }
      setNewFrom("")
      setNewTo("")
      showSuccess("Redirect oprettet!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke oprette redirect")
    } finally {
      setSaving(false)
    }
  }

  const handleBulkImport = async () => {
    if (!bulkText.trim()) return
    setSaving(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulk: bulkText })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to import redirects")
      }

      await fetchRedirects()
      setBulkText("")
      setShowBulkImport(false)
      showSuccess(`${data.inserted} redirects importeret!`)
      
      if (data.errors && data.errors.length > 0) {
        setError(`Nogle linjer kunne ikke importeres: ${data.errors.slice(0, 3).join(", ")}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke importere redirects")
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setBulkText(text)
    }
    reader.readAsText(file)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne redirect?")) return

    try {
      const res = await fetch(`/api/admin/redirects/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete redirect")
      
      setRedirects(redirects.filter(r => r.id !== id))
      showSuccess("Redirect slettet!")
    } catch (err) {
      setError("Kunne ikke slette redirect")
    }
  }

  const getTestUrl = (fromPath: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return baseUrl + fromPath
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Redirects</h1>
          <p className="text-gray-600">Administrer 301 redirects</p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-800">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Add Single Redirect */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tilføj redirect
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              label="Fra (gammel sti)"
              value={newFrom}
              onChange={(e) => setNewFrom(e.target.value)}
              placeholder="/gammel-side"
            />
          </div>
          <div className="flex-1">
            <Input
              label="Til (ny sti)"
              value={newTo}
              onChange={(e) => setNewTo(e.target.value)}
              placeholder="/ny-side"
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleAddSingle} 
              disabled={saving || !newFrom.trim() || !newTo.trim()}
            >
              {saving ? "Gemmer..." : "Tilføj"}
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Import */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Bulk import
          </h2>
          <Button 
            variant="outline" 
            onClick={() => setShowBulkImport(!showBulkImport)}
          >
            {showBulkImport ? "Skjul" : "Vis"}
          </Button>
        </div>
        
        {showBulkImport && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload en CSV-fil eller indsæt tekst med format: <code className="bg-gray-100 px-1 rounded">gammel-sti,ny-sti</code> (én redirect per linje)
            </p>
            
            <div className="flex gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText className="w-4 h-4 mr-2" />
                Vælg fil
              </Button>
            </div>
            
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`/gammel-side-1,/ny-side-1\n/gammel-side-2,/ny-side-2\n/gammel-side-3,https://ekstern-url.dk`}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834] font-mono text-sm"
            />
            
            <Button 
              onClick={handleBulkImport} 
              disabled={saving || !bulkText.trim()}
            >
              {saving ? "Importerer..." : "Importér redirects"}
            </Button>
          </div>
        )}
      </div>

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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Fra</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Til</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Oprettet</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-700">Handlinger</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {redirects.map((redirect) => (
                  <tr key={redirect.id} className={`hover:bg-gray-50 ${!redirect.is_active ? 'opacity-50' : ''}`}>
                    <td className="px-4 py-3">
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
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {redirect.from_path}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <code className="text-sm text-[#6b9834] bg-green-50 px-2 py-1 rounded truncate max-w-[200px]">
                          {redirect.to_path}
                        </code>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(redirect.created_at).toLocaleDateString("da-DK")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={getTestUrl(redirect.from_path)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          Test
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => handleDelete(redirect.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Slet redirect"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
