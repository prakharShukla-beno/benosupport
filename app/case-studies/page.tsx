import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { withHome } from "@/lib/breadcrumbs"
import { CASE_STUDIES_INDEX } from "@/lib/case-studies-data"
import { getCaseStudyListingSummaries } from "@/sanity/lib/case-studies"

export const revalidate = 60

export default async function CaseStudiesPage() {
  const listings = await getCaseStudyListingSummaries()

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <SiteHeader />
      <main>
        <section className="bg-[#072448] pb-16 pt-28 text-white lg:pb-20 lg:pt-32">
          <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
            <PageBreadcrumb
              items={withHome([{ label: "Case Studies" }])}
              variant="dark"
              align="center"
            />
            <p className="type-label font-semibold tracking-[0.18em] text-white/70">
              {CASE_STUDIES_INDEX.label}
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl text-balance text-[2rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-[2.5rem] lg:text-[2.75rem]">
              {CASE_STUDIES_INDEX.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-7 text-white/75 sm:text-base">
              {CASE_STUDIES_INDEX.description}
            </p>
          </div>
        </section>

        <section className="pb-20 pt-12 lg:pt-14">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {listings.map((item) => (
                <article
                  key={item.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e2e8f0] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(7,36,72,0.08)]"
                >
                  <Link
                    href={`/case-studies/${item.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-[#e8eefc]"
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-3 text-sm font-semibold tracking-[0.04em] text-[#64748b]">
                      {item.tag}
                    </p>
                    <h2 className="text-xl font-bold leading-snug tracking-tight text-[#0a1628]">
                      <Link
                        href={`/case-studies/${item.slug}`}
                        className="transition-colors hover:text-[#0a3a73]"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-7 text-[#64748b]">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/case-studies/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#072448] transition-colors hover:text-[#0a3a73]"
                    >
                      Read Case Study
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
