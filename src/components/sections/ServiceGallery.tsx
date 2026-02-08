"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Container } from "@/components/ui/Container"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { X, ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface GalleryImage {
  id: string
  url: string
  alt_text: string
  caption: string
  category: string
  page_slugs: string[]
  sort_order: number
}

interface ServiceGalleryProps {
  category?: string
  pageSlug?: string
  title?: string
  subtitle?: string
  columns?: 3 | 4
}

export function ServiceGallery({
  category,
  pageSlug,
  title = "Se vores projekter",
  subtitle = "Klik på billederne for at se dem i fuld størrelse",
  columns = 4,
}: ServiceGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  
  const supabase = createClient()

  useEffect(() => {
    const fetchImages = async () => {
      // Build query to fetch images matching category OR page_slugs
      let query = supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true })

      const { data, error } = await query

      if (error) {
        console.error("Error fetching gallery images:", error)
        setLoading(false)
        return
      }

      // Filter client-side: category match OR pageSlug in page_slugs array
      const filtered = (data || []).filter((img: GalleryImage) => {
        const matchesCategory = category && img.category === category
        const matchesPageSlug = pageSlug && Array.isArray(img.page_slugs) && img.page_slugs.includes(pageSlug)
        return matchesCategory || matchesPageSlug
      })

      setImages(filtered)
      setLoading(false)
    }

    fetchImages()
  }, [category, pageSlug])

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ""
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext])

  // Don't render section if no images
  if (loading) {
    return (
      <section className="py-12">
        <Container>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834]"></div>
          </div>
        </Container>
      </section>
    )
  }

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <section className="py-12">
        <Container>
          <AnimateIn className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </AnimateIn>

          <StaggerContainer 
            className={`grid grid-cols-2 ${columns === 4 ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4`} 
            staggerDelay={0.05}
          >
            {images.map((image, index) => (
              <StaggerItem key={image.id} variant="scale">
                <motion.button
                  onClick={() => openLightbox(index)}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6b9834] focus:ring-offset-2 w-full"
                >
                  <Image
                    src={image.url}
                    alt={image.alt_text || image.caption || "Galleri billede"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Caption on hover */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-sm font-medium truncate">{image.caption}</p>
                    </div>
                  )}
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && images[currentIndex] && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Luk"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Forrige billede"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Næste billede"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] m-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].alt_text || "Galleri billede"}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Caption */}
            {images[currentIndex].caption && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-center max-w-xl px-4">
                <p className="text-lg">{images[currentIndex].caption}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
