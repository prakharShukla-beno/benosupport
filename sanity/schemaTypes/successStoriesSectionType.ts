import { defineField, defineType } from 'sanity'

export const successStoriesSectionType = defineType({
  name: 'successStoriesSection',
  title: 'Homepage Success Stories (heading only)',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Case Studies"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "Success Stories"',
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
        title: title || 'Homepage Success Stories',
        subtitle: 'Only the heading text — the 2 case study cards below come from Case Studies data (separate)',
      }
    },
  },
})