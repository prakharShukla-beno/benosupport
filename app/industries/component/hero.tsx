"use client"

import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { useProposalModal } from '@/hooks/use-proposal-modal'
import { TALK_TO_EXPERT_HREF } from '@/lib/proposal-cta'
import { prepareHeadingWordAnimation } from '@/lib/prepare-heading-word-animation'
import Link from 'next/link'
import { PageBreadcrumb } from '@/components/page-breadcrumb'
import { withHome } from '@/lib/breadcrumbs'

export default function IndustriesHero() {
  const { openProposalModal } = useProposalModal()
  const sectionRef = useRef<HTMLElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)

  const heroData = {
  eyebrow: "AI-Powered Industry Solutions",
  title: "AI-Powered Digital Transformation Solutions Across Industries",
  subtitle:
    "Helping industries modernize operations, automate workflows, improve customer experiences, and scale securely with AI, Cloud, Data, and Software Solutions.",
  stats: [
    { value: "15+",  label: "15+ Years of Technology Expertise" },
    { value: "Global Delivery",    label: "Global Delivery Model" },
    { value: "Ai-Driven Engineering",   label: "AI-Driven Engineering Solutions" },
    { value: "🔒",   label: "Secure & Scalable Architecture" },
  ],
  cta1: "Request A Proposal",
  cta2: "Talk To Our Experts",
}

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      if (h1Ref.current) {
        const wordEls = prepareHeadingWordAnimation(h1Ref.current)

        if (wordEls.length)
          tl.fromTo(
            wordEls,
            {
              y: "115%",
              opacity: 0,
            },
            {
              y: "0%",
              opacity: 1,
              duration: 0.95,
              stagger: 0.045,
              ease: "expo.out",
            },
            0
          )
      }

      tl.fromTo(
        subRef.current,
        {
          opacity: 0,
          y: 24,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        },
        0.55
      )

      const stats = Array.from(statsRef.current?.children ?? [])

      tl.fromTo(
        stats,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.5
      )

      const btns = Array.from(btnsRef.current?.children ?? [])

      tl.fromTo(
        btns,
        {
          opacity: 0,
          y: 18,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: "back.out(2)",
        },
        0.8
      )

      stats.forEach((el) => {
        el.addEventListener("mouseenter", () =>
          gsap.to(el, {
            y: -5,
            scale: 1.03,
            duration: 0.25,
            ease: "power2.out",
          })
        )

        el.addEventListener("mouseleave", () =>
          gsap.to(el, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh min-h-[640px] flex-col overflow-hidden bg-[#072448]"
    >
      <div className="relative z-10 mx-auto flex max-w-[1300px] flex-1 flex-col justify-center px-6 pb-12 pt-[72px] text-center lg:px-12">
        <PageBreadcrumb
          items={withHome([{ label: "Industries" }])}
          variant="dark"
          align="center"
        />

        {/* Title */}
        <h1
          ref={h1Ref}
          data-text={heroData.title}
          className="mx-auto mt-8 max-w-7xl text-[3rem] font-extrabold leading-[1.22] tracking-[-2px] text-white sm:text-[4rem] lg:text-[4rem]"
        >
          {heroData.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          style={{ opacity: 0 }}
          className="mx-auto mt-8 max-w-3xl type-body text-white/85"
        >
          {heroData.subtitle}
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-4"
        >
          {heroData.stats.map((s) => (
            <div
              key={s.label}
              style={{ opacity: 0 }}
              className="rounded-lg border border-white/10 bg-[#0d2f5c] px-6 py-6 transition-colors duration-300 hover:border-[#3b67ff]/40"
            >
              <div className="text-sm font-medium uppercase tracking-wider text-white/80">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className="mt-14 flex flex-wrap justify-center gap-5"
        >
          <button
            type="button"
            onClick={openProposalModal}
            style={{ opacity: 0 }}
            className="rounded-lg bg-[#0A3A73] px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#124e96]"
          >
            {heroData.cta1}
          </button>

          <Link
            href={TALK_TO_EXPERT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: 0 }}
            className="rounded-lg border border-[#3b67ff]/70 px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/5"
          >
            {heroData.cta2}
          </Link>
        </div>
      </div>
    </section>
  )
}