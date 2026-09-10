"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { SiteSettingsData } from "@/sanity/lib/queries"

const SiteSettingsContext = createContext<SiteSettingsData | undefined>(undefined)

export function SiteSettingsProvider({
  siteSettings,
  children,
}: {
  siteSettings?: SiteSettingsData
  children: ReactNode
}) {
  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

/**
 * Reads site settings (Footer + Contact info) from context.
 * Returns undefined if Sanity has no data yet — callers should fall back
 * to their own original hardcoded values, same pattern used everywhere else.
 */
export function useSiteSettings(): SiteSettingsData | undefined {
  return useContext(SiteSettingsContext)
}
