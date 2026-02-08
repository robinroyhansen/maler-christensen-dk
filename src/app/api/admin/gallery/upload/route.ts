import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

function checkAdminAuth(request: NextRequest): boolean {
  const cookie = request.cookies.get('mc_admin_auth')
  return cookie?.value === '1'
}

// SEO templates for each category
const SEO_TEMPLATES: Record<string, string[]> = {
  'microcement': [
    'Microcement {surface} — professionelt udført af Schou & Christensen',
    'Microcement nærbillede — professionelt udført af Schou & Christensen',
    'Microcement færdigt resultat — professionelt udført af Schou & Christensen',
    'Microcement under arbejde — professionelt udført af Schou & Christensen',
    'Microcement panoramaudsigt — professionelt udført af Schou & Christensen',
    'Microcement detaljebillede — professionelt udført af Schou & Christensen',
    'Microcement tekstur — professionelt udført af Schou & Christensen',
    'Microcement overflade — professionelt udført af Schou & Christensen',
    'Microcement finish — professionelt udført af Schou & Christensen',
    'Microcement kvalitetsarbejde — professionelt udført af Schou & Christensen'
  ],
  'pu-gulv': [
    'Metallisk PU gulv {detail} — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv nærbillede — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv færdigt resultat — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv under arbejde — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv panoramaudsigt — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv detaljebillede — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv glansfinish — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv spejleffekt — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv overfladebehandling — epoxygulv af Schou & Christensen',
    'Metallisk PU gulv kvalitetsarbejde — epoxygulv af Schou & Christensen'
  ],
  'udvendig-maling': [
    'Udvendig maling {detail} — facadearbejde af Schou & Christensen',
    'Udvendig maling nærbillede — facadearbejde af Schou & Christensen',
    'Udvendig maling færdigt resultat — facadearbejde af Schou & Christensen',
    'Udvendig maling under arbejde — facadearbejde af Schou & Christensen',
    'Udvendig maling panoramaudsigt — facadearbejde af Schou & Christensen',
    'Udvendig maling facadedetaljer — facadearbejde af Schou & Christensen',
    'Udvendig maling før og efter — facadearbejde af Schou & Christensen',
    'Udvendig maling farveskema — facadearbejde af Schou & Christensen',
    'Udvendig maling finish — facadearbejde af Schou & Christensen',
    'Udvendig maling kvalitetsarbejde — facadearbejde af Schou & Christensen'
  ],
  'maling-trappe': [
    'Maling af trappeopgang {detail} — Schou & Christensen',
    'Maling af trappeopgang nærbillede — Schou & Christensen',
    'Maling af trappeopgang færdigt resultat — Schou & Christensen',
    'Maling af trappeopgang under arbejde — Schou & Christensen',
    'Maling af trappeopgang panoramaudsigt — Schou & Christensen',
    'Maling af trappeopgang detaljer — Schou & Christensen',
    'Maling af trappeopgang før og efter — Schou & Christensen',
    'Maling af trappeopgang farvevalg — Schou & Christensen',
    'Maling af trappeopgang finish — Schou & Christensen',
    'Maling af trappeopgang kvalitetsarbejde — Schou & Christensen'
  ]
}

function generateSEOAltText(category: string, imageIndex: number): string {
  const templates = SEO_TEMPLATES[category]
  if (!templates) {
    return `${category} projekt — professionelt malerarbejde af Schou & Christensen`
  }
  
  // Rotate through templates based on image index
  const template = templates[imageIndex % templates.length]
  return template
}

function generateCaption(altText: string): string {
  // Create shorter caption from alt text
  const parts = altText.split(' — ')
  return parts[0] // Just the first part before the company attribution
}

function slugifyFilename(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ä/g, 'a')
    .replace(/[—–]/g, '-')
    .replace(/[^a-z0-9-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60)
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string

    if (!file || !category) {
      return NextResponse.json(
        { error: "File and category are required" },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()
    
    // Get current image count in this category for SEO variation
    const { data: existingImages } = await supabase
      .from("gallery_images")
      .select("id")
      .eq("category", category)
    
    const imageIndex = existingImages?.length || 0

    // Generate SEO optimized content first (need alt text for filename)
    const altText = generateSEOAltText(category, imageIndex)
    
    // Generate SEO-friendly filename from alt text
    const fileExt = file.name.split('.').pop() || 'jpg'
    const seoBase = slugifyFilename(altText)
    // Add short random suffix to avoid conflicts
    const suffix = Math.random().toString(36).substring(2, 6)
    const fileName = seoBase ? `${seoBase}-${suffix}.${fileExt}` : `${category}-${Date.now()}.${fileExt}`
    const filePath = `${category}/${fileName}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('site-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('site-assets')
      .getPublicUrl(filePath)

    const caption = generateCaption(altText)

    // Get next sort_order for this category
    const { data: lastImage } = await supabase
      .from("gallery_images")
      .select("sort_order")
      .eq("category", category)
      .order("sort_order", { ascending: false })
      .limit(1)
      .single()

    const nextSortOrder = (lastImage?.sort_order || 0) + 1

    // Insert into database
    const { data: insertedImage, error: dbError } = await supabase
      .from("gallery_images")
      .insert({
        url: urlData.publicUrl,
        alt_text: altText,
        caption: caption,
        category: category,
        sort_order: nextSortOrder,
        page_id: null
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Try to clean up uploaded file
      await supabase.storage.from('site-assets').remove([filePath])
      return NextResponse.json(
        { error: 'Failed to save image data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      image: insertedImage
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}