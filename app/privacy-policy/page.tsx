import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { toAbsoluteUrl } from "@/lib/site-url"
import { getMergedLegalPage } from "@/sanity/lib/legal-pages"

const title = "Privacy Policy | Beno Support"
const description =
  "Learn how Beno Support collects, uses, and protects your personal information when you use our website and services."
const canonical = toAbsoluteUrl("/privacy-policy")

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
  },
}

export const revalidate = 60

export default async function PrivacyPolicyPage() {
  const data = await getMergedLegalPage("privacy-policy")

  if (!data) return null

  return (
    <LegalPage
      title={data.title}
      effectiveDate={data.effectiveDate}
      intro={data.intro}
      sections={data.sections}
      closing={data.closing}
    />
  )
}
