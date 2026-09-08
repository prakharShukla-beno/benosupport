import { client } from "@/sanity/lib/client"
import { COMPANY_PAGE_QUERY, type CompanyPageData } from "@/sanity/lib/queries"
import CompanyHero    from "./components/CompanyHero"
import WhoWeAre       from "./components/WhoWeAre"
import OurStory       from "./components/OurStory"
import VisionMission  from "./components/VisionMission"
import OurJourney     from "./components/OurJourney"
import LeadershipTeam from "./components/LeadershipTeam"
import Certifications from "./components/Certifications"
import GlobalPresence from "./components/GlobalPresence"
import LifeAtBeno     from "./components/LifeAtBeno"
import CompanyCTA     from "./components/CompanyCTA"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const revalidate = 60

export default async function CompanyPage() {
  // Only these 6 sections are Sanity-driven (with fallback to original
  // hardcoded content): Hero, Who We Are, Vision & Mission, Certifications,
  // Life at Beno, Bottom CTA. "Our Story", "Our Journey", "Leadership Team",
  // and "Global Presence" use their original, fully hardcoded code — untouched.
  const companyData = await client
    .fetch<CompanyPageData | null>(COMPANY_PAGE_QUERY)
    .catch(() => null)

  return (
<div className="min-h-screen bg-background">
          <SiteHeader />
        <main>
      <CompanyHero heroData={companyData ?? undefined} />
      <WhoWeAre data={companyData ?? undefined} />
      <OurStory />
      <VisionMission data={companyData ?? undefined} />
      <OurJourney />
      <LeadershipTeam />
      <Certifications data={companyData ?? undefined} />
      <GlobalPresence />
      <LifeAtBeno data={companyData ?? undefined} />
      <CompanyCTA data={companyData ?? undefined} />
    </main>
          <SiteFooter />
        </div>

  )
}
