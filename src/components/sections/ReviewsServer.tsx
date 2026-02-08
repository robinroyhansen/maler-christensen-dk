import { Reviews } from "./Reviews"
import { fetchReviewsForPage, getReviewsForPage } from "@/lib/data/reviews"

interface ReviewsServerProps {
  title?: string
  subtitle?: string
  pageSlug?: string
}

export async function ReviewsServer({
  title = "Hvad vores kunder siger",
  subtitle,
  pageSlug = "homepage"
}: ReviewsServerProps) {
  // Fetch reviews from Supabase, fallback to hardcoded data
  let reviews
  try {
    reviews = await fetchReviewsForPage(pageSlug, 6)
  } catch (error) {
    console.error('Failed to fetch reviews from Supabase, using fallback:', error)
    reviews = getReviewsForPage(pageSlug, 6)
  }

  return (
    <Reviews
      title={title}
      subtitle={subtitle}
      pageSlug={pageSlug}
      preloadedReviews={reviews}
    />
  )
}