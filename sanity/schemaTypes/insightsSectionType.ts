import { defineField, defineType } from 'sanity'

export const insightsSectionType = defineType({
  name: 'insightsSection',
  title: 'Homepage Insights (heading only)',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Blog & Resources"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "AI, Engineering & Technology Insights"',
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
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Homepage Insights',
        subtitle: 'Only the heading text — the 3 blog cards below come from Posts (already CMS-driven)',
      }
    },
  },
})