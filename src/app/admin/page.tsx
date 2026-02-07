"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { FileText, Star, Mail, Image, MapPin, TrendingUp } from "lucide-react"

interface Stats {
  pages: number
  reviews: number
  submissions: number
  unreadSubmissions: number
  galleryImages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pages: 0,
    reviews: 0,
    submissions: 0,
    unreadSubmissions: 0,
    galleryImages: 0,
  })
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    fetchStats()
    fetchRecentSubmissions()
  }, [])

  const fetchStats = async () => {
    const [pages, reviews, submissions, unread, gallery] = await Promise.all([
      supabase.from("pages").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
      supabase.from("gallery_images").select("id", { count: "exact", head: true }),
    ])

    setStats({
      pages: pages.count || 0,
      reviews: reviews.count || 0,
      submissions: submissions.count || 0,
      unreadSubmissions: unread.count || 0,
      galleryImages: gallery.count || 0,
    })
  }

  const fetchRecentSubmissions = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)

    setRecentSubmissions(data || [])
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Velkommen til admin panelet</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.pages}</span>
          </div>
          <p className="text-gray-600">Sider</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.reviews}</span>
          </div>
          <p className="text-gray-600">Anmeldelser</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.submissions}</span>
          </div>
          <p className="text-gray-600">Henvendelser ({stats.unreadSubmissions} ulæste)</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Image className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.galleryImages}</span>
          </div>
          <p className="text-gray-600">Galleri billeder</p>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Seneste henvendelser</h2>
        </div>
        <div className="divide-y">
          {recentSubmissions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Ingen henvendelser endnu
            </div>
          ) : (
            recentSubmissions.map((submission) => (
              <div key={submission.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{submission.name}</p>
                    <p className="text-sm text-gray-600">{submission.email}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{submission.message}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {new Date(submission.created_at).toLocaleDateString("da-DK")}
                    </p>
                    {!submission.is_read && (
                      <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Ny
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
