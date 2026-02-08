"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { 
  FileText, Plus, Calendar, Eye, EyeOff, 
  ExternalLink, Loader2
} from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  status: "draft" | "published"
  author: string
  published_at: string | null
  created_at: string
  updated_at: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog")
      const data = await res.json()
      if (data.success) {
        setPosts(data.posts)
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async () => {
    setCreating(true)
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: "Ny blogpost",
          status: "draft"
        }),
      })
      const data = await res.json()
      if (data.success && data.post) {
        // Redirect to edit the new post
        window.location.href = `/admin/blog/${data.post.id}`
      }
    } catch (error) {
      console.error("Failed to create post:", error)
    } finally {
      setCreating(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—"
    return new Date(dateString).toLocaleDateString("da-DK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600">Administrer blogindlæg</p>
        </div>
        <Button onClick={handleCreatePost} disabled={creating}>
          {creating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          Opret ny post
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#6b9834]" />
            <p className="mt-2 text-gray-500">Henter blogposts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen blogposts endnu</h3>
            <p className="text-gray-500 mb-4">Kom i gang ved at oprette dit første blogindlæg.</p>
            <Button onClick={handleCreatePost} disabled={creating}>
              <Plus className="w-4 h-4 mr-2" />
              Opret første post
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog/${post.id}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {post.status === "published" ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Publiceret
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Kladde
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    {post.excerpt && (
                      <span className="truncate max-w-md hidden sm:block">
                        {post.excerpt}
                      </span>
                    )}
                  </div>
                </div>
                
                {post.status === "published" && (
                  <a
                    href={`/blog/${post.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-[#6b9834] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
