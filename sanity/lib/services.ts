import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'
import { urlFor } from './image'
import { servicesData, type ServiceData, type CapabilityCard } from '@/lib/services-data'

// Note: SEO (meta title/description) is intentionally NOT fetched from Sanity —
// it always stays frozen as the original hardcoded value from lib/services-data.ts.
// Note: Use Cases is also intentionally NOT fetched — that section is currently
// disabled on the live site, so it stays frozen as the original hardcoded value too.
export const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  "slug": slug.current,
  heroImage,
  heroImageAlt,
  heroTagline,
  heroTagline2,
  heroTagline3,
  heroDescription,
  heroCtaButtons,
  introSectionLabel,
  introTitle,
  introParagraphs,
  capabilitiesSectionLabel,
  capabilitiesTitle,
  capabilitiesSubtitle,
  capabilitiesCards[]{iconName, title, description, highlighted, features},
  scaleSectionLabel,
  scaleTitle,
  scaleSubtitle,
  scaleCards[]{iconName, title, description, highlighted, features},
  ctaTitle,
  ctaContent,
  ctaButtons,
  faq[]{question, answer}
}`

type SanityCapabilityCard = {
  iconName: string
  title: string
  description: string
  highlighted?: boolean
  features?: string[]
}

export type SanityServiceDoc = {
  slug: string
  heroImage?: SanityImageSource
  heroImageAlt?: string
  heroTagline?: string
  heroTagline2?: string
  heroTagline3?: string
  heroDescription?: string
  heroCtaButtons?: string[]
  introSectionLabel?: string
  introTitle?: string
  introParagraphs?: string[]
  capabilitiesSectionLabel?: string
  capabilitiesTitle?: string
  capabilitiesSubtitle?: string
  capabilitiesCards?: SanityCapabilityCard[]
  scaleSectionLabel?: string
  scaleTitle?: string
  scaleSubtitle?: string
  scaleCards?: SanityCapabilityCard[]
  ctaTitle?: string
  ctaContent?: string
  ctaButtons?: string[]
  faq?: { question: string; answer: string }[]
}

function mergeCards(sanityCards: SanityCapabilityCard[] | undefined, fallback: CapabilityCard[]): CapabilityCard[] {
  if (!sanityCards || sanityCards.length === 0) return fallback
  return sanityCards.map((c) => ({
    iconName: c.iconName,
    title: c.title,
    description: c.description,
    highlighted: c.highlighted,
    features: c.features,
  }))
}

export type ServiceSummary = { slug: string; title: string; description: string }

/**
 * For the /services listing page — returns one summary per known service slug.
 * SEO title/description is frozen: always the original hardcoded value, never
 * read from Sanity (per design — SEO is intentionally not editable here).
 */
export async function getServiceListingSummaries(): Promise<ServiceSummary[]> {
  return Object.keys(servicesData).map((slug) => {
    const fallback = servicesData[slug]
    return {
      slug,
      title: fallback.meta.title,
      description: fallback.meta.description,
    }
  })
}

/**
 * Fetches the Sanity "service" document for this slug (if any) and merges it,
 * field by field, on top of the original hardcoded servicesData[slug].
 * Any field left empty in Sanity falls back to the original hardcoded value —
 * so the page never breaks or shows blank content.
 * SEO (meta) and Use Cases are frozen and always come from the original
 * hardcoded data — they are never read from Sanity, by design.
 * Returns null only if the slug doesn't exist in servicesData at all (invalid route).
 */
export async function getMergedServiceData(slug: string): Promise<ServiceData | null> {
  const fallback = servicesData[slug]
  if (!fallback) return null

  const sanityDoc = await client
    .fetch<SanityServiceDoc | null>(SERVICE_QUERY, { slug })
    .catch(() => null)

  if (!sanityDoc) return fallback

  const merged: ServiceData = {
    // Frozen — always the original hardcoded SEO, never overridden by Sanity.
    meta: fallback.meta,
    hero: {
      image: sanityDoc.heroImage ? urlFor(sanityDoc.heroImage).width(1200).fit('max').url() : fallback.hero.image,
      imageAlt: sanityDoc.heroImageAlt || fallback.hero.imageAlt,
      tagline: sanityDoc.heroTagline || fallback.hero.tagline,
      tagline2: sanityDoc.heroTagline2 ?? fallback.hero.tagline2,
      tagline3: sanityDoc.heroTagline3 ?? fallback.hero.tagline3,
      description: sanityDoc.heroDescription || fallback.hero.description,
      ctaButtons: sanityDoc.heroCtaButtons?.length ? sanityDoc.heroCtaButtons : fallback.hero.ctaButtons,
    },
    intro: {
      sectionLabel: sanityDoc.introSectionLabel || fallback.intro.sectionLabel,
      title: sanityDoc.introTitle || fallback.intro.title,
      paragraphs: sanityDoc.introParagraphs?.length ? sanityDoc.introParagraphs : fallback.intro.paragraphs,
    },
    capabilities: {
      sectionLabel: sanityDoc.capabilitiesSectionLabel || fallback.capabilities.sectionLabel,
      title: sanityDoc.capabilitiesTitle || fallback.capabilities.title,
      subtitle: sanityDoc.capabilitiesSubtitle || fallback.capabilities.subtitle,
      cards: mergeCards(sanityDoc.capabilitiesCards, fallback.capabilities.cards),
    },
    scale: {
      sectionLabel: sanityDoc.scaleSectionLabel || fallback.scale.sectionLabel,
      title: sanityDoc.scaleTitle || fallback.scale.title,
      subtitle: sanityDoc.scaleSubtitle || fallback.scale.subtitle,
      cards: mergeCards(sanityDoc.scaleCards, fallback.scale.cards),
    },
    // Frozen — Use Cases section is disabled on the live site, so this always
    // stays the original hardcoded data, never overridden by Sanity.
    useCases: fallback.useCases,
    cta: (sanityDoc.ctaTitle || sanityDoc.ctaContent || sanityDoc.ctaButtons?.length)
      ? {
          title: sanityDoc.ctaTitle || fallback.cta?.title || '',
          content: sanityDoc.ctaContent || fallback.cta?.content || '',
          buttons: sanityDoc.ctaButtons?.length ? sanityDoc.ctaButtons : fallback.cta?.buttons || [],
        }
      : fallback.cta,
    faq: sanityDoc.faq?.length ? sanityDoc.faq : fallback.faq,
  }

  return merged
}