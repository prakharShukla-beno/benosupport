"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import {
  Code2, Globe, Smartphone, Link2, Layers, GitBranch,
  Shield, Zap, Lock, Award, Settings, TrendingUp, TrendingDown,
  Bug, AlertCircle, FileCheck, Activity, Eye, BarChart2,
  Server, Database, FileSearch, Headphones,
  Bot, Brain, Lightbulb, MessageSquare, RefreshCw, FileText,
  Palette, Monitor, Target, Search,
  Map, Building2, Rocket, Users, CheckCircle,
  PieChart, Clock, DollarSign,
  Cloud, Network, GitMerge,
  GraduationCap, UserCheck, Heart, BookOpen,
  ArrowRight, Star, ChevronDown,
  Landmark, ShieldCheck, HeartPulse, Plane, Building, ShoppingCart, Radio, Gamepad2,
  ChevronUp,
} from "lucide-react"
import { gsap } from "@/lib/gsap"
import type { CapabilityCard, ServiceData, ServiceUseCase } from "@/lib/services-data"
import ServiceHero from "./servicehero"
import {
  PageCTAPrimaryButton,
  PageCTASection,
} from "@/components/page-cta"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"
import { getServiceBreadcrumbLabel, withHome } from "@/lib/breadcrumbs"

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Code2, Globe, Smartphone, Link2, Layers, GitBranch,
  Shield, Zap, Lock, Award, Settings, TrendingUp, TrendingDown,
  Bug, AlertCircle, FileCheck, Activity, Eye, BarChart2,
  Server, Database, FileSearch, Headphones,
  Bot, Brain, Lightbulb, MessageSquare, RefreshCw, FileText,
  Palette, Monitor, Target, Search,
  Map, Building2, Rocket, Users, CheckCircle,
  PieChart, Clock, DollarSign,
  Cloud, Network, GitMerge,
  GraduationCap, UserCheck, Heart, BookOpen,
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

// function ServiceHero({ hero }: { hero: ServiceData["hero"] }) {
//   const heroRef = useRef<HTMLElement>(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
//       tl.fromTo(".sh-headline", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 }, 0)
//         .fromTo(".sh-desc", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
//         .fromTo(".sh-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.5)
//     }, heroRef)
//     return () => ctx.revert()
//   }, [])

//   return (
//     <section ref={heroRef} className="bg-[#072348] py-24 lg:py-32">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="max-w-2xl space-y-6">
//           <h1 className="sh-headline text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight opacity-0">
//             {hero.tagline}
//             {hero.tagline2 && <span className="block">{hero.tagline2}</span>}
//           </h1>
//           <p className="sh-desc max-w-xl text-base leading-relaxed text-white/70 sm:text-lg opacity-0">
//             {hero.description}
//           </p>

//           <div className="flex flex-col gap-4 pt-2 sm:flex-row">
//             <button className="sh-cta rounded-lg bg-[#2d4971] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3b5b8a] opacity-0">
//               {hero.ctaButtons?.[0] ?? "Request A Proposal"}
//             </button>
//             <button className="sh-cta rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/5 opacity-0">
//               {hero.ctaButtons?.[1] ?? "Talk To Our Experts"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// ---------------------------------------------------------------------------
// Intro
// ---------------------------------------------------------------------------

