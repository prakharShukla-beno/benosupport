import { defineField, defineType } from 'sanity'

// Icon set for this page's cards (Challenges, Solutions, Why Choose Us).
const ICON_OPTIONS = [
  'Code2', 'TrendingDown', 'ShieldAlert', 'Layers', 'BarChart2', 'Users2',
  'Bot', 'ShieldCheck', 'Cloud', 'Database', 'Monitor', 'Boxes', 'Cpu',
  'Star', 'Globe', 'Zap', 'Lock', 'Award', 'Settings', 'TrendingUp',
  'Eye', 'Server', 'FileSearch', 'Headphones', 'Brain', 'Lightbulb',
  'RefreshCw', 'FileText', 'Palette', 'Target', 'Search', 'Map',
  'Building2', 'Rocket', 'Users', 'CheckCircle', 'Clock', 'Network',
  'GitMerge', 'GraduationCap', 'UserCheck', 'Heart', 'BookOpen',
].map((name) => ({ title: name, value: name }))

// Reusable "simple card" shape — icon + title + description. Used by
// Challenges, Solutions, and Why Choose Us — all three sections use this
// exact same card shape on this page.
const simpleCardFields = [
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
    type: 'string',
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 3,
    validation: (Rule: any) => Rule.required(),
  }),
]

export const industriesPageType = defineType({
  name: 'industriesPage',
  title: 'Industries Page',
  type: 'document',
  fields: [
    // ── Hero ────────────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Paragraph',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroStats',
      title: 'Stat labels',
      description: 'The 4 small stat boxes below the paragraph. Each is just a short label.',
      type: 'array',
      group: 'hero',
      validation: (Rule) => Rule.required().min(1),
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'heroCta1',
      title: 'Primary button text',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCta2',
      title: 'Secondary button text',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),

    // ── Challenges ──────────────────────────────────────────────
    defineField({
      name: 'challengesSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'challenges',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challengesTitle',
      title: 'Heading',
      type: 'string',
      group: 'challenges',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challengesSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'challenges',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challengesCards',
      title: 'Cards',
      description: 'The list below is collapsed — click any card to expand and edit it.',
      type: 'array',
      group: 'challenges',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'challengeCard',
          fields: simpleCardFields,
          options: { collapsible: true, collapsed: true },
          preview: { select: { title: 'title', subtitle: 'iconName' } },
        },
      ],
    }),

    // ── Solutions ───────────────────────────────────────────────
    defineField({
      name: 'solutionsSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solutionsTitle',
      title: 'Heading',
      type: 'string',
      group: 'solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solutionsSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solutionsCards',
      title: 'Cards',
      description: 'The list below is collapsed — click any card to expand and edit it.',
      type: 'array',
      group: 'solutions',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'solutionCard',
          fields: simpleCardFields,
          options: { collapsible: true, collapsed: true },
          preview: { select: { title: 'title', subtitle: 'iconName' } },
        },
      ],
    }),

    // ── Business Outcomes ───────────────────────────────────────
    defineField({
      name: 'outcomesSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'outcomes',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'outcomesTitle',
      title: 'Heading',
      type: 'string',
      group: 'outcomes',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'outcomesParagraph',
      title: 'Paragraph',
      type: 'text',
      rows: 2,
      group: 'outcomes',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'outcomesSubheading',
      title: 'Small sub-heading above the list',
      description: 'e.g. "Outcome Metrics"',
      type: 'string',
      group: 'outcomes',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'outcomesList',
      title: 'Outcome list',
      description: 'The checklist of outcomes shown on the left.',
      type: 'array',
      group: 'outcomes',
      validation: (Rule) => Rule.required().min(1),
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'outcomesImage',
      title: 'Image (optional)',
      description: 'The image shown on the right. Leave empty to keep the current image.',
      type: 'image',
      group: 'outcomes',
    }),

    // ── Why Choose Us ───────────────────────────────────────────
    defineField({
      name: 'whyChooseSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'whyChoose',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whyChooseTitle',
      title: 'Heading',
      type: 'string',
      group: 'whyChoose',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whyChooseCards',
      title: 'Cards',
      description: 'The list below is collapsed — click any card to expand and edit it.',
      type: 'array',
      group: 'whyChoose',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'whyChooseCard',
          fields: simpleCardFields,
          options: { collapsible: true, collapsed: true },
          preview: { select: { title: 'title', subtitle: 'iconName' } },
        },
      ],
    }),

    // ── FAQ ─────────────────────────────────────────────────────
    defineField({
      name: 'faqSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'faq',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqTitle',
      title: 'Heading',
      type: 'string',
      group: 'faq',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'faq',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faq',
      title: 'Questions',
      description: 'The list below is collapsed — click any question to expand it.',
      type: 'array',
      group: 'faq',
      validation: (Rule) => Rule.required().min(1),
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

    // ── Bottom CTA ──────────────────────────────────────────────
    defineField({
      name: 'ctaTitle',
      title: 'Heading',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaParagraph',
      title: 'Paragraph',
      type: 'text',
      rows: 2,
      group: 'cta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary button text',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Secondary button text',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
    }),
  ],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'challenges', title: 'Challenges' },
    { name: 'solutions', title: 'Solutions' },
    { name: 'outcomes', title: 'Business Outcomes' },
    { name: 'whyChoose', title: 'Why Choose Us' },
    { name: 'faq', title: 'FAQ' },
    { name: 'cta', title: 'Bottom CTA' },
  ],
  preview: {
    prepare() {
      return { title: 'Industries Page', subtitle: 'Industries page content' }
    },
  },
})