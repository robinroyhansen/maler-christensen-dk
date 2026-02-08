"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion, animate } from "framer-motion"

interface CountUpProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function CountUp({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return

    // If user prefers reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setCount(target)
      hasAnimated.current = true
      return
    }

    hasAnimated.current = true

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => {
        setCount(value)
      },
    })

    return () => controls.stop()
  }, [isInView, target, duration, prefersReducedMotion])

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.round(count).toString()

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
