"use client"

import {
  PageCTAOutlineButton,
  PageCTAPrimaryButton,
  PageCTASection,
} from "@/components/page-cta"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"

export default function CaseStudiesCTA() {
  return (
    <PageCTASection>
      <span className="type-label font-normal normal-case section-label-dark">
        Work With Us
      </span>

      <h2 className="type-heading mt-5 text-white">
        Have a Similar Challenge?
      </h2>

      <p className="type-body mx-auto mt-6 max-w-2xl text-[#98b0d3]">
        We partner with engineering and product teams to deliver measurable
        outcomes — from AI transformation to cloud modernization and enterprise
        applications.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <PageCTAPrimaryButton href={TALK_TO_EXPERT_HREF} target="_blank" rel="noopener noreferrer">
          Talk To Our Experts
        </PageCTAPrimaryButton>
        <PageCTAOutlineButton href="/services">
          Explore Solutions
        </PageCTAOutlineButton>
      </div>
    </PageCTASection>
  )
}
