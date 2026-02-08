import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return null
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

// GET single published blog post by slug (public API)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json(
        { success: false, post: null },
        { status: 404 }
      )
    }
    
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()

    if (error || !post) {
      return NextResponse.json(
        { success: false, post: null },
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
      { success: false, post: null },
      { status: 500 }
    )
  }
}
