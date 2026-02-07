import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, email, phone, message, page_slug } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { error } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: phone || null,
        message,
        page_slug: page_slug || null,
      })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
