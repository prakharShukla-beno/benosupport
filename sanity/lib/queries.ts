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

// ── Homepage Industries ──────────────────────────────────────────────────
export type IndustryItem = {
  label: string
  icon: string
}

export type IndustriesSectionData = {
  sectionLabel?: string
  heading?: string
  description?: string
  items?: IndustryItem[]
}

export const INDUSTRIES_SECTION_QUERY = `*[_type == "industriesSection"][0]{
  sectionLabel,
  heading,
  description,
  items[]{label, icon}
}`

// ── Homepage Success Stories (heading text only) ─────────────────────────
export type SuccessStoriesSectionData = {
  sectionLabel?: string
  heading?: string
  description?: string
}

export const SUCCESS_STORIES_SECTION_QUERY = `*[_type == "successStoriesSection"][0]{
  sectionLabel,
  heading,
  description
}`

// ── Homepage Insights (heading text only) ────────────────────────────────
export type InsightsSectionData = {
  sectionLabel?: string
  heading?: string
  description?: string
}

export const INSIGHTS_SECTION_QUERY = `*[_type == "insightsSection"][0]{
  sectionLabel,
  heading,
  description
}`

// ── Homepage Tech Partners ───────────────────────────────────────────────
export type TechPartnerItem = {
  name: string
  logo?: SanityImageSource
}

export type TechPartnersSectionData = {
  sectionLabel?: string
  heading?: string
  description?: string
  partners?: TechPartnerItem[]
}

export const TECH_PARTNERS_SECTION_QUERY = `*[_type == "techPartnersSection"][0]{
  sectionLabel,
  heading,
  description,
  partners[]{name, logo}
}`

// ── Homepage Tech Stack ──────────────────────────────────────────────────
export type TechStackItem = {
  name: string
  iconUrl?: string
  iconImage?: SanityImageSource
  invertIcon?: boolean
}

export type TechStackCategory = {
  tabName: string
  items: TechStackItem[]
}

export type TechStackSectionData = {
  sectionLabel?: string
  heading?: string
  description?: string
  categories?: TechStackCategory[]
}

export const TECH_STACK_SECTION_QUERY = `*[_type == "techStackSection"][0]{
  sectionLabel,
  heading,
  description,
  categories[]{
    tabName,
    items[]{name, iconUrl, iconImage, invertIcon}
  }
}`

// ── Homepage Featured Clients ────────────────────────────────────────────
export type FeaturedClientItem = {
  name: string
  logo?: SanityImageSource
}

export type FeaturedClientRow = {
  rowLabel: string
  clients: FeaturedClientItem[]
}

export type FeaturedClientsSectionData = {
  sectionLabel?: string
  heading?: string
  description?: string
  rows?: FeaturedClientRow[]
}

export const FEATURED_CLIENTS_SECTION_QUERY = `*[_type == "featuredClientsSection"][0]{
  sectionLabel,
  heading,
  description,
  rows[]{
    rowLabel,
    clients[]{name, logo}
  }
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