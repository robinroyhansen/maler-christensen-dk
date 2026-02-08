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

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const supabase = getSupabaseClient()
    
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      post
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const supabase = getSupabaseClient()
    const body = await request.json()
    
    // Get current post to check status change
    const { data: currentPost } = await supabase
      .from("blog_posts")
      .select("status, published_at")
      .eq("id", id)
      .single()

    // Build update object
    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (body.title !== undefined) {
      updateData.title = body.title
      // Update slug if title changes
      updateData.slug = generateSlug(body.title)
    }
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt
    if (body.content !== undefined) updateData.content = body.content
    if (body.featured_image !== undefined) updateData.featured_image = body.featured_image
    if (body.meta_title !== undefined) updateData.meta_title = body.meta_title
    if (body.meta_description !== undefined) updateData.meta_description = body.meta_description
    if (body.author !== undefined) updateData.author = body.author
    if (body.status !== undefined) {
      updateData.status = body.status
      // Set published_at when publishing for the first time
      if (body.status === "published" && currentPost?.status !== "published") {
        updateData.published_at = body.published_at || new Date().toISOString()
      }
    }
    if (body.published_at !== undefined) updateData.published_at = body.published_at

    const { data: post, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to update blog post" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      post
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
    const { id } = await params
    const supabase = getSupabaseClient()
    
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to delete blog post" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
