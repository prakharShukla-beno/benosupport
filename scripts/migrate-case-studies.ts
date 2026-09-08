/**
 * One-time migration: pushes all Case Study text content from
 * lib/case-studies-data.ts into Sanity, so you don't have to manually
 * copy-paste every field in Studio.
 *
 * What it does:
 *   - For each of the 4 case studies, creates (or updates, if one already
 *     exists for that slug) a "caseStudy" document with all its text.
 *   - Does NOT touch images — hero/vision/solution images keep using the
 *     original site images automatically. You can add new ones in Studio
 *     any time you want to replace them.
 *   - Safe to run more than once: it finds the existing document for a
 *     slug (if any) and updates it in place, instead of creating a
 *     duplicate.
 *
 * ── One-time setup (skip if already done for the other migrate scripts) ──
 * 1. Get a WRITE token: https://www.sanity.io/manage → your project → API
 *    → Tokens → "Add API token" → Permissions: "Editor" → copy it.
 * 2. Add it to .env.local:  SANITY_API_WRITE_TOKEN=paste_your_token_here
 * 3. Install tsx (if not already installed):  npm install -D tsx
 *
 * ── Run it ───────────────────────────────────────────────────────────────
 *      npx tsx scripts/migrate-case-studies.ts
 */

import { config as loadEnv } from "dotenv"
loadEnv({ path: ".env.local" })

import { createClient } from "next-sanity"
import { CASE_STUDY_DETAILS } from "../lib/case-studies-data"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.\n" +
      "Make sure you're running this from the project root, with .env.local present."
  )
  process.exit(1)
}

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
      "See the setup instructions at the top of this file."
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

function key(): string {
  return Math.random().toString(36).slice(2, 10)
}

async function migrate() {
  console.log(`Found ${CASE_STUDY_DETAILS.length} case studies. Starting...\n`)

  for (const detail of CASE_STUDY_DETAILS) {
    const existingId: string | null = await client.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0]._id`,
      { slug: detail.slug }
    )

    const doc = {
      _id: existingId || undefined,
      _type: "caseStudy",
      slug: { _type: "slug", current: detail.slug },

      listingTag: detail.listingTag,
      listingTitle: detail.listingTitle,
      listingExcerpt: detail.listingExcerpt,
      layout: detail.layout,

      // Hero images intentionally omitted — original site images are used automatically.
      heroEyebrow: detail.hero.eyebrow,
      heroTitle: detail.hero.title,
      heroDescription: detail.hero.description,
      heroImageAlt: detail.hero.imageAlt,
      heroLogoAlt: detail.hero.logoAlt,
      heroDuration: detail.hero.duration,
      heroStackSummary: detail.hero.stackSummary,

      overviewClient: detail.overview.client,
      overviewIndustry: detail.overview.industry,
      overviewDuration: detail.overview.duration,
      overviewServices: detail.overview.services,

      visionTitle: detail.vision.title,
      visionParagraphs: detail.vision.paragraphs,
      visionImageAlt: detail.vision.imageAlt,
      visionTheme: detail.vision.theme,
      visionBadge: detail.vision.badge
        ? {
            value: detail.vision.badge.value,
            label: detail.vision.badge.label,
            description: detail.vision.badge.description,
          }
        : undefined,

      challengesTitle: detail.challenges.title,
      challengesDescription: detail.challenges.description,
      challengesVariant: detail.challenges.variant,
      challengesItems: detail.challenges.items.map((c) => ({
        _type: "challengeItem",
        _key: key(),
        title: c.title,
        description: c.description,
        icon: c.icon,
      })),

      solutionsTitle: detail.solutions.title,
      solutionsDescription: detail.solutions.description,
      solutionsVariant: detail.solutions.variant,
      solutionsItems: detail.solutions.items.map((s) => ({
        _type: "solutionItem",
        _key: key(),
        title: s.title,
        description: s.description,
        highlights: s.highlights,
        outcome: s.outcome,
        imageAlt: s.imageAlt,
        mediaSide: s.mediaSide,
      })),

      metricsIntro: detail.metricsIntro,
      metricsTitle: detail.metricsTitle,
      metricsVariant: detail.metricsVariant,
      metricsItems: detail.metrics.map((m) => ({
        _type: "metricItem",
        _key: key(),
        value: m.value,
        label: m.label,
        description: m.description,
      })),

      technologyTitle: detail.technologyTitle,
      technologyGroups: detail.technologyGroups.map((g) => ({
        _type: "technologyGroup",
        _key: key(),
        label: g.label,
        technologies: g.technologies,
      })),

      businessOutcomeParagraphs: detail.businessOutcome,
      businessOutcomeTheme: detail.businessOutcomeTheme,
      testimonial: detail.testimonial,

      ctaTitle: detail.cta.title,
      ctaDescription: detail.cta.description,
      ctaButtonLabel: detail.cta.buttonLabel,
    }

    try {
      if (existingId) {
        await client.createOrReplace({ ...doc, _id: existingId })
        console.log(`  ✓ Updated existing document for "${detail.slug}"`)
      } else {
        const created = await client.create(doc)
        console.log(`  ✓ Created new document for "${detail.slug}" (id: ${created._id})`)
      }
    } catch (err) {
      console.error(`  ✗ Failed for "${detail.slug}":`, err)
    }
  }

  console.log("\nDone. Refresh Sanity Studio to see all case studies.")
}

migrate()