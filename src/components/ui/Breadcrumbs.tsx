import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Container } from "./Container"
import { COMPANY } from "@/lib/constants"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build full breadcrumb list with Home at the start
  const fullItems: BreadcrumbItem[] = [
    { label: "Forside", href: "/" },
    ...items
  ]

  // Build JSON-LD structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": fullItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && {
        "item": `https://${COMPANY.domain}${item.href}`
      })
    }))
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-4 border-b border-gray-100">
        <Container>
          <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
            {fullItems.map((item, index) => {
              const isLast = index === fullItems.length - 1
              const isFirst = index === 0

              return (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 mx-1 text-gray-400 flex-shrink-0" />
                  )}
                  
                  {isLast ? (
                    // Current page - bold, no link
                    <span className="font-medium text-gray-900" aria-current="page">
                      {item.label}
                    </span>
                  ) : item.href ? (
                    // Link item
                    <Link 
                      href={item.href}
                      className="hover:text-[#6b9834] transition-colors flex items-center gap-1"
                    >
                      {isFirst && <Home className="w-3.5 h-3.5" />}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    // Non-link item (shouldn't happen but fallback)
                    <span>{item.label}</span>
                  )}
                </li>
              )
            })}
          </ol>
        </Container>
      </nav>
    </>
  )
}
