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

// Category display name mapping
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'microcement': 'Microcement',
  'pu-gulv': 'Metallisk PU Gulv',
  'udvendig-maling': 'Udvendig Maling',
  'maling-trappe': 'Maling af Trappe'
}

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = getSupabaseClient()
    
    const { data: images, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to fetch images" },
        { status: 500 }
      )
    }

    // Group images by category
    const groupedImages: Record<string, any[]> = {}
    
    images?.forEach(image => {
      if (!groupedImages[image.category]) {
        groupedImages[image.category] = []
      }
      groupedImages[image.category].push(image)
    })

    // Add display names and counts
    const categoriesWithMeta = Object.keys(groupedImages).map(categoryId => ({
      id: categoryId,
      displayName: CATEGORY_DISPLAY_NAMES[categoryId] || categoryId,
      count: groupedImages[categoryId].length,
      images: groupedImages[categoryId]
    }))

    return NextResponse.json({
      success: true,
      categories: categoriesWithMeta,
      totalImages: images?.length || 0
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}