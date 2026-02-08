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

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = getSupabaseClient()
    
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to fetch blog posts" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      posts: posts || []
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    
    const { title } = body
    
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    // Generate a unique slug
    let slug = generateSlug(title)
    
    // Check if slug exists and make it unique if needed
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("slug", slug)
      .single()
    
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert({
        title,
        slug,
        excerpt: body.excerpt || "",
        content: body.content || "",
        featured_image: body.featured_image || null,
        meta_title: body.meta_title || null,
        meta_description: body.meta_description || null,
        status: body.status || "draft",
        author: body.author || "Malerfirmaet Schou & Christensen",
        published_at: body.status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to create blog post" },
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
