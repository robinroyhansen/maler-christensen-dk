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
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex justify-center items-center gap-0.5 sm:gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 sm:w-8 sm:h-8 text-[#00b67a] fill-[#00b67a]" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight section-heading-accent">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 mt-6 px-4 sm:px-0">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://www.trustpilot.com/review/www.maler-christensen.dk?languages=all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00b67a] text-white font-semibold px-5 sm:px-6 py-3 rounded-full hover:bg-[#00a06a] transition-colors min-h-[48px] active:scale-[0.98]"
          >
            <span className="text-sm sm:text-base">Se alle anmeldelser på Trustpilot</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </section>
  )
}

// Truncate at 150 chars on mobile, 200 on desktop
const TRUNCATE_LENGTH_MOBILE = 150
const TRUNCATE_LENGTH_DESKTOP = 200

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isTrustpilot = review.source === "trustpilot"
  
  // Use CSS to handle different truncation on mobile vs desktop
  const needsTruncationMobile = review.text.length > TRUNCATE_LENGTH_MOBILE
  const needsTruncationDesktop = review.text.length > TRUNCATE_LENGTH_DESKTOP
  
  const displayTextMobile = needsTruncationMobile && !isExpanded 
    ? review.text.slice(0, TRUNCATE_LENGTH_MOBILE).trim() + "..."
    : review.text
    
  const displayTextDesktop = needsTruncationDesktop && !isExpanded 
    ? review.text.slice(0, TRUNCATE_LENGTH_DESKTOP).trim() + "..."
    : review.text
  
  return (
    <div className="review-card bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 relative flex flex-col border-l-3 border-transparent hover:border-[#6b9834]">
      <Quote className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 text-[#6b9834]/15" />
      
      {/* Star Rating */}
      <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#00b67a] fill-[#00b67a]" />
        ))}
      </div>

      {/* Review Text with responsive truncation */}
      <div className="mb-4 sm:mb-6 flex-grow">
        {/* Mobile text */}
        <p className="text-gray-700 leading-relaxed text-sm sm:hidden">
          &ldquo;{displayTextMobile}&rdquo;
        </p>
        {/* Desktop text */}
        <p className="text-gray-700 leading-relaxed hidden sm:block">
          &ldquo;{displayTextDesktop}&rdquo;
        </p>
        
        {/* Show button based on screen size */}
        {(needsTruncationMobile || needsTruncationDesktop) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-[#6b9834] text-sm font-medium hover:text-[#5a8229] transition-colors min-h-[44px] px-1"
          >
            {isExpanded ? "Vis mindre" : "Læs mere"}
          </button>
        )}
      </div>

      {/* Author Info - prevent wrapping */}
      <div className="flex items-center justify-between gap-3 mt-auto pt-3 sm:pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#6b9834] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-xs sm:text-sm">
              {getInitials(review.author)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{review.author}</p>
            <p className="text-xs sm:text-sm text-gray-500">{formatDate(review.date)}</p>
          </div>
        </div>
        
        {/* Source Badge - compact on mobile */}
        <div 
          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold flex-shrink-0 whitespace-nowrap ${
            isTrustpilot 
              ? "bg-[#00b67a] text-white" 
              : "bg-blue-500 text-white"
          }`}
        >
          {isTrustpilot ? "★ Trustpilot" : "AH"}
        </div>
      </div>
    </div>
  )
}
