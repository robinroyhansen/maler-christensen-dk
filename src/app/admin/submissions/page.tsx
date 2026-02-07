"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Mail, Check, Trash2, Eye } from "lucide-react"

interface Submission {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  page_slug: string | null
  is_read: boolean
  created_at: string
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) setSubmissions(data)
    setLoading(false)
  }

  const markAsRead = async (id: string) => {
    await supabase
      .from("contact_submissions")
      .update({ is_read: true })
      .eq("id", id)

    setSubmissions(submissions.map(s => 
      s.id === id ? { ...s, is_read: true } : s
    ))
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne henvendelse?")) return

    await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id)

    setSubmissions(submissions.filter(s => s.id !== id))
    if (selectedSubmission?.id === id) setSelectedSubmission(null)
  }

  const viewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission)
    if (!submission.is_read) {
      markAsRead(submission.id)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Henvendelser</h1>
        <p className="text-gray-600">Se og administrer kontaktformular henvendelser</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">Alle henvendelser</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Ingen henvendelser endnu</p>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => viewSubmission(submission)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedSubmission?.id === submission.id ? "bg-[#6b9834]/5" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium ${!submission.is_read ? "text-gray-900" : "text-gray-600"}`}>
                          {submission.name}
                        </p>
                        {!submission.is_read && (
                          <span className="px-2 py-0.5 bg-[#6b9834] text-white text-xs rounded-full">
                            Ny
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{submission.email}</p>
                      <p className="text-sm text-gray-400 truncate mt-1">{submission.message}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-gray-400">
                        {new Date(submission.created_at).toLocaleDateString("da-DK")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submission Detail */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">Detaljer</h2>
          </div>
          
          {selectedSubmission ? (
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Navn</label>
                  <p className="font-medium text-gray-900">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium text-gray-900">
                    <a href={`mailto:${selectedSubmission.email}`} className="text-[#6b9834] hover:underline">
                      {selectedSubmission.email}
                    </a>
                  </p>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <label className="text-sm text-gray-500">Telefon</label>
                    <p className="font-medium text-gray-900">
                      <a href={`tel:${selectedSubmission.phone}`} className="text-[#6b9834] hover:underline">
                        {selectedSubmission.phone}
                      </a>
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-500">Besked</label>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Modtaget</label>
                  <p className="text-gray-700">
                    {new Date(selectedSubmission.created_at).toLocaleString("da-DK")}
                  </p>
                </div>
                {selectedSubmission.page_slug && (
                  <div>
                    <label className="text-sm text-gray-500">Fra side</label>
                    <p className="text-gray-700">{selectedSubmission.page_slug}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <a href={`mailto:${selectedSubmission.email}`}>
                  <Button>
                    <Mail className="w-4 h-4 mr-2" />
                    Svar via email
                  </Button>
                </a>
                <Button
                  variant="outline"
                  onClick={() => deleteSubmission(selectedSubmission.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Slet
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en henvendelse for at se detaljer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
