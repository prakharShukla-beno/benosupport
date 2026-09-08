"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  PageCTAOutlineButton,
  PageCTAPrimaryButton,
  PageCTASection,
} from "@/components/page-cta"
import { useProposalModal } from "@/hooks/use-proposal-modal"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"

gsap.registerPlugin(ScrollTrigger)

// ── Used only as a FALLBACK if Sanity has no Company Page content yet ──
const DEFAULT_TITLE = "Ready to Build Scalable Digital Products?"
const DEFAULT_PARAGRAPH =
  "Partner with Beno Support to modernize applications, develop scalable software platforms, and accelerate digital innovation with engineering-led solutions."
const DEFAULT_PRIMARY = "Request a Proposal"
const DEFAULT_SECONDARY = "Talk To Our Experts"

type CompanyCTAProps = {
  data?: {
    ctaTitle?: string
    ctaParagraph?: string
    ctaPrimaryLabel?: string
    ctaSecondaryLabel?: string
  }
}

export default function CompanyCTA({ data }: CompanyCTAProps) {
  const { openProposalModal } = useProposalModal()
  const ref = useRef<HTMLElement>(null)

  const title = data?.ctaTitle || DEFAULT_TITLE
  const paragraph = data?.ctaParagraph || DEFAULT_PARAGRAPH
  const primaryLabel = data?.ctaPrimaryLabel || DEFAULT_PRIMARY
  const secondaryLabel = data?.ctaSecondaryLabel || DEFAULT_SECONDARY

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <PageCTASection ref={ref}>
      <h2
        data-fade
        className="type-heading mx-auto mb-4 max-w-3xl text-white"
      >
        {title}
      </h2>
      <p
        data-fade
        className="type-body mx-auto mb-10 max-w-2xl text-[#b8c9e0] lg:mb-12"
      >
        {paragraph}
      </p>
      <div
        data-fade
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <PageCTAPrimaryButton onClick={openProposalModal}>
          {primaryLabel}
        </PageCTAPrimaryButton>
        <PageCTAOutlineButton href={TALK_TO_EXPERT_HREF} target="_blank" rel="noopener noreferrer">
          {secondaryLabel}
        </PageCTAOutlineButton>
      </div>
    </PageCTASection>
  )
}
