"use client"

import { Container } from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"
import { getReviewsForPage, type Review } from "@/lib/data/reviews"
import { Star, Quote } from "lucide-react"

// Get initials from author name
function getInitials(name: string): string {
  if (name === "Trustpilot-bruger") {
    return "TB"
  }
  return name.split(" ").map(n => n[0]).join("").toUpperCase()
}

// Format date to Danish format
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long"
  })
}

interface ReviewsProps {
  title?: string
  subtitle?: string
  pageSlug?: string
}

export function Reviews({ 
  title = "Hvad vores kunder siger",
  subtitle = `${COMPANY.trustpilotRating}/5 stjerner baseret på ${COMPANY.trustpilotReviews}+ anmeldelser på Trustpilot`,
  pageSlug = "homepage"
}: ReviewsProps) {
  const reviews = getReviewsForPage(pageSlug, 6)

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-[#00b67a] fill-[#00b67a]" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.trustpilot.com/review/www.maler-christensen.dk?languages=all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00b67a] font-semibold hover:underline"
          >
            Se alle anmeldelser på Trustpilot
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const isTrustpilot = review.source === "trustpilot"
  
  return (
    <div className="bg-gray-50 rounded-xl p-6 relative flex flex-col">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-[#6b9834]/20" />
      
      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-[#00b67a] fill-[#00b67a]" />
        ))}
      </div>

      {/* Full Review Text */}
      <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6b9834] rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {getInitials(review.author)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{review.author}</p>
            <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
          </div>
        </div>
        
        {/* Source Badge */}
        <div 
          className={`px-2 py-1 rounded text-xs font-medium ${
            isTrustpilot 
              ? "bg-[#00b67a]/10 text-[#00b67a]" 
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {isTrustpilot ? "Trustpilot" : "Anmeld Håndværker"}
        </div>
      </div>
    </div>
  )
}
