import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { client } from "@/sanity/lib/client"
import { HOME_HERO_QUERY, type HomeHeroData, FAQ_SECTION_QUERY, type FaqSectionData, CTA_SECTION_QUERY, type CtaSectionData, INDUSTRIES_SECTION_QUERY, type IndustriesSectionData, SUCCESS_STORIES_SECTION_QUERY, type SuccessStoriesSectionData, INSIGHTS_SECTION_QUERY, type InsightsSectionData, TECH_PARTNERS_SECTION_QUERY, type TechPartnersSectionData, TECH_STACK_SECTION_QUERY, type TechStackSectionData, FEATURED_CLIENTS_SECTION_QUERY, type FeaturedClientsSectionData, WHY_CHOOSE_SECTION_QUERY, type WhyChooseSectionData, PROCESS_SECTION_QUERY, type ProcessSectionData } from "@/sanity/lib/queries"

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
  // If Sanity is unreachable or has no data yet, heroData stays undefined
  // and HeroSection falls back to its original hardcoded content.
  const heroData = await client
    .fetch<HomeHeroData | null>(HOME_HERO_QUERY)
    .catch(() => null)

  const faqData = await client
    .fetch<FaqSectionData | null>(FAQ_SECTION_QUERY)
    .catch(() => null)

  const ctaData = await client
    .fetch<CtaSectionData | null>(CTA_SECTION_QUERY)
    .catch(() => null)

  const industriesData = await client
    .fetch<IndustriesSectionData | null>(INDUSTRIES_SECTION_QUERY)
    .catch(() => null)

  const successStoriesData = await client
    .fetch<SuccessStoriesSectionData | null>(SUCCESS_STORIES_SECTION_QUERY)
    .catch(() => null)

  const insightsData = await client
    .fetch<InsightsSectionData | null>(INSIGHTS_SECTION_QUERY)
    .catch(() => null)

  const techPartnersData = await client
    .fetch<TechPartnersSectionData | null>(TECH_PARTNERS_SECTION_QUERY)
    .catch(() => null)

  const techStackData = await client
    .fetch<TechStackSectionData | null>(TECH_STACK_SECTION_QUERY)
    .catch(() => null)

  const featuredClientsData = await client
    .fetch<FeaturedClientsSectionData | null>(FEATURED_CLIENTS_SECTION_QUERY)
    .catch(() => null)

  const whyChooseData = await client
    .fetch<WhyChooseSectionData | null>(WHY_CHOOSE_SECTION_QUERY)
    .catch(() => null)

  const processData = await client
    .fetch<ProcessSectionData | null>(PROCESS_SECTION_QUERY)
    .catch(() => null)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection heroData={heroData ?? undefined} />
        <ServicePillars />
        <WhyChoose  visibleCount={6} whyChooseData={whyChooseData ?? undefined} />
        <ProcessSection processData={processData ?? undefined} />
        <TechStack techStackData={techStackData ?? undefined} />
        <TechPartners techPartnersData={techPartnersData ?? undefined} />
        <IndustriesSection industriesData={industriesData ?? undefined} />
        <FeaturedClients featuredClientsData={featuredClientsData ?? undefined} />
        <SuccessStories successStoriesData={successStoriesData ?? undefined} />
        <InsightsSection insightsData={insightsData ?? undefined} />
        <FaqSection faqData={faqData ?? undefined} />
        <CtaSection ctaData={ctaData ?? undefined} />
      </main>
      <SiteFooter />
    </div>
  )
}
