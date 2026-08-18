"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import SocialSidebar from "@/components/social-sidebar"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"
import { AnimatedCounter } from "@/components/animated-counter"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { withHome } from "@/lib/breadcrumbs"

const stats = [
  { type: "counter" as const, value: 100, suffix: "+", label: "Global Clients" },
  { type: "counter" as const, value: 15, suffix: "+", label: "Years Industry Experience" },
  { type: "counter" as const, value: 24, suffix: "/7", label: "Global Delivery" },
  { type: "text" as const, value: "AI/Cloud", label: "Enterprise Engineering Expertise" },
]

export default function CompanyHero() {
  const sectionRef = useRef<HTMLElement>(null)

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
            Building Future-Ready Digital Enterprises Since 2008
          </h1>

          <p
            data-anim
            className="mx-auto mb-10 max-w-[760px] type-body text-white/85 lg:mb-12"
          >
            Beno Support is a global technology consulting and engineering company helping startups,
            SMBs, and enterprises modernize operations through AI, cloud, cybersecurity, and software
            engineering solutions.
          </p>

          <div data-anim className="mt-9 flex flex-wrap items-center justify-center gap-4">
           <Link
  href={TALK_TO_EXPERT_HREF}
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-lg bg-[#0A3A73] px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#124e96]"
>
    Talk to Our Experts
</Link>
            <Link
              href="/services"
              className="rounded-lg border border-[#3b67ff]/70 px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/5"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 bg-[#0d2f5c] py-8 lg:py-10">
        <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-8 px-6 md:grid-cols-4 lg:px-12">
          {stats.map((s, index) => (
            <div key={s.label} className="text-center" data-anim>
              <p className="text-[28px] font-extrabold leading-none text-white lg:text-[32px]">
                {s.type === "counter" ? (
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    delay={0.15 + index * 0.12}
                  />
                ) : (
                  s.value
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
