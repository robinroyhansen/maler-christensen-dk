"use client"

import { useState } from "react"
import { Container } from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"
import { getReviewsForPage, type Review } from "@/lib/data/reviews"
import { Star, Quote, ExternalLink } from "lucide-react"

// Get initials from author name
function getInitials(name: string): string {
  if (name === "Verificeret kunde") {
    return "✓"
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
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-[#00b67a] fill-[#00b67a]" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight section-heading-accent">
            {title}
          </h2>
          <p className="text-lg text-gray-500 mt-6">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.trustpilot.com/review/www.maler-christensen.dk?languages=all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00b67a] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#00a06a] transition-colors"
          >
            Se alle anmeldelser på Trustpilot
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </section>
  )
}

const TRUNCATE_LENGTH = 200

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isTrustpilot = review.source === "trustpilot"
  const needsTruncation = review.text.length > TRUNCATE_LENGTH
  
  const displayText = needsTruncation && !isExpanded 
    ? review.text.slice(0, TRUNCATE_LENGTH).trim() + "..."
    : review.text
  
  return (
    <div className="review-card bg-gray-50 rounded-xl p-6 relative flex flex-col border-l-3 border-transparent hover:border-[#6b9834]">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-[#6b9834]/15" />
      
      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-[#00b67a] fill-[#00b67a]" />
        ))}
      </div>

      {/* Review Text with optional truncation */}
      <div className="mb-6 flex-grow">
        <p className="text-gray-700 leading-relaxed">
          &ldquo;{displayText}&rdquo;
        </p>
        {needsTruncation && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-[#6b9834] text-sm font-medium hover:text-[#5a8229] transition-colors"
          >
            {isExpanded ? "Vis mindre" : "Læs mere"}
          </button>
        )}
      </div>

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
          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
            isTrustpilot 
              ? "bg-[#00b67a] text-white" 
              : "bg-blue-500 text-white"
          }`}
        >
          {isTrustpilot ? "★ Trustpilot" : "Anmeld Håndværker"}
        </div>
      </div>
    </div>
  )
}
