"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ProjectGalleryProps {
  images: GalleryImage[]
  title?: string
  subtitle?: string
  columns?: 3 | 4
  showContainer?: boolean
}

export function ProjectGallery({ 
  images, 
  title,
  subtitle,
  columns = 4,
  showContainer = true,
}: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const gridContent = (
    <>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div className={`grid grid-cols-2 ${columns === 4 ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6b9834] focus:ring-offset-2"
          >
            <Image
              src={image.src}
              alt={image.alt}
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
          </button>
        ))}
      </div>
    </>
  )

  return (
    <>
      {showContainer ? (
        <section className="py-12">
          <Container>{gridContent}</Container>
        </section>
      ) : (
        gridContent
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
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
          <div 
            className="relative w-full h-full max-w-5xl max-h-[85vh] m-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

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
        </div>
      )}
    </>
  )
}

// Silkecement/Flisecement gallery images
export const SILKECEMENT_IMAGES: GalleryImage[] = [
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500292131-Unknown-2.jpg",
    alt: "Silkecement projekt - moderne badeværelse",
    caption: "Silkecement i badeværelse",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500309904-Unknown-3.jpg",
    alt: "Silkecement vægfinish",
    caption: "Silkeblød vægfinish",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500308916-Unknown-4.jpg",
    alt: "Flisecement brusekabine",
    caption: "Vandtæt flisecement",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500308084-Unknown-5.jpg",
    alt: "Silkecement overfladebehandling",
    caption: "Elegant overfladebehandling",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500307132-Unknown-6.jpg",
    alt: "Fugesløs vægbeklædning",
    caption: "Fugesløs finish",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500305834-Unknown-7.jpg",
    alt: "Silkecement badeværelse detalje",
    caption: "Detalje fra badeværelse",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500304799-Unknown-8.jpg",
    alt: "Moderne silkecement væg",
    caption: "Moderne vægfinish",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500303484-Unknown-9.jpg",
    alt: "Silkecement håndværk",
    caption: "Professionelt håndværk",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500302029-Unknown-10.jpg",
    alt: "Flisecement køkken",
    caption: "Flisecement i køkken",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500300815-Unknown-11.jpg",
    alt: "Vandtæt silkecement",
    caption: "Vandtæt løsning",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500299408-Unknown-12.jpg",
    alt: "Silkecement entré",
    caption: "Silkecement i entré",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500298222-Unknown-13.jpg",
    alt: "Moderne badeværelse med silkecement",
    caption: "Komplet badeværelse",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500297118-Unknown-14.jpg",
    alt: "Silkecement detalje close-up",
    caption: "Tekstur close-up",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500295817-Unknown-15.jpg",
    alt: "Flisecement projekt færdigt",
    caption: "Færdigt projekt",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500294778-Unknown-16.jpg",
    alt: "Professionel silkecement installation",
    caption: "Professionel installation",
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500293570-Unknown-17.jpg",
    alt: "Silkecement før og efter",
    caption: "Flot resultat",
  },
]
