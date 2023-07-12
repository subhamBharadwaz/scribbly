"use client"

import React, { ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeProvider } from "@/components/theme-provider"

interface ProviderProps {
  children: ReactNode
}

export function Providers({ children }: ProviderProps) {
  const pathname = usePathname()
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ThemeProvider
      forcedTheme={pathname === "/" ? "dark" : null}
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
