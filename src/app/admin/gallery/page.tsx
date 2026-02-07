"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Image as ImageIcon, Upload, Trash2, X } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: string
  url: string
  alt_text: string
  caption: string
  category: string
  sort_order: number
  created_at: string
}

const CATEGORIES = [
  { id: "all", name: "Alle" },
  { id: "indendors", name: "Indendørs" },
  { id: "udendors", name: "Udendørs" },
  { id: "microcement", name: "Microcement" },
  { id: "erhverv", name: "Erhverv" },
]

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  const supabase = createClient()

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })

    setImages(data || [])
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)
    const file = e.target.files[0]
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `gallery/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file)

    if (uploadError) {
      console.error("Upload error:", uploadError)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath)

    const { data, error } = await supabase
      .from("gallery_images")
      .insert({
        url: urlData.publicUrl,
        alt_text: file.name,
        caption: "",
        category: activeCategory === "all" ? "indendors" : activeCategory,
        sort_order: images.length,
      })
      .select()
      .single()

    if (data) {
      setImages([...images, data])
    }

    setUploading(false)
  }

  const handleUpdateImage = async (image: GalleryImage) => {
    await supabase
      .from("gallery_images")
      .update({
        alt_text: image.alt_text,
        caption: image.caption,
        category: image.category,
      })
      .eq("id", image.id)

    setImages(images.map(i => i.id === image.id ? image : i))
    setSelectedImage(null)
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette dette billede?")) return

    await supabase.from("gallery_images").delete().eq("id", id)
    setImages(images.filter(i => i.id !== id))
    if (selectedImage?.id === id) setSelectedImage(null)
  }

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(i => i.category === activeCategory)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galleri</h1>
          <p className="text-gray-600">Administrer galleri billeder</p>
        </div>
        <label className="cursor-pointer inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 bg-[#6b9834] text-white hover:bg-[#5a8229] px-5 py-2.5">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Uploader..." : "Upload billede"}
        </label>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-[#6b9834] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834]"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 mb-4">Ingen billeder i galleriet endnu</p>
          <label className="cursor-pointer inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 bg-[#6b9834] text-white hover:bg-[#5a8229] px-5 py-2.5">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <Upload className="w-4 h-4 mr-2" />
            Upload dit første billede
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative group ${
                selectedImage?.id === image.id ? "ring-2 ring-[#6b9834]" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6b9834]/20 to-[#85bd41]/20 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-[#6b9834]/50" />
              </div>
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-3 w-full">
                  <p className="text-white text-sm truncate">{image.caption || image.alt_text}</p>
                  <p className="text-white/60 text-xs">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Edit Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Rediger billede</h3>
              <button onClick={() => setSelectedImage(null)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-300" />
                </div>
              </div>

              <Input
                label="Alt tekst"
                value={selectedImage.alt_text}
                onChange={(e) => setSelectedImage({ ...selectedImage, alt_text: e.target.value })}
              />
              <Input
                label="Billedtekst"
                value={selectedImage.caption}
                onChange={(e) => setSelectedImage({ ...selectedImage, caption: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select
                  value={selectedImage.category}
                  onChange={(e) => setSelectedImage({ ...selectedImage, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
                >
                  {CATEGORIES.filter(c => c.id !== "all").map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={() => handleUpdateImage(selectedImage)}>
                  Gem ændringer
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDeleteImage(selectedImage.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Slet
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
