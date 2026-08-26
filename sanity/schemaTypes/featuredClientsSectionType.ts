import { defineField, defineType } from 'sanity'

export const featuredClientsSectionType = defineType({
  name: 'featuredClientsSection',
  title: 'Homepage Featured Clients',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Our Clients"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "OUR FEATURED CLIENTS"',
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
      name: 'rows',
      title: 'Client rows',
      description:
        'Each row is a scrolling strip of logos with its own label (e.g. "Government", "Technology"). The original design shows exactly 4 rows — the last 2 side-by-side. Keep 4 rows to preserve that layout exactly; a different number of rows will still work but will stack simply, full-width.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'clientRow',
          fields: [
            defineField({
              name: 'rowLabel',
              title: 'Row label',
              description: 'e.g. "Government"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'clients',
              title: 'Client logos in this row',
              type: 'array',
              validation: (Rule) => Rule.required().min(1),
              of: [
                {
                  type: 'object',
                  name: 'clientLogo',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Client name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'logo',
                      title: 'Logo image',
                      description: 'Upload the client/partner logo (SVG or PNG recommended, transparent background).',
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
            select: { title: 'rowLabel', clients: 'clients' },
            prepare({ title, clients }) {
              const count = Array.isArray(clients) ? clients.length : 0
              return { title, subtitle: `${count} logos` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Homepage Featured Clients', subtitle: 'Homepage Featured Clients content' }
    },
  },
})