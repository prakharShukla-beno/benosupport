"use client"

import { useRef, useEffect, useState } from "react"
import { Globe2, Layers, TrendingUp, Clock, ShieldCheck, Cpu, ChevronDown, ChevronUp, type LucideIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { WhyChooseSectionData } from "@/sanity/lib/queries"

gsap.registerPlugin(ScrollTrigger)

type Reason = {
  icon: React.ElementType
  title: string
  description: string
}

// ── Used only as a FALLBACK if Sanity has no "Homepage Why Choose Us" content yet ──
const DEFAULT_LABEL = "Why Choose Us"
const DEFAULT_HEADING = "Why Choose Beno Support"
const DEFAULT_SUBTITLE =
  "Combining over 15 years of deep technical engineering expertise with AI-native operational execution to deliver secure, scalable, and compliant global solutions."

const DEFAULT_REASONS: Reason[] = [
  {
    icon: Globe2,
    title: "Multi-Centre Global Delivery",
    description:
      "Geographic redundancy and multilingual coverage driven by state-of-the-art delivery hubs across India, serving clients across the USA, Europe, Middle East, SE Asia, and Australia.",
  },
  {
    icon: Layers,
    title: "Flexible Business Models",
    description:
      "Sustained, transparent structures adapted to any workflow, including Time & Materials, Fixed Cost milestones, Distributed Squads, or Fully Outsourced management.",
  },
  {
    icon: TrendingUp,
    title: "200% Growth in 3 Years",
    description:
      "Sustained, hyper-scale market expansion powered directly by exceptional client retention, predictable delivery quality, and high-impact digital engineering worldwide.",
  },
  {
    icon: Clock,
    title: "15+ Years of Engineering Depth",
    description:
      "Established in 2008. Complex infrastructure and architecture problems are pre-solved through a mature, data-tested engineering playbook.",
  },
  {
    icon: ShieldCheck,
    title: "Certified & Compliant",
    description:
      "Enterprise-grade risk management is aligned to global benchmarks, including CMMI Dev Level 5, ISO 27001, ISO 9001, ISO 22000, and ISO 14001.",
  },
  {
    icon: Cpu,
    title: "AI-Native Operations",
    description:
      "AI-assisted delivery, workflow accuracy embedded into core practices — cloud architecture, software engineering, and cybersecurity — for maximum speed and accuracy.",
  },
]

// Maps the icon name string (chosen in Sanity Studio) back to the actual icon component.
// Keep this in sync with ICON_OPTIONS in sanity/schemaTypes/whyChooseSectionType.ts
const ICON_MAP: Record<string, LucideIcon> = {
  Globe2,
  Layers,
  TrendingUp,
  Clock,
  ShieldCheck,
  Cpu,
}

// ─── reusable card renderer ───────────────────────────────────────────────────
function ReasonCard({
  reason,
  index,
  cols = 3,
}: {
  reason: Reason
  index: number
  cols?: number
}) {
  const Icon = reason.icon
  const isFirstInRow = index % cols === 0
  const isFirstRow = index < cols

  const borderClasses = [
    "border-white/10",
    index > 0 ? "border-t" : "",
    !isFirstInRow ? "sm:border-l" : "sm:border-l-0",
    isFirstRow ? "sm:border-t-0" : "sm:border-t",
  ].join(" ")

  return (
    <div
      className={`cap-card flex flex-col gap-4 p-8 md:p-10 ${borderClasses}`}
      style={{ backgroundColor: "transparent", transition: "none" }}
    >
      <div className="icon-wrap text-white">
        <Icon className="size-7" />
      </div>
      <h3 className="text-xl font-bold text-white leading-snug">{reason.title}</h3>
      <p className="type-body text-white/70">{reason.description}</p>
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────
export function WhyChoose({
  visibleCount = 3,       // how many cards to show before "Show More"
  cols = 3,              // grid columns
  moreLabel = "See All Reasons",
  whyChooseData,
}: {
  visibleCount?: number
  cols?: number
  moreLabel?: string
  whyChooseData?: WhyChooseSectionData
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const extraRef = useRef<HTMLDivElement>(null)

  const [expanded, setExpanded] = useState(false)

  const sectionLabel = whyChooseData?.sectionLabel || DEFAULT_LABEL
  const title = whyChooseData?.heading || DEFAULT_HEADING
  const subtitle = whyChooseData?.subtitle || DEFAULT_SUBTITLE

  // Resolve reasons: Sanity data (icon name -> component) if present, else original hardcoded list.
  const reasons: Reason[] =
    whyChooseData?.reasons && whyChooseData.reasons.length > 0
      ? whyChooseData.reasons.map((r) => ({
          icon: ICON_MAP[r.icon] ?? Globe2,
          title: r.title,
          description: r.description,
        }))
      : DEFAULT_REASONS

  const visibleCards = reasons.slice(0, visibleCount)
  const hiddenCards = reasons.slice(visibleCount)
  const hasMore = hiddenCards.length > 0

  const gridCols =
    cols === 2 ? "sm:grid-cols-2" : cols === 1 ? "grid-cols-1" : "sm:grid-cols-3"

  // ── entrance animation ──────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      })

      const label = headingRef.current?.querySelector(".label-chip")
      if (label)
        tl.fromTo(
          label,
          { opacity: 0, y: 16, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
          0
        )

      const heading = headingRef.current?.querySelector("h2")
      if (heading) {
        const words = heading.textContent?.split(" ") ?? []
        heading.innerHTML = words
          .map(
            (w) =>
              `<span class="text-reveal-word word-span"><span class="text-reveal-inner">${w}</span></span>`
          )
          .join(" ")
        tl.fromTo(
          heading.querySelectorAll(".word-span > span"),
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.7, stagger: 0.06, ease: "expo.out" },
          0.12
        )
      }

      const sub = headingRef.current?.querySelector("p")
      if (sub)
        tl.fromTo(
          sub,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
          0.4
        )

      const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".cap-card")
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 70, scale: 0.94 })
        tl.to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: { each: 0.09, grid: [1, cols], from: "start" },
            ease: "power3.out",
          },
          0.5
        )
        cards.forEach((card, i) => {
          const iconWrap = card.querySelector<HTMLElement>(".icon-wrap")
          if (!iconWrap) return
          tl.fromTo(
            iconWrap,
            { scale: 0, rotate: -90, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
            0.5 + i * 0.09 + 0.25
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [cols])

  // ── hover animations — re-bind on expand ───────────────────────
  useEffect(() => {
    const allCards = sectionRef.current?.querySelectorAll<HTMLElement>(".cap-card") ?? []
    const cleanups: (() => void)[] = []

    allCards.forEach((card) => {
      const iconWrap = card.querySelector<HTMLElement>(".icon-wrap")

      const onEnter = () => {
        gsap.to(card, { y: -6, backgroundColor: "#3b5b82", duration: 0.35, ease: "power2.out" })
        if (iconWrap) gsap.to(iconWrap, { scale: 1.12, duration: 0.35, ease: "back.out(2)" })
      }
      const onLeave = () => {
        gsap.to(card, { y: 0, backgroundColor: "transparent", duration: 0.45, ease: "power2.out" })
        if (iconWrap) gsap.to(iconWrap, { scale: 1, duration: 0.4, ease: "power2.out" })
      }

      card.addEventListener("mouseenter", onEnter)
      card.addEventListener("mouseleave", onLeave)
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter)
        card.removeEventListener("mouseleave", onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [expanded])

  // ── expand / collapse ──────────────────────────────────────────
  const toggleExpand = () => {
    if (!expanded) {
      setExpanded(true)
      requestAnimationFrame(() => {
        const extra = extraRef.current?.querySelectorAll<HTMLElement>(".cap-card")
        if (extra?.length) {
          gsap.fromTo(
            extra,
            { opacity: 0, y: 50, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.09, ease: "power3.out" }
          )
        }
      })
    } else {
      const extra = extraRef.current?.querySelectorAll<HTMLElement>(".cap-card")
      if (extra?.length) {
        gsap.to(extra, {
          opacity: 0,
          y: 30,
          scale: 0.96,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => setExpanded(false),
        })
      } else {
        setExpanded(false)
      }
    }
  }

  return (
    <section ref={sectionRef} className="bg-[#072348] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div ref={headingRef} className="max-w-3xl">
          <span className="label-chip type-label font-semibold section-label-dark">
            {sectionLabel}
          </span>
          <h2 className="mt-4 type-heading font-bold text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="type-body mt-4 text-white/70">
              {subtitle}
            </p>
          )}
        </div>

        {/* First N cards */}
        <div
          ref={cardsRef}
          className={`mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 ${gridCols}`}
        >
          {visibleCards.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} index={i} cols={cols} />
          ))}
        </div>

        {/* Extra cards */}
        {hasMore && expanded && (
          <div
            ref={extraRef}
            className={`mt-px grid grid-cols-1 overflow-hidden rounded-b-2xl border border-t-0 border-white/10 ${gridCols}`}
          >
            {hiddenCards.map((reason, i) => (
              <ReasonCard
                key={reason.title}
                reason={reason}
                index={i + visibleCount}
                cols={cols}
              />
            ))}
          </div>
        )}

        {/* Toggle button */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={toggleExpand}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              {expanded ? (
                <>Show Less <ChevronUp className="size-4" /></>
              ) : (
                <>{moreLabel} <ChevronDown className="size-4" /></>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
