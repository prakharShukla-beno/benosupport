// Original hardcoded content for the Privacy Policy and Terms & Conditions
// pages. This file is the permanent fallback: if Sanity has no data (or is
// unreachable), the site renders exactly what's here — it never breaks or
// shows blank content.

export type LegalSection = {
  title: string
  paragraphs: string[]
}

export type LegalPageDetail = {
  pageKey: "privacy-policy" | "terms"
  title: string
  effectiveDate: string
  intro?: string
  sections: LegalSection[]
  closing: string
}

const DEFAULT_PRIVACY_POLICY: LegalPageDetail = {
  pageKey: "privacy-policy",
  title: "Privacy Policy",
  effectiveDate: "January 2024",
  intro:
    "This Privacy Policy describes how Beno Support collects, uses, and discloses information, and what choices you have with respect to your data. This policy applies to information we collect on our website, through email, text, and other electronic communications between you and this Website, and through our products and services.",
  sections: [
    {
      title: "Information We Collect",
      paragraphs: [
        "We collect several types of information from and about users of our Website and Services, including personal information (such as name, email address, and phone number), and non-personal information (such as IP address, browser type, operating system, and details about your usage patterns). This information is gathered when you register for a service, subscribe to our newsletter, or communicate directly with us.",
      ],
    },
    {
      title: "How We Use Your Information",
      paragraphs: [
        "The information we collect is primarily used to present our Website and its contents to you, provide you with information, products, or services that you request from us, fulfill any other purpose for which you provide it, and improve our services through analysis of usage data. We may also use your information to communicate with you about services that may be of interest, strictly in accordance with your communication preferences.",
      ],
    },
    {
      title: "Information Sharing and Disclosure",
      paragraphs: [
        "We do not sell your personal information. We may disclose personal information to our subsidiaries and affiliates, to contractors, service providers, and other third parties we use to support our business, and to comply with any court order, law, or legal process, including to respond to any government or regulatory request.",
      ],
    },
    {
      title: "Your Privacy Rights",
      paragraphs: [
        "You have rights regarding your personal data, including the right to access, correct, or request deletion of any personal information that you have provided to us. You may also withdraw your consent at any time where we rely on consent to process your personal information.",
      ],
    },
    {
      title: "Contact Us",
      paragraphs: [
        "To exercise any of these rights, please contact us using the information provided on our contact page.",
      ],
    },
  ],
  closing:
    "This page is maintained by Beno Support to answer common privacy questions about our services. For concerns not covered here, please reach out through our contact page.",
}

const DEFAULT_TERMS: LegalPageDetail = {
  pageKey: "terms",
  title: "Terms & Conditions",
  effectiveDate: "January 2024",
  intro:
    "Welcome to Beno Support. These Terms and Conditions govern your access to and use of our website, services, and any content or functionality offered on or through them. By accessing or using the Service, you agree to be bound by these Terms, which establish a contractual relationship between you and Beno Support.",
  sections: [
    {
      title: "User Responsibilities",
      paragraphs: [
        "As a user, you agree to use the Service only for lawful purposes and in accordance with these Terms. You are prohibited from using the Service in any way that violates any applicable federal, state, local, or international law, or for the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content.",
      ],
    },
    {
      title: "Termination of Service",
      paragraphs: [
        "We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.",
      ],
    },
    {
      title: "Governing Law",
      paragraphs: [
        "These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in New Delhi, India, and the parties hereby consent to the personal jurisdiction and venue therein.",
      ],
    },
    {
      title: "Changes to These Terms",
      paragraphs: [
        "Beno Support reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion, and your continued use of the Service after the revised Terms have taken effect signifies your acceptance of the new Terms.",
      ],
    },
  ],
  closing:
    "These terms are maintained by Beno Support. If you have questions about your rights or obligations, please contact us through our contact page.",
}

export const LEGAL_PAGE_DETAILS: LegalPageDetail[] = [
  DEFAULT_PRIVACY_POLICY,
  DEFAULT_TERMS,
]

export function getLegalPageDetailByKey(
  pageKey: LegalPageDetail["pageKey"]
): LegalPageDetail | undefined {
  return LEGAL_PAGE_DETAILS.find((detail) => detail.pageKey === pageKey)
}