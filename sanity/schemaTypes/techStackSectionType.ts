import { defineField, defineType } from 'sanity'

export const techStackSectionType = defineType({
  name: 'techStackSection',
  title: 'Homepage Tech Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Technology Stack"',
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
      name: 'categories',
      title: 'Tabs (categories)',
      description:
        'Each tab (e.g. "Front-end", "Back-end") with its own list of tech logos. Order here is the tab order shown on the site.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'techCategory',
          fields: [
            defineField({
              name: 'tabName',
              title: 'Tab name',
              description: 'e.g. "Front-end"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Technologies in this tab',
              type: 'array',
              validation: (Rule) => Rule.required().min(1),
              of: [
                {
                  type: 'object',
                  name: 'techItem',
                  validation: (Rule) =>
                    Rule.custom((value: { iconUrl?: string; iconImage?: unknown } | undefined) => {
                      if (!value) return true
                      if (!value.iconUrl && !value.iconImage) {
                        return 'Provide either an Icon URL or upload an image'
                      }
                      return true
                    }),
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Name',
                      description: 'e.g. "React.js"',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'iconUrl',
                      title: 'Icon URL (option 1)',
                      description:
                        'Paste a direct link to the icon image (e.g. from devicon.dev or simpleicons.org). Leave empty if you uploaded an image below instead.',
                      type: 'url',
                    }),
                    defineField({
                      name: 'iconImage',
                      title: 'Or upload icon image (option 2)',
                      description:
                        'Upload an icon file directly instead of pasting a URL. If both are filled in, the uploaded image is used.',
                      type: 'image',
                    }),
                    defineField({
                      name: 'invertIcon',
                      title: 'Invert icon color?',
                      description:
                        'Turn ON if the icon is a dark/black logo that would be invisible on the dark navy background (makes it white instead).',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: { title: 'name', media: 'iconUrl' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'tabName', items: 'items' },
            prepare({ title, items }) {
              const count = Array.isArray(items) ? items.length : 0
              return { title, subtitle: `${count} technologies` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Homepage Tech Stack', subtitle: 'Homepage Tech Stack content' }
    },
  },
})