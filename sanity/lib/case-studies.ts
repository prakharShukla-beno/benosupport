import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'
import { urlFor } from './image'
import {
  CASE_STUDY_DETAILS,
  getCaseStudyDetailBySlug,
  type CaseStudyDetail,
  type CaseStudyChallenge,
  type CaseStudySolution,
} from '@/lib/case-studies-data'

export const CASE_STUDY_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0]{
  "slug": slug.current,
  listingTag, listingTitle, listingExcerpt,
  layout,
  heroEyebrow, heroTitle, heroDescription, heroImage, heroImageAlt,
  heroLogo, heroLogoAlt, heroDuration, heroStackSummary,
  overviewClient, overviewIndustry, overviewDuration, overviewServices,
  visionTitle, visionParagraphs, visionImage, visionImageAlt, visionTheme, visionBadge,
  challengesTitle, challengesDescription, challengesVariant,
  challengesItems[]{title, description, icon},
  solutionsTitle, solutionsDescription, solutionsVariant,
  solutionsItems[]{title, description, highlights, outcome, image, imageAlt, mediaSide},
  metricsIntro, metricsTitle, metricsVariant,
  metricsItems[]{value, label, description},
  technologyTitle,
  technologyGroups[]{label, technologies},
  businessOutcomeParagraphs, businessOutcomeTheme, testimonial,
  ctaTitle, ctaDescription, ctaButtonLabel
}`

type SanityChallengeItem = { title: string; description: string; icon?: string }
type SanitySolutionItem = {
  title: string
  description: string
  highlights: string[]
  outcome?: string
  image?: SanityImageSource
  imageAlt?: string
  mediaSide?: 'left' | 'right'
}
type SanityMetricItem = { value: string; label: string; description?: string }
type SanityTechGroup = { label: string; technologies: string[] }

export type SanityCaseStudyDoc = {
  slug: string
  listingTag?: string
  listingTitle?: string
  listingExcerpt?: string
  layout?: 'overlay' | 'split' | 'bleed'
  heroEyebrow?: string
  heroTitle?: string
  heroDescription?: string
  heroImage?: SanityImageSource
  heroImageAlt?: string
  heroLogo?: SanityImageSource
  heroLogoAlt?: string
  heroDuration?: string
  heroStackSummary?: string
  overviewClient?: string
  overviewIndustry?: string
  overviewDuration?: string
  overviewServices?: string
  visionTitle?: string
  visionParagraphs?: string[]
  visionImage?: SanityImageSource
  visionImageAlt?: string
  visionTheme?: 'light' | 'dark'
  visionBadge?: { value?: string; label?: string; description?: string }
  challengesTitle?: string
  challengesDescription?: string
  challengesVariant?: 'columns' | 'cards'
  challengesItems?: SanityChallengeItem[]
  solutionsTitle?: string
  solutionsDescription?: string
  solutionsVariant?: 'grid' | 'alternating'
  solutionsItems?: SanitySolutionItem[]
  metricsIntro?: string
  metricsTitle?: string
  metricsVariant?: 'cards' | 'table'
  metricsItems?: SanityMetricItem[]
  technologyTitle?: string
  technologyGroups?: SanityTechGroup[]
  businessOutcomeParagraphs?: string[]
  businessOutcomeTheme?: 'light' | 'dark'
  testimonial?: string
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonLabel?: string
}

/**
 * Fetches the Sanity "caseStudy" document for this slug (if any) and merges
 * it, field by field, on top of the original hardcoded case-studies-data.ts.
 * Any field left empty in Sanity falls back to the original hardcoded value
 * — so the page never breaks or shows blank content.
 * Returns undefined only if the slug doesn't exist in the hardcoded data at
 * all (invalid route) — matches getCaseStudyDetailBySlug's original behavior.
 */
export async function getMergedCaseStudy(slug: string): Promise<CaseStudyDetail | undefined> {
  const fallback = getCaseStudyDetailBySlug(slug)
  if (!fallback) return undefined

  const doc = await client
    .fetch<SanityCaseStudyDoc | null>(CASE_STUDY_QUERY, { slug })
    .catch(() => null)

  if (!doc) return fallback

  const challenges: CaseStudyChallenge[] = doc.challengesItems?.length
    ? doc.challengesItems.map((c) => ({
        title: c.title,
        description: c.description,
        icon: c.icon as CaseStudyChallenge['icon'],
      }))
    : fallback.challenges.items

  const solutions: CaseStudySolution[] = doc.solutionsItems?.length
    ? doc.solutionsItems.map((s) => ({
        title: s.title,
        description: s.description,
        highlights: s.highlights,
        outcome: s.outcome,
        image: s.image ? urlFor(s.image).width(1200).fit('max').url() : undefined,
        imageAlt: s.imageAlt,
        mediaSide: s.mediaSide,
      }))
    : fallback.solutions.items

  const merged: CaseStudyDetail = {
    slug: fallback.slug,
    listingTag: doc.listingTag || fallback.listingTag,
    listingTitle: doc.listingTitle || fallback.listingTitle,
    listingExcerpt: doc.listingExcerpt || fallback.listingExcerpt,
    layout: doc.layout || fallback.layout,
    hero: {
      eyebrow: doc.heroEyebrow || fallback.hero.eyebrow,
      title: doc.heroTitle || fallback.hero.title,
      description: doc.heroDescription || fallback.hero.description,
      image: doc.heroImage ? urlFor(doc.heroImage).width(1600).fit('max').url() : fallback.hero.image,
      imageAlt: doc.heroImageAlt || fallback.hero.imageAlt,
      logo: doc.heroLogo ? urlFor(doc.heroLogo).width(400).fit('max').url() : fallback.hero.logo,
      logoAlt: doc.heroLogoAlt || fallback.hero.logoAlt,
      duration: doc.heroDuration || fallback.hero.duration,
      stackSummary: doc.heroStackSummary || fallback.hero.stackSummary,
      primaryCta: fallback.hero.primaryCta,
      secondaryCta: fallback.hero.secondaryCta,
    },
    overview: {
      client: doc.overviewClient || fallback.overview.client,
      industry: doc.overviewIndustry || fallback.overview.industry,
      duration: doc.overviewDuration || fallback.overview.duration,
      services: doc.overviewServices || fallback.overview.services,
    },
    vision: {
      title: doc.visionTitle || fallback.vision.title,
      paragraphs: doc.visionParagraphs?.length ? doc.visionParagraphs : fallback.vision.paragraphs,
      image: doc.visionImage ? urlFor(doc.visionImage).width(1200).fit('max').url() : fallback.vision.image,
      imageAlt: doc.visionImageAlt || fallback.vision.imageAlt,
      theme: doc.visionTheme || fallback.vision.theme,
      badge:
        doc.visionBadge?.value || doc.visionBadge?.label
          ? {
              value: doc.visionBadge.value || fallback.vision.badge?.value || '',
              label: doc.visionBadge.label || fallback.vision.badge?.label || '',
              description: doc.visionBadge.description || fallback.vision.badge?.description || '',
            }
          : fallback.vision.badge,
    },
    challenges: {
      title: doc.challengesTitle || fallback.challenges.title,
      description: doc.challengesDescription || fallback.challenges.description,
      variant: doc.challengesVariant || fallback.challenges.variant,
      items: challenges,
    },
    solutions: {
      title: doc.solutionsTitle || fallback.solutions.title,
      description: doc.solutionsDescription || fallback.solutions.description,
      variant: doc.solutionsVariant || fallback.solutions.variant,
      items: solutions,
    },
    metrics: doc.metricsItems?.length ? doc.metricsItems : fallback.metrics,
    metricsIntro: doc.metricsIntro || fallback.metricsIntro,
    metricsTitle: doc.metricsTitle || fallback.metricsTitle,
    metricsVariant: doc.metricsVariant || fallback.metricsVariant,
    technologyTitle: doc.technologyTitle || fallback.technologyTitle,
    technologyGroups: doc.technologyGroups?.length ? doc.technologyGroups : fallback.technologyGroups,
    businessOutcome: doc.businessOutcomeParagraphs?.length ? doc.businessOutcomeParagraphs : fallback.businessOutcome,
    businessOutcomeTheme: doc.businessOutcomeTheme || fallback.businessOutcomeTheme,
    testimonial: doc.testimonial || fallback.testimonial,
    cta: {
      title: doc.ctaTitle || fallback.cta.title,
      description: doc.ctaDescription || fallback.cta.description,
      buttonLabel: doc.ctaButtonLabel || fallback.cta.buttonLabel,
    },
  }

  return merged
}

export type CaseStudySummary = { slug: string; tag: string; title: string; excerpt: string; image: string; imageAlt: string }

/**
 * For the /case-studies listing page — returns one summary per known case
 * study slug, using Sanity-edited listing fields when available, otherwise
 * the original hardcoded ones. Never adds or removes case studies.
 */
export async function getCaseStudyListingSummaries(): Promise<CaseStudySummary[]> {
  const slugs = CASE_STUDY_DETAILS.map((d) => d.slug)

  const docs = await client
    .fetch<{ slug: string; listingTag?: string; listingTitle?: string; listingExcerpt?: string; heroImage?: SanityImageSource; heroImageAlt?: string }[]>(
      `*[_type == "caseStudy" && slug.current in $slugs]{ "slug": slug.current, listingTag, listingTitle, listingExcerpt, heroImage, heroImageAlt }`,
      { slugs }
    )
    .catch(() => [])

  const bySlug = new Map(docs.map((d) => [d.slug, d]))

  return CASE_STUDY_DETAILS.map((fallback) => {
    const doc = bySlug.get(fallback.slug)
    return {
      slug: fallback.slug,
      tag: doc?.listingTag || fallback.listingTag,
      title: doc?.listingTitle || fallback.listingTitle,
      excerpt: doc?.listingExcerpt || fallback.listingExcerpt,
      image: doc?.heroImage ? urlFor(doc.heroImage).width(800).fit('max').url() : fallback.hero.image,
      imageAlt: doc?.heroImageAlt || fallback.hero.imageAlt,
    }
  })
}