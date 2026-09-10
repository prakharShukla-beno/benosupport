import { defineField, defineType } from 'sanity'

// Safe, fixed list of valid internal pages — prevents anyone from typing a
// broken/mistyped URL. Add new options here if new pages are added later.
const VALID_ROUTES = [
  { title: 'Home (/)', value: '/' },
  { title: 'Services (/services)', value: '/services' },
  { title: 'Industries (/industries)', value: '/industries' },
  { title: 'Company (/company)', value: '/company' },
  { title: 'Blog (/blog)', value: '/blog' },
  { title: 'Use Cases (/use-cases)', value: '/use-cases' },
  { title: 'Case Studies (/case-studies)', value: '/case-studies' },
  { title: 'Contact (/contact)', value: '/contact' },
  { title: 'Privacy Policy (/privacy-policy)', value: '/privacy-policy' },
  { title: 'Terms (/terms)', value: '/terms' },
  { title: 'Sitemap (/sitemap)', value: '/sitemap' },
]

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // ── Header ──────────────────────────────────────────────────
    defineField({
      name: 'headerHomeLabel',
      title: 'Home label',
      type: 'string',
      group: 'header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerServicesLabel',
      title: 'Services menu label',
      description: 'The word for the Services dropdown trigger. This opens the mega-menu — it is not a plain link, so it has no URL to pick.',
      type: 'string',
      group: 'header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerNavLinks',
      title: 'Other nav links',
      description: 'Currently "Industries" and "Company". Pick the destination from the dropdown list — this prevents typos that would break the link.',
      type: 'array',
      group: 'header',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'headerNavLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() }),
            defineField({
              name: 'href',
              title: 'Links to',
              type: 'string',
              options: { list: VALID_ROUTES },
              validation: (Rule: any) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'headerResourcesLabel',
      title: 'Resources menu label',
      description: 'The word for the Resources dropdown trigger. This opens a mega-menu — it is not a plain link, so it has no URL to pick.',
      type: 'string',
      group: 'header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerCtaLabel',
      title: 'Header CTA button text',
      description: 'e.g. "Talk To Our Experts" — shown on the button in the top-right of the header.',
      type: 'string',
      group: 'header',
      validation: (Rule) => Rule.required(),
    }),

    // ── Footer ──────────────────────────────────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      description: 'The short line under the logo in the footer.',
      type: 'text',
      rows: 2,
      group: 'footer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text',
      description: 'e.g. "© 2026 Beno Support. All Rights Reserved."',
      type: 'string',
      group: 'footer',
      validation: (Rule) => Rule.required(),
    }),

    // ── Contact Info ────────────────────────────────────────────
    defineField({
      name: 'contactPhone1',
      title: 'Phone number 1',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactPhone2',
      title: 'Phone number 2 (optional)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email address',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      description: 'Digits only, with country code, no + or spaces. e.g. "918929884560"',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'officeLocations',
      title: 'Office locations',
      description: 'Shown on the Contact page. The list below is collapsed — click any card to expand and edit it.',
      type: 'array',
      group: 'contact',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'officeLocation',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'e.g. "CORPORATE OFFICE"',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'address',
              title: 'Address',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'address' } },
        },
      ],
    }),
  ],
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contact Info' },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings', subtitle: 'Footer & Contact Info' }
    },
  },
})