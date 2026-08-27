import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'

export type PostListItem = {
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  mainImage?: SanityImageSource
}

export type PostDetail = PostListItem & {
  body?: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
  author?: string
  authorBio?: string
  category?: string
}

export const ALL_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage
}`

export const LATEST_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...3] {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage
}`

export const SINGLE_POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  body,
  publishedAt,
  mainImage,
  seoTitle,
  seoDescription,
  excerpt,
  author,
  authorBio,
  category
}`

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{
  "slug": slug.current
}`

// ── Homepage Hero ────────────────────────────────────────────────────────
export type HomeHeroStat = {
  label: string
  value: number
  suffix?: string
}

export type HomeHeroData = {
  headlineLines?: string[]
  paragraph?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  videoUrl?: string
  stats?: HomeHeroStat[]
}

export const HOME_HERO_QUERY = `*[_type == "homeHero"][0]{
  headlineLines,
  paragraph,
  primaryCtaLabel,
  secondaryCtaLabel,
  "videoUrl": backgroundVideo.asset->url,
  stats[]{label, value, suffix}
}`

// ── Homepage FAQ ─────────────────────────────────────────────────────────
export type FaqItem = {
  question: string
  answer: string
}

export type FaqSectionData = {
  sectionLabel?: string
  heading?: string
  items?: FaqItem[]
}

export const FAQ_SECTION_QUERY = `*[_type == "faqSection"][0]{
  sectionLabel,
  heading,
  items[]{question, answer}
}`

// ── Homepage Bottom CTA ──────────────────────────────────────────────────
export type CtaSectionData = {
  heading?: string
  paragraph?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
}

export const CTA_SECTION_QUERY = `*[_type == "ctaSection"][0]{
  heading,
  paragraph,
  primaryCtaLabel,
  secondaryCtaLabel
}`

// ── Homepage Why Choose Us ───────────────────────────────────────────────
export type WhyChooseReason = {
  icon: string
  title: string
  description: string
}

export type WhyChooseSectionData = {
  sectionLabel?: string
  heading?: string
  subtitle?: string
  reasons?: WhyChooseReason[]
}

export const WHY_CHOOSE_SECTION_QUERY = `*[_type == "whyChooseSection"][0]{
  sectionLabel,
  heading,
  subtitle,
  reasons[]{icon, title, description}
}`

// ── Homepage Process Section ─────────────────────────────────────────────
export type ProcessPhase = {
  phaseWord: string
  label: string
  subtitle: string
  title: string
  description: string
  points: string[]
  image?: SanityImageSource
  imageAlt?: string
}

export type ProcessSectionData = {
  sectionLabel?: string
  heading?: string
  description?: string
  phases?: ProcessPhase[]
}

export const PROCESS_SECTION_QUERY = `*[_type == "processSection"][0]{
  sectionLabel,
  heading,
  description,
  phases[]{phaseWord, label, subtitle, title, description, points, image, imageAlt}
}`