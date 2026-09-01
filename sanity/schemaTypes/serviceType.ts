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
// Each card is collapsed by default (shows just its title) so a list of 6-7 cards
// doesn't turn into one giant scrolling form.
const capabilityCardFields = [
  defineField({
    name: 'iconName',
    title: 'Icon',
    description: 'Card ke top-left mein chhota icon dikhega.',
    type: 'string',
    options: { list: ICON_OPTIONS },
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'title',
    title: 'Title',
    description: 'Card ka bada bold heading. Agar 2 lines mein chahiye to Enter dabao.',
    type: 'text',
    rows: 2,
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    description: 'Title ke neeche chhota paragraph.',
    type: 'text',
    rows: 3,
    validation: (Rule: any) => Rule.required(),
  }),
  defineField({
    name: 'highlighted',
    title: 'Is card ko highlight karna hai?',
    description: 'ON karne se card thoda alag/prominent dikhega baaki cards se.',
    type: 'boolean',
    initialValue: false,
  }),
  defineField({
    name: 'features',
    title: 'Bullet points (optional)',
    description: 'Card ke andar chhote bullet points, agar chahiye.',
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
        'Yeh existing service ke URL se bilkul match hona chahiye, jaise "core-engineering-application-architecture" (jo /services/ ke baad aata hai URL mein). Doubt ho to developer se pooch lena, galat slug likhne se ye service kisi bhi page pe connect nahi hoga.',
      type: 'slug',
      options: { maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),

    // Note: SEO (page title/description) is intentionally NOT editable here —
    // it always stays as the original hardcoded value from lib/services-data.ts.

    // ── Hero ────────────────────────────────────────────────────
    // Page ke sabse upar, dark navy background wala hissa.
    defineField({
      name: 'heroImage',
      title: 'Hero image (optional)',
      description: 'Background mein dikhne wali image.',
      type: 'image',
      group: 'hero',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt text (optional)',
      description: 'Image ka chhota text-description, accessibility/SEO ke liye. Page pe kahin dikhta nahi.',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Headline — line 1',
      description: 'Sabse badi heading ki pehli line.',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTagline2',
      title: 'Headline — line 2 (optional)',
      description: 'Agar heading 2-3 lines mein todni ho, yahan doosri line likho. Khaali chhod sakte ho.',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline3',
      title: 'Headline — line 3 (optional)',
      description: 'Teesri line, agar chahiye. Khaali chhod sakte ho.',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero paragraph',
      description: 'Heading ke neeche wala chhota paragraph.',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCtaButtons',
      title: 'Button labels (optional)',
      description: 'Pehla item = pehla (primary) button ka text, doosra item = doosra (secondary) button ka text.',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
    }),

    // ── Intro ───────────────────────────────────────────────────
    // Hero ke turant baad, white background wala chhota text section.
    defineField({
      name: 'introSectionLabel',
      title: 'Small label above heading',
      description: 'Chhota sa uppercase text, heading ke upar.',
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
      description: 'Har item ek alag paragraph hai. "+ Add item" se naya paragraph jodo.',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'intro',
      validation: (Rule) => Rule.required().min(1),
    }),

    // ── Capabilities ────────────────────────────────────────────
    // Dark navy background, "cards" ka grid — jaise "Custom SaaS Development" etc.
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
      description: 'Neeche list collapsed hai — kisi card pe click karke usko khol sakte ho edit karne ke liye. "+ Add item" se naya card jodo.',
      type: 'array',
      group: 'capabilities',
      validation: (Rule) => Rule.required().min(1),
      options: { collapsible: true, collapsed: true },
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
    // Capabilities jaisa hi ek aur cards grid, Industries section ke neeche.
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
      description: 'Neeche list collapsed hai — kisi card pe click karke usko khol sakte ho edit karne ke liye. "+ Add item" se naya card jodo.',
      type: 'array',
      group: 'scale',
      validation: (Rule) => Rule.required().min(1),
      options: { collapsible: true, collapsed: true },
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
    // Page ke aakhir ke pehle, dark navy banner.
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
    // Sabse neeche, questions/answers ki list.
    defineField({
      name: 'faq',
      title: 'FAQ',
      description: 'Neeche list collapsed hai — kisi question pe click karke usko khol sakte ho. "+ Add item" se naya question jodo.',
      type: 'array',
      group: 'faq',
      options: { collapsible: true, collapsed: true },
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