function ServiceIntro({ intro }: { intro: ServiceData["intro"] }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%" } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="type-label font-semibold section-label-light">
          {intro.sectionLabel}
        </span>
        <h2 className="mt-4 type-heading font-bold text-[#072348] " >
          {intro.title}
        </h2>
        <div className="mt-6 space-y-5 type-body text-[#4b5a72]">
          {intro.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Capabilities / Scale grid (dark, joined cards with dividers)
// ---------------------------------------------------------------------------



function ServiceCapabilitiesGrid({
  data,
  id,
  moreLabel = "Explore More",
}: {
  data: { sectionLabel: string; title: string; subtitle: string; cards: CapabilityCard[] }
  id: string
  moreLabel?: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const extraRef = useRef<HTMLDivElement>(null)

  const [expanded, setExpanded] = useState(false)

  const visibleCards = data.cards.slice(0, 3)
  const hiddenCards = data.cards.slice(3)
  const hasMore = hiddenCards.length > 0

  // ── entrance animation ───────────────────────────────────────────
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
            stagger: { each: 0.09, grid: [1, 3], from: "start" },
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
  }, [])

  // ── hover animations (runs after every render to pick up new cards) ──
  useEffect(() => {
    const allCards = sectionRef.current?.querySelectorAll<HTMLElement>(".cap-card") ?? []
    const cleanups: (() => void)[] = []

    allCards.forEach((card) => {
      const iconWrap = card.querySelector<HTMLElement>(".icon-wrap")

      const onEnter = () => {
        gsap.to(card, {
          y: -6,
          backgroundColor: "#3b5b82",
          duration: 0.35,
          ease: "power2.out",
        })
        if (iconWrap)
          gsap.to(iconWrap, { scale: 1.12, duration: 0.35, ease: "back.out(2)" })
      }

      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          backgroundColor: "transparent",
          duration: 0.45,
          ease: "power2.out",
        })
        if (iconWrap)
          gsap.to(iconWrap, { scale: 1, duration: 0.4, ease: "power2.out" })
      }

      card.addEventListener("mouseenter", onEnter)
      card.addEventListener("mouseleave", onLeave)
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter)
        card.removeEventListener("mouseleave", onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [expanded]) // re-bind when extra cards appear

  // ── expand / collapse extra cards ───────────────────────────────
  const toggleExpand = () => {
    if (!expanded) {
      setExpanded(true)
      // animate in after state update
      requestAnimationFrame(() => {
        const extra = extraRef.current?.querySelectorAll<HTMLElement>(".cap-card")
        if (extra?.length) {
          gsap.fromTo(
            extra,
            { opacity: 0, y: 50, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.09,
              ease: "power3.out",
            }
          )
        }
      })
    } else {
      // animate out, then collapse
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

  // ── card renderer ────────────────────────────────────────────────
  // ── card renderer ────────────────────────────────────────────────
const renderCard = (card: CapabilityCard, index: number) => {
  const IconComponent = iconMap[card.iconName] ?? Settings

  return (
    <div
      key={index}
      className="cap-card p-8 md:p-10 border border-white/10 -mt-px -ml-px"
      style={{ backgroundColor: "transparent", transition: "none" }}
    >
      <div className="icon-wrap mb-6 text-white">
        <IconComponent className="size-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-white">{card.title}</h3>
      <p className="type-body text-white/70">{card.description}</p>
      {card.features && (
        <>
          <h4 className="mt-6 text-base font-bold text-white">Key Features</h4>
          <ul className="mt-3 space-y-2.5">
            {card.features.map((feature, fi) => (
              <li key={fi} className="flex gap-2 text-sm text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

  return (
    <section ref={sectionRef} id={id} className="bg-[#072348] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="max-w-6xl">
          <span className="label-chip type-label font-semibold section-label-dark">
            {data.sectionLabel}
          </span>
          <h2 className="mt-4 type-heading font-bold text-white">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mt-4 type-body text-white/70">
              {data.subtitle}


            </p>
          )}
        </div>

        {/* First 3 cards — always visible */}
        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3"
        >
          {visibleCards.map((card, i) => renderCard(card, i))}
        </div>

        {/* Extra cards — conditionally rendered */}
        {hasMore && expanded && (
          <div
            ref={extraRef}
            className="mt-px grid grid-cols-1 overflow-hidden rounded-b-2xl border border-t-0 border-white/10 sm:grid-cols-3"
          >
            {hiddenCards.map((card, i) =>
              renderCard(card, i + visibleCards.length)
            )}
          </div>
        )}

        {/* Toggle button */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={toggleExpand}
              className="inline-flex items-center gap-2 rounded-lg bg-[#072448] border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#072448]"
            >
              {expanded ? (
                <>
                  Show Less
                  <ChevronUp className="size-4" />
                </>
              ) : (
                <>
                  {moreLabel}
                  <ChevronDown className="size-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* No extra cards → still show the button if moreLabel passed and cards <= 3 */}
        {!hasMore && moreLabel && (
          <div className="mt-10 flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#072448] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2f54d6]">
              {moreLabel}
              <ChevronDown className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}



// ---------------------------------------------------------------------------
// Industries We Engineer For
// ---------------------------------------------------------------------------

const industries: { icon: ComponentType<{ className?: string }>; label: string }[] = [
  { icon: Landmark, label: "Fintech" },
  { icon: ShieldCheck, label: "IT SaaS" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: GraduationCap, label: "EdTech" },
  { icon: Building2, label: "Government" },
  { icon: Plane, label: "Travel" },
  { icon: Building, label: "Hospitality" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Radio, label: "Telecom" },
  { icon: Activity, label: "Aviation" },
  { icon: Shield, label: "Insurance" },
  { icon: Gamepad2, label: "Gaming" },
]

function IndustriesGrid() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll<HTMLElement>(".industry-card")
      if (!cards?.length) return
      gsap.fromTo(cards,
        { opacity: 0, y: 24, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out",
          stagger: { each: 0.05, grid: [2, 6], from: "start" },
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="type-label font-semibold section-label-light">
            Industries
          </span>
          <h2 className="mt-4 type-heading font-bold text-[#072348]">
            Industries We Engineer For
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((item) => (
            <div
              key={item.label}
              className="industry-card flex flex-col items-center gap-3 rounded-2xl border border-[#eceff3] bg-[#f7f9fc] px-4 py-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#072448]/30 hover:shadow-md"
            >
              <item.icon className="size-7 text-[#072448]" />
              <span className="text-sm font-semibold text-[#072348]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Strategic Use Cases
// ---------------------------------------------------------------------------

type UseCasesData = {
  sectionLabel: string
  title: string
  cases: ServiceUseCase[]
}

function ServiceUseCases({ useCases }: { useCases: UseCasesData }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = useCases.cases[activeIdx]
  const ref = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  // Animate card on tab switch
  const handleTabChange = (i: number) => {
    if (i === activeIdx) return
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveIdx(i)
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
          )
        },
      })
    } else {
      setActiveIdx(i)
    }
  }

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-[#f0f2f5]">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <span className="type-label font-semibold section-label-light mb-3 block">
          {useCases.sectionLabel}
        </span>
        <h2 className="type-heading text-[#0a1628] mb-8">
          {useCases.title}
        </h2>

        {/* Tabs */}
        <div className="flex gap- mb-6 flex-wrap " >
          {useCases.cases.map((c, i) => (
            <button
              key={i}
              onClick={() => handleTabChange(i)}
              className={`px-10 mx-2 py-3 rounded-xl text-center transition-all duration-200 ${
                i === activeIdx
                  ? "bg-[#072448] shadow-[0_8px_24px_rgba(7,36,72,0.25)]"
                  : "bg-white border border-[#d1d9e6] hover:border-[#072448]/40"
              }`}
            >
              <div
                className={`type-label mb-1 ${
                  i === activeIdx ? "text-white" : "text-[#0a1628]"
                }`}
              >
                {c.tabLabel}
              </div>
              <div
                className={`text-[11px] leading-snug ${
                  i === activeIdx ? "text-white/75" : "text-[#6b7280]"
                }`}
              >
                {c.tabSub}
              </div>
            </button>
          ))}
        </div>

        {/* Case study card */}
        <div
          ref={cardRef}
          className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_4px_32px_rgba(0,0,0,0.07)] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_480px]"
        >
          {/* ── Left: content ─────────────────────────────────── */}
          <div className="p-8 lg:p-10 flex flex-col">

            {/* Client logo */}
            {active.logoSrc ? (
              <img
                src={active.logoSrc}
                alt={active.tabLabel}
                className="h-16 w-auto object-contain mb-6 self-start"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl  flex items-center justify-center text-2xl mb-6">
                <img src="/assets/services/caseStudy/logo.svg" alt={active.tabLabel} />
              </div>
            )}

            {/* Title */}
            <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#072448] leading-[1.2] mb-3">
              {active.projectTitle}
            </h3>

            {/* Blue subtitle */}
            {active.subtitle && (
              <p className="type-body font-bold text-[#072448] mb-5">
                {active.subtitle}
              </p>
            )}

            {/* Optional gray description */}
            {active.description && (
              <p className="type-body font-semibold text-[#4a5568] mb-4">
                {active.description}
              </p>
            )}

            {/* Bullets */}
            <ul className="space-y-2 mb-8">
              {active.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#072448] text-[10px] mt-[5px] shrink-0">•</span>
                  <span className="type-body text-[#374151]">{b}</span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-[#e2e8f0] mb-6" />

            {/* Stats */}
            <div className="flex gap-10 flex-wrap">
              {active.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-[30px] font-extrabold text-[#0a1628] leading-tight tracking-[-0.5px]">
                    {s.value}
                  </p>
                  <p className="text-[12px] text-[#6b7280] mt-1 leading-snug max-w-[100px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: visual + CTA ───────────────────────────── */}
          {/* ── Right: visual + CTA ───────────────────────────── */}
<div className="flex flex-col">

  {/* Dark visual panel */}
  <div className="relative flex-1 hidden lg:flex flex-col overflow-hidden mr-8 min-h-[30px] rounded-2xl ">

    {/* Diagonal white triangle — top-right */}
   
<img
        src={active.visualimg}
        alt={active.projectTitle}
        className="relative z-10 w-full h-full object-contain rounded-2xl"
      />

    {/* Bottom URL bar */}
    {active.siteUrl && (
      <div className="absolute bottom-0 inset-x-0 bg-black/20 backdrop-blur-sm border-t border-white/10 px-5 py-2.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
        <span className="text-white/60 text-[11px] font-mono tracking-wide">
          {active.siteUrl}
        </span>
      </div>
    )}
  </div>

  {/* CTA */}
  <div className="hidden lg:flex items-center justify-start mb-8 py-5">
    <button className="bg-[#072448] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#0d3570] transition-colors">
      {active.ctaLabel}
    </button>
  </div>

  {/* Mobile CTA */}
  <div className="lg:hidden px-8 pb-8">
    <button className="bg-[#072448] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#0d3570] transition-colors">
      {active.ctaLabel}
    </button>
  </div>
</div>
        </div>

      </div>
    </section>
  )
}


// ---------------------------------------------------------------------------
// CTA + FAQ (split into two sections)
// ---------------------------------------------------------------------------

function ServiceCTASection({ cta }: { cta: NonNullable<ServiceData["cta"]> }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <PageCTASection ref={ref}>
      <h2 className="type-heading mx-auto max-w-4xl font-bold text-white">
        {cta.title}
      </h2>
      <p className="type-body mx-auto mt-6 max-w-3xl text-[#b8c9e0]">
        {cta.content}
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <PageCTAPrimaryButton href={TALK_TO_EXPERT_HREF} target="_blank" rel="noopener noreferrer">
          Talk To Our Experts
        </PageCTAPrimaryButton>
      </div>
    </PageCTASection>
  )
}

function CTAFallbackSection() {
  return (
    <PageCTASection>
      <h2 className="type-heading mx-auto max-w-4xl font-bold text-white">
        Speak with our team and turn ambiguous goals into a concrete roadmap.
      </h2>
      <p className="type-body mx-auto mt-6 max-w-3xl text-[#b8c9e0]">
        We&apos;ll help you define sequencing, outcomes, and execution with
        clarity so your service strategy becomes a reliable advantage.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <PageCTAPrimaryButton href={TALK_TO_EXPERT_HREF} target="_blank" rel="noopener noreferrer">
          Talk To Our Experts
        </PageCTAPrimaryButton>
      </div>
    </PageCTASection>
  )
}

function ServiceFAQSection({ faq }: { faq: NonNullable<ServiceData["faq"]> }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="type-label font-semibold section-label-light">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 type-heading font-bold text-[#072348]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-12 divide-y divide-[#e5e9f0]">
          {faq.map((item, index) => (
            <div key={item.question} className="py-5">
              <button
                onClick={() => setOpenIdx(openIdx === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-[#072348]"
              >
                <span>{item.question}</span>
                <ChevronDown className={`size-5 shrink-0 text-[#4b5a72] transition-transform duration-200 ${openIdx === index ? "rotate-180" : ""}`} />
              </button>
              {openIdx === index && (
                <p className="mt-3 type-body text-[#4b5a72]">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function ServicePageContent({ service, slug }: { service: ServiceData; slug: string }) {
  return (
    <div>
      <ServiceHero
        hero={service.hero}
        slug={slug}
        breadcrumbItems={withHome([
          { label: "Services", href: "/services" },
          { label: getServiceBreadcrumbLabel(slug) },
        ])}
      />
      <ServiceIntro intro={service.intro} />
      <ServiceCapabilitiesGrid  data={service.capabilities} id="capabilities" moreLabel="Explore More Services" />
      <IndustriesGrid />
      {/* <ServiceUseCases useCases={service.useCases} /> */}
      <ServiceCapabilitiesGrid data={service.scale} id="scale" />
      {service.cta ? <ServiceCTASection cta={service.cta} /> : <CTAFallbackSection />}
      {service.faq && <ServiceFAQSection faq={service.faq} />}
    </div>
  )
}