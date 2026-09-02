import type {StructureResolver} from 'sanity/structure'
import {SERVICE_NAV_ITEMS} from '@/lib/site-navigation'

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

// The 8 services, in the same order they appear in the site's navigation —
// so the numbering in Studio always matches the numbering on the live site.
const SERVICE_ORDER = SERVICE_NAV_ITEMS.map((item, index) => ({
  slug: item.href.replace('/services/', ''),
  label: item.label,
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

      // Anything else (future document types not yet organized into a folder)
      // still shows up here automatically, so nothing ever goes missing.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return id && id !== 'post' && !HOMEPAGE_SECTION_TYPES.includes(id) && !SERVICES_TYPES.includes(id)
      }),
    ])