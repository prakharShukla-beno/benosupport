import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { client } from "@/sanity/lib/client"
import {
  HOME_HERO_QUERY, type HomeHeroData,
  FAQ_SECTION_QUERY, type FaqSectionData,
  CTA_SECTION_QUERY, type CtaSectionData,
  WHY_CHOOSE_SECTION_QUERY, type WhyChooseSectionData,
  PROCESS_SECTION_QUERY, type ProcessSectionData,
} from "@/sanity/lib/queries"

import { WhyChoose } from "@/components/why-choose"
import { ProcessSection } from "@/components/process-section"
import { TechStack } from "@/components/tech-stack"
import { TechPartners } from "@/components/tech-partners"
import { IndustriesSection } from "@/components/industries-section"
import { FeaturedClients } from "@/components/featured-clients"
import { SuccessStories } from "@/components/success-stories"
import { InsightsSection } from "@/components/insights-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import ServicePillars from "@/components/service-pillars"

export const revalidate = 60

export default async function Page() {
  // Only these 5 sections are Sanity-driven (with fallback to original hardcoded
  // content if Sanity is unreachable or has no data yet): Hero, Why Choose,
  // Process, FAQ, Bottom CTA. Every other section below uses its original,
  // fully hardcoded code — untouched.
  const heroData = await client
    .fetch<HomeHeroData | null>(HOME_HERO_QUERY)
    .catch(() => null)

  const whyChooseData = await client
    .fetch<WhyChooseSectionData | null>(WHY_CHOOSE_SECTION_QUERY)
    .catch(() => null)

  const processData = await client
    .fetch<ProcessSectionData | null>(PROCESS_SECTION_QUERY)
    .catch(() => null)

  const faqData = await client
    .fetch<FaqSectionData | null>(FAQ_SECTION_QUERY)
    .catch(() => null)

  const ctaData = await client
    .fetch<CtaSectionData | null>(CTA_SECTION_QUERY)
    .catch(() => null)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection heroData={heroData ?? undefined} />
        <ServicePillars />
        <WhyChoose visibleCount={6} whyChooseData={whyChooseData ?? undefined} />
        <ProcessSection processData={processData ?? undefined} />
        <TechStack />
        <TechPartners />
        <IndustriesSection />
        <FeaturedClients />
        <SuccessStories />
        <InsightsSection />
        <FaqSection faqData={faqData ?? undefined} />
        <CtaSection ctaData={ctaData ?? undefined} />
      </main>
      <SiteFooter />
    </div>
  )
}
