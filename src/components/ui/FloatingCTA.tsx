"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Phone } from "lucide-react"
import { COMPANY } from "@/lib/constants"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={COMPANY.phoneLink}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="
            fixed bottom-4 right-4 z-50
            md:hidden
            flex items-center gap-2
            bg-green-600 text-white
            px-4 py-3
            rounded-full
            shadow-lg
            font-semibold
            text-sm
            safe-area-inset-bottom
          "
          style={{
            paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Phone className="w-5 h-5" />
          </motion.div>
          <span>Ring {COMPANY.phone}</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
