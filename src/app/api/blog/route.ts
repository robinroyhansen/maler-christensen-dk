import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return null
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

// GET published blog posts (public API)
export async function GET() {
  try {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      // Return empty array during build
      return NextResponse.json({
        success: true,
        posts: []
      })
    }
    
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { success: false, posts: [] },
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
      { success: false, posts: [] },
      { status: 500 }
    )
  }
}
