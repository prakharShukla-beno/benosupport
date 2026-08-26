import { defineField, defineType } from 'sanity'

export const ctaSectionType = defineType({
  name: 'ctaSection',
  title: 'Homepage Bottom CTA',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "Ready to Accelerate Digital Innovation?"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary button text',
      description: 'e.g. "Request a Proposal"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary button text',
      description: 'e.g. "Talk To Our Experts"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Homepage Bottom CTA', subtitle: 'Homepage CTA content' }
    },
  },
})
