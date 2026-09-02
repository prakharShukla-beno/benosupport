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
  'Briefcase', 'ShieldCheck', 'Workflow',
].map((name) => ({ title: name, value: name }))

// Reusable "capability card" shape — used by both Capabilities and Scale sections.
// Each card is collapsed by default (shows just its title) so a list of 6-7 cards
// doesn't turn into one giant scrolling form.
const capabilityCardFields = [
  defineField({
    name: 'iconName',
    title: 'Icon',
    description: 'The small icon shown in the top-left of the card.',
    type: 'string',
    options: { list: ICON_OPTIONS },
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'title',
    title: 'Title',
    description: 'The card\'s bold heading. Press Enter for a 2-line title if needed.',
    type: 'text',
    rows: 2,
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    description: 'The short paragraph shown below the title.',
    type: 'text',
    rows: 3,
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'highlighted',
    title: 'Highlight this card?',
    description: 'Turning this on makes the card stand out slightly from the other cards.',
    type: 'boolean',
    initialValue: false,
  }),
  defineField({
    name: 'features',
    title: 'Bullet points (optional)',
    description: 'Small bullet points inside the card, if needed.',
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
        'Must exactly match the existing service URL, e.g. "core-engineering-application-architecture" (the part after /services/ in the URL). Ask a developer if unsure — an incorrect slug means this content won\'t connect to any page.',
      type: 'slug',
      options: { maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),

    // Note: SEO (page title/description) is intentionally NOT editable here —
    // it always stays as the original hardcoded value from lib/services-data.ts.

    // ── Hero ────────────────────────────────────────────────────
    // The very top of the page, dark navy background.
    defineField({
      name: 'heroImage',
      title: 'Hero image (optional)',
      description: 'The image shown in the background.',
      type: 'image',
      group: 'hero',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt text (optional)',
      description: 'A short text description of the image, for accessibility/SEO. Not shown anywhere on the page itself.',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Headline — line 1',
      description: 'The first line of the large headline.',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTagline2',
      title: 'Headline — line 2 (optional)',
      description: 'If the headline should break across 2–3 lines, write the second line here. Can be left empty.',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline3',
      title: 'Headline — line 3 (optional)',
      description: 'A third line, if needed. Can be left empty.',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero paragraph',
      description: 'The short paragraph shown below the headline.',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCtaButtons',
      title: 'Button labels (optional)',
      description: 'First item = primary button text, second item = secondary button text.',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
    }),

    // ── Intro ───────────────────────────────────────────────────
    // Right after the hero, white background, short text section.
    defineField({
      name: 'introSectionLabel',
      title: 'Small label above heading',
      description: 'A short uppercase label shown above the heading.',
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
      description: 'Each item is a separate paragraph. Use "+ Add item" to add another paragraph.',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'intro',
      validation: (Rule) => Rule.required().min(1),
    }),

    // ── Capabilities ────────────────────────────────────────────
    // Dark navy background, grid of cards (e.g. "Custom SaaS Development").
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
      description: 'The list below is collapsed — click any card to expand and edit it. Use "+ Add item" to add a new card.',
      type: 'array',
      group: 'capabilities',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'capabilityCard',
          fields: capabilityCardFields,
          options: { collapsible: true, collapsed: true },
          preview: { select: { title: 'title', subtitle: 'iconName' } },
        },
      ],
    }),

    // ── Scale ───────────────────────────────────────────────────
    // Another card grid, similar to Capabilities, shown below the Industries section.
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
      description: 'The list below is collapsed — click any card to expand and edit it. Use "+ Add item" to add a new card.',
      type: 'array',
      group: 'scale',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'scaleCard',
          fields: capabilityCardFields,
          options: { collapsible: true, collapsed: true },
          preview: { select: { title: 'title', subtitle: 'iconName' } },
        },
      ],
    }),

    // Note: Use Cases is intentionally NOT editable here — that section is
    // currently disabled on the live site, so it always stays frozen as the
    // original hardcoded value from lib/services-data.ts.

    // ── CTA (optional) ──────────────────────────────────────────
    // Near the bottom of the page, dark navy banner.
    defineField({
      name: 'ctaTitle',
      title: 'Heading (optional)',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaContent',
      title: 'Paragraph (optional)',
      type: 'text',
      rows: 2,
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Button labels (optional)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'cta',
    }),

    // ── FAQ (optional) ──────────────────────────────────────────
    // At the very bottom, a list of questions and answers.
    defineField({
      name: 'faq',
      title: 'FAQ',
      description: 'The list below is collapsed — click any question to expand it. Use "+ Add item" to add a new question.',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          options: { collapsible: true, collapsed: true },
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