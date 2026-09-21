import { defineField, defineType } from 'sanity'

// Fixed list — only these two legal pages exist on the site. This is a
// dropdown (not free text) so a document can never be created with a typo'd
// page key and silently fail to match a real page.
const PAGE_KEY_OPTIONS = [
  { title: 'Privacy Policy', value: 'privacy-policy' },
  { title: 'Terms & Conditions', value: 'terms' },
]

export const legalPageType = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Which page is this?',
      description: 'Choose which page on the site this content belongs to.',
      type: 'string',
      options: { list: PAGE_KEY_OPTIONS, layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page heading',
      description: 'The large heading shown at the top of the page, e.g. "Privacy Policy".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective date',
      description: 'Shown under the heading, e.g. "January 2024".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction paragraph',
      description: 'The opening paragraph shown before the numbered sections. Optional.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Each section has its own heading and one or more paragraphs of text.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'legalSection',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: 'title',
              title: 'Section heading',
              description: 'e.g. "Information We Collect"',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'paragraphs',
              title: 'Paragraphs',
              description: 'Each item in this list becomes one paragraph of text.',
              type: 'array',
              validation: (Rule: any) => Rule.required().min(1),
              of: [{ type: 'text', rows: 4 }],
            }),
          ],
          preview: {
            select: { title: 'title', paragraphs: 'paragraphs' },
            prepare({ title, paragraphs }: { title?: string; paragraphs?: string[] }) {
              return {
                title: title || 'Untitled section',
                subtitle: paragraphs?.[0]?.slice(0, 60),
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'closing',
      title: 'Closing paragraph',
      description: 'The final paragraph shown at the bottom of the page.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'pageKey' },
  },
})