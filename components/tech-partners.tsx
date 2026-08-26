import { urlFor } from "@/sanity/lib/image"
import type { TechPartnersSectionData } from "@/sanity/lib/queries"

// ── Used only as a FALLBACK if Sanity has no "Homepage Tech Partners" content yet ──
const DEFAULT_LABEL = "Tech Alliances"
const DEFAULT_HEADING = "Our Tech Partners & Certifications"
const DEFAULT_DESCRIPTION =
  "Certified expertise across the platforms that power modern enterprises — from hyperscale cloud to business automation."

const DEFAULT_PARTNERS = [
  { name: "Microsoft Azure", logo: "/assets/partners/azure.svg" },
  { name: "Amazon Web Services", logo: "/assets/partners/aws.svg" },
  { name: "Google Cloud", logo: "/assets/partners/gc.svg" },
  { name: "Bitrix24", logo: "/assets/partners/bitrix.svg" },
]

type TechPartnersProps = {
  techPartnersData?: TechPartnersSectionData
}

export function TechPartners({ techPartnersData }: TechPartnersProps) {
  const label = techPartnersData?.sectionLabel || DEFAULT_LABEL
  const heading = techPartnersData?.heading || DEFAULT_HEADING
  const description = techPartnersData?.description || DEFAULT_DESCRIPTION

  // If Sanity has partner entries with a logo, use them (building the image URL
  // via the Sanity image builder). Otherwise fall back to the original hardcoded list.
  const partners =
    techPartnersData?.partners && techPartnersData.partners.length > 0
      ? techPartnersData.partners
          .filter((p) => p.logo)
          .map((p) => ({
            name: p.name,
            logo: urlFor(p.logo!).width(160).height(160).fit("max").url(),
          }))
      : DEFAULT_PARTNERS

  return (
    <section className="bg-primary py-16 text-primary-foreground lg:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="type-label font-semibold section-label-dark">
          {label}
        </span>
        <h2 className="mt-2 text-balance type-heading font-bold">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty leading-relaxed text-primary-foreground/75">
          {description}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center gap-4 rounded-xl border border-primary-foreground/15 bg-accent/20 p-8"
            >
              <div className="flex size-20 items-center justify-center bg-white p-2 rounded-lg">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-sm font-semibold">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
