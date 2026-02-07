"use client"

import { Container } from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"
import { Star, Quote } from "lucide-react"

// Real reviews from Trustpilot
const INITIAL_REVIEWS = [
  {
    id: "1",
    author_name: "Anders Olsen",
    review_text: "Super samarbejde, alle aftaler holdes. Professionel rådgivning og høj kvalitet i arbejdet. Kan varmt anbefales!",
    rating: 5,
  },
  {
    id: "2",
    author_name: "Familien Lumholtz",
    review_text: "Fantastisk service, kommunikation og kvalitet. Vi er yderst tilfredse med resultatet og kan kun give vores bedste anbefalinger.",
    rating: 5,
  },
  {
    id: "3",
    author_name: "Birthe og Finn Andersen",
    review_text: "Imponerende arbejde indenfor fastlagte tidsrammer. Professionel tilgang og flot resultat. Vi er meget tilfredse.",
    rating: 5,
  },
  {
    id: "4",
    author_name: "Kathrine Holm",
    review_text: "Yderst tilfreds med malerarbejdet. Flot udførsel og god kommunikation hele vejen igennem projektet.",
    rating: 5,
  },
  {
    id: "5",
    author_name: "Tanja Almbjerg",
    review_text: "Altid sød og venlig dialog med ejer. Godt håndværk og overholdelse af aftaler. Kan kun anbefales!",
    rating: 5,
  },
  {
    id: "6",
    author_name: "Linda Horsted Raimond",
    review_text: "Flot maling i nyt hus! Professionelt arbejde fra start til slut. Vi er meget glade for resultatet.",
    rating: 5,
  },
]

interface ReviewsProps {
  title?: string
  subtitle?: string
}

export function Reviews({ 
  title = "Hvad vores kunder siger",
  subtitle = `${COMPANY.trustpilotRating}/5 stjerner baseret på ${COMPANY.trustpilotReviews}+ anmeldelser på Trustpilot`
}: ReviewsProps) {
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
          {INITIAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#6b9834]/20" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#00b67a] fill-[#00b67a]" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{review.review_text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#6b9834] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {review.author_name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.author_name}</p>
                  <p className="text-sm text-gray-500">Trustpilot anmeldelse</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.trustpilot.com/review/maler-christensen.dk"
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
