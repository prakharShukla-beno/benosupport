"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"

import { gsap } from "@/lib/gsap"
import { urlFor } from "@/sanity/lib/image"
import type { ProcessSectionData } from "@/sanity/lib/queries"

// ── Used only as a FALLBACK if Sanity has no "Homepage Process Section" content yet ──
const DEFAULT_LABEL = "Our Process"
const DEFAULT_HEADING = "How We Make It Happen"
const DEFAULT_DESCRIPTION =
  "Our proven delivery framework combines people, processes, technology, and continuous improvement to deliver measurable business outcomes."

type ResolvedPhase = {
  phaseWord: string
  label: string
  subtitle: string
  title: string
  description: string
  points: string[]
  image: string
  imageAlt: string
}

const DEFAULT_PHASES: ResolvedPhase[] = [
  {
    phaseWord: "ASSESS",
    label: "Our Approach",
    subtitle: "Foundational Discovery",
    title: "Understanding your business before building solutions.",
    description:
      "We initiate every partnership with a deep-dive immersion into your operational DNA, identifying friction points and growth levers before any solution is proposed.",
    points: [
      "Requirement Engagement",
      "Client Onboarding",
      "Engagement Planning",
      "Relationship Management",
    ],
    image: "/assets/our_process/process1.png",
    imageAlt: "Beno Support team collaborating during discovery workshop",
  },
  {
    phaseWord: "PLAN",
    label: "Process Management",
    subtitle: "Structured Execution",
    title: "Structured execution with complete visibility.",
    description:
      "Every engagement is governed by clear operating procedures, service levels, and real-time collaboration channels that keep stakeholders aligned from day one.",
    points: [
      "Service Level Setup",
      "SOPs & Framework",
      "Real-Time Collaboration",
      "MIS & Reporting",
    ],
    image: "/assets/our_process/process2.png",
    imageAlt: "Project leads reviewing execution dashboards and timelines",
  },
  {
    phaseWord: "ARCHITECT",
    label: "Quality Assurance",
    subtitle: "Lifecycle Consistency",
    title: "Delivering consistent quality throughout the project lifecycle.",
    description:
      "Rigorous audits, continuous feedback loops, and proactive process improvement ensure that quality is engineered into every stage of delivery.",
    points: [
      "Audits & Reviews",
      "Process Improvement",
      "Continuous Feedback",
      "Quality Assurance",
    ],
    image: "/assets/our_process/process3.png",
    imageAlt: "Engineers conducting quality reviews on delivery work",
  },
  {
    phaseWord: "BUILD",
    label: "Technology Enablement",
    subtitle: "Modern Engineering",
    title: "Building delivery with modern engineering practices.",
    description:
      "We embed the right tools, platforms, and automation into your delivery model so teams can scale without sacrificing precision or speed.",
    points: [
      "AI-Assisted Development",
      "Platform Engineering",
      "CI/CD Automation",
      "Observability & Monitoring",
    ],
    image: "/assets/our_process/process4.png",
    imageAlt: "Engineering team enabling modern delivery systems",
  },
  {
    phaseWord: "AUTOMATE",
    label: "Key Success Factors",
    subtitle: "Engagement Principles",
    title: "The principles behind every successful engagement.",
    description:
      "Successful delivery is built on transparent communication, flexible engagement models, and an uncompromising focus on time, cost, and quality.",
    points: [
      "Time, Cost & Quality",
      "Security & Scalability",
      "Transparent Communication",
      "Flexible Engagement Models",
    ],
    image: "/assets/our_process/process5.png",
    imageAlt: "Leaders aligning on engagement success principles",
  },
  {
    phaseWord: "LAUNCH",
    label: "Client Commitment",
    subtitle: "Long-Term Success",
    title: "Focused on long-term customer success.",
    description:
      "We measure success by the strength of our client relationships, the efficiency of operations, and the consistency of our service standards.",
    points: [
      "Quality Service Standards",
      "Diverse Service Portfolio",
      "Operational Efficiency",
      "Strong Client Relationships",
    ],
    image: "/assets/our_process/process6.png",
    imageAlt: "Client success teams supporting long-term partnership goals",
  },
  {
    phaseWord: "OPTIMIZE",
    label: "Continuous Excellence",
    subtitle: "Ongoing Improvement",
    title: "Improving delivery through proven methodologies.",
    description:
      "Our culture of continuous improvement leverages Lean Six Sigma, Kaizen principles, and customer-centric delivery to raise the bar over time.",
    points: [
      "Lean Six Sigma",
      "Kaizen Principles",
      "Continuous Improvement",
      "Customer-Centric Delivery",
    ],
    image: "/assets/our_process/process7.png",
    imageAlt: "Teams iterating on delivery excellence and process improvement",
  },
]

type ProcessSectionProps = {
  processData?: ProcessSectionData
}

