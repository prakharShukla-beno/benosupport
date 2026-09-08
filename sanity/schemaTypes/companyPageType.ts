import { defineField, defineType } from 'sanity'

export const companyPageType = defineType({
  name: 'companyPage',
  title: 'Company Page',
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
      name: 'heroParagraph',
      title: 'Paragraph',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCta1Label',
      title: 'Primary button text',
      description: 'e.g. "Talk To Our Experts"',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCta2Label',
      title: 'Secondary button text',
      description: 'e.g. "Explore Our Services"',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroStats',
      title: 'Stat boxes',
      description: 'The 4 stat boxes below the headline (e.g. "100+ Global Clients").',
      type: 'array',
      group: 'hero',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'heroStat',
          fields: [
            defineField({
              name: 'displayValue',
              title: 'Value',
              description: 'e.g. "100", "15", "24", or a word like "AI/Cloud"',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix (optional)',
              description: 'e.g. "+" or "/7". Leave empty if the value is a word, not a number.',
              type: 'string',
            }),
            defineField({
              name: 'isCounter',
              title: 'Animate as a counting number?',
              description: 'Turn ON if the value is a number that should count up on scroll. Turn OFF for word values like "AI/Cloud".',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'label',
              title: 'Label',
              description: 'e.g. "Global Clients"',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'displayValue' } },
        },
      ],
    }),

    // ── Who We Are ──────────────────────────────────────────────
    defineField({
      name: 'whoWeAreSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'whoWeAre',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whoWeAreTitle',
      title: 'Heading',
      type: 'string',
      group: 'whoWeAre',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whoWeAreParagraphs',
      title: 'Paragraphs',
      description: 'Each item is a separate paragraph.',
      type: 'array',
      group: 'whoWeAre',
      validation: (Rule) => Rule.required().min(1),
      of: [{ type: 'text', rows: 3 }],
    }),
    defineField({
      name: 'whoWeAreImage',
      title: 'Image (optional)',
      description: 'Leave empty to keep the current image.',
      type: 'image',
      group: 'whoWeAre',
    }),

    // ── Vision & Mission ────────────────────────────────────────
    defineField({
      name: 'visionMissionSectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "VISION & MISSION"',
      type: 'string',
      group: 'visionMission',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visionMissionItems',
      title: 'Cards',
      description: 'Normally 2 cards: Vision and Mission.',
      type: 'array',
      group: 'visionMission',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'visionMissionItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── Certifications ──────────────────────────────────────────
    defineField({
      name: 'certificationsSectionLabel',
      title: 'Small label above heading',
      type: 'string',
      group: 'certifications',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'certificationsTitle',
      title: 'Heading',
      type: 'string',
      group: 'certifications',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'certificationsCards',
      title: 'Certification cards',
      type: 'array',
      group: 'certifications',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'certificationCard',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'e.g. "CMMI Dev Level 3"',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'iconKey',
              title: 'Icon',
              description: 'Choose one of the 4 built-in icons.',
              type: 'string',
              options: {
                list: [
                  { title: 'Shield', value: 'shield' },
                  { title: 'Check (circle)', value: 'check' },
                  { title: 'Lock', value: 'lock' },
                  { title: 'Refresh', value: 'refresh' },
                ],
              },
              validation: (Rule: any) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'iconKey' } },
        },
      ],
    }),

    // ── Life at Beno ────────────────────────────────────────────
    defineField({
      name: 'lifeSectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Culture & People"',
      type: 'string',
      group: 'life',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lifeTitle',
      title: 'Heading',
      description: 'e.g. "Life at Beno"',
      type: 'string',
      group: 'life',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lifeParagraph',
      title: 'Paragraph',
      type: 'text',
      rows: 3,
      group: 'life',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lifePoints',
      title: 'Bullet points',
      type: 'array',
      group: 'life',
      validation: (Rule) => Rule.required().min(1),
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'lifeSlides',
      title: 'Photo slideshow',
      description: 'The auto-rotating photos on the right. Leave images empty to keep the current photos.',
      type: 'array',
      group: 'life',
      of: [
        {
          type: 'object',
          name: 'lifeSlide',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image' }),
            defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' }),
          ],
          preview: { select: { title: 'alt', media: 'image' } },
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
    { name: 'whoWeAre', title: 'Who We Are' },
    { name: 'visionMission', title: 'Vision & Mission' },
    { name: 'certifications', title: 'Certifications' },
    { name: 'life', title: 'Life at Beno' },
    { name: 'cta', title: 'Bottom CTA' },
  ],
  preview: {
    prepare() {
      return { title: 'Company Page', subtitle: 'Company page content' }
    },
  },
})