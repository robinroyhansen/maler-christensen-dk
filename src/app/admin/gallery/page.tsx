"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Plus,
  ArrowUp,
  ArrowDown,
  Link as LinkIcon
} from "lucide-react"
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

interface CategoryData {
  id: string
  displayName: string
  count: number
  images: GalleryImage[]
}

// Category display names mapping
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'microcement': 'Microcement',
  'pu-gulv': 'Metallisk PU Gulv',
  'udvendig-maling': 'Udvendig Maling',
  'maling-trappe': 'Maling af Trappe'
}

// Service page mappings (for linking categories to service pages)
const SERVICE_MAPPINGS: Record<string, string> = {
  'microcement': 'microcement',
  'pu-gulv': 'epoxygulv',
  'udvendig-maling': 'udvendig-maling',
  'maling-trappe': 'maling-trappe'
}

export default function GalleryPage() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [newCategoryName, setNewCategoryName] = useState("")
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/gallery', { credentials: 'include' })
      const data = await response.json()
      
      if (data.success) {
        setCategories(data.categories)
        // Expand categories that have images by default
        const expanded: Record<string, boolean> = {}
        data.categories.forEach((cat: CategoryData) => {
          expanded[cat.id] = cat.count > 0
        })
        setExpandedCategories(expanded)
      }
    } catch (error) {
      console.error('Failed to fetch images:', error)
    }
    setLoading(false)
  }

  const handleUpload = async (categoryId: string, files: FileList) => {
    if (files.length === 0) return

    setUploading(categoryId)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', categoryId)

        const response = await fetch('/api/admin/gallery/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Upload failed for ${file.name}`)
        }

        return response.json()
      })

      await Promise.all(uploadPromises)
      await fetchImages() // Refresh the gallery
    } catch (error) {
      console.error('Upload error:', error)
      alert('Fejl ved upload af en eller flere billeder')
    } finally {
      setUploading(null)
    }
  }

  const handleUpdateImage = async (image: GalleryImage) => {
    try {
      const response = await fetch(`/api/admin/gallery/${image.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alt_text: image.alt_text,
          caption: image.caption,
          sort_order: image.sort_order,
        }),
      })

      if (response.ok) {
        await fetchImages()
        setSelectedImage(null)
      } else {
        alert('Fejl ved opdatering af billede')
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('Fejl ved opdatering af billede')
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Er du sikker på at du vil slette dette billede?')) return

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchImages()
        if (selectedImage?.id === id) setSelectedImage(null)
      } else {
        alert('Fejl ved sletning af billede')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Fejl ved sletning af billede')
    }
  }

  const handleReorderImage = async (image: GalleryImage, direction: 'up' | 'down') => {
    const category = categories.find(cat => cat.id === image.category)
    if (!category) return

    const currentIndex = category.images.findIndex(img => img.id === image.id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= category.images.length) return

    const newSortOrder = category.images[newIndex].sort_order

    await handleUpdateImage({
      ...image,
      sort_order: newSortOrder
    })
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  const createNewCategory = () => {
    if (!newCategoryName.trim()) return

    const categoryId = newCategoryName.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    const newCategory: CategoryData = {
      id: categoryId,
      displayName: newCategoryName,
      count: 0,
      images: []
    }

    setCategories([...categories, newCategory])
    setNewCategoryName("")
    setShowNewCategoryForm(false)
    setExpandedCategories(prev => ({ ...prev, [categoryId]: true }))
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galleri Administration</h1>
          <p className="text-gray-600">Administrer billeder grupperet efter kategorier</p>
        </div>
        <Button
          onClick={() => setShowNewCategoryForm(true)}
          variant="outline"
          className="bg-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ny Kategori
        </Button>
      </div>

      {/* New Category Form */}
      {showNewCategoryForm && (
        <div className="bg-white rounded-lg border p-4 mb-6">
          <h3 className="font-medium mb-3">Opret ny kategori</h3>
          <div className="flex gap-3">
            <Input
              placeholder="Kategorinavn"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createNewCategory()}
            />
            <Button onClick={createNewCategory}>Opret</Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowNewCategoryForm(false)
                setNewCategoryName("")
              }}
            >
              Annuller
            </Button>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg border overflow-hidden">
            {/* Category Header */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center gap-3 text-left flex-1"
                >
                  <div className="flex items-center gap-2">
                    {expandedCategories[category.id] ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                    <h3 className="font-semibold text-gray-900">{category.displayName}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {category.count} billede{category.count !== 1 ? 'r' : ''}
                  </span>
                </button>

                <div className="flex items-center gap-3">
                  {/* Service Page Link Info */}
                  {SERVICE_MAPPINGS[category.id] && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <LinkIcon className="w-3 h-3" />
                      <span>Linked til /{SERVICE_MAPPINGS[category.id]}</span>
                    </div>
                  )}

                  {/* Upload Button */}
                  <label className="cursor-pointer inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-[#6b9834] text-white hover:bg-[#5a8229] px-3 py-1.5 text-sm">
                    <input
                      ref={(el) => {
                        fileInputRefs.current[category.id] = el
                      }}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => e.target.files && handleUpload(category.id, e.target.files)}
                      className="hidden"
                      disabled={uploading === category.id}
                    />
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading === category.id ? 'Uploader...' : 'Upload'}
                  </label>
                </div>
              </div>
            </div>

            {/* Category Content */}
            {expandedCategories[category.id] && (
              <div className="p-4">
                {category.images.length === 0 ? (
                  <div className="text-center py-8">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500 mb-3">Ingen billeder i denne kategori</p>
                    <label className="cursor-pointer inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-[#6b9834] text-white hover:bg-[#5a8229] px-4 py-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => e.target.files && handleUpload(category.id, e.target.files)}
                        className="hidden"
                      />
                      <Upload className="w-4 h-4 mr-2" />
                      Upload første billede
                    </label>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {category.images.map((image, index) => (
                      <div
                        key={image.id}
                        className={`relative group bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer ${
                          selectedImage?.id === image.id ? 'ring-2 ring-[#6b9834]' : ''
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt_text}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                        
                        {/* Hover overlay with controls */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                          <div className="flex-1 p-2">
                            <p className="text-white text-xs truncate">{image.caption}</p>
                          </div>
                          <div className="p-2 flex justify-between">
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleReorderImage(image, 'up')
                                }}
                                className="p-1 bg-white/20 rounded hover:bg-white/40 transition-colors"
                                disabled={index === 0}
                              >
                                <ArrowUp className="w-3 h-3 text-white" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleReorderImage(image, 'down')
                                }}
                                className="p-1 bg-white/20 rounded hover:bg-white/40 transition-colors"
                                disabled={index === category.images.length - 1}
                              >
                                <ArrowDown className="w-3 h-3 text-white" />
                              </button>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteImage(image.id)
                              }}
                              className="p-1 bg-red-500/80 rounded hover:bg-red-500 transition-colors"
                            >
                              <Trash2 className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {categories.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">Ingen kategorier oprettet endnu</p>
            <Button onClick={() => setShowNewCategoryForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Opret første kategori
            </Button>
          </div>
        )}
      </div>

      {/* Image Edit Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Rediger billede</h3>
              <button onClick={() => setSelectedImage(null)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt_text}
                  fill
                  className="object-cover"
                />
              </div>

              <Input
                label="Alt tekst"
                value={selectedImage.alt_text}
                onChange={(e) => setSelectedImage({ ...selectedImage, alt_text: e.target.value })}
                placeholder="Beskrivelse til søgemaskiner"
              />
              
              <Input
                label="Billedtekst"
                value={selectedImage.caption}
                onChange={(e) => setSelectedImage({ ...selectedImage, caption: e.target.value })}
                placeholder="Kort beskrivelse"
              />

              <Input
                label="Sorteringsrækkefølge"
                type="number"
                value={selectedImage.sort_order.toString()}
                onChange={(e) => setSelectedImage({ 
                  ...selectedImage, 
                  sort_order: parseInt(e.target.value) || 0 
                })}
              />

              <div className="text-sm text-gray-600">
                <strong>Kategori:</strong> {CATEGORY_DISPLAY_NAMES[selectedImage.category] || selectedImage.category}
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