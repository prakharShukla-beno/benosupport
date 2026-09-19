/**
 * One-time migration: pushes all Use Case text content from
 * lib/use-cases-data.ts into Sanity, so you don't have to manually
 * copy-paste every field in Studio.
 *
 * What it does:
 *   - For each of the 9 use cases, creates (or updates, if one already
 *     exists for that slug) a "useCase" document with all its text.
 *   - Does NOT touch images — hero images keep using the original site
 *     images automatically. You can add new ones in Studio any time.
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
 *      npx tsx scripts/migrate-use-cases.ts
 */

import { config as loadEnv } from "dotenv"
loadEnv({ path: ".env.local" })

import { createClient } from "next-sanity"
import { USE_CASE_DETAILS } from "../lib/use-cases-data"

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
  console.log(`Found ${USE_CASE_DETAILS.length} use cases. Starting...\n`)

  for (const detail of USE_CASE_DETAILS) {
    const existingId: string | null = await client.fetch(
      `*[_type == "useCase" && slug.current == $slug][0]._id`,
      { slug: detail.slug }
    )

    const doc = {
      _id: existingId || undefined,
      _type: "useCase",
      slug: { _type: "slug", current: detail.slug },

      listingTag: detail.listingTag,
      heroTag: detail.hero.tag,
      heroTitleLines: [...detail.hero.titleLines],
      heroSubtitle: detail.hero.subtitle,
      // heroImage intentionally omitted — original site image is used automatically.
      heroImageAlt: detail.hero.imageAlt,
      heroBreadcrumbLabel: detail.hero.breadcrumbLabel,

      whyTitle: detail.whyTitle,
      whyCards: detail.whyCards.map((c) => ({
        _type: "whyCard",
        _key: key(),
        title: c.title,
        icon: c.icon,
        description: c.description,
      })),

      gridTitle: detail.gridTitle,
      cards: detail.cards.map((c) => ({
        _type: "useCaseCard",
        _key: key(),
        title: c.title,
        icon: c.icon,
        subtitle: c.subtitle,
        description: c.description,
        benefitsTitle: c.benefitsTitle,
        benefits: c.benefits,
      })),

      faqs: detail.faqs.map((f) => ({
        _type: "useCaseFaq",
        _key: key(),
        q: f.q,
        a: f.a,
      })),

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

  console.log("\nDone. Refresh Sanity Studio to see all use cases.")
}

migrate()