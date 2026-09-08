"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"
import gsap from "gsap"
import SocialSidebar from "@/components/social-sidebar"
import { AnimatedCounter } from "@/components/animated-counter"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { withHome } from "@/lib/breadcrumbs"
import type { CompanyHeroStat } from "@/sanity/lib/queries"

// ── Used only as a FALLBACK if Sanity has no Company Page content yet ──
const DEFAULT_TITLE = "Building Future-Ready Digital Enterprises Since 2008"
const DEFAULT_PARAGRAPH =
  "Beno Support is a global technology consulting and engineering company helping startups, SMBs, and enterprises modernize operations through AI, cloud, cybersecurity, and software engineering solutions."
const DEFAULT_CTA1 = "Talk To Our Experts"
const DEFAULT_CTA2 = "Explore Our Services"
const DEFAULT_STATS: CompanyHeroStat[] = [
  { displayValue: "100", suffix: "+", isCounter: true, label: "Global Clients" },
  { displayValue: "15", suffix: "+", isCounter: true, label: "Years Industry Experience" },
  { displayValue: "24", suffix: "/7", isCounter: true, label: "Global Delivery" },
  { displayValue: "AI/Cloud", isCounter: false, label: "Enterprise Engineering Expertise" },
]

type CompanyHeroProps = {
  heroData?: {
    heroTitle?: string
    heroParagraph?: string
    heroCta1Label?: string
    heroCta2Label?: string
    heroStats?: CompanyHeroStat[]
  }
}

export default function CompanyHero({ heroData }: CompanyHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const title = heroData?.heroTitle || DEFAULT_TITLE
  const paragraph = heroData?.heroParagraph || DEFAULT_PARAGRAPH
  const cta1 = heroData?.heroCta1Label || DEFAULT_CTA1
  const cta2 = heroData?.heroCta2Label || DEFAULT_CTA2
  const stats = heroData?.heroStats?.length ? heroData.heroStats : DEFAULT_STATS

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll("[data-anim]")
    gsap.fromTo(
      els,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.1 }
    )
  }, [])

  return (
    <section ref={sectionRef} className="relative flex h-dvh min-h-[640px] flex-col overflow-hidden bg-[#072448]">
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-6 pt-[72px] text-center lg:px-12">
        <div className="mx-auto max-w-[980px]">
          <PageBreadcrumb
            items={withHome([{ label: "Company" }])}
            variant="dark"
            align="center"
          />
          <h1
            data-anim
            className="mx-auto mb-6 max-w-[900px] text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            {title}
          </h1>

          <p
            data-anim
            className="mx-auto mb-10 max-w-[760px] type-body text-white/85 lg:mb-12"
          >
            {paragraph}
          </p>

          <div data-anim className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={TALK_TO_EXPERT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#0A3A73] px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#124e96]"
            >
              {cta1}
            </Link>
            <Link
              href="/services"
              className="rounded-lg border border-[#3b67ff]/70 px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/5"
            >
              {cta2}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 bg-[#0d2f5c] py-8 lg:py-10">
        <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-8 px-6 md:grid-cols-4 lg:px-12">
          {stats.map((s, index) => (
            <div key={s.label} className="text-center" data-anim>
              <p className="text-[28px] font-extrabold leading-none text-white lg:text-[32px]">
                {s.isCounter !== false && !isNaN(Number(s.displayValue)) ? (
                  <AnimatedCounter
                    value={Number(s.displayValue)}
                    suffix={s.suffix}
                    delay={0.15 + index * 0.12}
                  />
                ) : (
                  s.displayValue
                )}
              </p>
              <p className="mt-2 text-[12px] font-medium leading-snug text-white/80 lg:text-[13px]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SocialSidebar />
    </section>
  )
}
