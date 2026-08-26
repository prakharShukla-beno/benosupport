import type {StructureResolver} from 'sanity/structure'

// List of document type names that live inside the "Homepage" folder below.
// When you add a new homepage section schema later, add its `name` here too.
const HOMEPAGE_SECTION_TYPES = [
  'homeHero',
  'industriesSection',
  'successStoriesSection',
  'insightsSection',
  'faqSection',
  'ctaSection',
  'techPartnersSection',
  'techStackSection',
  'featuredClientsSection',
  'whyChooseSection',
  'processSection',
]

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),

      // ── Homepage folder — every homepage section lives inside here ──────
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage Sections')
            .items([
              S.documentTypeListItem('homeHero').title('Hero'),
              S.documentTypeListItem('industriesSection').title('Industries'),
              S.documentTypeListItem('successStoriesSection').title('Success Stories'),
              S.documentTypeListItem('insightsSection').title('Insights'),
              S.documentTypeListItem('faqSection').title('FAQ'),
              S.documentTypeListItem('ctaSection').title('Bottom CTA'),
              S.documentTypeListItem('techPartnersSection').title('Tech Partners'),
              S.documentTypeListItem('techStackSection').title('Tech Stack'),
              S.documentTypeListItem('featuredClientsSection').title('Featured Clients'),
              S.documentTypeListItem('whyChooseSection').title('Why Choose Us'),
              S.documentTypeListItem('processSection').title('Process Section'),
            ]),
        ),

      S.divider(),

      // Anything else (future document types not yet organized into a folder)
      // still shows up here automatically, so nothing ever goes missing.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return id && id !== 'post' && !HOMEPAGE_SECTION_TYPES.includes(id)
      }),
    ])