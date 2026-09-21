/**
 * One-time migration: pushes the Privacy Policy and Terms & Conditions
 * page content into Sanity, so you don't have to manually copy-paste every
 * field in Studio.
 *
 * What it does:
 *   - Creates (or updates, if run again) TWO "legalPage" documents — one
 *     for Privacy Policy, one for Terms & Conditions.
 *   - Does NOT touch page <title>/<meta description> (SEO) — those stay
 *     hardcoded in the page files, same as every other page on the site.
 *   - Safe to run more than once: it always updates the SAME two documents
 *     (fixed ids), so re-running never creates a duplicate.
 *
 * ── One-time setup (skip if already done for the other migrate scripts) ──
 * 1. Get a WRITE token: https://www.sanity.io/manage → your project → API
 *    → Tokens → "Add API token" → Permissions: "Editor" → copy it.
 * 2. Add it to .env.local:  SANITY_API_WRITE_TOKEN=paste_your_token_here
 * 3. Install tsx (if not already installed):  npm install -D tsx
 *
 * ── Run it ───────────────────────────────────────────────────────────────
 *      npx tsx scripts/migrate-legal-pages.ts
 */

import { config as loadEnv } from "dotenv"
loadEnv({ path: ".env.local" })

import { createClient } from "next-sanity"
import { LEGAL_PAGE_DETAILS } from "../lib/legal-pages-data"

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
    "Missing SANITY_API_WRITE_TOKEN.\n" + "See the setup instructions at the top of this file."
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

function key(): string {
  return Math.random().toString(36).slice(2, 10)
}

async function migrate() {
  console.log("Pushing Legal Pages content to Sanity...\n")

  for (const detail of LEGAL_PAGE_DETAILS) {
    const docId = `legalPage-${detail.pageKey}`

    const doc = {
      _id: docId,
      _type: "legalPage",
      pageKey: detail.pageKey,
      title: detail.title,
      effectiveDate: detail.effectiveDate,
      intro: detail.intro,
      sections: detail.sections.map((section) => ({
        _type: "legalSection",
        _key: key(),
        title: section.title,
        paragraphs: section.paragraphs,
      })),
      closing: detail.closing,
    }

    try {
      await client.createOrReplace(doc)
      console.log(`  ✓ "${detail.title}" saved (id: ${docId})`)
    } catch (err) {
      console.error(`  ✗ Failed for "${detail.title}":`, err)
      process.exit(1)
    }
  }

  console.log('\nDone. Refresh Sanity Studio to see them under "Legal Pages".')
}

migrate()