"use client"

import { useRef, useEffect, type ReactElement } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { CompanyCertCard } from "@/sanity/lib/queries"

gsap.registerPlugin(ScrollTrigger)

// ── Used only as a FALLBACK if Sanity has no Company Page content yet ──
const DEFAULT_LABEL = "Certifications & Standards"
const DEFAULT_TITLE = "Enterprise Certifications & Standards"
const DEFAULT_CARDS: CompanyCertCard[] = [
  { label: "CMMI Dev Level 3", iconKey: "shield" },
  { label: "ISO 27001 Processes", iconKey: "check" },
  { label: "Enterprise Security Standards", iconKey: "lock" },
  { label: "Agile Delivery Frameworks", iconKey: "refresh" },
]

const icons: Record<string, ReactElement> = {
  shield: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8"/>
      <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  lock: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="white" strokeWidth="1.8"/>
      <path d="M8 11V7a4 4 0 018 0v4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="1.5" fill="white"/>
    </svg>
  ),
  refresh: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 018-8c2.39 0 4.55.98 6.1 2.56L21 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M20 12a8 8 0 01-8 8c-2.39 0-4.55-.98-6.1-2.56L3 14.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M21 5v4.5H16.5M3 19v-4.5H7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

type CertificationsProps = {
  data?: {
    certificationsSectionLabel?: string
    certificationsTitle?: string
    certificationsCards?: CompanyCertCard[]
  }
}

export default function Certifications({ data }: CertificationsProps) {
  const ref = useRef<HTMLElement>(null)

  const sectionLabel = data?.certificationsSectionLabel || DEFAULT_LABEL
  const title = data?.certificationsTitle || DEFAULT_TITLE
  const certs = data?.certificationsCards?.length ? data.certificationsCards : DEFAULT_CARDS

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-[#072448] py-20 lg:py-24">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12 text-center">
        <span data-fade className="type-label section-label-dark">
          {sectionLabel}
        </span>
        <h2 data-fade className="type-heading mt-3 mb-12 text-white">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {certs.map((c) => (
            <div
              key={c.label}
              data-fade
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 flex flex-col items-center gap-4 hover:bg-white/[0.11] hover:border-white/20 transition-all duration-300 cursor-default"
            >
              <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center">
                {icons[c.iconKey] ?? icons.shield}
              </div>
              <p className="text-[13px] font-semibold text-white/80 leading-snug">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
