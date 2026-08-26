import { defineField, defineType } from 'sanity'

export const processSectionType = defineType({
  name: 'processSection',
  title: 'Homepage Process Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Small label above heading',
      description: 'e.g. "Our Process"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "How We Make It Happen"',
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
      name: 'phases',
      title: 'Process phases',
      description:
        'Each step of the process (shown in the left-side stepper and the detail card on the right). Order here is the step order.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'processPhase',
          fields: [
            defineField({
              name: 'phaseWord',
              title: 'Short phase word',
              description: 'One short word shown as a badge, e.g. "ASSESS", "PLAN", "BUILD"',
              type: 'string',
              validation: (Rule) => Rule.required().max(20),
            }),
            defineField({
              name: 'label',
              title: 'Step label (shown in the stepper)',
              description: 'e.g. "Our Approach"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle (shown under the label when this step is active)',
              description: 'e.g. "Foundational Discovery"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Detail card title',
              description: 'e.g. "Understanding your business before building solutions."',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Detail card description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'points',
              title: 'Checklist points',
              description: 'The short bullet points shown with checkmarks (usually 4).',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'imageAlt',
              title: 'Image alt text (for accessibility)',
              description: 'Describe what the image shows. Leave empty to reuse the step label.',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'phaseWord', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Homepage Process Section', subtitle: 'Homepage Process Section content' }
    },
  },
})










