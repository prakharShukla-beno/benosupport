/**
 * One-time migration: pushes all Service text content from lib/services-data.ts
 * into Sanity, so you don't have to manually copy-paste every field in Studio.
 *
 * What it does:
 *   - For each of the 8 services, creates (or updates, if one already exists
 *     for that slug — e.g. the 3 you already filled in manually) a "service"
 *     document with Hero, Intro, Capabilities, Scale, Bottom CTA, and FAQ text.
 *   - Does NOT touch images — hero images keep using the original site
 *     images automatically (that's how the fallback is designed), so nothing
 *     needs to be uploaded here. You can add a Hero image later in Studio
 *     any time you want to replace it.
 *   - Safe to run more than once: it finds the existing document for a slug
 *     (if any) and updates it in place, instead of creating a duplicate.
 *
 * ── One-time setup ──────────────────────────────────────────────────────
 * 1. Get a WRITE token:
 *      https://www.sanity.io/manage  →  your project  →  API  →  Tokens
 *      →  "Add API token"  →  name it anything  →  Permissions: "Editor"
 *      →  copy the token (you only see it once).
 *
 * 2. Add it to your local .env.local file (do NOT commit this token):
 *      SANITY_API_WRITE_TOKEN=paste_your_token_here
 *
 * 3. Install the one small tool needed to run this TypeScript file directly:
 *      npm install -D tsx
 *
 * ── Run it ───────────────────────────────────────────────────────────────
 *      npx tsx scripts/migrate-services.ts
 *
 * You'll see one line printed per service. When it's done, refresh Studio —
 * all 8 services should be there under "Services".
 */

import { config as loadEnv } from "dotenv"
loadEnv({ path: ".env.local" })

import { createClient } from "next-sanity"
import { servicesData } from "../lib/services-data"

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
      "See the setup instructions at the top of this file — you need a write-permission token from sanity.io/manage."
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

async function migrate() {
  const slugs = Object.keys(servicesData)
  console.log(`Found ${slugs.length} services in lib/services-data.ts. Starting...\n`)

  for (const slug of slugs) {
    const service = servicesData[slug]

    // Check if a document for this slug already exists (e.g. one of the 3
    // you already filled in manually) — if so, update that same one instead
    // of creating a duplicate.
    const existingId: string | null = await client.fetch(
      `*[_type == "service" && slug.current == $slug][0]._id`,
      { slug }
    )

    const doc = {
      _id: existingId || undefined, // undefined = let Sanity assign a fresh id
      _type: "service",
      slug: { _type: "slug", current: slug },

      heroTagline: service.hero.tagline,
      heroTagline2: service.hero.tagline2 || undefined,
      heroTagline3: service.hero.tagline3 || undefined,
      heroDescription: service.hero.description,
      heroCtaButtons: service.hero.ctaButtons || undefined,
      // heroImage intentionally omitted — original site image is used automatically.

      introSectionLabel: service.intro.sectionLabel,
      introTitle: service.intro.title,
      introParagraphs: service.intro.paragraphs,

      capabilitiesSectionLabel: service.capabilities.sectionLabel,
      capabilitiesTitle: service.capabilities.title,
      capabilitiesSubtitle: service.capabilities.subtitle,
      capabilitiesCards: service.capabilities.cards.map((c) => ({
        _type: "capabilityCard",
        _key: cryptoRandomKey(),
        iconName: c.iconName,
        title: c.title,
        description: c.description,
        highlighted: c.highlighted || false,
        features: c.features || undefined,
      })),

      scaleSectionLabel: service.scale.sectionLabel,
      scaleTitle: service.scale.title,
      scaleSubtitle: service.scale.subtitle,
      scaleCards: service.scale.cards.map((c) => ({
        _type: "scaleCard",
        _key: cryptoRandomKey(),
        iconName: c.iconName,
        title: c.title,
        description: c.description,
        highlighted: c.highlighted || false,
        features: c.features || undefined,
      })),

      // Use Cases intentionally omitted — that section is frozen/hardcoded.

      ctaTitle: service.cta?.title,
      ctaContent: service.cta?.content,
      ctaButtons: service.cta?.buttons,

      faq: service.faq?.map((f) => ({
        _type: "faqItem",
        _key: cryptoRandomKey(),
        question: f.question,
        answer: f.answer,
      })),
    }

    try {
      if (existingId) {
        await client.createOrReplace({ ...doc, _id: existingId })
        console.log(`  ✓ Updated existing document for "${slug}"`)
      } else {
        const created = await client.create(doc)
        console.log(`  ✓ Created new document for "${slug}" (id: ${created._id})`)
      }

    } catch (err) {
      console.error(`  ✗ Failed for "${slug}":`, err)
    }
  }

  console.log("\nDone. Refresh Sanity Studio to see all services.")
}

function cryptoRandomKey(): string {
  return Math.random().toString(36).slice(2, 10)
}
migrate() 