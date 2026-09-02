import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { servicesData } from "@/lib/services-data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ServicePageContent } from "@/components/service-page-content"
import { toAbsoluteUrl } from "@/lib/site-url"
import { getMergedServiceData } from "@/sanity/lib/services"

// Auto-refresh from Sanity every 60 seconds — so Studio edits go live
// without needing a new deploy.
export const revalidate = 60

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getMergedServiceData(slug)
  if (!service) return { title: "Service Not Found | Beno Support" }

  const title = service.meta.title.trim()
  const description = service.meta.description.trim()
  const canonical = toAbsoluteUrl(
    service.meta.canonicalUrl ?? `/services/${slug}`
  )

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getMergedServiceData(slug)
  if (!service) notFound()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <ServicePageContent service={service} slug={slug} />
      </main>
      <SiteFooter />
    </div>
  )
}
