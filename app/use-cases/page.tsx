import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { withHome } from "@/lib/breadcrumbs"
import { USE_CASES_INDEX } from "@/lib/use-cases-data"
import { getUseCaseListingSummaries } from "@/sanity/lib/use-cases"

export const revalidate = 60

export default async function UseCasesPage() {
  const listings = await getUseCaseListingSummaries()

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <SiteHeader />
      <main>
        <section className="bg-[#072448] pt-28 pb-16 text-white lg:pt-32 lg:pb-20">
          <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
            <PageBreadcrumb
              items={withHome([{ label: "Use Cases" }])}
              variant="dark"
              align="center"
            />
            <p className="type-label font-semibold tracking-[0.18em] text-white/70">
              {USE_CASES_INDEX.label}
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl text-balance text-[2rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-[2.5rem] lg:text-[2.75rem]">
              {USE_CASES_INDEX.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-7 text-white/75 sm:text-base">
              {USE_CASES_INDEX.description}
            </p>
          </div>
        </section>

        <section className="pb-20 pt-12 lg:pt-14">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            {listings.length === 0 ? (
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white px-8 py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <h2 className="text-xl font-bold text-[#0a1628]">No use cases yet</h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-[#64748b]">
                  No use cases published yet. Check back soon for industry-specific
                  examples of AI and modern engineering in action.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {listings.map((item) => (
                  <article
                    key={item.slug}
                    className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e2e8f0] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(7,36,72,0.08)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#e8eefc]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="mb-3 text-sm font-semibold tracking-[0.04em] text-[#64748b]">
                        {item.tag}
                      </p>

                      <h2 className="text-xl font-bold leading-snug tracking-tight text-[#0a1628]">
                        <Link
                          href={`/use-cases/${item.slug}`}
                          className="transition-colors hover:text-[#072448]"
                        >
                          {item.title}
                        </Link>
                      </h2>

                      <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-7 text-[#64748b]">
                        {item.excerpt}
                      </p>

                      <Link
                        href={`/use-cases/${item.slug}`}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#072448] transition-colors hover:text-[#0a3a73]"
                      >
                        Read More
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
