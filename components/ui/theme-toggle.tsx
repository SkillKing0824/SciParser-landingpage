"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder of the exact same size to prevent layout shift
    return <div className={cn("w-16 h-8 rounded-full", className)} />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "relative flex items-center w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-500",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200 shadow-inner",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setTheme(isDark ? "light" : "dark")
        }
      }}
    >
      {/* Background static icons (inactive state) */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <Moon className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
        <Sun className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
      </div>

      {/* The sliding puck */}
      <div
        className={cn(
          "absolute flex justify-center items-center w-6 h-6 rounded-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) shadow-sm",
          isDark 
            ? "left-1 bg-zinc-800" 
            : "left-9 bg-gray-100"
        )}
      >
        {/* Active Moon (fades in when dark) */}
        <Moon 
          className={cn(
            "absolute w-4 h-4 text-white transition-opacity duration-500",
            isDark ? "opacity-100" : "opacity-0"
          )} 
          strokeWidth={1.5} 
        />
        
        {/* Active Sun (fades in when light) */}
        <Sun 
          className={cn(
            "absolute w-4 h-4 text-gray-700 transition-opacity duration-500",
            isDark ? "opacity-0" : "opacity-100"
          )} 
          strokeWidth={1.5} 
        />
      </div>
    </div>
  )
}
