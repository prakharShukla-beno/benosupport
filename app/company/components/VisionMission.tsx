"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { CompanyVisionMissionItem } from "@/sanity/lib/queries"

gsap.registerPlugin(ScrollTrigger)

// ── Used only as a FALLBACK if Sanity has no Company Page content yet ──
const DEFAULT_LABEL = "VISION & MISSION"
const DEFAULT_ITEMS: CompanyVisionMissionItem[] = [
  {
    title: "Our Vision",
    text: "To become a globally trusted engineering and technology transformation partner helping organizations innovate, scale, and thrive in the digital economy.",
  },
  {
    title: "Our Mission",
    text: "To empower businesses through scalable software engineering, AI innovation, cloud transformation, cybersecurity resilience, and customer-focused digital solutions.",
  },
]

type VisionMissionProps = {
  data?: {
    visionMissionSectionLabel?: string
    visionMissionItems?: CompanyVisionMissionItem[]
  }
}

export default function VisionMission({ data }: VisionMissionProps) {
  const ref = useRef<HTMLElement>(null)

  const sectionLabel = data?.visionMissionSectionLabel || DEFAULT_LABEL
  const items = data?.visionMissionItems?.length ? data.visionMissionItems : DEFAULT_ITEMS

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-[#eef0f3] py-16 lg:py-20">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        {/* Gray outer frame */}
        <div
          data-fade
          className="rounded-[32px] bg-[#eef0f3] p-3 sm:p-4 lg:p-5"
        >
          {/* White inner card */}
          <div className="rounded-[24px] bg-white px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <span className="type-label mb-8 block section-label-light">
              {sectionLabel}
            </span>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 lg:gap-14">
              {items.map((item) => (
                <div key={item.title} data-fade>
                  <h3 className="type-heading mb-5 text-[#0B2345]">
                    {item.title}
                  </h3>
                  <div className="flex min-h-[210px] items-center rounded-2xl bg-[#0B2345] px-6 py-10 sm:px-8 lg:min-h-[230px] lg:px-10 lg:py-12">
                    <p className="type-body leading-relaxed text-white">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
