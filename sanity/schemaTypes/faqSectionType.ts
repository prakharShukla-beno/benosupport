import { defineField, defineType } from 'sanity'

export const faqSectionType = defineType({
  name: 'faqSection',
  title: 'Homepage FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Frequently Asked Questions"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "Frequently Asked Questions"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Questions & Answers',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Homepage FAQ', subtitle: 'Homepage FAQ content' }
    },
  },
})


