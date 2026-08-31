import { defineField, defineType } from 'sanity'

// Matches iconMap in components/service-page-content.tsx — keep these in sync.
const ICON_OPTIONS = [
  'Code2', 'Globe', 'Smartphone', 'Link2', 'Layers', 'GitBranch',
  'Shield', 'Zap', 'Lock', 'Award', 'Settings', 'TrendingUp', 'TrendingDown',
  'Bug', 'AlertCircle', 'FileCheck', 'Activity', 'Eye', 'BarChart2',
  'Server', 'Database', 'FileSearch', 'Headphones',
  'Bot', 'Brain', 'Lightbulb', 'MessageSquare', 'RefreshCw', 'FileText',
  'Palette', 'Monitor', 'Target', 'Search',
  'Map', 'Building2', 'Rocket', 'Users', 'CheckCircle',
  'PieChart', 'Clock', 'DollarSign',
  'Cloud', 'Network', 'GitMerge',
  'GraduationCap', 'UserCheck', 'Heart', 'BookOpen',
].map((name) => ({ title: name, value: name }))

// Reusable "capability card" shape — used by both Capabilities and Scale sections.
const capabilityCardFields = [
  defineField({
    name: 'iconName',
    title: 'Icon',
    type: 'string',
    options: { list: ICON_OPTIONS },
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'title',
    title: 'Title',
    description: 'Use a line break for a 2-line title if needed.',
    type: 'text',
    rows: 2,
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 3,
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'highlighted',
    title: 'Highlight this card?',
    type: 'boolean',
    initialValue: false,
  }),
  defineField({
    name: 'features',
    title: 'Feature bullet points',
    type: 'array',
    of: [{ type: 'string' }],
  }),
]

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'MUST exactly match an existing service slug for this to work, e.g. "core-engineering-application-architecture" (the part after /services/ in the URL). Ask your developer if unsure.',
      type: 'slug',
      options: { maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),

    // Note: SEO (page title/description) is intentionally NOT editable here —
    // it always stays as the original hardcoded value from lib/services-data.ts.

    // ── Hero ────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'hero',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Headline — line 1',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTagline2',
      title: 'Headline — line 2 (optional)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline3',
      title: 'Headline — line 3 (optional)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero paragraph',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCtaButtons',
      title: 'Hero button labels (in order: primary, secondary)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
    }),

    // ── Intro ───────────────────────────────────────────────────
    defineField({
      name: 'introSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'intro',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introTitle',
      title: 'Heading',
      type: 'string',
      group: 'intro',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'intro',
      validation: (Rule) => Rule.required().min(1),
    }),

    // ── Capabilities ────────────────────────────────────────────
    defineField({
      name: 'capabilitiesSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'capabilities',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capabilitiesTitle',
      title: 'Heading',
      type: 'string',
      group: 'capabilities',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capabilitiesSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'capabilities',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capabilitiesCards',
      title: 'Capability cards',
      type: 'array',
      group: 'capabilities',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'capabilityCard',
          fields: capabilityCardFields,
          preview: { select: { title: 'title', subtitle: 'iconName' } },
        },
      ],
    }),

    // ── Scale ───────────────────────────────────────────────────
    defineField({
      name: 'scaleSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'scale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scaleTitle',
      title: 'Heading',
      type: 'string',
      group: 'scale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scaleSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'scale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scaleCards',
      title: 'Cards',
      type: 'array',
      group: 'scale',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'scaleCard',
          fields: capabilityCardFields,
          preview: { select: { title: 'title', subtitle: 'iconName' } },
        },
      ],
    }),

    // Note: Use Cases is intentionally NOT editable here — that section is
    // currently disabled on the live site, so it always stays frozen as the
    // original hardcoded value from lib/services-data.ts.

    // ── CTA (optional) ──────────────────────────────────────────
    defineField({
      name: 'ctaTitle',
      title: 'Heading',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaContent',
      title: 'Paragraph',
      type: 'text',
      rows: 2,
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Button labels',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'cta',
    }),

    // ── FAQ (optional) ──────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
  ],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'intro', title: 'Intro' },
    { name: 'capabilities', title: 'Capabilities' },
    { name: 'scale', title: 'Scale' },
    { name: 'cta', title: 'Bottom CTA' },
    { name: 'faq', title: 'FAQ' },
  ],
  preview: {
    select: { title: 'heroTagline', subtitle: 'slug.current' },
  },
})