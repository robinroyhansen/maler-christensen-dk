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

function normalizePath(path: string): string {
  let normalized = path.trim()
  if (!normalized.startsWith('/') && !normalized.startsWith('http')) {
    normalized = '/' + normalized
  }
  return normalized
}

// GET: List all redirects
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = getSupabaseClient()
    
    const { data, error } = await supabase
      .from("redirects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching redirects:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ redirects: data || [] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST: Create single or bulk redirects
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = getSupabaseClient()
    const body = await request.json()

    // Check if bulk import
    if (body.bulk && typeof body.bulk === 'string') {
      const lines = body.bulk.split('\n').filter((line: string) => line.trim())
      const redirectsToInsert: { from_path: string; to_path: string; status_code: number; is_active: boolean }[] = []
      const errors: string[] = []

      for (const line of lines) {
        // Support both comma and semicolon as separator
        const separator = line.includes(';') ? ';' : ','
        const parts = line.split(separator).map((p: string) => p.trim())
        
        if (parts.length >= 2) {
          const from_path = normalizePath(parts[0])
          const to_path = normalizePath(parts[1])
          
          if (from_path && to_path) {
            redirectsToInsert.push({
              from_path,
              to_path,
              status_code: 301,
              is_active: true
            })
          } else {
            errors.push(`Invalid line: ${line}`)
          }
        } else {
          errors.push(`Invalid format (need from,to): ${line}`)
        }
      }

      if (redirectsToInsert.length === 0) {
        return NextResponse.json({ 
          error: "No valid redirects found", 
          details: errors 
        }, { status: 400 })
      }

      // Insert all redirects (upsert to avoid duplicates)
      const { data, error } = await supabase
        .from("redirects")
        .upsert(redirectsToInsert, { 
          onConflict: 'from_path',
          ignoreDuplicates: false 
        })
        .select()

      if (error) {
        console.error("Bulk insert error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ 
        success: true, 
        inserted: data?.length || redirectsToInsert.length,
        errors: errors.length > 0 ? errors : undefined
      })
    }

    // Single redirect insert
    const { from_path, to_path, status_code = 301 } = body

    if (!from_path || !to_path) {
      return NextResponse.json({ 
        error: "from_path and to_path are required" 
      }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("redirects")
      .insert({
        from_path: normalizePath(from_path),
        to_path: normalizePath(to_path),
        status_code,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ 
          error: "A redirect from this path already exists" 
        }, { status: 409 })
      }
      console.error("Insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, redirect: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
