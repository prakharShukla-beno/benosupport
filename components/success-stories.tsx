import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CASE_STUDY_LISTINGS } from "@/lib/case-studies-data"

const HOME_CASE_STUDIES = CASE_STUDY_LISTINGS.slice(0, 2)

export function SuccessStories() {
  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="type-label font-semibold section-label-light">
            Case Studies
          </span>
          <h2 className="mt-2 text-balance type-heading font-bold text-primary">
            Success Stories
          </h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-secondary">
            Explore how Beno Support helps businesses accelerate innovation,
            optimize operations, modernize infrastructure, and achieve
            measurable digital transformation outcomes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {HOME_CASE_STUDIES.map((item) => (
            <article
              key={item.slug}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(7,36,72,0.10)]"
            >
              <Link
                href={`/case-studies/${item.slug}`}
                className="relative block aspect-[2/1] overflow-hidden bg-[#e8eefc]"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-fill"
                />
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 text-xs font-semibold tracking-[0.04em] text-secondary">
                  {item.tag}
                </p>
                <h3 className="text-base font-semibold text-primary">
                  <Link
                    href={`/case-studies/${item.slug}`}
                    className="transition-colors hover:text-button"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 type-body text-secondary">
                  {item.excerpt}
                </p>
                <Link
                  href={`/case-studies/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-button transition-colors hover:opacity-80"
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
  )
}
