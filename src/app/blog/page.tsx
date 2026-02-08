import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { COMPANY } from "@/lib/constants"
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/data/blog-posts"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — Maletips og inspiration | Schou & Christensen",
  description: "Få tips og inspiration til malerarbejde. Læs om priser, vedligeholdelse og de nyeste trends inden for maling og overfladebehandling.",
  alternates: {
    canonical: `https://${COMPANY.domain}/blog/`,
  },
  openGraph: {
    title: "Blog — Maletips og inspiration | Schou & Christensen",
    description: "Få tips og inspiration til malerarbejde. Læs om priser, vedligeholdelse og de nyeste trends.",
    url: `https://${COMPANY.domain}/blog/`,
  },
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  // Sort posts by date, newest first
  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      <Hero
        title="Blog"
        subtitle="Tips, inspiration og guides til dit næste malerprojekt"
        variant="page"
        showTrustpilot={false}
        showCTA={false}
      />

      <section className="py-16 md:py-24">
        <Container>
          {/* Category filters */}
          <AnimateIn className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-[#6b9834] text-white rounded-full text-sm font-medium">
                Alle artikler
              </span>
              {BLOG_CATEGORIES.map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {category}
                </span>
              ))}
            </div>
          </AnimateIn>

          {/* Blog posts grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {sortedPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}/`} className="group block">
                  <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    {/* Placeholder image area */}
                    <div className="aspect-video bg-gradient-to-br from-[#6b9834]/20 to-[#85bd41]/10 flex items-center justify-center">
                      <div className="text-[#6b9834]/30 text-6xl font-bold">
                        {post.title.charAt(0)}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#6b9834]/10 text-[#6b9834] rounded text-xs font-medium">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#6b9834] transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readingTime} min læsning</span>
                        </div>
                      </div>

                      {/* Read more link */}
                      <div className="mt-4 flex items-center gap-2 text-[#6b9834] font-medium group-hover:gap-3 transition-all">
                        Læs artiklen
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Empty state if no posts */}
          {sortedPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600">Ingen artikler fundet.</p>
            </div>
          )}
        </Container>
      </section>

      <CTA
        title="Har du et malerprojekt?"
        subtitle="Få et gratis og uforpligtende tilbud i dag"
      />
    </>
  )
}
