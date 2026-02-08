"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  hoverY?: number
}

export function AnimatedCard({
  children,
  className = "",
  hoverY = -4,
}: AnimatedCardProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      whileHover={{
        y: hoverY,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
