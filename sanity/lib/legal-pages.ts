import { client } from './client'
import {
  getLegalPageDetailByKey,
  type LegalPageDetail,
  type LegalSection,
} from '@/lib/legal-pages-data'

export const LEGAL_PAGE_QUERY = `*[_type == "legalPage" && pageKey == $pageKey][0]{
  pageKey, title, effectiveDate, intro,
  sections[]{ title, paragraphs },
  closing
}`

type SanityLegalSection = { title?: string; paragraphs?: string[] }

export type SanityLegalPageDoc = {
  pageKey?: 'privacy-policy' | 'terms'
  title?: string
  effectiveDate?: string
  intro?: string
  sections?: SanityLegalSection[]
  closing?: string
}

/**
 * Fetches the Sanity "legalPage" document for this pageKey (if any) and
 * merges it, field by field, on top of the original hardcoded
 * legal-pages-data.ts. Any field left empty in Sanity falls back to the
 * original hardcoded value — the page never breaks or shows blank content.
 * Note: page <title>/<meta description> (SEO) are intentionally NOT sourced
 * from Sanity and stay hardcoded in each page.tsx, same as other pages.
 */
export async function getMergedLegalPage(
  pageKey: LegalPageDetail['pageKey']
): Promise<LegalPageDetail | undefined> {
  const fallback = getLegalPageDetailByKey(pageKey)
  if (!fallback) return undefined

  const doc = await client
    .fetch<SanityLegalPageDoc | null>(LEGAL_PAGE_QUERY, { pageKey })
    .catch(() => null)

  if (!doc) return fallback

  const sections: LegalSection[] =
    doc.sections?.length
      ? doc.sections.map((section, index) => ({
          title: section.title || fallback.sections[index]?.title || '',
          paragraphs: section.paragraphs?.length
            ? section.paragraphs
            : fallback.sections[index]?.paragraphs || [],
        }))
      : fallback.sections

  return {
    pageKey: fallback.pageKey,
    title: doc.title || fallback.title,
    effectiveDate: doc.effectiveDate || fallback.effectiveDate,
    intro: doc.intro || fallback.intro,
    sections,
    closing: doc.closing || fallback.closing,
  }
}