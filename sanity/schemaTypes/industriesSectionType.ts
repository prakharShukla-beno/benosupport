import { defineField, defineType } from 'sanity'

// This list must stay in sync with ICON_MAP in components/industries-section.tsx
const ICON_OPTIONS = [
  { title: 'Fintech (Landmark)', value: 'Landmark' },
  { title: 'IT / SaaS (Shield Check)', value: 'ShieldCheck' },
  { title: 'Healthcare (Heart Pulse)', value: 'HeartPulse' },
  { title: 'Education (Graduation Cap)', value: 'GraduationCap' },
  { title: 'Government (Building)', value: 'Building2' },
  { title: 'Travel (Plane)', value: 'Plane' },
  { title: 'Hospitality (Hotel)', value: 'Hotel' },
  { title: 'E-commerce (Shopping Cart)', value: 'ShoppingCart' },
  { title: 'Telecom (Radio)', value: 'Radio' },
  { title: 'Aviation (Line Chart)', value: 'LineChart' },
  { title: 'Insurance (Shield)', value: 'Shield' },
  { title: 'Gaming (Gamepad)', value: 'Gamepad2' },
]

export const industriesSectionType = defineType({
  name: 'industriesSection',
  title: 'Homepage Industries',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Industries We Serve"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description paragraph',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Industry cards',
      description: 'The grid of industry cards. Pick an icon from the list for each.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'industryItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Industry name',
              description: 'e.g. "Fintech"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: ICON_OPTIONS },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'icon' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Homepage Industries', subtitle: 'Homepage Industries content' }
    },
  },
})