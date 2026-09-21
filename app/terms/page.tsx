import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { toAbsoluteUrl } from "@/lib/site-url"
import { getMergedLegalPage } from "@/sanity/lib/legal-pages"

const title = "Terms & Conditions | Beno Support"
const description =
  "Read the Terms and Conditions that govern your access to and use of Beno Support's website and services."
const canonical = toAbsoluteUrl("/terms")

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

export default async function TermsPage() {
  const data = await getMergedLegalPage("terms")

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
