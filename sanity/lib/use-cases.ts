import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'
import { urlFor } from './image'
import {
  USE_CASE_DETAILS,
  getUseCaseDetailBySlug,
  type UseCaseDetail,
  type WhyInvestCard,
  type UseCaseCard,
} from '@/lib/use-cases-data'

export const USE_CASE_QUERY = `*[_type == "useCase" && slug.current == $slug][0]{
  "slug": slug.current,
  listingTag, heroTag, heroTitleLines, heroSubtitle, heroImage, heroImageAlt, heroBreadcrumbLabel,
  whyTitle,
  whyCards[]{title, icon, description},
  gridTitle,
  cards[]{title, icon, subtitle, description, benefitsTitle, benefits},
  faqs[]{q, a},
  ctaTitle, ctaDescription, ctaButtonLabel
}`

type SanityWhyCard = { title: string; icon: string; description: string }
type SanityUseCaseCard = {
  title: string
  icon: string
  subtitle?: string
  description: string
  benefitsTitle?: string
  benefits: string[]
}
type SanityFaq = { q: string; a: string }

export type SanityUseCaseDoc = {
  slug: string
  listingTag?: string
  heroTag?: string
  heroTitleLines?: string[]
  heroSubtitle?: string
  heroImage?: SanityImageSource
  heroImageAlt?: string
  heroBreadcrumbLabel?: string
  whyTitle?: string
  whyCards?: SanityWhyCard[]
  gridTitle?: string
  cards?: SanityUseCaseCard[]
  faqs?: SanityFaq[]
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonLabel?: string
}

/**
 * Fetches the Sanity "useCase" document for this slug (if any) and merges it,
 * field by field, on top of the original hardcoded use-cases-data.ts.
 * Any field left empty in Sanity falls back to the original hardcoded value
 * — so the page never breaks or shows blank content.
 * Returns undefined only if the slug doesn't exist in the hardcoded data at
 * all (invalid route) — matches getUseCaseDetailBySlug's original behavior.
 */
export async function getMergedUseCase(slug: string): Promise<UseCaseDetail | undefined> {
  const fallback = getUseCaseDetailBySlug(slug)
  if (!fallback) return undefined

  const doc = await client
    .fetch<SanityUseCaseDoc | null>(USE_CASE_QUERY, { slug })
    .catch(() => null)

  if (!doc) return fallback

  const whyCards: WhyInvestCard[] = doc.whyCards?.length
    ? doc.whyCards.map((c) => ({
        title: c.title,
        icon: c.icon as WhyInvestCard['icon'],
        description: c.description,
      }))
    : fallback.whyCards

  const cards: UseCaseCard[] = doc.cards?.length
    ? doc.cards.map((c) => ({
        title: c.title,
        icon: c.icon as UseCaseCard['icon'],
        subtitle: c.subtitle,
        description: c.description,
        benefitsTitle: c.benefitsTitle,
        benefits: c.benefits,
      }))
    : fallback.cards

  const merged: UseCaseDetail = {
    slug: fallback.slug,
    listingTag: doc.listingTag || fallback.listingTag,
    hero: {
      tag: doc.heroTag || fallback.hero.tag,
      title: doc.heroTitleLines?.length ? doc.heroTitleLines.join(' ') : fallback.hero.title,
      titleLines: doc.heroTitleLines?.length ? doc.heroTitleLines : fallback.hero.titleLines,
      subtitle: doc.heroSubtitle || fallback.hero.subtitle,
      image: doc.heroImage ? urlFor(doc.heroImage).width(1600).fit('max').url() : fallback.hero.image,
      imageAlt: doc.heroImageAlt || fallback.hero.imageAlt,
      breadcrumbLabel: doc.heroBreadcrumbLabel || fallback.hero.breadcrumbLabel,
    },
    whyTitle: doc.whyTitle || fallback.whyTitle,
    whyCards,
    gridTitle: doc.gridTitle || fallback.gridTitle,
    cards,
    faqs: doc.faqs?.length ? doc.faqs : fallback.faqs,
    cta: {
      title: doc.ctaTitle || fallback.cta.title,
      description: doc.ctaDescription || fallback.cta.description,
      buttonLabel: doc.ctaButtonLabel || fallback.cta.buttonLabel,
    },
  }

  return merged
}

export type UseCaseSummary = { slug: string; tag: string; title: string; excerpt: string; image: string }

/**
 * For the /use-cases listing page — returns one summary per known use case
 * slug, using Sanity-edited fields when available, otherwise the original
 * hardcoded ones. Never adds or removes use cases.
 */
export async function getUseCaseListingSummaries(): Promise<UseCaseSummary[]> {
  const slugs = USE_CASE_DETAILS.map((d) => d.slug)

  const docs = await client
    .fetch<{ slug: string; listingTag?: string; heroTitleLines?: string[]; heroSubtitle?: string; heroImage?: SanityImageSource }[]>(
      `*[_type == "useCase" && slug.current in $slugs]{ "slug": slug.current, listingTag, heroTitleLines, heroSubtitle, heroImage }`,
      { slugs }
    )
    .catch(() => [])

  const bySlug = new Map(docs.map((d) => [d.slug, d]))

  return USE_CASE_DETAILS.map((fallback) => {
    const doc = bySlug.get(fallback.slug)
    return {
      slug: fallback.slug,
      tag: doc?.listingTag || fallback.listingTag,
      title: doc?.heroTitleLines?.length ? doc.heroTitleLines.join(' ') : fallback.hero.title,
      excerpt: doc?.heroSubtitle || fallback.hero.subtitle,
      image: doc?.heroImage ? urlFor(doc.heroImage).width(800).fit('max').url() : fallback.hero.image,
    }
  })
}