import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

// Cache for redirects - refreshed every 5 minutes
let redirectsCache: Map<string, { to: string; status: number }> | null = null
let cacheTimestamp = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function getRedirects(request: NextRequest): Promise<Map<string, { to: string; status: number }>> {
  const now = Date.now()
  
  // Return cached redirects if still valid
  if (redirectsCache && (now - cacheTimestamp) < CACHE_TTL) {
    return redirectsCache
  }

  try {
    // Create Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            // We don't need to set cookies for redirects
          },
        },
      }
    )

    // Fetch active redirects
    const { data: redirects, error } = await supabase
      .from("redirects")
      .select("from_path, to_path, status_code")
      .eq("is_active", true)

    if (error) {
      console.error("Error fetching redirects:", error)
      return redirectsCache || new Map()
    }

    // Build redirects map
    const redirectsMap = new Map<string, { to: string; status: number }>()
    if (redirects) {
      redirects.forEach((r: { from_path: string; to_path: string; status_code: number }) => {
        redirectsMap.set(r.from_path, { to: r.to_path, status: r.status_code })
      })
    }

    // Update cache
    redirectsCache = redirectsMap
    cacheTimestamp = now

    return redirectsMap
  } catch (error) {
    console.error("Error in getRedirects:", error)
    return redirectsCache || new Map()
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, API routes, and admin
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next()
  }

  // Check for redirects
  const redirects = await getRedirects(request)
  
  // Try exact match first
  let redirect = redirects.get(pathname)
  
  // Try with trailing slash
  if (!redirect && !pathname.endsWith("/")) {
    redirect = redirects.get(pathname + "/")
  }
  
  // Try without trailing slash
  if (!redirect && pathname.endsWith("/") && pathname !== "/") {
    redirect = redirects.get(pathname.slice(0, -1))
  }

  if (redirect) {
    const destinationUrl = redirect.to.startsWith("http")
      ? redirect.to
      : new URL(redirect.to, request.url).toString()

    return NextResponse.redirect(destinationUrl, { status: redirect.status })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
