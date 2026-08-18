import {
  PageCTAPrimaryButton,
  PageCTASection,
} from "@/components/page-cta"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"
import { USE_CASES_CTA } from "@/lib/use-cases-data"

export default function UseCasesCta() {
  return (
    <PageCTASection className="bg-[#f4f6f9]">
      <h2 className="whitespace-nowrap text-[clamp(0.9rem,2.6vw,2rem)] font-bold tracking-[-0.02em] text-white">
        {USE_CASES_CTA.title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/80">
        {USE_CASES_CTA.description}
      </p>
      <div className="mt-8 flex justify-center">
        <PageCTAPrimaryButton href={TALK_TO_EXPERT_HREF} target="_blank" rel="noopener noreferrer">
          Talk to Expert
        </PageCTAPrimaryButton>
      </div>
    </PageCTASection>
  )
}
