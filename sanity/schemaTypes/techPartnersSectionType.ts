import { defineField, defineType } from 'sanity'

export const techPartnersSectionType = defineType({
  name: 'techPartnersSection',
  title: 'Homepage Tech Partners',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Tech Alliances"',
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
      name: 'partners',
      title: 'Partner cards',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'partnerItem',
          fields: [
            defineField({
              name: 'name',
              title: 'Partner name',
              description: 'e.g. "Microsoft Azure"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              description: 'Upload the partner logo (SVG or PNG recommended)',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Homepage Tech Partners', subtitle: 'Homepage Tech Partners content' }
    },
  },
})