export function ProcessSection({ processData }: ProcessSectionProps) {
  const label = processData?.sectionLabel || DEFAULT_LABEL
  const heading = processData?.heading || DEFAULT_HEADING
  const description = processData?.description || DEFAULT_DESCRIPTION

  // Resolve phases: Sanity data (with image URLs built via urlFor) if present, else original hardcoded defaults.
  const phases: ResolvedPhase[] =
    processData?.phases && processData.phases.length > 0
      ? processData.phases.map((p) => ({
          phaseWord: p.phaseWord,
          label: p.label,
          subtitle: p.subtitle,
          title: p.title,
          description: p.description,
          points: p.points,
          image: p.image ? urlFor(p.image).width(640).height(640).fit("crop").url() : "",
          imageAlt: p.imageAlt || p.label,
        }))
      : DEFAULT_PHASES

  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const stepNavRef = useRef<HTMLElement>(null)
  const stepLineRef = useRef<HTMLDivElement>(null)
  const stepIconRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Guard against activeIndex being out of range if phases length changes (e.g. content edited)
  const safeIndex = Math.min(activeIndex, phases.length - 1)
  const active = phases[safeIndex]
  const isLast = safeIndex === phases.length - 1
  const totalLabel = String(phases.length).padStart(2, "0")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!cardRef.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.fromTo(
      cardRef.current,
      { opacity: 0.55, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    )
  }, [safeIndex])

  useEffect(() => {
    function updateStepLine() {
      const nav = stepNavRef.current
      const line = stepLineRef.current
      const firstIcon = stepIconRefs.current[0]
      const lastIcon = stepIconRefs.current[phases.length - 1]
      if (!nav || !line || !firstIcon || !lastIcon) return

      const navRect = nav.getBoundingClientRect()
      const firstRect = firstIcon.getBoundingClientRect()
      const lastRect = lastIcon.getBoundingClientRect()

      const top = firstRect.top + firstRect.height / 2 - navRect.top
      const bottom = lastRect.top + lastRect.height / 2 - navRect.top

      line.style.top = `${top}px`
      line.style.height = `${Math.max(bottom - top, 0)}px`
    }

    updateStepLine()
    window.addEventListener("resize", updateStepLine)
    return () => window.removeEventListener("resize", updateStepLine)
  }, [safeIndex, phases.length])

  function goToNextPhase() {
    setActiveIndex((index) => (index + 1) % phases.length)
  }

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#f5f7fc] py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1340px] px-6 lg:px-12">
        <div ref={headingRef} className="mb-10 lg:mb-14">
          <span className="type-label mb-3 block font-semibold section-label-light">
            {label}
          </span>
          <h2 className="type-heading mb-4 text-[#072448]">
            {heading}
          </h2>
          <p className="type-body max-w-[640px] text-[#4b5a72]">
            {description}
          </p>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(220px,0.32fr)_1fr] lg:gap-10 xl:gap-14">
          {/* Vertical stepper — on desktop, stretches to match detail card height */}
          <nav
            ref={stepNavRef}
            aria-label="Delivery framework phases"
            className="relative lg:flex lg:h-full lg:min-h-0"
          >
            <div
              ref={stepLineRef}
              className="absolute left-[1.125rem] w-px bg-[#d7e0ee]"
              aria-hidden
            />
            <ol className="relative space-y-1 lg:flex lg:h-full lg:w-full lg:flex-col lg:justify-between lg:space-y-0 lg:py-1">
              {phases.map((phase, index) => {
                const isActive = index === safeIndex
                const number = String(index + 1).padStart(2, "0")

                return (
                  <li
                    key={phase.label}
                    className="lg:flex lg:min-h-0 lg:flex-1 lg:items-center"
                  >                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={`group flex w-full items-start gap-4 rounded-xl px-1 py-1.5 text-left transition-colors ${
                        isActive ? "" : "hover:bg-white/60"
                      }`}
                    >




                     <span
                        ref={(el) => { stepIconRefs.current[index] = el }}
                        className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors ${
                          isActive
                            ? "bg-[#072448] text-white shadow-[0_8px_16px_-4px_rgba(7,36,72,0.35)]"
                            : "bg-[#e8eef8] text-[#64748b] group-hover:bg-[#dce6f5]"
                        }`}
                      >
                        {number}
                      </span>



                      <span className="min-w-0 pt-1">
                        <span
                          className={`block text-[15px] leading-snug transition-colors ${
                            isActive
                              ? "font-bold text-[#072448]"
                              : "font-medium text-[#64748b]"
                          }`}
                        >
                          {phase.label}
                        </span>
                        {isActive ? (
                          <span className="mt-0.5 block text-sm text-[#64748b]">
                            {phase.subtitle}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* Detail card */}
          <div
            ref={cardRef}
            className="rounded-[1.75rem] border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.14em] text-[#64748b]">
              <span className="inline-flex size-7 items-center justify-center rounded-md border border-[#d7e0ee] bg-[#f8fafc] text-[11px] text-[#072448]">
                {String(safeIndex + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-6 bg-[#cbd5e1]" aria-hidden />
              <span>{active.phaseWord}</span>
            </div>

            <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <h3 className="text-balance text-2xl font-bold leading-snug tracking-tight text-[#072448] sm:text-[1.75rem]">
                  {active.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[#64748b]">
                  {active.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {active.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-[15px] font-medium text-[#334155]"
                    >
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[#eef3fb] text-[#072448]">
                        <Check className="size-3.5" strokeWidth={2.4} aria-hidden />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl bg-[#e8edf3] lg:mx-0 lg:max-w-none">
                {phases.map((phase, index) =>
                  phase.image ? (
                    <Image
                      key={phase.image + index}
                      src={phase.image}
                      alt={phase.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 280px, 320px"
                      className={`object-cover object-center transition-opacity duration-300 ease-out ${
                        index === safeIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : null
                )}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#e8eef5] pt-6">
              <button
                type="button"
                onClick={goToNextPhase}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#072448] transition-colors hover:text-[#0a3a73]"
              >
                {isLast ? "Back to Phase One" : "Next Phase"}
                <ArrowRight className="size-4" aria-hidden />
              </button>
              <span className="text-xs font-medium text-[#94a3b8]">
                {String(safeIndex + 1).padStart(2, "0")} / {totalLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
