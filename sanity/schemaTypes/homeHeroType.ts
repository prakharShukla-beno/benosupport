import { defineField, defineType } from 'sanity'

export const homeHeroType = defineType({
  name: 'homeHero',
  title: 'Homepage Hero',
  type: 'document',
  // Only ONE of these documents should ever exist — it's a "singleton"
  // (Studio structure.ts can later restrict creating more than one; not required for now)
  fields: [
    defineField({
      name: 'headlineLines',
      title: 'Headline (each line separate)',
      description:
        'The big animated heading is split into lines. Add one line per entry, in the order they should appear.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: 'paragraph',
      title: 'Subheading paragraph',
      description: 'The short paragraph shown below the headline.',
      type: 'text',
      rows: 3,
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
    defineField({
      name: 'backgroundVideo',
      title: 'Background video',
      description:
        'Upload an MP4 to replace the hero background video. Leave empty to keep the current default video.',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
    }),
    defineField({
      name: 'stats',
      title: 'Stat cards (right side)',
      description: 'The 3 small stat cards, e.g. "Projects Delivered — 500+".',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(3),
      of: [
        {
          type: 'object',
          name: 'statCard',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'e.g. "Projects Delivered"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Number',
              description: 'Just the number, e.g. 500 or 96',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              description: 'What appears right after the number, e.g. "+" or "%"',
              type: 'string',
              options: {
                list: [
                  { title: '+ (plus)', value: '+' },
                  { title: '% (percent)', value: '%' },
                ],
              },
              initialValue: '+',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headlineLines.0' },
    prepare({ title }) {
      return { title: title || 'Homepage Hero', subtitle: 'Homepage Hero content' }
    },
  },
})

