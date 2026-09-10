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

// ── Industries Page ───────────────────────────────────────────────────────
// Note: "Industries We Serve" and "Technology We Use" sections are
// intentionally NOT included here — they stay frozen/hardcoded, by design.
export type IndustriesSimpleCard = {
  iconName: string
  title: string
  description: string
}

export type IndustriesFaqItem = {
  question: string
  answer: string
}

export type IndustriesPageData = {
  heroTitle?: string
  heroSubtitle?: string
  heroStats?: string[]
  heroCta1?: string
  heroCta2?: string

  challengesSectionLabel?: string
  challengesTitle?: string
  challengesSubtitle?: string
  challengesCards?: IndustriesSimpleCard[]

  solutionsSectionLabel?: string
  solutionsTitle?: string
  solutionsSubtitle?: string
  solutionsCards?: IndustriesSimpleCard[]

  outcomesSectionLabel?: string
  outcomesTitle?: string
  outcomesParagraph?: string
  outcomesSubheading?: string
  outcomesList?: string[]
  outcomesImageUrl?: string

  whyChooseSectionLabel?: string
  whyChooseTitle?: string
  whyChooseCards?: IndustriesSimpleCard[]

  faq?: IndustriesFaqItem[]
  faqSectionLabel?: string
  faqTitle?: string
  faqSubtitle?: string

  ctaTitle?: string
  ctaParagraph?: string
  ctaPrimaryLabel?: string
  ctaSecondaryLabel?: string
}

export const INDUSTRIES_PAGE_QUERY = `*[_type == "industriesPage"][0]{
  heroTitle,
  heroSubtitle,
  heroStats,
  heroCta1,
  heroCta2,

  challengesSectionLabel,
  challengesTitle,
  challengesSubtitle,
  challengesCards[]{iconName, title, description},

  solutionsSectionLabel,
  solutionsTitle,
  solutionsSubtitle,
  solutionsCards[]{iconName, title, description},

  outcomesSectionLabel,
  outcomesTitle,
  outcomesParagraph,
  outcomesSubheading,
  outcomesList,
  "outcomesImageUrl": outcomesImage.asset->url,

  whyChooseSectionLabel,
  whyChooseTitle,
  whyChooseCards[]{iconName, title, description},

  faq[]{question, answer},
  faqSectionLabel,
  faqTitle,
  faqSubtitle,

  ctaTitle,
  ctaParagraph,
  ctaPrimaryLabel,
  ctaSecondaryLabel
}`

// ── Company Page ─────────────────────────────────────────────────────────
// Note: "Our Story", "Our Journey", "Leadership Team", and "Global Presence"
// are intentionally NOT included here — they stay frozen/hardcoded, by design.
export type CompanyHeroStat = {
  displayValue: string
  suffix?: string
  isCounter?: boolean
  label: string
}

export type CompanyVisionMissionItem = {
  title: string
  text: string
}

export type CompanyCertCard = {
  label: string
  iconKey: string
}

export type CompanyLifeSlide = {
  imageUrl?: string
  alt?: string
}

export type CompanyPageData = {
  heroTitle?: string
  heroParagraph?: string
  heroCta1Label?: string
  heroCta2Label?: string
  heroStats?: CompanyHeroStat[]

  whoWeAreSectionLabel?: string
  whoWeAreTitle?: string
  whoWeAreParagraphs?: string[]
  whoWeAreImageUrl?: string

  visionMissionSectionLabel?: string
  visionMissionItems?: CompanyVisionMissionItem[]

  certificationsSectionLabel?: string
  certificationsTitle?: string
  certificationsCards?: CompanyCertCard[]

  lifeSectionLabel?: string
  lifeTitle?: string
  lifeParagraph?: string
  lifePoints?: string[]
  lifeSlides?: CompanyLifeSlide[]

  ctaTitle?: string
  ctaParagraph?: string
  ctaPrimaryLabel?: string
  ctaSecondaryLabel?: string
}

export const COMPANY_PAGE_QUERY = `*[_type == "companyPage"][0]{
  heroTitle,
  heroParagraph,
  heroCta1Label,
  heroCta2Label,
  heroStats[]{displayValue, suffix, isCounter, label},

  whoWeAreSectionLabel,
  whoWeAreTitle,
  whoWeAreParagraphs,
  "whoWeAreImageUrl": whoWeAreImage.asset->url,

  visionMissionSectionLabel,
  visionMissionItems[]{title, text},

  certificationsSectionLabel,
  certificationsTitle,
  certificationsCards[]{label, iconKey},

  lifeSectionLabel,
  lifeTitle,
  lifeParagraph,
  lifePoints,
  lifeSlides[]{"imageUrl": image.asset->url, alt},

  ctaTitle,
  ctaParagraph,
  ctaPrimaryLabel,
  ctaSecondaryLabel
}`


// ── Site Settings (Footer + Contact) ────────────────────────────────────
export type OfficeLocation = {
  label: string
  address: string
}

export type HeaderNavLink = {
  label: string
  href: string
}

export type SiteSettingsData = {
  headerHomeLabel?: string
  headerServicesLabel?: string
  headerNavLinks?: HeaderNavLink[]
  headerResourcesLabel?: string
  headerCtaLabel?: string
  footerTagline?: string
  copyrightText?: string
  contactPhone1?: string
  contactPhone2?: string
  contactEmail?: string
  whatsappNumber?: string
  officeLocations?: OfficeLocation[]
}

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  headerHomeLabel,
  headerServicesLabel,
  headerNavLinks[]{label, href},
  headerResourcesLabel,
  headerCtaLabel,
  footerTagline,
  copyrightText,
  contactPhone1,
  contactPhone2,
  contactEmail,
  whatsappNumber,
  officeLocations[]{label, address}
}`