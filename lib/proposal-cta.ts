import { WHATSAPP_URL } from "@/lib/social-links"

export const CONTACT_GET_IN_TOUCH_HREF = "/contact#contact-form"
export const TALK_TO_EXPERT_HREF = WHATSAPP_URL

const TALK_TO_PATTERN = /^talk\s+to\b/i

function normalizeCtaText(text: string): string {
  return text.trim().replace(/\s+/g, " ")
}

/** Any CTA label that starts with "Talk to" (e.g. Talk to Security Experts). */
export function isTalkToExpertsCtaText(text: string): boolean {
  return TALK_TO_PATTERN.test(normalizeCtaText(text))
}

/** Request, Schedule, and all non–Talk-to CTAs open the Bitrix proposal form. */
export function isProposalCtaText(text: string): boolean {
  return !isTalkToExpertsCtaText(text)
}

export function getCtaButtonProps(
  label: string,
  openProposalModal: () => void
): { href?: string; onClick?: () => void; target?: string; rel?: string } {
  if (isTalkToExpertsCtaText(label)) {
    return { href: TALK_TO_EXPERT_HREF, target: "_blank", rel: "noopener noreferrer" }
  }
  return { onClick: openProposalModal }
}
