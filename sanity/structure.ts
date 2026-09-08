import type {StructureResolver} from 'sanity/structure'
import {SERVICE_NAV_ITEMS} from '@/lib/site-navigation'
import {CASE_STUDY_LISTINGS} from '@/lib/case-studies-data'

// List of document type names that live inside the "Homepage" folder below.
// When you add a new homepage section schema later, add its `name` here too.
const HOMEPAGE_SECTION_TYPES = [
  'homeHero',
  'whyChooseSection',
  'processSection',
  'faqSection',
  'ctaSection',
]

// Document types organized into the "Services" folder below.
const SERVICES_TYPES = ['service']

// Document types organized into the "Case Studies" folder below.
const CASE_STUDIES_TYPES = ['caseStudy']

// Standalone singleton pages (one document each) shown as their own top-level entry.
const STANDALONE_PAGE_TYPES = ['industriesPage', 'companyPage']

// The 8 services, in the same order they appear in the site's navigation —
// so the numbering in Studio always matches the numbering on the live site.
const SERVICE_ORDER = SERVICE_NAV_ITEMS.map((item, index) => ({
  slug: item.href.replace('/services/', ''),
  label: item.label,
  number: index + 1,
}))

// The case studies, numbered in the same order they're defined in
// lib/case-studies-data.ts (which matches the listing page order).
const CASE_STUDY_ORDER = CASE_STUDY_LISTINGS.map((item, index) => ({
  slug: item.slug,
  label: item.title,
  number: index + 1,
}))

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),

      // ── Homepage folder — every editable homepage section lives inside here ──
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage Sections')
            .items([
              S.documentTypeListItem('homeHero').title('Hero'),
              S.documentTypeListItem('whyChooseSection').title('Why Choose Us'),
              S.documentTypeListItem('processSection').title('Process Section'),
              S.documentTypeListItem('faqSection').title('FAQ'),
              S.documentTypeListItem('ctaSection').title('Bottom CTA'),
            ]),
        ),

      // ── Services folder — numbered, in the same order as the site's nav.
      // Clicking a service opens a small filtered list (usually showing just
      // its one document) — click that document to open it. This is one
      // extra click compared to opening directly, but it's the reliable,
      // officially-documented pattern (no async lookups that can fail).
      S.listItem()
        .title('Services')
        .child(
          S.list()
            .title('Services')
            .items(
              SERVICE_ORDER.map((entry) =>
                S.listItem()
                  .title(`${entry.number}. ${entry.label}`)
                  .child(
                    S.documentList()
                      .title(entry.label)
                      .filter('_type == "service" && slug.current == $slug')
                      .params({ slug: entry.slug })
                      .apiVersion('2024-01-01'),
                  ),
              ),
            ),
        ),

      S.divider(),

      // ── Case Studies folder — numbered, same order as the listing page.
      // Clicking a case study opens a small filtered list (usually showing
      // just its one document) — click that document to open it.
      S.listItem()
        .title('Case Studies')
        .child(
          S.list()
            .title('Case Studies')
            .items(
              CASE_STUDY_ORDER.map((entry) =>
                S.listItem()
                  .title(`${entry.number}. ${entry.label}`)
                  .child(
                    S.documentList()
                      .title(entry.label)
                      .filter('_type == "caseStudy" && slug.current == $slug')
                      .params({ slug: entry.slug })
                      .apiVersion('2024-01-01'),
                  ),
              ),
            ),
        ),

      S.divider(),

      // ── Industries page — a single document. "Industries We Serve" and
      // "Technology We Use" sections are intentionally NOT editable here —
      // they stay exactly as they are on the site.
      S.documentTypeListItem('industriesPage').title('Industries Page'),

      // ── Company page — a single document. "Our Story", "Our Journey",
      // "Leadership Team", and "Global Presence" are intentionally NOT
      // editable here — they stay exactly as they are on the site.
      S.documentTypeListItem('companyPage').title('Company Page'),

      S.divider(),

      // Anything else (future document types not yet organized into a folder)
      // still shows up here automatically, so nothing ever goes missing.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return (
          id &&
          id !== 'post' &&
          !HOMEPAGE_SECTION_TYPES.includes(id) &&
          !SERVICES_TYPES.includes(id) &&
          !CASE_STUDIES_TYPES.includes(id) &&
          !STANDALONE_PAGE_TYPES.includes(id)
        )
      }),
    ])