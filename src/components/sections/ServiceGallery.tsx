import { createClient } from '@/lib/supabase/server'
import { ProjectGallery, type GalleryImage } from './ProjectGallery'

interface GalleryImageData {
  id: string
  url: string
  alt_text: string | null
  caption: string | null
  category: string
  sort_order: number | null
  page_id: string | null
  created_at: string
}

interface ServiceGalleryProps {
  category: string
  title?: string
  subtitle?: string
  columns?: 3 | 4
}

export async function ServiceGallery({ 
  category, 
  title,
  subtitle,
  columns = 3,
}: ServiceGalleryProps) {
  const supabase = await createClient()

  try {
    const { data: galleryImages, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('category', category)
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching gallery images:', error)
      return null
    }

    if (!galleryImages || galleryImages.length === 0) {
      return null
    }

    // Transform the data to match GalleryImage interface
    const images: GalleryImage[] = galleryImages.map((item: GalleryImageData) => ({
      src: item.url,
      alt: item.alt_text || `${category} billede`,
      caption: item.caption || undefined,
    }))

    return (
      <ProjectGallery
        images={images}
        title={title}
        subtitle={subtitle}
        columns={columns}
      />
    )
  } catch (error) {
    console.error('Error in ServiceGallery:', error)
    return null
  }
}