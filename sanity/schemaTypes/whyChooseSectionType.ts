import { defineField, defineType } from 'sanity'

// This list must stay in sync with ICON_MAP in components/why-choose.tsx
const ICON_OPTIONS = [
  { title: 'Globe', value: 'Globe2' },
  { title: 'Layers', value: 'Layers' },
  { title: 'Trending Up (growth)', value: 'TrendingUp' },
  { title: 'Clock', value: 'Clock' },
  { title: 'Shield Check', value: 'ShieldCheck' },
  { title: 'Cpu (AI/tech)', value: 'Cpu' },
]

export const whyChooseSectionType = defineType({
  name: 'whyChooseSection',
  title: 'Homepage Why Choose Us',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Why Choose Us"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "Why Choose Beno Support"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle paragraph',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reasons',
      title: 'Reason cards',
      description: 'The grid of reason cards. Pick an icon from the list for each.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'reasonItem',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: ICON_OPTIONS },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              description: 'e.g. "Multi-Centre Global Delivery"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Homepage Why Choose Us', subtitle: 'Homepage Why Choose Us content' }
    },
  },
})