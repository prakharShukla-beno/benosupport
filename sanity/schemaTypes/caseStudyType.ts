import { defineField, defineType } from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Must exactly match an existing case study slug, e.g. "bihar-tourism-digital-ecosystem" (the part after /case-studies/ in the URL). Ask a developer if unsure.',
      type: 'slug',
      options: { maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),

    // ── Listing card (shown on /case-studies) ──────────────────
    defineField({
      name: 'listingTag',
      title: 'Tag',
      description: 'e.g. "Government · Tourism"',
      type: 'string',
      group: 'listing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listingTitle',
      title: 'Title',
      type: 'string',
      group: 'listing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listingExcerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'listing',
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero ────────────────────────────────────────────────────
    defineField({
      name: 'layout',
      title: 'Hero layout style',
      description: 'Controls how the hero section looks. Ask a developer if unsure which to pick.',
      type: 'string',
      group: 'hero',
      options: {
        list: [
          { title: 'Overlay (full-bleed image with text on top)', value: 'overlay' },
          { title: 'Split (image card beside text)', value: 'split' },
          { title: 'Bleed (full-height background image)', value: 'bleed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'heroEyebrow', title: 'Small label above headline', type: 'string', group: 'hero', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroTitle', title: 'Headline', type: 'string', group: 'hero', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroDescription', title: 'Paragraph', type: 'text', rows: 3, group: 'hero', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroImage', title: 'Hero image (optional)', description: 'Leave empty to keep the current image.', type: 'image', group: 'hero' }),
    defineField({ name: 'heroImageAlt', title: 'Hero image alt text', type: 'string', group: 'hero' }),
    defineField({ name: 'heroLogo', title: 'Client logo (optional)', type: 'image', group: 'hero' }),
    defineField({ name: 'heroLogoAlt', title: 'Client logo alt text', type: 'string', group: 'hero' }),
    defineField({ name: 'heroDuration', title: 'Duration shown in hero (optional)', description: 'e.g. "Mar 2020 — Mar 2023"', type: 'string', group: 'hero' }),
    defineField({ name: 'heroStackSummary', title: 'Tech stack summary (optional)', description: 'e.g. "Adobe Experience Cloud · Flutter · Laravel"', type: 'string', group: 'hero' }),

    // ── Overview ────────────────────────────────────────────────
    defineField({ name: 'overviewClient', title: 'Client', type: 'string', group: 'overview', validation: (Rule) => Rule.required() }),
    defineField({ name: 'overviewIndustry', title: 'Industry', type: 'string', group: 'overview', validation: (Rule) => Rule.required() }),
    defineField({ name: 'overviewDuration', title: 'Duration', type: 'string', group: 'overview', validation: (Rule) => Rule.required() }),
    defineField({ name: 'overviewServices', title: 'Services provided', type: 'string', group: 'overview', validation: (Rule) => Rule.required() }),

    // ── Vision ──────────────────────────────────────────────────
    defineField({ name: 'visionTitle', title: 'Heading', type: 'string', group: 'vision', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'visionParagraphs',
      title: 'Paragraphs',
      type: 'array',
      group: 'vision',
      of: [{ type: 'text', rows: 3 }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'visionImage', title: 'Image (optional)', description: 'Leave empty to keep the current image.', type: 'image', group: 'vision' }),
    defineField({ name: 'visionImageAlt', title: 'Image alt text', type: 'string', group: 'vision' }),
    defineField({
      name: 'visionTheme',
      title: 'Theme',
      type: 'string',
      group: 'vision',
      options: { list: [{ title: 'Light', value: 'light' }, { title: 'Dark', value: 'dark' }] },
    }),
    defineField({
      name: 'visionBadge',
      title: 'Badge (optional)',
      description: 'A small highlighted stat shown on this section, if any.',
      type: 'object',
      group: 'vision',
      fields: [
        defineField({ name: 'value', title: 'Value', type: 'string' }),
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'string' }),
      ],
    }),

    // ── Challenges ──────────────────────────────────────────────
    defineField({ name: 'challengesTitle', title: 'Heading', type: 'string', group: 'challenges', validation: (Rule) => Rule.required() }),
    defineField({ name: 'challengesDescription', title: 'Description', type: 'text', rows: 2, group: 'challenges', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'challengesVariant',
      title: 'Display style',
      type: 'string',
      group: 'challenges',
      options: { list: [{ title: 'Columns', value: 'columns' }, { title: 'Cards', value: 'cards' }] },
    }),
    defineField({
      name: 'challengesItems',
      title: 'Challenge items',
      description: 'The list below is collapsed — click any item to expand and edit it.',
      type: 'array',
      group: 'challenges',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'challengeItem',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (Rule: any) => Rule.required() }),
            defineField({
              name: 'icon',
              title: 'Icon (optional)',
              type: 'string',
              options: {
                list: ['database', 'uptime', 'mobile', 'comms', 'search', 'shield'].map((v) => ({ title: v, value: v })),
              },
            }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── Solutions ───────────────────────────────────────────────
    defineField({ name: 'solutionsTitle', title: 'Heading', type: 'string', group: 'solutions', validation: (Rule) => Rule.required() }),
    defineField({ name: 'solutionsDescription', title: 'Description', type: 'text', rows: 2, group: 'solutions', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'solutionsVariant',
      title: 'Display style',
      type: 'string',
      group: 'solutions',
      options: { list: [{ title: 'Grid', value: 'grid' }, { title: 'Alternating', value: 'alternating' }] },
    }),
    defineField({
      name: 'solutionsItems',
      title: 'Solution items',
      description: 'The list below is collapsed — click any item to expand and edit it.',
      type: 'array',
      group: 'solutions',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'solutionItem',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (Rule: any) => Rule.required() }),
            defineField({
              name: 'highlights',
              title: 'Highlight bullet points',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule: any) => Rule.required().min(1),
            }),
            defineField({ name: 'outcome', title: 'Outcome line (optional)', type: 'text', rows: 2 }),
            defineField({ name: 'image', title: 'Image (optional)', type: 'image' }),
            defineField({ name: 'imageAlt', title: 'Image alt text', type: 'string' }),
            defineField({
              name: 'mediaSide',
              title: 'Image side',
              type: 'string',
              options: { list: [{ title: 'Left', value: 'left' }, { title: 'Right', value: 'right' }] },
            }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── Metrics ─────────────────────────────────────────────────
    defineField({ name: 'metricsIntro', title: 'Intro text (optional)', type: 'text', rows: 2, group: 'metrics' }),
    defineField({ name: 'metricsTitle', title: 'Heading (optional)', type: 'string', group: 'metrics' }),
    defineField({
      name: 'metricsVariant',
      title: 'Display style',
      type: 'string',
      group: 'metrics',
      options: { list: [{ title: 'Number cards', value: 'cards' }, { title: 'Table', value: 'table' }] },
    }),
    defineField({
      name: 'metricsItems',
      title: 'Metrics',
      type: 'array',
      group: 'metrics',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'metricItem',
          fields: [
            defineField({ name: 'value', title: 'Value', description: 'e.g. "+50%", "10K+", "#1"', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'description', title: 'Description (optional)', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),

    // ── Technology ──────────────────────────────────────────────
    defineField({ name: 'technologyTitle', title: 'Heading (optional)', type: 'string', group: 'technology' }),
    defineField({
      name: 'technologyGroups',
      title: 'Technology groups',
      description: 'Each group is a category (e.g. "Back-end & Database") with a list of technology names.',
      type: 'array',
      group: 'technology',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'technologyGroup',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: 'label', title: 'Group name', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({
              name: 'technologies',
              title: 'Technologies',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule: any) => Rule.required().min(1),
            }),
          ],
          preview: { select: { title: 'label' } },
        },
      ],
    }),

    // ── Business Outcome ────────────────────────────────────────
    defineField({
      name: 'businessOutcomeParagraphs',
      title: 'Paragraphs',
      type: 'array',
      group: 'outcome',
      of: [{ type: 'text', rows: 3 }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'businessOutcomeTheme',
      title: 'Theme',
      type: 'string',
      group: 'outcome',
      options: { list: [{ title: 'Light', value: 'light' }, { title: 'Dark', value: 'dark' }] },
    }),
    defineField({ name: 'testimonial', title: 'Testimonial quote (optional)', type: 'text', rows: 3, group: 'outcome' }),

    // ── Bottom CTA ──────────────────────────────────────────────
    defineField({ name: 'ctaTitle', title: 'Heading', type: 'string', group: 'cta', validation: (Rule) => Rule.required() }),
    defineField({ name: 'ctaDescription', title: 'Paragraph', type: 'text', rows: 2, group: 'cta', validation: (Rule) => Rule.required() }),
    defineField({ name: 'ctaButtonLabel', title: 'Button text', type: 'string', group: 'cta', validation: (Rule) => Rule.required() }),
  ],
  groups: [
    { name: 'listing', title: 'Listing Card' },
    { name: 'hero', title: 'Hero' },
    { name: 'overview', title: 'Overview' },
    { name: 'vision', title: 'Vision' },
    { name: 'challenges', title: 'Challenges' },
    { name: 'solutions', title: 'Solutions' },
    { name: 'metrics', title: 'Metrics' },
    { name: 'technology', title: 'Technology' },
    { name: 'outcome', title: 'Business Outcome' },
    { name: 'cta', title: 'Bottom CTA' },
  ],
  preview: {
    select: { title: 'listingTitle', subtitle: 'slug.current' },
  },
})