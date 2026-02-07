"use client"

import { useState } from "react"
import { Container } from "@/components/ui/Container"
import { ChevronDown } from "lucide-react"
import type { FAQ as FAQType } from "@/lib/content/faqs"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between text-left gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6b9834] focus-visible:ring-offset-2 rounded-lg"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#6b9834] transition-colors pr-4">
          {question}
        </h3>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#6b9834]/10 flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-[#6b9834] rotate-180" : "group-hover:bg-[#6b9834]/20"
          }`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors ${
              isOpen ? "text-white" : "text-[#6b9834]"
            }`}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-5 text-gray-600 leading-relaxed pr-12">{answer}</p>
      </div>
    </div>
  )
}

interface FAQProps {
  faqs: FAQType[]
  cityName: string
  title?: string
  subtitle?: string
  showContainer?: boolean
}

export function FAQ({
  faqs,
  cityName,
  title,
  subtitle,
  showContainer = true,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First one open by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate FAQ Schema.org JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const content = (
    <>
      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {title || `Ofte stillede spørgsmål om maler i ${cityName}`}
        </h2>
        {subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </>
  )

  if (!showContainer) {
    return content
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <Container>{content}</Container>
    </section>
  )
}
