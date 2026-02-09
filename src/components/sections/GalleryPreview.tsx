"use client"

import { Container } from "@/components/ui/Container"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

// Real gallery images from Supabase storage
const GALLERY_IMAGES = [
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500292131-Unknown-2.jpg",
    alt: "Microcement gulv projekt af Schou & Christensen"
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500309904-Unknown-3.jpg",
    alt: "Microcement væg finish af Schou & Christensen"
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500308916-Unknown-4.jpg",
    alt: "Microcement badeværelse af Schou & Christensen"
  },
  {
    src: "https://cduloscitjydjelqayhs.supabase.co/storage/v1/object/public/project-attachments/projects/052d2a61-54d3-4854-a006-9f3cf3e07a76/1770500308084-Unknown-5.jpg",
    alt: "Microcement køkken af Schou & Christensen"
  },
]

interface GalleryPreviewProps {
  title?: string
  subtitle?: string
}

export function GalleryPreview({
  title = "Vores arbejde",
  subtitle = "Se eksempler på vores seneste projekter"
}: GalleryPreviewProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <Container>
        <AnimateIn className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight section-heading-accent">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mt-6 px-4 sm:px-0">{subtitle}</p>
        </AnimateIn>

        {/* Gallery Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <StaggerItem key={index} variant="scale">
              <GalleryItem image={image} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Link */}
        <AnimateIn delay={0.3} className="text-center mt-8 sm:mt-10">
          <Link
            href="/galleri/"
            className="inline-flex items-center gap-2 bg-[#6b9834] text-white font-semibold px-5 sm:px-6 py-3 rounded-full hover:bg-[#5a8229] transition-colors group min-h-[48px] active:scale-[0.98]"
          >
            <Camera className="w-5 h-5" />
            Se flere projekter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimateIn>
      </Container>
    </section>
  )
}

interface GalleryItemProps {
  image: {
    src: string
    alt: string
  }
  index: number
}

function GalleryItem({ image, index }: GalleryItemProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href="/galleri/"
        className="gallery-grid-item relative aspect-square group cursor-pointer block"
      >
        {/* Placeholder background while loading */}
        <div className="absolute inset-0 bg-gray-100 rounded-lg sm:rounded-xl" />
        
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover rounded-lg sm:rounded-xl"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#6b9834]/0 group-hover:bg-[#6b9834]/20 transition-colors duration-300 rounded-lg sm:rounded-xl" />
        {/* Icon on hover - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Camera className="w-5 h-5 text-[#6b9834]" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
