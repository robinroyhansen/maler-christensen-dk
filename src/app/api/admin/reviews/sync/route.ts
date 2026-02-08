import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createHash } from "crypto"

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error("Missing Supabase env vars")
  return createClient(url, key)
}

function checkAdminAuth(request: NextRequest): boolean {
  return request.cookies.get('mc_admin_auth')?.value === '1'
}

function md5(text: string): string {
  return createHash('md5').update(text).digest('hex')
}

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = getSupabaseClient()
  
  // Get last sync info from site_settings
  const { data: setting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "review_sync_last")
    .single()

  // Get review counts
  const { count: totalCount } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })

  const { count: tpCount } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("source", "trustpilot")

  return NextResponse.json({
    success: true,
    lastSync: setting?.value || null,
    stats: {
      total: totalCount || 0,
      trustpilot: tpCount || 0,
    }
  })
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = getSupabaseClient()
    
    // Scrape Trustpilot
    const tpUrl = "https://dk.trustpilot.com/review/maler-christensen.dk"
    const res = await fetch(tpUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" }
    })
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch Trustpilot" }, { status: 502 })
    }

    const html = await res.text()
    
    // Extract JSON-LD
    const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)
    if (!jsonLdMatches) {
      return NextResponse.json({ error: "No JSON-LD found" }, { status: 500 })
    }

    let reviews: any[] = []
    for (const match of jsonLdMatches) {
      try {
        const json = match.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '')
        const data = JSON.parse(json)
        if (data["@type"] === "LocalBusiness" && data.review) {
          reviews = data.review
          break
        }
      } catch {}
    }

    if (!reviews.length) {
      return NextResponse.json({ error: "No reviews found in JSON-LD" }, { status: 500 })
    }

    // Get existing review hashes
    const { data: existing } = await supabase
      .from("reviews")
      .select("review_text")
      .eq("source", "trustpilot")

    const existingHashes = new Set(
      (existing || []).map((r: any) => md5(r.review_text.trim()))
    )

    // Insert new reviews
    let inserted = 0
    for (const review of reviews) {
      const text = review.reviewBody?.trim()
      if (!text) continue

      const hash = md5(text)
      if (existingHashes.has(hash)) continue

      let authorName = review.author?.name || "Verificeret kunde"
      if (authorName === "Consumer" || authorName === "kunde") {
        authorName = "Verificeret kunde"
      }
      // Strip HTML artifacts
      authorName = authorName.replace(/<[^>]*>/g, '').trim()

      const rating = review.reviewRating?.ratingValue || 5

      await supabase.from("reviews").insert({
        author_name: authorName,
        review_text: text,
        rating,
        source: "trustpilot",
        is_featured: false,
        is_visible: true,
        sort_order: 999,
        page_slugs: ["homepage"],
      })

      inserted++
      existingHashes.add(hash)
    }

    // Update last sync time
    const now = new Date().toISOString()
    await supabase.from("site_settings").upsert({
      key: "review_sync_last",
      value: JSON.stringify({
        time: now,
        found: reviews.length,
        inserted,
      }),
      updated_at: now,
    })

    return NextResponse.json({
      success: true,
      found: reviews.length,
      inserted,
      time: now,
    })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
