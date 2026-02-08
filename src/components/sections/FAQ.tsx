"use client"

import { useState } from "react"
import { Container } from "@/components/ui/Container"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import type { FAQ as FAQType } from "@/lib/content/faqs"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  const prefersReducedMotion = useReducedMotion()

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
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#6b9834]/10 flex items-center justify-center transition-colors duration-300 ${
            isOpen ? "bg-[#6b9834]" : "group-hover:bg-[#6b9834]/20"
          }`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors ${
              isOpen ? "text-white" : "text-[#6b9834]"
            }`}
          />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed pr-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
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
      <AnimateIn className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {title || `Ofte stillede spørgsmål om maler i ${cityName}`}
        </h2>
        {subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </AnimateIn>

      {/* FAQ Accordion */}
      <AnimateIn delay={0.1} variant="fade-up">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </AnimateIn>
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
