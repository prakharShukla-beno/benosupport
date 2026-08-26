"use client"

import {
  PageCTAOutlineButton,
  PageCTAPrimaryButton,
  PageCTASection,
} from "@/components/page-cta"
import { useProposalModal } from "@/hooks/use-proposal-modal"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"
import type { CtaSectionData } from "@/sanity/lib/queries"

// ── Used only as a FALLBACK if Sanity has no "Homepage Bottom CTA" content yet ──
const DEFAULT_HEADING = "Ready to Accelerate Digital Innovation?"
const DEFAULT_PARAGRAPH =
  "Join the ranks of global leaders who trust Beno Support for engineering excellence and strategic growth."
const DEFAULT_PRIMARY_LABEL = "Request a Proposal"
const DEFAULT_SECONDARY_LABEL = "Talk To Our Experts"

type CtaSectionProps = {
  ctaData?: CtaSectionData
}

export function CtaSection({ ctaData }: CtaSectionProps) {
  const { openProposalModal } = useProposalModal()

  const heading = ctaData?.heading || DEFAULT_HEADING
  const paragraph = ctaData?.paragraph || DEFAULT_PARAGRAPH
  const primaryLabel = ctaData?.primaryCtaLabel || DEFAULT_PRIMARY_LABEL
  const secondaryLabel = ctaData?.secondaryCtaLabel || DEFAULT_SECONDARY_LABEL

  return (
    <PageCTASection>
      <h2 className="type-heading mx-auto max-w-3xl text-balance font-bold text-white">
        {heading}
      </h2>
      <p className="type-body mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-[#b8c9e0]">
        {paragraph}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
