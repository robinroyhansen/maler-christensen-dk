"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { 
  ArrowLeft, Save, Trash2, Eye, EyeOff, 
  Loader2, ExternalLink, Calendar
} from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featured_image: string | null
  meta_title: string | null
  meta_description: string | null
  status: "draft" | "published"
  author: string
  published_at: string | null
  created_at: string
  updated_at: string
}

export default function AdminBlogEditorPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params)
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/blog/${id}`)
      const data = await res.json()
      if (data.success) {
        setPost(data.post)
      } else {
        router.push("/admin/blog")
      }
    } catch (error) {
      console.error("Failed to fetch post:", error)
      router.push("/admin/blog")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/æ/g, "ae")
      .replace(/ø/g, "oe")
      .replace(/å/g, "aa")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleTitleChange = (title: string) => {
    if (!post) return
    setPost({
      ...post,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSave = async () => {
    if (!post) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featured_image: post.featured_image,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          status: post.status,
          author: post.author,
          published_at: post.published_at,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPost(data.post)
      }
    } catch (error) {
      console.error("Failed to save post:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Er du sikker på at du vil slette dette blogindlæg?")) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        router.push("/admin/blog")
      }
    } catch (error) {
      console.error("Failed to delete post:", error)
    } finally {
      setDeleting(false)
    }
  }

  const toggleStatus = () => {
    if (!post) return
    const newStatus = post.status === "published" ? "draft" : "published"
    setPost({
      ...post,
      status: newStatus,
      published_at: newStatus === "published" && !post.published_at 
        ? new Date().toISOString() 
        : post.published_at,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#6b9834]" />
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Rediger blogpost</h1>
            <p className="text-sm text-gray-500">
              Sidst opdateret: {new Date(post.updated_at).toLocaleString("da-DK")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.status === "published" && (
            <a
              href={`/blog/${post.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#6b9834] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Se post
            </a>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Gem
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Input
              label="Titel"
              value={post.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Indtast titel..."
              className="text-lg font-medium"
            />
            <div className="mt-2">
              <label className="text-xs text-gray-500">URL slug</label>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span>/blog/</span>
                <input
                  type="text"
                  value={post.slug}
                  onChange={(e) => setPost({ ...post, slug: e.target.value })}
                  className="flex-1 px-2 py-1 border rounded text-sm"
                />
                <span>/</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Textarea
              label="Indhold"
              value={post.content || ""}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              placeholder="Skriv dit blogindlæg her... (understøtter basic markdown)"
              rows={20}
              className="font-mono text-sm"
            />
            <p className="mt-2 text-xs text-gray-500">
              Tip: Brug ## for overskrifter, **tekst** for fed, og - for punktopstilling
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Textarea
              label="Uddrag / Resume"
              value={post.excerpt || ""}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              placeholder="Kort beskrivelse der vises i bloglistningen..."
              rows={3}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
            <button
              onClick={toggleStatus}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                post.status === "published"
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              }`}
            >
              {post.status === "published" ? (
                <>
                  <Eye className="w-5 h-5" />
                  Publiceret
                </>
              ) : (
                <>
                  <EyeOff className="w-5 h-5" />
                  Kladde
                </>
              )}
            </button>
            <p className="mt-2 text-xs text-gray-500 text-center">
              Klik for at skifte status
            </p>

            {/* Publish date */}
            <div className="mt-4 pt-4 border-t">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Publiceringsdato
              </label>
              <input
                type="datetime-local"
                value={post.published_at ? post.published_at.slice(0, 16) : ""}
                onChange={(e) => setPost({ 
                  ...post, 
                  published_at: e.target.value ? new Date(e.target.value).toISOString() : null 
                })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Fremhævet billede</h3>
            <Input
              value={post.featured_image || ""}
              onChange={(e) => setPost({ ...post, featured_image: e.target.value })}
              placeholder="URL til billede..."
            />
            {post.featured_image && (
              <div className="mt-4">
                <img
                  src={post.featured_image}
                  alt="Preview"
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta titel <span className="text-gray-400">({(post.meta_title || "").length}/60)</span>
                </label>
                <input
                  type="text"
                  value={post.meta_title || ""}
                  onChange={(e) => setPost({ ...post, meta_title: e.target.value })}
                  placeholder={post.title}
                  maxLength={60}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta beskrivelse <span className="text-gray-400">({(post.meta_description || "").length}/160)</span>
                </label>
                <textarea
                  value={post.meta_description || ""}
                  onChange={(e) => setPost({ ...post, meta_description: e.target.value })}
                  placeholder={post.excerpt || "Beskrivelse til søgemaskiner..."}
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              {/* SERP Preview */}
              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 mb-2">Google forhåndsvisning:</p>
                <div className="bg-white border rounded-lg p-3">
                  <p className="text-blue-700 text-sm font-medium truncate">
                    {post.meta_title || post.title}
                  </p>
                  <p className="text-green-700 text-xs">
                    maler-christensen.dk/blog/{post.slug}/
                  </p>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {post.meta_description || post.excerpt || "Ingen beskrivelse"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Forfatter</h3>
            <Input
              value={post.author}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
              placeholder="Malerfirmaet Schou & Christensen"
            />
          </div>

          {/* Delete */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Farezone</h3>
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleting}
              className="w-full text-red-600 border-red-600 hover:bg-red-50"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Slet blogpost
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
