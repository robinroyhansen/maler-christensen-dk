"use client"

import { usePathname } from "next/navigation"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { TrustBar } from "./TrustBar"
import { FloatingCTA } from "@/components/ui/FloatingCTA"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) {
    // Admin pages render without the public site shell
    return <>{children}</>
  }

  return (
    <>
      <TrustBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
