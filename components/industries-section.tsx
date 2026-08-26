import type { LucideIcon } from "lucide-react"
import {
  Building2,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  LineChart,
  Plane,
  Radio,
  Shield,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react"
import { INDUSTRY_GRID_ITEMS } from "@/lib/industries-grid-data"
import type { IndustriesSectionData } from "@/sanity/lib/queries"

// ── Used only as a FALLBACK if Sanity has no "Homepage Industries" content yet ──
const DEFAULT_LABEL = "Industries We Serve"
const DEFAULT_HEADING = "Industries We Empower Through Technology"
const DEFAULT_DESCRIPTION =
  "We help startups, SMBs, and enterprises modernize operations, improve efficiency, strengthen security, and accelerate digital transformation across diverse industries."

// Maps the icon name string (chosen in Sanity Studio) back to the actual icon component.
// Keep this in sync with ICON_OPTIONS in sanity/schemaTypes/industriesSectionType.ts
const ICON_MAP: Record<string, LucideIcon> = {
  Landmark,
  ShieldCheck,
  HeartPulse,
  GraduationCap,
  Building2,
  Plane,
  Hotel,
  ShoppingCart,
  Radio,
  LineChart,
  Shield,
  Gamepad2,
}

type IndustriesSectionProps = {
  industriesData?: IndustriesSectionData
}

export function IndustriesSection({ industriesData }: IndustriesSectionProps) {
  const label = industriesData?.sectionLabel || DEFAULT_LABEL
  const heading = industriesData?.heading || DEFAULT_HEADING
  const description = industriesData?.description || DEFAULT_DESCRIPTION

  // If Sanity has items, resolve each icon name to its component (fallback to Building2
  // if an unrecognized icon name ever shows up). Otherwise use the original hardcoded list.
  const items =
    industriesData?.items && industriesData.items.length > 0
      ? industriesData.items.map((item) => ({
          label: item.label,
          icon: ICON_MAP[item.icon] ?? Building2,
        }))
      : INDUSTRY_GRID_ITEMS

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="type-label font-semibold section-label-light">
            {label}
          </span>
          <h2 className="mt-2 text-balance type-heading font-bold text-primary">
            {heading}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-secondary">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((industry) => (
            <div
              key={industry.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-accent"
            >
              <industry.icon className="size-7 text-accent" />
              <span className="text-sm font-medium text-primary">
                {industry.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
