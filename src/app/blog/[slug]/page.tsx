import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { CTA } from "@/components/sections/CTA"
import { COMPANY } from "@/lib/constants"
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/data/blog-posts"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, User } from "lucide-react"

// Generate static params for all blog posts
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Artikel ikke fundet",
    }
  }

  return {
    title: `${post.title} | Schou & Christensen Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://${COMPANY.domain}/blog/${slug}/`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `https://${COMPANY.domain}/blog/${slug}/`,
      publishedTime: post.date,
      authors: [post.author],
      siteName: COMPANY.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Simple markdown-ish content renderer
function renderContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h2 class="text-3xl font-bold text-gray-900 mt-8 mb-6">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Line breaks to paragraphs
    .split('\n\n')
    .map(p => {
      // Skip if already has HTML tags
      if (p.trim().startsWith('<')) return p
      // Skip empty
      if (!p.trim()) return ''
      // Lists
      if (p.includes('\n- ')) {
        const items = p.split('\n- ').filter(Boolean)
        return `<ul class="list-disc list-inside space-y-2 mb-4 text-gray-600">${items.map(item => `<li>${item.trim()}</li>`).join('')}</ul>`
      }
      // Regular paragraph
      return `<p class="text-gray-600 leading-relaxed mb-4">${p.trim()}</p>`
    })
    .join('\n')
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 2)

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: "https://maler-christensen.dk/wp-content/uploads/2025/10/Firmalogo-Schou-Christensen.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${COMPANY.domain}/blog/${slug}/`,
    },
  }

  return (
    <>
      {/* Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero/Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24">
        <Container>
          <AnimateIn>
            {/* Back link */}
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbage til blog
            </Link>

            {/* Category */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#6b9834] text-white rounded-full text-sm font-medium">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min læsning</span>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Article content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimateIn>
              <div
                className="prose prose-lg prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
              />
            </AnimateIn>

            {/* Author box */}
            <AnimateIn delay={0.1}>
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-[#6b9834] rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    SC
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Schou & Christensen</h3>
                    <p className="text-gray-600 text-sm">
                      Lokalt malerfirma i Slagelse med over 15 års erfaring. Vi er stolte af 
                      vores {COMPANY.trustpilotRating}/5 rating på Trustpilot og vores medlemskab 
                      af Danske Malermestre.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <AnimateIn delay={0.2}>
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Læs også</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}/`}
                        className="group p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
                      >
                        <span className="text-sm text-[#6b9834] font-medium">
                          {relatedPost.category}
                        </span>
                        <h3 className="font-bold text-gray-900 mt-2 mb-2 group-hover:text-[#6b9834] transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[#6b9834] font-medium text-sm">
                          Læs mere
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            )}
          </div>
        </Container>
      </section>

      <CTA
        title="Klar til at komme i gang?"
        subtitle="Få et gratis og uforpligtende tilbud på dit malerprojekt"
      />
    </>
  )
}
