"use client"

import { useEffect, useRef } from "react"
import { FileText, BadgeCheck, UserRoundCheck } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { PartnerStrip } from "./partnerStrip"
import { useProposalModal } from "@/hooks/use-proposal-modal"
import { WHATSAPP_URL } from "@/lib/social-links"
import Link from "next/link"

// Pre-defined headline lines for clean stagger reveal (balanced length per line)
const HEADLINE_LINES = [
  "Innovating Tomorrow,",
  "Empowering Today— 15 Years",
  "of Depth. Now AI-Native.",
]

export function HeroSection() {
  const { openProposalModal } = useProposalModal()
  const heroRef     = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  // Refs for each headline line's inner (animating) span
  const lineRefs    = useRef<(HTMLSpanElement | null)[]>([])
  const paraRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const statNum1Ref = useRef<HTMLHeadingElement>(null)
  const statNum2Ref = useRef<HTMLHeadingElement>(null)
  const statNum3Ref = useRef<HTMLHeadingElement>(null)

  // ── CINEMATIC LOAD SEQUENCE ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines  = lineRefs.current.filter(Boolean)
      const stats  = statsRef.current ? Array.from(statsRef.current.children) : []

      // Start everything hidden
      gsap.set([lines, paraRef.current, ctaRef.current, stats], {
        opacity: 0,
      })
      gsap.set(lines, { yPercent: 110 })
      gsap.set(paraRef.current, { y: 28 })
      gsap.set(ctaRef.current, { scale: 0.7, y: 16 })
      gsap.set(stats, {
        y: 70,
        scale: 0.82,
        rotateX: 14,
        transformPerspective: 1000,
        transformOrigin: "center top",
      })

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      // 1. Video scales in from slight zoom
      tl.fromTo(
        videoRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 2.4, ease: "power2.out" },
        0
      )

      // 2. Overlay fades in subtly (already visible via CSS, just ensuring)
      tl.to(overlayRef.current, { opacity: 1, duration: 0.6 }, 0)

      // 3. Headline lines stagger up through clip container
      tl.to(
        lines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.09,
          ease: "expo.out",
        },
        0.45
      )

      // 4. Paragraph slides up
      tl.to(
        paraRef.current,
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
        0.88
      )

      // 5. CTA button elastic pop
      tl.to(
        ctaRef.current,
        { scale: 1, y: 0, opacity: 1, duration: 0.75, ease: "elastic.out(1, 0.5)" },
        1.05
      )

      // 6. Stat cards pop from depth with stagger
      tl.to(
        stats,
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(2)",
          clearProps: "rotateX,transformPerspective,transformOrigin",
        },
        1.05
      )

      // 7. Count-up animations synced with each card's stagger offset
      const c1 = { val: 0 }
      const c2 = { val: 0 }
      const c3 = { val: 0 }

      tl.to(c1, {
        val: 500,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          if (statNum1Ref.current)
            statNum1Ref.current.textContent = Math.round(c1.val) + "+"
        },
      }, 1.05)

      tl.to(c2, {
        val: 96,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          if (statNum2Ref.current)
            statNum2Ref.current.textContent = Math.round(c2.val) + "%"
        },
      }, 1.17)

      tl.to(c3, {
        val: 15,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          if (statNum3Ref.current)
            statNum3Ref.current.textContent = Math.round(c3.val) + "+"
        },
      }, 1.29)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // ── MOUSE PARALLAX ────────────────────────────────────────────────────────────
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const onMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth  - 0.5) * 2
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2

      // Video drifts opposite to cursor (depth illusion)
      gsap.to(videoRef.current, {
        x: xPct * -18,
        y: yPct * -12,
        duration: 1.4,
        ease: "power1.out",
        overwrite: "auto",
      })
    }

    const onLeave = () => {
      gsap.to(videoRef.current, {
        x: 0,
        y: 0,
        duration: 1.8,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    hero.addEventListener("mousemove", onMove)
    hero.addEventListener("mouseleave", onLeave)
    return () => {
      hero.removeEventListener("mousemove", onMove)
      hero.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex h-dvh min-h-[640px] flex-col overflow-hidden bg-[#072448]"
    >
      {/* ─── BACKGROUND VIDEO ─── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        src="/bgvedio.mp4"
      />

      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#072448]/70 z-[1]" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col w-full mx-auto px-6 lg:px-10">

        {/* Spacer for fixed header */}
        <div className="h-[72px] shrink-0" />

        {/* GRID — left content | right stats */}
        <div className="min-h-0 flex-1 grid lg:grid-cols-[1fr_260px] xl:grid-cols-[1.2fr_280px] gap-10 xl:gap-14 py-10 lg:py-8">

          {/* ─── LEFT ─── */}
          <div className="flex flex-col justify-center">
            {/* Headline: each line wrapped in overflow-hidden clip container */}
            <h1 className="text-white font-extrabold leading-[1.22] tracking-[-2px] text-[38px] sm:text-[52px] md:text-[47px] lg:text-[52px] xl:text-[62px]">
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="text-reveal-line">
                  <span
                    ref={(el) => { lineRefs.current[i] = el }}
                    className="text-reveal-inner-block"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              ref={paraRef}
              className="mt-6 type-body max-w-[560px] text-[#c8d4e3] will-change-transform"
            >
              Transforming businesses with cutting-edge technology and tailored solutions
              for the modern enterprise. We bridge the gap between legacy stability and
              future-ready intelligence.
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="mt-8 flex gap-4 will-change-transform">
              <button
                type="button"
                onClick={openProposalModal}
                className="h-[50px] px-8 rounded-xl bg-[#0A3A73] text-white text-[15px] font-semibold hover:bg-blue-900 transition-colors active:scale-[0.98]"
              >
               Request a Proposal
              </button>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[50px] px-8 rounded-xl border-[0.5px] border-white text-white text-[15px] font-semibold hover:bg-blue-900 transition-colors active:scale-[0.98] inline-flex items-center justify-center"
              >
                Talk To Our Experts
              </Link>
            </div>
          </div>

          {/* ─── RIGHT — compact stat cards ─── */}
          <div className="flex flex-col justify-end  mr-10 pb-6 lg:pb-10">
            <div ref={statsRef} className="flex flex-col gap-2.5">

              {/* Projects Delivered */}
              <div className="rounded-xl border border-white/10 bg-[#072448]/50 backdrop-blur-xl px-3.5 py-2.5 will-change-transform">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[#94a3b8] text-[11px] font-medium tracking-wide">Projects Delivered</p>
                    <h3 ref={statNum1Ref} className="text-white text-[24px] font-bold leading-tight mt-0.5">0+</h3>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#072448]/80 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#10b981]" />
                  </div>
                </div>
              </div>

              {/* Client Retention Rate */}
              <div className="rounded-xl border border-white/10 bg-[#072448]/50 backdrop-blur-xl px-3.5 py-2.5 will-change-transform">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[#94a3b8] text-[11px] font-medium tracking-wide">Client Retention Rate</p>
                    <h3 ref={statNum2Ref} className="text-white text-[24px] font-bold leading-tight mt-0.5">0%</h3>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#072448]/80 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-4 h-4 text-[#f97316]" />
                  </div>
                </div>
              </div>

              {/* Years of Experience */}
              <div className="rounded-xl border border-white/10 bg-[#072448]/50 backdrop-blur-xl px-3.5 py-2.5 will-change-transform">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[#94a3b8] text-[11px] font-medium tracking-wide">Years of Experience</p>
                    <h3 ref={statNum3Ref} className="text-white text-[24px] font-bold leading-tight mt-0.5">0+</h3>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#072448]/80 flex items-center justify-center shrink-0">
                    <UserRoundCheck className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Sliding client logos */}
      <PartnerStrip />
    </section>
  )
}