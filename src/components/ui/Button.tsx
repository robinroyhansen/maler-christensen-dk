"use client"

import { cn } from "@/lib/utils"
import { forwardRef, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
          {
            "bg-[#5a8229] text-white hover:bg-[#4a6f21] focus:ring-[#5a8229]": variant === "primary",
            "bg-[#6b9834] text-white hover:bg-[#5a8229] focus:ring-[#6b9834]": variant === "secondary",
            "border-2 border-[#6b9834] text-[#6b9834] hover:bg-[#6b9834] hover:text-white focus:ring-[#6b9834]": variant === "outline",
            "text-[#6b9834] hover:bg-[#6b9834]/10 focus:ring-[#6b9834]": variant === "ghost",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-base": size === "md",
            "px-8 py-3.5 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
