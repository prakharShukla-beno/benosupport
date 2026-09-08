import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PageCTAPrimaryButton, PageCTASection } from "@/components/page-cta"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"
import { CASE_STUDY_DETAILS } from "@/lib/case-studies-data"
import { getMergedCaseStudy } from "@/sanity/lib/case-studies"
import { toAbsoluteUrl } from "@/lib/site-url"

import { CaseStudyChallenges } from "../components/case-study-challenges"
import { CaseStudyHero } from "../components/case-study-hero"
import { CaseStudyOutcome } from "../components/case-study-outcome"
import { CaseStudySolutions } from "../components/case-study-solutions"
import { CaseStudyVision } from "../components/case-study-vision"
import { ImpactResults } from "../components/impact-results"
import { TechnologyStack } from "../components/technology-stack"

export const revalidate = 60

export function generateStaticParams() {
  return CASE_STUDY_DETAILS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const detail = await getMergedCaseStudy(slug)

  if (!detail) return { title: "Case Study Not Found | Beno Support" }

  const title = `${detail.listingTitle} | Beno Support`
  const canonical = toAbsoluteUrl(`/case-studies/${slug}`)

  return {
    title,
    description: detail.listingExcerpt,
    alternates: { canonical },
    openGraph: {
      title,
      description: detail.listingExcerpt,
      url: canonical,
      type: "article",
      images: [{ url: toAbsoluteUrl(detail.hero.image) }],
    },
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const detail = await getMergedCaseStudy(slug)

  if (!detail) notFound()

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <SiteHeader />
      <main>
        <CaseStudyHero detail={detail} />

        <section className="border-b border-[#e2e8f0] bg-white px-6 py-12 lg:px-12">
          <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-8 md:grid-cols-2">
            {[
              ["Client", detail.overview.client],
              ["Industry", detail.overview.industry],
              ["Duration", detail.overview.duration],
              ["Services", detail.overview.services],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-3 border-b border-[#cbd5e1] pb-6 sm:grid-cols-[7rem_1fr]"
              >
                <h2 className="text-xl font-bold text-[#072448]">{label}</h2>
                <p className="leading-7 text-[#334155]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <CaseStudyVision vision={detail.vision} />
        <CaseStudyChallenges challenges={detail.challenges} />
        <CaseStudySolutions solutions={detail.solutions} />
        <ImpactResults
          metrics={detail.metrics}
          intro={detail.metricsIntro}
          title={detail.metricsTitle}
          variant={detail.metricsVariant}
        />
        <TechnologyStack
          groups={detail.technologyGroups}
          title={detail.technologyTitle}
        />
        <CaseStudyOutcome
          paragraphs={detail.businessOutcome}
          testimonial={detail.testimonial}
          theme={detail.businessOutcomeTheme}
        />

        <PageCTASection>
          <h2 className="text-balance text-3xl font-extrabold text-white sm:text-4xl">
            {detail.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-sm leading-7 text-white/75">
            {detail.cta.description}
          </p>
          <div className="mt-7">
            <PageCTAPrimaryButton href={TALK_TO_EXPERT_HREF} target="_blank" rel="noopener noreferrer">
              Talk To Our Experts
            </PageCTAPrimaryButton>
          </div>
        </PageCTASection>
      </main>
      <SiteFooter />
    </div>
  )
}
