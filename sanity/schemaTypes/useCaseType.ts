import { defineField, defineType } from 'sanity'

const WHY_ICON_OPTIONS = ['settings', 'cpu', 'trending-up', 'clipboard-list'].map((v) => ({ title: v, value: v }))

const CARD_ICON_OPTIONS = [
  'shield-alert', 'shield-check', 'shield', 'file-check', 'file-search', 'file-text',
  'scale', 'clipboard-check', 'activity', 'message-square', 'smartphone',
  'dollar-sign', 'user-plus', 'bar-chart', 'database',
].map((v) => ({ title: v, value: v }))

export const useCaseType = defineType({
  name: 'useCase',
  title: 'Use Case',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Must exactly match an existing use case slug, e.g. "how-agentic-ai-is-transforming-fintech" (the part after /use-cases/ in the URL). Ask a developer if unsure.',
      type: 'slug',
      options: { maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero (also used for the listing card) ──────────────────
    defineField({ name: 'listingTag', title: 'Tag', description: 'e.g. "FinTech · Agentic AI"', type: 'string', group: 'hero', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroTag', title: 'Small label above headline', description: 'e.g. "Use Case"', type: 'string', group: 'hero', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'heroTitleLines',
      title: 'Headline (each line separate)',
      description: 'The headline is split into lines. Add one line per entry, in the order they should appear.',
      type: 'array',
      group: 'hero',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'heroSubtitle', title: 'Paragraph', type: 'text', rows: 3, group: 'hero', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroImage', title: 'Hero image (optional)', description: 'Leave empty to keep the current image.', type: 'image', group: 'hero' }),
    defineField({ name: 'heroImageAlt', title: 'Hero image alt text', type: 'string', group: 'hero' }),
    defineField({ name: 'heroBreadcrumbLabel', title: 'Breadcrumb label', description: 'e.g. "FinTech Agentic AI"', type: 'string', group: 'hero', validation: (Rule) => Rule.required() }),

    // ── Why Invest ──────────────────────────────────────────────
    defineField({ name: 'whyTitle', title: 'Heading', type: 'string', group: 'why', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'whyCards',
      title: 'Cards',
      description: 'The list below is collapsed — click any card to expand and edit it.',
      type: 'array',
      group: 'why',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'whyCard',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: WHY_ICON_OPTIONS }, validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        },
      ],
    }),

    // ── Use Case Cards ──────────────────────────────────────────
    defineField({ name: 'gridTitle', title: 'Heading', type: 'string', group: 'cards', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'cards',
      title: 'Use case cards',
      description: 'The list below is collapsed — click any card to expand and edit it.',
      type: 'array',
      group: 'cards',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'useCaseCard',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: CARD_ICON_OPTIONS }, validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'subtitle', title: 'Subtitle (optional)', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'benefitsTitle', title: 'Benefits list heading (optional)', type: 'string' }),
            defineField({
              name: 'benefits',
              title: 'Benefit bullet points',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule: any) => Rule.required().min(1),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        },
      ],
    }),

    // ── FAQ ─────────────────────────────────────────────────────
    defineField({
      name: 'faqs',
      title: 'Questions',
      description: 'The list below is collapsed — click any question to expand it.',
      type: 'array',
      group: 'faq',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'useCaseFaq',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: 'q', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'a', title: 'Answer', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() }),
          ],
          preview: { select: { title: 'q' } },
        },
      ],
    }),

    // ── Bottom CTA ──────────────────────────────────────────────
    defineField({ name: 'ctaTitle', title: 'Heading', type: 'string', group: 'cta', validation: (Rule) => Rule.required() }),
    defineField({ name: 'ctaDescription', title: 'Paragraph', type: 'text', rows: 2, group: 'cta', validation: (Rule) => Rule.required() }),
    defineField({ name: 'ctaButtonLabel', title: 'Button text', type: 'string', group: 'cta', validation: (Rule) => Rule.required() }),
  ],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'why', title: 'Why Invest' },
    { name: 'cards', title: 'Use Case Cards' },
    { name: 'faq', title: 'FAQ' },
    { name: 'cta', title: 'Bottom CTA' },
  ],
  preview: {
    select: { title: 'heroTitleLines.0', subtitle: 'slug.current' },
  },
})