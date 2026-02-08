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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { alt_text, caption, sort_order } = body
    const resolvedParams = await params
    const imageId = resolvedParams.id

    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()

    // Update the image
    const { data: updatedImage, error } = await supabase
      .from("gallery_images")
      .update({
        alt_text,
        caption,
        sort_order
      })
      .eq("id", imageId)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Failed to update image" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      image: updatedImage
    })

  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const resolvedParams = await params
    const imageId = resolvedParams.id

    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()

    // First, get the image data to find the storage path
    const { data: image, error: fetchError } = await supabase
      .from("gallery_images")
      .select("url, category")
      .eq("id", imageId)
      .single()

    if (fetchError || !image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      )
    }

    // Extract the file path from the URL for storage deletion
    // URL format: https://qdphnqduwgnnwvmpksrr.supabase.co/storage/v1/object/public/site-assets/category/filename
    const urlParts = image.url.split('/site-assets/')
    let filePath = ''
    
    if (urlParts.length > 1) {
      filePath = urlParts[1]
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('site-assets')
        .remove([filePath])
      
      if (storageError) {
        console.error('Storage deletion error:', storageError)
        // Continue with database deletion even if storage deletion fails
      }
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", imageId)

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to delete image from database" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully"
    })

  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}