"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { 
  LayoutDashboard, FileText, Image, Star, Mail, 
  Users, Settings, LogOut, Menu, X, MapPin, ArrowLeft,
  Repeat, BarChart3, Wrench, PenLine, SearchCheck
} from "lucide-react"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  hasBadge?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "SEO Oversigt", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Sider", icon: FileText },
  { href: "/admin/blog", label: "Blog", icon: PenLine },
  { href: "/admin/reviews", label: "Anmeldelser", icon: Star },
  { href: "/admin/leads", label: "Henvendelser", icon: Mail, hasBadge: true },
  { href: "/admin/gallery", label: "Galleri", icon: Image },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/cities", label: "Byer", icon: MapPin },
  { href: "/admin/redirects", label: "Redirects", icon: Repeat },
  { href: "/admin/partners", label: "Partnere", icon: Users },
  { href: "/admin/seo-check", label: "SEO Tjek", icon: SearchCheck },
  { href: "/admin/settings", label: "Indstillinger", icon: Settings },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
]

// Simple cookie-based auth (no Supabase Auth dependency)
const ADMIN_PASSWORD = "MalerAdmin2024!"
const AUTH_COOKIE = "mc_admin_auth"

function getAuthCookie(): boolean {
  if (typeof document === "undefined") return false
  return document.cookie.includes(`${AUTH_COOKIE}=1`)
}

function setAuthCookie() {
  // Cookie expires in 7 days
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${AUTH_COOKIE}=1; path=/; expires=${expires}; SameSite=Strict`
}

function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadLeads, setUnreadLeads] = useState(0)
  const pathname = usePathname()
  const supabase = createClient()

  // Fetch unread lead count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { count } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false)
      setUnreadLeads(count || 0)
    }
    
    if (getAuthCookie()) {
      fetchUnreadCount()
      // Refresh every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000)
      return () => clearInterval(interval)
    }
  }, [pathname])

  useEffect(() => {
    setIsAuthenticated(getAuthCookie())
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password === ADMIN_PASSWORD) {
      setAuthCookie()
      setIsAuthenticated(true)
    } else {
      setError("Forkert adgangskode")
    }
  }

  const handleLogout = () => {
    clearAuthCookie()
    setIsAuthenticated(false)
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b9834]"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#6b9834] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">SC</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600">Log ind for at administrere hjemmesiden</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Adgangskode
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b9834] focus:border-transparent outline-none"
                placeholder="Indtast adgangskode"
                required
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Log ind
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6b9834] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">SC</span>
          </div>
          <span className="font-semibold">Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-6 border-b hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6b9834] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SC</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Admin Panel</p>
                <p className="text-xs text-gray-500">maler-christensen.dk</p>
              </div>
            </div>
          </div>

          {/* Back to site link */}
          <div className="p-4 border-b">
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#6b9834] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbage til hjemmesiden
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative",
                  pathname === item.href
                    ? "bg-[#6b9834] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                {item.hasBadge && unreadLeads > 0 && (
                  <span className={cn(
                    "absolute right-3 min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-bold",
                    pathname === item.href
                      ? "bg-white text-[#6b9834]"
                      : "bg-red-500 text-white"
                  )}>
                    {unreadLeads > 99 ? "99+" : unreadLeads}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Log ud
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
