import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { toAbsoluteUrl } from "@/lib/site-url"
import { USE_CASE_LISTINGS } from "@/lib/use-cases-data"
import { getMergedUseCase } from "@/sanity/lib/use-cases"

import UseCasesGrid from "../components/fintech-use-cases-grid"
import UseCasesCta from "../components/use-cases-cta"
import UseCasesFaq from "../components/use-cases-faq"
import UseCasesHero from "../components/use-cases-hero"
import WhyInvestSection from "../components/why-fintech-ai"

export const revalidate = 60

export function generateStaticParams() {
  return USE_CASE_LISTINGS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const detail = await getMergedUseCase(slug)

  if (!detail) {
    return { title: "Use Case Not Found | Beno Support" }
  }

  const title = `${detail.hero.title} | Beno Support`
  const description = detail.hero.subtitle
  const canonical = toAbsoluteUrl(`/use-cases/${slug}`)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: toAbsoluteUrl(detail.hero.image) }],
    },
  }
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const detail = await getMergedUseCase(slug)

  if (!detail) notFound()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <UseCasesHero hero={detail.hero} />
        <WhyInvestSection title={detail.whyTitle} cards={detail.whyCards} />
        <UseCasesGrid title={detail.gridTitle} cards={detail.cards} />
        <UseCasesFaq faqs={detail.faqs} />
        <UseCasesCta
          title={detail.cta.title}
          description={detail.cta.description}
          buttonLabel={detail.cta.buttonLabel}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
